<?php
require('DatabaseData.php');
$notice = new Notice();
$notice->DeleteData($_POST['id']);
