<?php
require('DatabaseData.php');
$member = new Member();
$member->GetAllOnEvent($_GET['eventId']);
