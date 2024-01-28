<?php
    // Connessione al database PostgreSQL
    //require '../dbconfig/db.php';
    $dbconn = pg_connect("host=localhost port=5432 dbname=Checkmate 
                                user=postgres password=admin") 
                                or die('Could not connect: ' . pg_last_error());

    $user = $_POST["id"];
    // Query SQL per creare la tabella
    $query = "SELECT * FROM partite WHERE idutente='$user'";
    $flag = false;
    // Esecuzione della query
    $result = pg_query($dbconn, $query);
    while ($tuple=pg_fetch_array($result, null, PGSQL_ASSOC)){
        foreach ($tuple as $colname => $value) {
            if ($colname == "num_player" && $value == 2 ) {
                $flag = true;
                echo $flag;
            }
        }
    }
    if ($result) {
    } else {
        echo "Errore durante l'aggiunta dei valori: " . pg_last_error($dbconn);
    }
    // Chiusura della connessione al database
    pg_close($dbconn);
?>