<?php
require('DatabaseData.php');
$member = new Member();
$member->SendMail($_POST['mail'], $_POST['text']);
