<?php

// db credentials
define('DB_HOST', '127.0.0.1');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'wingtsunslezskocz2');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();

$notices = [];
$sql = "SELECT * FROM in_noticeboard ORDER BY id DESC";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $notices[$cr]['id']    = $row['id'];
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
