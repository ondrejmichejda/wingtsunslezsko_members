<?php
require('DatabaseData.php');
$event = new Event();
$event->GetOne($_GET['eventId']);
