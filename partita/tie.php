<?php
    // Connessione al database PostgreSQL
    //require '../dbconfig/db.php';
    $dbconn = pg_connect("host=localhost port=5432 dbname=Checkmate 
                                user=postgres password=admin") 
                                or die('Could not connect: ' . pg_last_error());

    $user = $_POST["user"];
    $avv = $_POST["avv"];
    // Query SQL per creare la tabella
    $query = "UPDATE users
                SET tie = tie + 1  
                WHERE username='$user' OR username='$avv'
            ";
    $result = pg_query($dbconn, $query);
    if ($result) {
    } else {
        echo "Errore durante l'aggiunta dei valori: " . pg_last_error($dbconn);
    }

    // Chiusura della connessione al database
    pg_close($dbconn);
?>