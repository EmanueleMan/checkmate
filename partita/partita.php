<?php
    session_start();
    require ('../isLogged.php');
    if(!(isset($_COOKIE['partita']))){
        header('location: ../logged/index.php');
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="./scacchiera.css">
    <link rel="stylesheet" href="../style.css">
    <script src="../function.js"></script>
    <title>Checkmate - Match</title>

</head>
<!--<body onload="creaScacchiera(); infoPezzi(); ">-->
<body>
    <div class="d-flex justify-content-center mt-5 ">
        <div class="card lead-col">
            <h1>
                <!--<script> getCookie(document.cookie.split("; ","username"))</script>*/-->
                <?php
                    $color = $_COOKIE["color"] == 'B' ? 'White' : 'Black';
                    echo "".$_COOKIE["username"]." | ".$color;
                ?>

            </h1>
        </div>
    </div>

    <div class="d-flexd align-items-center sp-around">
        <div class="card card-scacchiera card-c mt-5"  style="border-radius: 15px; font-size: medium;" id="captured">
            <div class="card-header" id="mangiati">
                <h2 class="text-center text-uppercase gradient-custom-3">
                    Captured
                  </h2>
                <div class="card-b">
                    <h4 class="text-center gradient-custom-3">White</h4>
                    <div class="grid justify-content-center" id="mangiati-bianchi">
                        
                    </div>
                </div>
                <br>
                <div class="card-b">
                    <h4 class="text-center gradient-custom-3">Black</h4>
                    <div class="grid justify-content-center" id="mangiati-neri">
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flexs justify-content-center container-s"style="max-width: 680px;" >
            <div class="scacchiera mt-5 " >
                 <div id="a8" class="cella-colorata" >
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Torre nera.png" id="tn1"  onclick="move(this.id);"></img>
                 </div>
                 <div id="b8" class="cella-neutra">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Cavallo nero.png" id="cn1" onclick="move(this.id);"></img>
                 </div>
                 <div id="c8" class="cella-colorata" >
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Alfiere nero.png" id="an1" onclick="move(this.id);"></img>
                 </div>
                 <div id="d8" class="cella-neutra">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Regina nera.png" id="qn1" onclick="move(this.id);"></img>
                 </div>
                 <div id="e8" class="cella-colorata">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Re nero.png" id="kn1" onclick="move(this.id);"></img>
                 </div>
                 <div id="f8" class="cella-neutra">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Alfiere nero.png" id="an2" onclick="move(this.id);"></img>
                 </div>
                 <div id="g8" class="cella-colorata">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Cavallo nero.png" id="cn2" onclick="move(this.id);"></img>
                 </div>
                 <div id="h8" class="cella-neutra">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Torre nera.png" id="tn2" onclick="move(this.id);"></img>
                 </div>
                 <div id="a7" class="cella-neutra">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Pedone nero.png" id="pn1" onclick="move(this.id);"></img>
                 </div>
                 <div id="b7" class="cella-colorata">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Pedone nero.png" id="pn2" onclick="move(this.id);"></img>
                 </div>
                 <div id="c7" class="cella-neutra">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Pedone nero.png" id="pn3" onclick="move(this.id);"></img>
                 </div>
                 <div id="d7" class="cella-colorata">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Pedone nero.png" id="pn4" onclick="move(this.id);"></img>
                 </div>
                 <div id="e7" class="cella-neutra">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Pedone nero.png" id="pn5" onclick="move(this.id);"></img>
                 </div>
                 <div id="f7" class="cella-colorata">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Pedone nero.png" id="pn6" onclick="move(this.id);"></img>
                 </div>
                 <div id="g7" class="cella-neutra">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Pedone nero.png" id="pn7" onclick="move(this.id);"></img>
                 </div>
                 <div id="h7" class="cella-colorata">
                     <img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Pedone nero.png" id="pn8" onclick="move(this.id);"></img>
                 </div>
                 <div id="a6" class="cella-colorata"></div>
                 <div id="b6" class="cella-neutra"></div>
                 <div id="c6" class="cella-colorata"></div>
                 <div id="d6" class="cella-neutra"></div>
                 <div id="e6" class="cella-colorata"></div>
                 <div id="f6" class="cella-neutra"></div>
                 <div id="g6" class="cella-colorata"></div>
                 <div id="h6" class="cella-neutra"></div>
                 <div id="a5" class="cella-neutra"></div>
                 <div id="b5" class="cella-colorata"></div>
                 <div id="c5" class="cella-neutra"></div>
                 <div id="d5" class="cella-colorata"></div>
                 <div id="e5" class="cella-neutra"></div>
                 <div id="f5" class="cella-colorata"></div>
                 <div id="g5" class="cella-neutra"></div>
                 <div id="h5" class="cella-colorata"></div>
                 <div id="a4" class="cella-colorata"></div>
                 <div id="b4" class="cella-neutra"></div>
                 <div id="c4" class="cella-colorata"></div>
                 <div id="d4" class="cella-neutra"></div>
                 <div id="e4" class="cella-colorata"></div>
                 <div id="f4" class="cella-neutra"></div>
                 <div id="g4" class="cella-colorata"></div>
                 <div id="h4" class="cella-neutra"></div>
                 <div id="a3" class="cella-neutra">
                    <!--<label style="position: absolute; left: 0px; bottom: 0px;" for="a3">3</label>-->
                 </div>
                 <div id="b3" class="cella-colorata"></div>
                 <div id="c3" class="cella-neutra"></div>
                 <div id="d3" class="cella-colorata"></div>
                 <div id="e3" class="cella-neutra"></div>
                 <div id="f3" class="cella-colorata"></div>
                 <div id="g3" class="cella-neutra"></div>
                 <div id="h3" class="cella-colorata"></div>
                 <!--<div style="position: relative;" id="a2" class="cella-colorata">-->
                 <div style="position: relative;" id="a2" class="cella-colorata">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Pedone Bianco.png" id="pw1" onclick="move(this.id);"></img>
                     
                     <!--<label style="position: absolute; left: 0px; bottom: 0px;" for="a2">a2</label>-->
                 </div>
                 <div id="b2" class="cella-neutra">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Pedone Bianco.png" id="pw2" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="c2" class="cella-colorata">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Pedone Bianco.png" id="pw3" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="d2" class="cella-neutra">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Pedone Bianco.png" id="pw4" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="e2" class="cella-colorata">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Pedone Bianco.png" id="pw5" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="f2" class="cella-neutra">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Pedone Bianco.png" id="pw6" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="g2" class="cella-colorata">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Pedone Bianco.png" id="pw7" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="h2" class="cella-neutra">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Pedone Bianco.png" id="pw8" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="a1" class="cella-neutra">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Torre bianca.png" id="tw1" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="b1" class="cella-colorata">
                     
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Cavallo bianco.png" id="cw1" onclick="move(this.id);"></img>
                 </div>
                 <div id="c1" class="cella-neutra">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Alfiere Bianco.png" id="aw1" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="d1" class="cella-colorata">
                     <!--<img class="pezzo-nero" src="../Immagini/Pezzi/Neri/Cavallo nero.png" id="cn1" onclick="move(this.id);"></img>-->
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Regina bianca.png" id="qw1" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="e1" class="cella-neutra">
                     
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Re bianco.png" id="kw1" onclick="move(this.id);"></img>
                 </div>
                 <div id="f1" class="cella-colorata">
                     
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Alfiere Bianco.png" id="aw2" onclick="move(this.id);"></img>
                 </div>
                 <div id="g1" class="cella-neutra">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Cavallo bianco.png" id="cw2" onclick="move(this.id);"></img>
                     
                 </div>
                 <div id="h1" class="cella-colorata">
                     <img class="pezzo-bianco" src="../Immagini/Pezzi/Bianchi/Torre bianca.png" id="tw2" onclick="move(this.id);"></img>
                     
                 </div>
             </div>
        </div>
        <div class="card card-c card-h  mt-5"  style="border-radius: 15px;" id="history">
            <div class="" id="dettagli">
                <h2 class="text-center text-uppercase gradient-custom-3"> History </h2>
                    <div id="cronologia-mosse">
                    </div>
                <!--<div class="btn-group">
                </div>-->
                    
            </div>
        </div>
    </div>
    <div class="d-flex-b">
    <input class="btn btn-match btn-grad-2 btn-block btn-lg text-body" id="tie" style="text-align: center;" type="submit" value="Tie">
    <input class="btn btn-match btn-grad-4 btn-block btn-lg text-body" id="leave" style="text-align: center;" type="submit" value="Leave">
    </div>

    <div class="modal" id="modale-perdita">
        <div class="modal-content">
            <h4>You lost the game!</h4>
            <a href="http://localhost:3000/logged/index.php">Return to lobby</a>
        </div>
    </div>
    <div class="modal" id="modale-vincita">
        <div class="modal-content">
            <h4>You won the game!</h4>
            <a href="http://localhost:3000/logged/index.php">Return to lobby</a>
        </div>
    </div>
    <div class="modal" id="modale-attesa-pareggio">
        <div class="modal-content">
            <p>Wait for your opponent's response</p>
        </div>
    </div>
    <div class="modal" id="modale-pareggio-si">
        <div class="modal-content align-items-center">
            <p>Your opponent accepted</p>
            <button class="btn-grad-2 btn-modal" id="goHome"> Ok </button>
        </div>
    </div>
    <div class="modal" id="modale-pareggio-no">
        <div class="modal-content align-items-center">
            <p>Your opponent refused</p>
            <button class="btn-grad-2 btn-modal" id="continua"> Ok </button>
        </div>
    </div>
    <div class="modal" id="modale-vinta-per-abbandono">
        <div class="modal-content align-items-center">
            <p>Your opponent left the match</p>
            <p>You won the game!</p>
            <button class="btn-grad-2 btn-modal" id="abbandono"> Ok </button>
        </div>
    </div>
    <div class="modal" id="modale-abbandona">
        <div class="modal-content align-items-center">
            <h6>Are you sure to leave?</h6>
            <p>You will automatically lose the match!</p>
            <button class="btn-grad-2 btn-modal" id="yes">Yes</button>
            <button class="btn-grad-2 btn-modal" id="no" style="margin-top: 10px">No</button>
        </div>
    </div>
    <div class="modal" id="modale-proponi-pareggio">
        <div class="modal-content align-items-center">
            <h6>Opponent is calling Tie</h6>
            <p>Do you accept?</p>
            <button class="btn-grad-2 btn-modal" id="pareggioSi">Yes</button>
            <button class="btn-grad-2 btn-modal" id="pareggioNo" style="margin-top: 10px">No</button>
        </div>
    </div>
    <div class="modal" id="modale-promozione">
        <div class="modal-content">
            <p>Wait for your opponent to choose a piece</p>
        </div>
    </div>
    <div class="modal" id="modale-nero">
        <div class="modal-content">
            <p>Good Job! Choose a piece:</p>
            <div class="pezzi-da-scegliere">
                <img class="pezzo" id="an" src="../Immagini/Pezzi/Neri/Alfiere nero.png" onclick = "sostituisciPezzo(this.id);"></img>
                <img class="pezzo" id="cn" src="../Immagini/Pezzi/Neri/Cavallo nero.png" onclick = "sostituisciPezzo(this.id);"></img>
                <img class="pezzo" id="qn" src="../Immagini/Pezzi/Neri/Regina nera.png"  onclick = "sostituisciPezzo(this.id);"></img>
                <img class="pezzo" id="tn" src="../Immagini/Pezzi/Neri/Torre nera.png"   onclick = "sostituisciPezzo(this.id);"></img>
            </div>
        </div>
    </div>
    <div class="modal" id="modale-bianco">
        <div class="modal-content">
            <p>Good Job! Choose a piece:</p>
            <div class="pezzi-da-scegliere">
                <img class="pezzo" id="aw" src="../Immagini/Pezzi/Bianchi/Alfiere Bianco.png" onclick = "sostituisciPezzo(this.id);"></img>
                <img class="pezzo" id="cw" src="../Immagini/Pezzi/Bianchi/Cavallo bianco.png" onclick = "sostituisciPezzo(this.id);"></img>
                <img class="pezzo" id="qw" src="../Immagini/Pezzi/Bianchi/Regina bianca.png"  onclick = "sostituisciPezzo(this.id);"></img>
                <img class="pezzo" id="tw" src="../Immagini/Pezzi/Bianchi/Torre bianca.png"   onclick = "sostituisciPezzo(this.id);"></img>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="./mosse.js"></script>
    <script>
        $(document).ready(function(){
            creaScacchiera();
            infoPezzi();
            console.log($("#e5"));
        })

    </script>
</body>


</html>