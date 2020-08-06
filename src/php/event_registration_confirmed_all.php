<?php
require('DatabaseData.php');
$eventRegistration = new EventRegistration();
$eventRegistration->ConfirmedAll($_POST['eventId']);
