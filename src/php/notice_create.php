<?php
require('DatabaseData.php');
$notice = new Notice();
$notice->CreateData($_POST['head'], $_POST['school'], $_POST['color'], $_POST['text']);

