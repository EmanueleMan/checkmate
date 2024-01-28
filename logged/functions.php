<?php 
  
  require_once '../dbconfig/db.php';
  function display_data(){
    global $dbconn;
    $query = "SELECT * FROM users ORDER BY score DESC, games_won DESC, tie DESC";
    $result = pg_query($dbconn,$query);
    return $result;
  }

?>