<?php 
  if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: ./login/index.php");
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
    <title>Login Form</title>
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
                    if ($dbconn){
                      $username =$_POST['inputUsername'];
                      $query = "SELECT * from users where username=$1";
                      $result = pg_query_params($dbconn,$query,array($username));
                      if (!($line = pg_fetch_array($result, null,PGSQL_ASSOC))) {
                        echo "<h1 class='text-error-message'>Username and password not matching in our database.</h1> <a class='text-error-message' href=../login/index.php> Try again </a>";
                          }
                      else{
                      $pswd =$_POST['inputPassword'];
                      $query2 = "SELECT * from users where username=$1";
                      $result = pg_query_params($dbconn,$query2,array($username)); 
                      $hash = $line['pswd'];
                        if (!(password_verify($pswd,$hash))) {
                          echo "<h1 class='text-error-message'>Username and password not matching in our database.</h1> <a class='text-error-message' href=../login/index.php>  Try again</a>";
                        
                        }
                          else {
                            setcookie('username',$username,time()+60*60*24*365,'/');
                            header("Location: /logged/index.php?username=$username");
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