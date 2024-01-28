
<?php
    // Connessione al database PostgreSQL
    $dbconn = pg_connect("host=localhost port=5432 dbname=Checkmate 
                            user=postgres password=admin") 
                            or die('Could not connect: ' . pg_last_error());
    // Query SQL per creare la tabella
    $query = "SELECT * FROM partite";
    // Esecuzione della query
    echo "<table class='table table-bordered text-center'>";
    $result = pg_query($dbconn, $query);
    $flag = true;
    //stampa colonne
    echo "<tr>";
        echo "<th> HOST </th>";
        echo "<th> LOBBY NAME </th>";
        echo "<th> OPPONENT'S COLOR </th>";
        echo "<th> JOIN </th>";
    echo "</tr>";
    $id = "";
    $name = "";
    while ($tuple=pg_fetch_array($result, null, PGSQL_ASSOC)){
        echo "<tr>";
        foreach ($tuple as $colname => $value) {
            if ($colname != "colopponent" && $colname != "num_player" ) {
                echo "<td>";
                print $value;
                echo "</td>";
            }
            if ($colname == "idutente")
                $id = $value;
        }
        echo "<td><button class='btn-join' id='$id' onclick='redirection($id);'> Join Match </button></td>";
    }
    echo "</table>";
    if (!$result) {
        echo "Errore durante l'aggiunta dei valori: " . pg_last_error($dbconn);
    }
    // Chiusura della connessione al database
    pg_close($dbconn);
?>