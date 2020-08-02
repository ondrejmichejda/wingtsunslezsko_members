<?php
require('DatabaseData.php');
$event = new Event();
$event->CopyData($_POST['id']);
