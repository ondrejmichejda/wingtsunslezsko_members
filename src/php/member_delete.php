<?php
require('DatabaseData.php');
$member = new Member();
$member->DeleteData($_POST['id']);
