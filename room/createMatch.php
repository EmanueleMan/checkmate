<?php
    // Connessione al database PostgreSQL
    $dbconn = pg_connect("host=localhost port=5432 dbname=Checkmate 
                            user=postgres password=admin") 
                            or die('Could not connect: ' . pg_last_error());

    $query = "SELECT email FROM users";
    $result = pg_query($dbconn, $query);
    echo "<tabel>";
    while ($tuple=pg_fetch_array($result, null, PGSQL_ASSOC)){
        echo "<tr>";
        foreach ($tuple as $colname => $value) {
            echo "<td>";
            print $value;
            echo "</td>";
        }
        echo "</tr>";
        echo "<br>";
    }
    echo "</tabel>";
    
    $id = $_POST["id"];
    $nome = $_POST["nome"];
    $owner = ($_POST["colore"] == 'B') ? 'B' : 'N' ;
    $opponent = ($owner == 'B') ? 'N' : 'B' ;
    $numero = $_POST["numero"];

    // Query SQL per creare la tabella
    $query = "INSERT INTO partite(
        idutente, nomepar, colowner, colopponent, num_player)
        VALUES ($1, $2, $3, $4, $5);";

    // Esecuzione della query
    $result = pg_query_params($dbconn, $query, array($id, $nome, $owner, $opponent, $numero));
    if ($result) {
        echo "valori aggiunti con successo.";
    } else {
        echo "Errore durante l'aggiunta dei valori: " . pg_last_error($dbconn);
    }

    // Chiusura della connessione al database
    pg_close($dbconn);
?>