<?php
require('DatabaseData.php');
$notice = new Notice();
$notice->GetData($_GET['school']);
