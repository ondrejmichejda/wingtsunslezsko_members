<?php
require('DatabaseData.php');
$video = new Video();
$video->DeleteData($_POST['id']);
