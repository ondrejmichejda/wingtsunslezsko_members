<?php
interface IDatabaseData
{

}

abstract class DatabaseData implements IDatabaseData
{
  private $configPath = "../../../config/database.json";
  private $config = null;

  protected $connection = null;

  function __construct()
  {
    if($this->ConfigInit())
      $this->Connect();
  }

  protected function GetDatabaseDT($db_datetime, $date_only = false)
  {
    $date = DateTime::createFromFormat('Y-m-d H:i:s',$db_datetime);
    if ($date_only)
      return date_format($date, 'd.m.Y');
    else
      return date_format($date, 'd.m.Y - H:i');
  }

  /*Requires config file in json format
  {
    "host": "127.0.0.1",
    "user": "root",
    "password": "",
    "db_name": "wingtsunslezskocz2"
  }
  */
  private function ConfigInit()
  {
    $file = file_get_contents($this->configPath);
    $this->config = json_decode($file);
    return $this->config != null;
  }

  private function Connect()
  {
    // db credentials
    define('DB_HOST', $this->config->host);
    define('DB_USER', $this->config->user);
    define('DB_PASS', $this->config->password);
    define('DB_NAME', $this->config->db_name);

    function conn()
    {
      $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

      if (mysqli_connect_errno($connect)) {
        die("Failed to connect:" . mysqli_connect_error());
      }

      mysqli_set_charset($connect, "utf8");

      return $connect;
    }

    $this->connection = conn();
  }

  // Update signed members and not confirmed members for event
  protected function UpdateEvent($eventId)
  {
    $updated = true;

    // update members
    $data = [];
    $sql = "SELECT * FROM in_events_registrations WHERE event_id=".$eventId;
    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['event_id'] = $row['event_id'];
        $data[$cr]['confirmed'] = $row['confirmed'];
        $cr++;
      }

      $sql = "UPDATE `in_events` SET members=".count($data)." WHERE id=".$eventId;
      if(!mysqli_query($this->connection,$sql))
        $updated = false;
    }
    else
    {
      $updated = false;
    }

    // update members confirmed
    // $sql = "SELECT * FROM in_events_registrations WHERE confirmed=true AND event_id=".$eventId;

    $notconfirmedCount = 0;

    foreach($data as $reg){
      if(!$reg['confirmed'])
      {
        $notconfirmedCount++;
      }
    }

    $sql = "UPDATE `in_events` SET notconfirmed=".$notconfirmedCount." WHERE id=".$eventId;
    if(!mysqli_query($this->connection,$sql))
      $updated = false;

    return $updated;
  }
}

class Notice extends DatabaseData
{
  public function GetData()
  {
    $data = [];
    $sql = "SELECT * FROM in_noticeboard ORDER BY id DESC";

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id']    = $row['id'];
        $data[$cr]['datetime'] = $row['datetime'];
        $data[$cr]['school'] = $row['school'];
        $data[$cr]['text'] = $row['text'];
        $data[$cr]['color'] = $row['color'];
        $cr++;
      }

      echo json_encode(['data'=>$data]);
    }
    else
    {
      http_response_code(404);
    }
  }
}

class Event extends DatabaseData
{
  public function GetData($school)
  {
    $data = [];
    $schoolCondition = $school == 0 ? '%' : $school;
    $sql = "SELECT * FROM in_events WHERE datetime_end >= CURRENT_TIMESTAMP AND (school LIKE '".$schoolCondition."' or school=0) ORDER BY datetime_start ASC";

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id'] = $row['id'];
        $data[$cr]['datetime'] = $row['datetime'];
        $data[$cr]['name'] = $row['name'];
        $data[$cr]['school'] = $row['school'];
        $data[$cr]['location'] = $row['location'];
        $data[$cr]['prize'] = $row['prize'];
        $data[$cr]['description'] = $row['description'];
        $data[$cr]['memberlimit'] = $row['memberlimit'];
        $data[$cr]['memberlimitMin'] = $row['memberlimit_min'];
        $data[$cr]['members'] = $row['members'];
        $data[$cr]['datetimeStart'] = $row['datetime_start'];
        $data[$cr]['datetimeDeadline'] = $row['datetime_deadline'];
        $data[$cr]['datetimeEnd'] = $row['datetime_end'];
        $cr++;
      }

