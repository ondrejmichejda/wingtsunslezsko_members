<?php
require('DatabaseData.php');
$article = new Article();
$article->UpdateGalleryImage($_POST['id'], $_POST['visible']);

