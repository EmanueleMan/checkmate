
<?php
  session_start();
  echo "ma che cazzzz";
  $dbconn = pg_connect("host=localhost port=5432 dbname=Checkmate 
                                user=postgres password=admin") 
                                or die('Could not connect: ' . pg_last_error());
  
?>