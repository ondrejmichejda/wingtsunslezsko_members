<?php
require('DatabaseData.php');
$sign = new Sign();
$sign->SignOut($_GET['eventId'], $_GET['userId']);
