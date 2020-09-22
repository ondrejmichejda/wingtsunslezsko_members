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

  // Update members, confirmed and present
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

      $sql = "UPDATE in_events SET members=".count($data)." WHERE id=".$eventId;
      if(!mysqli_query($this->connection,$sql))
        $updated = false;
    }
    else
    {
      $updated = false;
    }

    // update confirmed
    $data = [];
    $sql = "SELECT * FROM in_events_registrations WHERE confirmed=true AND event_id=".$eventId;
    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['event_id'] = $row['event_id'];
        $data[$cr]['confirmed'] = $row['confirmed'];
        $cr++;
      }

      $sql = "UPDATE in_events SET confirmed=".count($data)." WHERE id=".$eventId;
      if(!mysqli_query($this->connection,$sql))
        $updated = false;
    }
    else
    {
      $updated = false;
    }

    // update present
    $data = [];
    $sql = "SELECT * FROM in_events_registrations WHERE present=true AND event_id=".$eventId;
    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['event_id'] = $row['event_id'];
        $data[$cr]['confirmed'] = $row['confirmed'];
        $cr++;
      }

      $sql = "UPDATE in_events SET present=".count($data)." WHERE id=".$eventId;
      if(!mysqli_query($this->connection,$sql))
        $updated = false;
    }
    else
    {
      $updated = false;
    }

    return $updated;
  }

  protected function getISOtime($datetime){
    return $datetime;
  }

  protected function getDBtime($datetime){
    return $datetime;
  }
}

class Notice extends DatabaseData
{
  public function GetData($school)
  {
    $data = [];
    $schoolCondition = $school == 0 ? '%' : $school;
    $sql = "SELECT * FROM in_noticeboard WHERE visible=true AND (school LIKE '".$schoolCondition."' or school=0) ORDER BY datetime DESC";

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id']    = $row['id'];
        $data[$cr]['datetime'] = $this->getISOtime($row['datetime']);
        $data[$cr]['school'] = $row['school'];
        $data[$cr]['head'] = $row['head'];
        $data[$cr]['text'] = $row['text'];
        $data[$cr]['color'] = $row['color'];
        $data[$cr]['visible'] = $row['visible'];
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
    $sql = "SELECT * FROM in_noticeboard ORDER BY datetime DESC";

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id']    = $row['id'];
        $data[$cr]['datetime'] = $this->getISOtime($row['datetime']);
        $data[$cr]['school'] = $row['school'];
        $data[$cr]['head'] = $row['head'];
        $data[$cr]['text'] = $row['text'];
        $data[$cr]['color'] = $row['color'];
        $data[$cr]['visible'] = $row['visible'];
        $cr++;
      }

