
<html lang="eng">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Checkmate - Register</title>
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
  <div class="container reg-height">
            <div class="d-flex flex-column justify-content-center align-items-center reg-height">
              <div class="card col-xl-6 col-lg-8 col-md-8 col-sm-8" style="border-radius: 15px">
                <div class="card-body ">
                  <h2 class="text-uppercase text-center mb-5">Register</h2>

                  <form id="register-form" method="POST" action="register.php" onclick="">
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
                        type="email"
                        id="emailBox"
                        name="inputEmail"
                        class="form-control form-control-lg"
                        pattern="(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                        required
                      />
                      <label class="form-label" for="emailBox">Email</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="passwordBox"
                        required
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        class="form-control form-control-lg"
                        name="inputPassword"
                        onchange="validatePassword()"
                        onfocus="showHint()"
                        onblur="hideHint()"
                      />
                      <i class="fa fa-eye" id="hide"></i>
                      <i class="fa fa-eye" id="show"></i>
                      <label
                        id="passwordLabel"
                        class="form-label"
                        for="passwordBox"
                        >Password</label
                      >
                      <p id="hint" class="passwordReq rounded hidden">
                        Password must contain at least one number, one uppercase
                        letter, one lowercase letter, and be at least 8
                        characters long.
                      </p>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="confirmPasswordBox"
                        class="form-control form-control-lg"
                        onblur="validateRepeat()"
                        required
                      />
                      
                      <label
                        id="repeatLabel"
                        class="form-label"
                        for="confirmPasswordBox"
                        >Confirm password</label
                      >
                    </div>
                    <div class="d-flex justify-content-center">
                      <input
                        type="submit"
                        name="register"
                        id="register"
                        value="Register"
                        class="btn btn-success btn-block btn-lg text-body"
                        required
                      />
                    </div>
                    <div id="tos-label" class="tos-label hidden">
                      You must agree with the Terms of service
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Already registered?
                      <a href="../login/index.php" class="fw-bold text-body"
                        ><u>Login here</u></a
                      >
                    </p>
                  </form>
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
