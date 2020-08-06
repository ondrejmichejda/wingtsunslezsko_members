<?php
require('DatabaseData.php');
$eventRegistration = new EventRegistration();
$eventRegistration->ResetAll($_POST['eventId']);
