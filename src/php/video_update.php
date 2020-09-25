<?php
require('DatabaseData.php');
$video = new Video();
$video->UpdateData($_POST['id'], $_POST['name'], $_POST['category'], $_POST['description'], $_POST['link'], $_POST['visible']);
