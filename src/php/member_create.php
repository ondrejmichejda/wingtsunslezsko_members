<?php
require('DatabaseData.php');
$member = new Member();
$member->CreateData($_POST['name'], $_POST['surname'], $_POST['school'], $_POST['login'], $_POST['pwd']);
