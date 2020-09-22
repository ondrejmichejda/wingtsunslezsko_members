<?php
require('DatabaseData.php');
$member = new Member();
$member->UpdateData($_POST['id'], $_POST['name'], $_POST['surname'], $_POST['login'], $_POST['school']);
