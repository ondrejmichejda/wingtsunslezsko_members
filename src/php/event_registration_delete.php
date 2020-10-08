<?php
require('DatabaseData.php');
$eventRegistration = new EventRegistration();
$eventRegistration->Delete($_POST['id'], $_POST['eventId']);
