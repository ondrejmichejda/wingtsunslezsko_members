<?php
require('DatabaseData.php');
$event = new Event();
$event->DeleteData($_POST['id']);
