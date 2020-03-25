<?php
//require ('../testdibi.php');
require ('Db.php');

class Database
{
  public static function Connect()
  {
    $host = '127.0.0.1';
    $db = 'wingtsunslezskocz2';
    $user = 'root';
    $pwd = '';
    Db::connect($host, $db, $user, $pwd);
  }

  public static function GetEvents()
  {
    self::Connect();
    $rowNotices = Db::queryAll('
                SELECT *
                FROM in_noticeboard');

    $notices = [];

    if($rowNotices <> null)
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($rowNotices))
      {
        $cars[$cr]['id']    = $row['id'];
        $cars[$cr]['school'] = $row['school'];
        $cars[$cr]['text'] = $row['text'];
        $cars[$cr]['color'] = $row['color'];
        $cr++;
      }

      echo json_encode(['data'=>$notices]);
    }

  }
}
