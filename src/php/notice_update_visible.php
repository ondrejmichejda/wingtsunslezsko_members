<?php
require('DatabaseData.php');
$notice = new Notice();
$notice->UpdateVisible($_POST['id'], $_POST['visible']);
