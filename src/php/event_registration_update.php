<?php
require('DatabaseData.php');
$eventRegistration = new EventRegistration();
$eventRegistration->Update($_POST['id'], $_POST['confirmed'], $_POST['present'], $_POST['eventId']);
