<?php
    session_start();
    require ('../isLogged.php');
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../style.css" />
    <title>Checkmate - Join Match</title>
</head>
<body>
    <div class="container h-100">
        <div class="d-flex flex-column justify-content-center align-items-center h-100">
            <div class="card card-room mt-5">
                <div class="card-header">
                    <h2 class="text-center text-uppercase gradient-custom-3">
                        Current Matches
                    </h2>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered text-center" id="dati">
                        <tr>
                            <th>HOST</th>
                            <th>LOBBY NAME</th>
                            <th>OPPONENT'S COLOR</th>
                            <th>JOIN</th>
                        </tr>
                    </table>
                </div>
            </div>
            <button class="btn btn-back btn-grad-2 btn-success btn-block btn-lg text-body justify-content-center" type="button"
                    onclick="location.href='../logged/index.php'"> Back </button>
        </div>
    </div>
    <script src="../jquery-3.6.4.min.js"></script>
    <script src="../function.js"></script>
    <script>
        function redirection(element){
            console.log(element);
            $.ajax({
                url: "updateTuple.php",
                type: "POST",
                data: {id: element.id},
                data: {id: element.id},
                success: function(response) {
                    if($("#"+element.id).parent()[0].parentElement.children[2].innerHTML == 'B')
                        document.cookie = "color=N; path=/";
                    else 
                        document.cookie = "color=B; path=/";
                    document.cookie = "partita=" + $("#"+element.id).parent()[0].parentElement.children[1].innerHTML + "; path=/";
                    window.location = "http://localhost:3000/partita/partita.php";
                },
                error: function(xhr) {
                    // Mostra un messaggio di errore se la chiamata AJAX fallisce
                    console.log("Errore: " + xhr.statusText);
                }
            });
        }
        setInterval(function() {
            // Effettua una chiamata AJAX al server per recuperare i dati
            $.ajax({
                url: "getMatch.php",
                type: "POST",
                dataType: "html",
                success: function(response) {
                    $("#dati").html(response);
                },
                error: function(xhr) {
                    // Mostra un messaggio di errore se la chiamata AJAX fallisce
                    console.log("Errore: " + xhr.statusText);
                }
            });
        }, 1000);
    </script>
</body>
</html>