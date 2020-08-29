<?php
$base = "../../gallery/";

$folder = explode(":", $_FILES["file"]["name"])[0];
$file = explode(":", $_FILES["file"]["name"])[1];


/** Create article folder if doesnt exist */
$articleFolder = $base . $folder;

if (!file_exists($articleFolder)){
  mkdir($articleFolder);
}

/** Check file */
$target_file = $articleFolder . '/' . $file;

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file))
{
  echo false;
}
