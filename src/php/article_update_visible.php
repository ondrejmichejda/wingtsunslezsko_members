<?php
require('DatabaseData.php');
$article = new Article();
$article->UpdateVisible($_POST['id'], $_POST['visible']);
