<?php
    session_start();
    setcookie("username","",time()-3600,"/");
    setcookie("PHPSESSID","",time()-3600,"/");
?>
<html lang="eng">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Checkmate - Login</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="../style.css" />
  </head>

  <body>
      <div class="d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div
            class="row d-flex justify-content-center align-items-center h-100"
          >
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px">
                <div class="card-body">
                  <h2 class="text-uppercase text-center mb-5">Login</h2>

                  <form
                    id="login-form"
                    method="POST"
                    name="login"
                    action="login.php"
                  >
                    <div class="form-outline mb-4">
                      <input
                        type="text"
                        id="usernameBox"
                        name="inputUsername"
                        class="form-control form-control-lg"
                        required
                      />
                      <label class="form-label" for="usernameBox"
                        >Username</label
                      >
                    </div>
                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="passwordBox"
                        name="inputPassword"
                        class="form-control form-control-lg"
                        required
                      />
                      <label class="form-label" for="passwordBox"
                        >Password</label
                      >
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        type="submit"
                        name="login-button"
                        id="login"
                        class="btn btn-success btn-block btn-lg text-body "
                      >
                        Login
                      </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Don't have an account yet?
                      <a
                        href="../register/index.php"
                        class="fw-bold text-body"
                        ><u>Register here</u></a
                      >
                    </p>
                  </form>
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
