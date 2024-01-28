<?php
  require ('../isLogged.php');
  require_once ('functions.php');
  $result = display_data();
  if (isset($_COOKIE['partita'])){
    setcookie("partita","",time()-3600,"/");
    setcookie("color","",time()-3600,"/");
  }
?>
<html lang="eng">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <title>Checkmate - Hub</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <div
      class="d-flex header-logged container-log align-items-center justify-content-center gradient-custom-3 mx-auto"
    >
      <div class="card" style="border-radius: 15px">
        <h3 class="text-uppercase text-center p-3">
          <?php
            if (!isset($_SESSION["username"])){
              echo "Welcome, ".$_GET["username"];
              $_SESSION["username"]= $_GET["username"];
            } else {
              echo "Welcome back, ". $_SESSION["username"];
            }
          ?>
        </h3>
      </div>
    </div>
    <div class="container-log mx-auto">
      <div class="d-flex justify-content-center container-log ">
        <div class="d-grid d-grid-logged gap-1 col-5">
          <button
            class="btn btn-grad-2 btn-game btn-success btn-block btn-lg text-body justify-content-center"
            type="button"
            onclick="location.href='../room/create.php'"
          >
          New Game 
          </button>
          <button
            class="btn btn-grad-2 btn-game btn-success btn-block btn-lg text-body justify-content-center"
            type="button"
            onclick="location.href='../room/room.php'"
          >
          Join Game
          </button>
          <button
            type="button"
            name="logout-button"
            id="logout"
            class="btn btn-grad-2 btn-game btn-success btn-block btn-lg text-body justify-content-center"
            onclick= "logout()"
          >
          Log Out  
          </button>
        </div>
      </div>
      <div class="d-flex container-log">
        <div class="d-grid d-grid-logged gap-1 col-5 justify-content-end mx-auto">
          <div class="card lead-col mt-5">
            <div class="card-header lead-col">
              <h2 class="text-center text-uppercase gradient-custom-3">
                Leaderboard
              </h2>
            </div>
            <div class="card-body table-responsive">
              <table class="table table-bordered text-center" style="border-color:black">
                <tr>
                <th>USERNAME</th>
                <th>WIN</th>
                <th>LOSE</th>
                <th>TIE</th>
                <th>SCORE</th>
                </tr>
                <tr>
                  <?php
                  $counter = 0;
                  while($counter <=9){
                    if($row=pg_fetch_assoc($result)){
                      $counter++;
                  ?>
                    <th><?php echo $row['username'];?></th>
                    <td><?php echo $row['games_won'];?></td>
                    <td><?php echo $row['games_lost'];?></td>
                    <td><?php echo $row['tie'];?></td>
                    <td><?php echo $row['score'];?></td>
                </tr>
                    <?php 
                    }
                  else {
                    $counter++;
                    ?>
                  <tr>
                    <th><?php echo '-' ?></th>
                    <th><?php echo '-' ?></th>
                    <th><?php echo '-' ?></th>
                    <th><?php echo '-' ?></th>
                    <th><?php echo '-' ?></th>

                  </tr>
                  <?php
                  }
                }
                  ?>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script
      src=" https://code.jquery.com/jquery-3.6.4.min.js"
      integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
      crossorigin="anonymous"
    ></script>
    <script src="./main.js"></script>
  </body>
</html>
