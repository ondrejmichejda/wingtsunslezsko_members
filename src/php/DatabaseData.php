<?php
interface IDatabaseData
{
  public function GetData();
}

abstract class DatabaseData implements IDatabaseData
{
  private $configPath = "../../../config/database.json";
  private $config = null;

  protected $connection = null;
  protected $schoolDictionary = array(
    0 => "Vše",
    1 => "Ostrava",
    2 => "Třinec",
    3 => "Český Těšín"
  );

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

  abstract public function GetData();
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
  public function GetData()
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
        $data[$cr]['school'] = $this->schoolDictionary[$row['school']];
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
