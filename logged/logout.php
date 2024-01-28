<?php 
  session_start();
  session_destroy();
  session_unset();
  setcookie("PHPSESSID","",time()-3600,"/");
  setcookie("username","",time()-3600,"/");
  setcookie("color","",time()-3600,"/");
  setcookie("partita","",time()-3600,"/");
  header("Location: ../home.php");
?>
