<?php
require('DatabaseData.php');
$event = new Event();
$event->SetData(
  $_POST['id'],
  $_POST['name'],
  $_POST['school'],
  $_POST['location'],
  $_POST['prize'],
  $_POST['description'],
  $_POST['memberlimit'],
  $_POST['memberlimitMin'],
  $_POST['datetimeStart'],
  $_POST['datetimeEnd'],
  $_POST['datetimeDeadline']);
