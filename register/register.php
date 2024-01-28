<?php
  if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: ./register/index.php");
  } else {
  require_once('../dbconfig/db.php');
  global $dbconn;
  }
?>

<html lang="eng">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Form</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="../style.css" />
    <link rel="stylesheet" href="../media_queries.css"/>
  </head>
<body>
<div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div
            class="row d-flex justify-content-center align-items-center h-100"
          >
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px">
                <div class="card-body p-5">
                  <?php
                    if($dbconn){
                      $email = $_POST["inputEmail"];
                      $query = "select * from users where email = $1";
                      $result = pg_query_params($dbconn,$query,array($email));
                      if ($tuple = pg_fetch_array($result, null,PGSQL_ASSOC)) {
                        echo "<h1 class='text-error-message'>You are already registered</h1> <a class='text-error-message' href=../login/index.php> Proceed to login</a>";
                      } 
                      $username = $_POST["inputUsername"];
                      $query2 = "select * from users where username = $1";
                      $result2 = pg_query_params($dbconn,$query2,array($username));
                      if ($tuple = pg_fetch_array($result2, null,PGSQL_ASSOC)) {
                        echo "<h1 class='text-error-message'>Username already taken</h1> <a class='text-error-message' href=../register/index.php> Try again </a>";
                      }
                      else {
                        $pswd = $_POST["inputPassword"] ;
                        $hash_pswd = password_hash($pswd,PASSWORD_DEFAULT);
                        $tie = 0;
                        $games_lost= 0;
                        $games_won = 0;
                        $score = 0;
                        $query3 = "insert into users (email,username,pswd,tie,games_lost,games_won,score) values ($1,$2,$3,$4,$5,$6,$7)";
                        $result = pg_query_params($dbconn,$query3,array($email,$username,$hash_pswd,$tie,$games_lost,$games_won,$score));
                        if ($result) {
                          setcookie('username',$username,time()+60*60*24*365,'/',);
                          echo "<h1 class='text-error-message'>Registration Completed!</h1> <a class='text-error-message' href=../logged/index.php?username=$username> Start your session here</a>";
                        }
                      }
                    }
                  ?>
            </div>
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
</body>
</html>