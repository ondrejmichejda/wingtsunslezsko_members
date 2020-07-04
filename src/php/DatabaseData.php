<?php
interface IDatabaseData
{
  public function GetData();
}

abstract class DatabaseData implements IDatabaseData
{
  protected $connection = null;
  private $configPath = "../../../config/database.json";
  private $config = null;

  function __construct()
  {
    if($this->ConfigInit())
      $this->Connect();
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
    $con = $this->connection;

    $notices = [];
    $sql = "SELECT * FROM in_noticeboard ORDER BY id DESC";

    if($result = mysqli_query($con,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $notices[$cr]['id']    = $row['id'];

        $date = DateTime::createFromFormat('Y-m-d H:i:s',$row['datetime']);
        $notices[$cr]['datetime'] = date_format($date, 'd.m.Y');;

        $notices[$cr]['school'] = $row['school'];
        $notices[$cr]['text'] = $row['text'];
        $notices[$cr]['color'] = $row['color'];
        $cr++;
      }

      echo json_encode(['data'=>$notices]);
    }
    else
    {
      http_response_code(404);
    }
  }
}
