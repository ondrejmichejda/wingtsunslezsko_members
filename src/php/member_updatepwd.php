<?php
require('DatabaseData.php');
$member = new Member();
$member->UpdatePwd($_POST['id'], $_POST['pwd']);
