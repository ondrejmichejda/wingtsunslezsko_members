<?php
require('DatabaseData.php');
$eventRegistration = new EventRegistration();
$eventRegistration->GetDataBy($_GET['id'], $_GET['byMember']);
