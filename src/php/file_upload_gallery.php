<?php
require('DatabaseData.php');
$art = new Article();

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

if(!file_exists($target_file)){
  $art->AddImage($folder, "/gallery/" . $folder . "/" . $file);
}

move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
