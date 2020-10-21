<?php
require('DatabaseData.php');
$log = new Log();
$log->CreateData($_POST['user'], $_POST['type'], $_POST['role'], $_POST['city'], $_POST['section'], $_POST['info1'], $_POST['info2']);
