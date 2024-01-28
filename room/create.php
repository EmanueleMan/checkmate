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
    <title>Checkmate - Create Lobby </title>
</head>
<body>
        <div class="container h-100">
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
                <div class="card card-create p-2">
                    <div style="border:15px;">
                        <h1 class="text-center">Create Lobby</h1>
                        <div class="container d-flex justify-content-center">
                            <p>Choose a color:</p>
                        </div>
                        <div class="container-create">
                            <div class="d-flex">
                            <input class="color" name="choseColor" type="radio" value="N">Black</button>
                            </div>
                            <div class="d-flex">
                            <input class="color" name="choseColor" type="radio" value="B">White</button>
                            </div>
                        </div>
                        <div class="container-create">
                            <label for="matchName">Match Name: </label>
                        </div>
                        <div class="container-create">
                            <input type="text" id="matchName" required></input>
                        </div>
                        <div class="container-create">
                            <button class="btn btn-success" id="create"> Create Match </button>
                        </div>
                    </div>
                </div>
                        <button
                        class="btn btn-grad-3 btn-back btn-success btn-block btn-lg text-body justify-content-center"
                        type="button"
                        onclick="location.href='../logged/index.php'"
                      > Back </button>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal">
        <div class="modal-content align-items-center" id="modal-content">
            <p>Wait until someone joins the match</p>
            <button class="btn-modal btn-grad-2" onclick="deleteTuple();"> Cancel </button>
        </div>
    </div>
    <div class="modal" id="modalColor">
        <div class="modal-content align-items-center" id="modal-content">
            <p>You must pick a color</p>
            <button class="btn-modal btn-grad-2" onclick="updateColor()"> Ok </button>
        </div>
    </div>
    <div class="modal" id="modalMatch">
        <div class="modal-content align-items-center" id="modal-content">
            <p>You must enter a match name </p>
            <button class="btn-modal btn-grad-2" onclick="updateMatch()"> Ok </button>
        </div>
    </div>
    <script src="../jquery-3.6.4.min.js"></script>
    <script src="../function.js"></script>
    <script>
        function updateMatch(){
            $("#modalMatch").css("display", "none");
        }
        function updateColor(){
            $("#modalColor").css("display", "none");
        }
        function deleteTuple() {
            console.log(getCookie(document.cookie.split('; '), "username"));
            $.ajax({
                    url: "delete.php",
                    type: "POST",
                    data: {utente: getCookie(document.cookie.split('; '), "username")},
                    success: function() {
                        console.log("Successo");
                    },
                    error: function() {
                        console.log("Errore");
                    }
                });
            $("#modal").css("display", "none");
        }

        $(document).ready(function(){
            $("#create").click(function() {
                var flag = false;
                var colore;
                var radio = $(".color");
                console.log(radio);
                for (let i = 0; i < radio.length; i++) {
                    const element = radio[i];
                    if (element.checked) {
                        flag = true;
                        colore = element.value;
                        document.cookie = "color=" + colore + "; path=/";
                        console.log(element.value)
                    }
                }
                if (!flag) { 
                    $("#modalColor").css("display", "block");
                    return;
                }
                var username = getCookie(document.cookie.split('; '), "username");
                console.log(username);
                var nome = $("#matchName").val();
                if (nome == "") {
                    $("#modalMatch").css("display", "block");
                    return;
                }
                document.cookie = "partita=" + nome + "; path=/";
                $.ajax({
                    url: "createMatch.php",
                    type: "POST",
                    data: {id: username, nome: nome, colore: colore, numero:1 },
                    success: function() {
                        console.log("Successo");
                    },
                    error: function() {
                        console.log("Errore");
                    }
                });
                $("#modal").css("display", "block");
                setInterval(function() {
                // Effettua una chiamata AJAX al server per recuperare i dati
                    $.ajax({
                        url: "checkRedirect.php",
                        type: "POST",
                        data: {id: username},
                        success: function(response) {
                            console.log(response)
                            if (response){
                                console.log("pronto");
                                window.location = "http://localhost:3000/partita/partita.php";
                                $("#modal").css("display", "none");
                                $.ajax({
                                    url: "delete.php",
                                    type: "POST",
                                    data: {utente: username}
                                });
                            } 
                        },
                        error: function(xhr) {
                            // Mostra un messaggio di errore se la chiamata AJAX fallisce
                            console.log("Errore: " + xhr.statusText);
                        }
                    });
                }, 1000);
            });
        })
        </script>
</body>
</html>