      echo json_encode(['data'=>$data]);
    }
    else
    {
      http_response_code(404);
    }
  }

  public function GetDataAll()
  {
    $data = [];
    $sql = "SELECT * FROM in_events ORDER BY datetime_start ASC";

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id'] = $row['id'];
        $data[$cr]['datetime'] = $row['datetime'];
        $data[$cr]['name'] = $row['name'];
        $data[$cr]['school'] = $row['school'];
        $data[$cr]['location'] = $row['location'];
        $data[$cr]['prize'] = $row['prize'];
        $data[$cr]['description'] = $row['description'];
        $data[$cr]['memberlimit'] = $row['memberlimit'];
        $data[$cr]['memberlimitMin'] = $row['memberlimit_min'];
        $data[$cr]['members'] = $row['members'];
        $data[$cr]['datetimeStart'] = $row['datetime_start'];
        $data[$cr]['datetimeDeadline'] = $row['datetime_deadline'];
        $data[$cr]['datetimeEnd'] = $row['datetime_end'];
        $cr++;
      }

      echo json_encode(['data'=>$data]);
    }
    else
    {
      http_response_code(404);
    }
  }
}

class EventRegistration extends DatabaseData
{
  public function GetData(){
    new ErrorException('Not implemented');
  }

  public function GetDataBy($id, $byMember)
  {
    $data = [];

    if($byMember){
      $sql = "SELECT * FROM in_events_registrations WHERE user_id='".$id."'";
    }else{
      $sql = "SELECT * FROM in_events_registrations WHERE event_id='".$id."'";
    }


    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id'] = $row['id'];
        $data[$cr]['datetime'] = $row['datetime'];
        $data[$cr]['eventId'] = $row['event_id'];
        $data[$cr]['userId'] = $row['user_id'];
        $data[$cr]['confirmed'] = $row['confirmed'];
        $data[$cr]['notpresent'] = $row['notpresent'];
        $data[$cr]['guest'] = $row['guest'];
        $data[$cr]['guestName'] = $row['guest_name'];
        $data[$cr]['guestSurname'] = $row['guest_surname'];
        $cr++;
      }

      echo json_encode(['data'=>$data]);
    }
    else
    {
      http_response_code(404);
    }
  }
}

class Member extends DatabaseData
{
  public function GetData(){
    //Not implemented
  }

  public function GetOne($login, $password)
  {
    $data = [];
    $sql = "SELECT * FROM in_members WHERE login = '".$login."'";

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id'] = $row['id'];
        $data[$cr]['login'] = $row['login'];
        $data[$cr]['pwd'] = $row['pwd'];
        $data[$cr]['name'] = $row['name'];
        $data[$cr]['surname'] = $row['surname'];
        $data[$cr]['school'] = $row['school'];
        $data[$cr]['news'] = $row['news'];
        $data[$cr]['admin'] = $row['admin'];
        $cr++;
      }

      if(password_verify($password, $data[0]['pwd'])){
        echo json_encode(['data'=>$data]);
      }
      else
      {
        http_response_code(404);
      }
    }
    else
    {
      http_response_code(404);
    }
  }
}

class Sign extends DatabaseData
{
  public function GetData(){
    // not implemented
  }

  public function SignIn($eventId, $userId)
  {
    $result = true;

    $sql = "INSERT INTO in_events_registrations(event_id, user_id) VALUES (".$eventId.", ".$userId.")";

    $result = mysqli_query($this->connection,$sql);
    $result = self::UpdateEvent($eventId);

    echo $result;
  }

  public function SignOut($eventId, $userId)
  {
    $result = true;

    $sql = "DELETE FROM in_events_registrations WHERE event_id=".$eventId." AND user_id=".$userId;

    $result = mysqli_query($this->connection,$sql);
    $result = self::UpdateEvent($eventId);

    echo $result;
  }

}
