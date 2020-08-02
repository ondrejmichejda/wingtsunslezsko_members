<?php
require('DatabaseData.php');
$member = new Member();
$member->GetOne($_POST['login'], $_POST['p']);
