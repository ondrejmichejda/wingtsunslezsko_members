<?php
require('DatabaseData.php');
$event = new Event();
$event->GetData($_GET['school']);
