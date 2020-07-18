<?php
require('DatabaseData.php');
$member = new Member();
$member->GetOne($_GET['login']);
