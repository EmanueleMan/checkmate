<?php
    // Connessione al database PostgreSQL
    $dbconn = pg_connect("host=localhost port=5432 dbname=Checkmate 
                            user=postgres password=admin") 
                            or die('Could not connect: ' . pg_last_error());

    //$user = $_POST["utente"];
    $user = $_POST['utente'];
    // Query SQL per creare la tabella
    $query = "DELETE FROM partite WHERE idutente='$user'";

    // Esecuzione della query
    $result = pg_query($dbconn, $query);

    if ($result) {
    } else {
        echo "Errore durante l'aggiunta dei valori: " . pg_last_error($dbconn);
    }
    // Chiusura della connessione al database
    pg_close($dbconn);
?>