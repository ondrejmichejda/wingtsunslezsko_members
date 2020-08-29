<?php
$base = "../../gallery/";

/** Create article folder if doesnt exist */
$articleFolder = $base . $_FILES["file"]["name"];

if (!file_exists($articleFolder)){
  mkdir($articleFolder);
}

/** Check file */
$target_file = $articleFolder . '/pic' . '.' . basename($_FILES["file"]["type"]) ;

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file))
{
  echo false;
}

