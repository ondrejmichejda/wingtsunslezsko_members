<?php
require('DatabaseData.php');
$sign = new Sign();
$sign->SignIn($_GET['eventId'], $_GET['userId']);
