<?php
require('DatabaseData.php');
$article = new Article();
$article->SetData(
  $_POST['id'],
  $_POST['topic'],
  $_POST['url'],
  $_POST['keywords'],
  $_POST['metadesc'],
  $_POST['name'],
  $_POST['short'],
  $_POST['pic'],
  $_POST['text'],
  $_POST['releaseDatetime']);
