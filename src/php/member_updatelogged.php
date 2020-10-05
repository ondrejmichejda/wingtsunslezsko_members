<?php
require('DatabaseData.php');
$member = new Member();
$member->UpdateLogged($_POST['id']);
