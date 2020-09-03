<?php
require('DatabaseData.php');
$article = new Article();

//delete article image folder

$folderToDelete = "../../gallery/" . $_POST['id'];

delete_files($folderToDelete);

$article->DeleteData($_POST['id']);


function delete_files($target) {
  if(is_dir($target)){
    $files = glob( $target . '*', GLOB_MARK ); //GLOB_MARK adds a slash to directories returned

    foreach( $files as $file ){
      delete_files( $file );
    }
    rmdir( $target );
  } elseif(is_file($target)) {
    unlink( $target );
  }
}
