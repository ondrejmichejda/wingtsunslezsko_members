<?php
require('DatabaseData.php');
$sign = new Sign();
$sign->SignIn($_POST['eventId'], $_POST['userId'], $_POST['confirmed']);
