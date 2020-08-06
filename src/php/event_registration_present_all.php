<?php
require('DatabaseData.php');
$eventRegistration = new EventRegistration();
$eventRegistration->PresentAll($_POST['eventId']);
