<?php
$pwd = password_hash($_GET['pwd'], PASSWORD_DEFAULT);

print_r($pwd);