      echo json_encode(['data'=>$data]);
    }
    else
    {
      http_response_code(404);
    }
  }

  public function CreateData($head, $school, $color, $text)
  {
    $sql = "INSERT INTO in_noticeboard (head, school, color, text) VALUES ('".$head."', ".$school.", '".$color."', '".$text."')";

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function DeleteData($id)
  {
    $sql = "DELETE FROM in_noticeboard WHERE id=".$id;

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function UpdateVisible($id, $visible)
  {
    $sql = "UPDATE in_noticeboard SET visible=".$visible." WHERE id=".$id;

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }
}

class Event extends DatabaseData
{
  public function GetData($school)
  {
    $data = [];
    $schoolCondition = $school == 0 ? '%' : $school;
    $sql = "SELECT * FROM in_events WHERE visible=true AND datetime_end >= CURRENT_TIMESTAMP AND (school LIKE '".$schoolCondition."' or school=0) ORDER BY datetime_start ASC";

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
        $data[$cr]['confirmed'] = $row['confirmed'];
        $data[$cr]['present'] = $row['present'];
        $data[$cr]['datetimeStart'] = $this->getISOtime($row['datetime_start']);
        $data[$cr]['datetimeDeadline'] = $this->getISOtime($row['datetime_deadline']);
        $data[$cr]['datetimeEnd'] = $this->getISOtime($row['datetime_end']);
        $cr++;
      }

      echo json_encode(['data'=>$data]);
    }
    else
    {
      http_response_code(404);
    }
  }

  public function GetOne($eventId)
  {
    $data = [];
    $sql = "SELECT * FROM in_events WHERE id=".$eventId;

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
        $data[$cr]['confirmed'] = $row['confirmed'];
        $data[$cr]['present'] = $row['present'];
        $data[$cr]['datetimeStart'] = $this->getISOtime($row['datetime_start']);
        $data[$cr]['datetimeDeadline'] = $this->getISOtime($row['datetime_deadline']);
        $data[$cr]['datetimeEnd'] = $this->getISOtime($row['datetime_end']);
        $data[$cr]['visible'] = $row['visible'];
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
        $data[$cr]['confirmed'] = $row['confirmed'];
        $data[$cr]['present'] = $row['present'];
        $data[$cr]['datetimeStart'] = $this->getISOtime($row['datetime_start']);
        $data[$cr]['datetimeDeadline'] = $this->getISOtime($row['datetime_deadline']);
        $data[$cr]['datetimeEnd'] = $this->getISOtime($row['datetime_end']);
        $data[$cr]['visible'] = $row['visible'];
        $cr++;
      }

      echo json_encode(['data'=>$data]);
    }
    else
    {
      http_response_code(404);
    }
  }

  public function SetData($id, $name, $school, $location, $prize, $description, $memberlimit,
                          $memberlimitMin, $datetimeStart, $datetimeEnd, $datetimeDeadline, $visible)
  {
    $sql = "UPDATE in_events SET
            name='".$name."',
            school=".$school.",
            location='".$location."',
            prize='".$prize."',
            description='".$description."',
            memberlimit=".$memberlimit.",
            memberlimit_min=".$memberlimitMin.",
            datetime_start='".$this->getDBtime($datetimeStart)."',
            datetime_end='".$this->getDBtime($datetimeEnd)."',
            datetime_deadline='".$this->getDBtime($datetimeDeadline)."',
            visible=".$visible."
            WHERE id=".$id;

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function CopyData($id)
  {
    $sql = "SELECT name, school, location, prize, description, memberlimit,memberlimit_min, datetime_start, datetime_deadline, datetime_end
            FROM in_events
            WHERE id=".$id;

    $event = mysqli_fetch_array(mysqli_query($this->connection,$sql));

    $sql = "INSERT INTO in_events (name, school, location, prize, description, memberlimit, memberlimit_min, datetime_start, datetime_deadline, datetime_end)
            VALUES (
            '".$event['name']." - Kopie',
            ".$event['school'].",
            '".$event['location']."',
            '".$event['prize']."',
            '".$event['description']."',
            ".$event['memberlimit'].",
            ".$event['memberlimit_min'].",
            '".$event['datetime_start']."',
            '".$event['datetime_deadline']."',
            '".$event['datetime_end']."')";

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function CreateData()
  {
    $sql = "INSERT INTO in_events (name, datetime_end) VALUES ('Nová', '".date("Y-m-d H:i:s", strtotime("+1 hours"))."')";
    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function DeleteData($id)
  {
    // delete event
    $sql = "DELETE FROM `in_events` WHERE id=".$id;
    $result = mysqli_query($this->connection,$sql);

    // delete event registrations
    $sql = "DELETE FROM `in_events_registrations` WHERE event_id = ".$id;
    $result = mysqli_query($this->connection,$sql);

    echo $result;
  }
}

class EventRegistration extends DatabaseData
{
  public function GetData(){
    new ErrorException('Not implemented');
  }

  public function Update($id, $confirmed, $present, $eventId)
  {
    $result = true;

    $sql = "UPDATE in_events_registrations
            SET confirmed=".$confirmed.", present=".$present."
            WHERE id=".$id;

    $result = mysqli_query($this->connection,$sql);
    $result = self::UpdateEvent($eventId);

    echo $result;
  }

  public function ResetAll($eventId)
  {
    $result = true;

    $sql = "UPDATE in_events_registrations
            SET confirmed=false, present=false
            WHERE event_id=".$eventId;

    $result = mysqli_query($this->connection,$sql);
    $result = self::UpdateEvent($eventId);

    echo $result;
  }

  public function ConfirmedAll($eventId)
  {
    $result = true;

    $sql = "UPDATE in_events_registrations
            SET confirmed=true
            WHERE event_id=".$eventId;

    $result = mysqli_query($this->connection,$sql);
    $result = self::UpdateEvent($eventId);

    echo $result;
  }

  public function PresentAll($eventId)
  {
    $result = true;

    $sql = "UPDATE in_events_registrations
            SET present=true
            WHERE confirmed=true AND event_id=".$eventId;

    $result = mysqli_query($this->connection,$sql);
    $result = self::UpdateEvent($eventId);

    echo $result;
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
        $data[$cr]['datetime'] = $this->getISOtime($row['datetime']);
        $data[$cr]['eventId'] = $row['event_id'];
        $data[$cr]['userId'] = $row['user_id'];
        $data[$cr]['confirmed'] = $row['confirmed'];
        $data[$cr]['present'] = $row['present'];
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

  public function DeleteAll($eventId){
    $result = true;

    $sql = "DELETE FROM in_events_registrations WHERE event_id = ".$eventId;
    $result = mysqli_query($this->connection,$sql);

    echo $result;
  }
}

class Member extends DatabaseData
{
  public function GetData(){
    $data = [];
    $sql = "SELECT * FROM in_members ORDER BY id DESC";

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id'] = $row['id'];
        $data[$cr]['datetime'] = $row['datetime'];
        $data[$cr]['login'] = $row['login'];
        $data[$cr]['pwd'] = $row['pwd'];
        $data[$cr]['name'] = $row['name'];
        $data[$cr]['surname'] = $row['surname'];
        $data[$cr]['school'] = $row['school'];
        $data[$cr]['news'] = $row['news'];
        $data[$cr]['admin'] = $row['admin'];
        $cr++;
      }
      echo json_encode(['data'=>$data]);
    }
    else
      http_response_code(404);
  }

  public function DeleteData($id)
  {
    $sql = "DELETE FROM in_members WHERE id=".$id;
    $result = mysqli_query($this->connection,$sql);

    $sql = "DELETE FROM in_events_registrations WHERE user_id=".$id;
    $result = mysqli_query($this->connection,$sql);

    echo $result;
  }

  public function UpdatePwd($id, $pwd){
    $pwd_hashed = password_hash($pwd, PASSWORD_DEFAULT);
    $sql = "UPDATE in_members SET pwd='".$pwd_hashed."' WHERE  id=".$id;

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function UpdateData($id, $name, $surname, $login, $school){

    $sql = "UPDATE in_members SET
            name='".$name."',
            surname='".$surname."',
            login='".$login."',
            school=".$school."
            WHERE  id=".$id;

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function GetAllOnEvent($eventId){
    $data = [];
    $sql = "SELECT in_events_registrations.id, in_events_registrations.datetime, in_members.name, in_members.surname, in_events_registrations.confirmed,
            in_events_registrations.present, in_events_registrations.guest, in_events_registrations.guest_name, in_events_registrations.guest_surname
            FROM in_events_registrations
            LEFT JOIN in_members ON in_events_registrations.user_id=in_members.id
            WHERE in_events_registrations.event_id = ".$eventId." ORDER BY datetime ASC";

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id'] = $row['id'];
        $data[$cr]['datetime'] = $this->getISOtime($row['datetime']);
        $data[$cr]['name'] = $row['name'];
        $data[$cr]['surname'] = $row['surname'];
        $data[$cr]['confirmed'] = $row['confirmed'];
        $data[$cr]['present'] = $row['present'];
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

  public function CreateData($name, $surname, $school, $login, $pwd)
  {
    $pwd_hashed = password_hash($pwd, PASSWORD_DEFAULT);
    $sql = "INSERT INTO in_members (name, surname, school, login, pwd) VALUES ('".$name."', '".$surname."', ".$school.", '".$login."', '".$pwd_hashed."')";

    $result = mysqli_query($this->connection,$sql);
    echo $result;
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
        $data[$cr]['datetime'] = $row['datetime'];
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

  public function SendMail($mail, $text)
  {
    $head = 'From:info@wingtsunslezsko.cz';
    $head .= "\nMIME-Version: 1.0\n";
    $head .= "Content-Type: text/html; charset=\"utf-8\"\n";

    $address = $mail;

    $subject = 'Wing Tsun Slezsko - Přihlašovací údaje';
    $done = mb_send_mail($address, $subject, $text, $head);

    echo $done;
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

class Article extends DatabaseData{
  public function UpdateSitemap()
  {
    //location of sitemap.xml
    $file = '../../sitemap.xml';

    //heading if xml file
    $xml = new DOMDocument('1.0', 'UTF-8');
    $xml_urlset = $xml->createElement("urlset");

    $xml_urlset->setAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

    $staticSites = array(
      'https://wingtsunslezsko.cz/',
      'https://wingtsunslezsko.cz/domu',
      'https://wingtsunslezsko.cz/nabor',
      'https://wingtsunslezsko.cz/wingtsun',
      'https://wingtsunslezsko.cz/zakladni-principy',
      'https://wingtsunslezsko.cz/silove-principy',
      'https://wingtsunslezsko.cz/wingtsunslezsko',
      'https://wingtsunslezsko.cz/nasi-instruktori',
      'https://wingtsunslezsko.cz/petr-walaski',
      'https://wingtsunslezsko.cz/ondrej-michejda',
      'https://wingtsunslezsko.cz/denis-sarkozi',
      'https://wingtsunslezsko.cz/oldrich-kosarek',
      'https://wingtsunslezsko.cz/adam-majtner',
      'https://wingtsunslezsko.cz/od-koho-se-ucime',
      'https://wingtsunslezsko.cz/zdenek-kobrle',
      'https://wingtsunslezsko.cz/chris-collins',
      'https://wingtsunslezsko.cz/kontakty',
      'https://wingtsunslezsko.cz/ostrava',
      'https://wingtsunslezsko.cz/trinec',
      'https://wingtsunslezsko.cz/cesky-tesin',
      'https://wingtsunslezsko.cz/terlicko',
      'https://wingtsunslezsko.cz/dalsi-skoly-hkwta',
      'https://wingtsunslezsko.cz/vyuka-wingtsun',
      'https://wingtsunslezsko.cz/kurzy-seminare',
      'https://wingtsunslezsko.cz/deti',
      'https://wingtsunslezsko.cz/clanky',
      'https://wingtsunslezsko.cz/clanky-wingtsun',
      'https://wingtsunslezsko.cz/clanky-deti',
      'https://wingtsunslezsko.cz/clanky-prevence',
      'https://wingtsunslezsko.cz/aktuality');

//fill xml with static sites
    foreach ($staticSites as $site) {
      $xml_url = $xml->createElement("url");
      $xml_loc = $xml->createElement("loc");

      $xml_loc->nodeValue = $site;

      $xml_url->appendChild($xml_loc);
      $xml_urlset->appendChild($xml_url);
    }

    $topics = array(
      'actuality',
      'article',
      'action'
    );

    //fill xml with all articles
    $sql = "SELECT * FROM ex_articles WHERE release_datetime <= NOW() AND visible=true";

    if($result = mysqli_query($this->connection,$sql)) {
      while($row = mysqli_fetch_assoc($result)) {
        $xml_url = $xml->createElement("url");
        $xml_loc = $xml->createElement("loc");
        $xml_loc->nodeValue = 'https://wingtsunslezsko.cz/clanky/'.$row['url'];

        $xml_url->appendChild($xml_loc);
        $xml_urlset->appendChild($xml_url);
      }
    }

    $xml->appendChild($xml_urlset);
    $xml->save($file);
  }

  public function GetData()
  {
    $data = [];
    $sql = "SELECT * FROM ex_articles ORDER BY datetime DESC";

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id'] = $row['id'];
        $data[$cr]['datetime'] = $row['datetime'];
        $data[$cr]['topic'] = $row['topic'];
        $data[$cr]['url'] = $row['url'];
        $data[$cr]['keywords'] = $row['keywords'];
        $data[$cr]['metadesc'] = $row['metadesc'];
        $data[$cr]['name'] = $row['name'];
        $data[$cr]['short'] = $row['short'];
        $data[$cr]['pic'] = $row['pic'];
        $data[$cr]['text'] = $row['text'];
        $data[$cr]['releaseDatetime'] = $row['release_datetime'];
        $data[$cr]['visible'] = $row['visible'];
        $cr++;
      }

      echo json_encode(['data'=>$data]);
    }
    else
    {
      http_response_code(404);
    }
  }

  public function CreateData()
  {
    $sql = "INSERT INTO ex_articles (name, release_datetime) VALUES ('Nový článek', '".date("Y-m-d H:i:s", strtotime("+1 days"))."')";
    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function UpdateVisible($id, $visible)
  {
    $sql = "UPDATE ex_articles SET visible=".$visible." WHERE id=".$id;

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function SetData($id, $topic, $url, $keywords, $metadesc, $name, $short,
                          $pic, $text, $releaseDatetime)
  {
    $sql = "UPDATE ex_articles SET
            topic='".$topic."',
            url='".$url."',
            keywords='".$keywords."',
            metadesc='".$metadesc."',
            name='".$name."',
            short='".$short."',
            pic='".$pic."',
            text='".$text."',
            release_datetime='".$this->getDBtime($releaseDatetime)." '
            WHERE id=".$id;

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function AddImage($id, $url)
  {
    $sql = "INSERT INTO ex_article_img
            (article_id, url)
            VALUES
            (".$id.", '".$url."')";

    return mysqli_query($this->connection,$sql);
  }

  public function GetImages($id)
  {
    $data = [];
    $sql = "SELECT * FROM ex_article_img WHERE article_id=" . $id;

    if($result = mysqli_query($this->connection,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $data[$cr]['id'] = $row['id'];
        $data[$cr]['articleId'] = $row['article_id'];
        $data[$cr]['url'] = $row['url'];
        $data[$cr]['visible'] = $row['visible'];
        $cr++;
      }

      echo json_encode(['data'=>$data]);
    }
    else
    {
      http_response_code(404);
    }
  }

  public function UpdateGalleryImage($id, $visible)
  {
    $sql = "UPDATE ex_article_img SET visible=".$visible." WHERE id=".$id;

    $result = mysqli_query($this->connection,$sql);
    echo $result;
  }

  public function DeleteData($id)
  {
    $sql = "DELETE FROM ex_articles WHERE id=".$id;
    $result = mysqli_query($this->connection,$sql);

    $sql = "DELETE FROM ex_article_img WHERE article_id=".$id;
    $result = mysqli_query($this->connection,$sql);

    echo $result;
  }
}
