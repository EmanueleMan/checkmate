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
                SET games_lost = games_lost + 1,
                    score = score - 25 
                WHERE username='$avv'
            ";
    $result = pg_query($dbconn, $query);
    if ($result) {
    } else {
        echo "Errore durante l'aggiunta dei valori: " . pg_last_error($dbconn);
    }

    $query = "UPDATE users
                SET games_won = games_won + 1,
                    score = score + 50
                WHERE username='$user'
            ";
    $result = pg_query($dbconn, $query);
    if ($result) {
    } else {
        echo "Errore durante l'aggiunta dei valori: " . pg_last_error($dbconn);
    }
    
    // Chiusura della connessione al database
    pg_close($dbconn);
?>