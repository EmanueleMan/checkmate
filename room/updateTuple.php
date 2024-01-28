<?php
    // Connessione al database PostgreSQL
    $dbconn = pg_connect("host=localhost port=5432 dbname=Checkmate 
                            user=postgres password=admin") 
                            or die('Could not connect: ' . pg_last_error());

    $user = $_POST["id"];
    // Query SQL per creare la tabella
    $query = "UPDATE partite
              SET num_player = 2
              WHERE idutente = '$user'";

    // Esecuzione della query
    $result = pg_query($dbconn, $query);

    if ($result) {
    } else {
        echo "Errore durante l'aggiunta dei valori: " . pg_last_error($dbconn);
    }
    // Chiusura della connessione al database
    pg_close($dbconn);
?>