<?php
require('DatabaseData.php');
$article = new Article();
$article->GetImages($_GET['id']);

