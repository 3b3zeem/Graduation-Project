import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../Service/auth-service";
import "./Login.css";

//MUI Material
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Bounce, ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [users, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorPassword, setErrorPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the endpoint
    fetch("https://localhost:7120/api/User")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) || // At least one uppercase letter
      !/[a-z]/.test(password) || // At least one lowercase letter
      !/\W/.test(password) // At least one non-alphanumeric character
    ) {
      toast.error(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one non-alphanumeric character!",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-message",
          theme: "dark",
          transition: Bounce,
        }
      );
      return;
    }

    if (!Array.isArray(users)) {
      setError("An error occurred while fetching user data.");
      return;
    }

    const userExists = users.some((user) => user.email === email);
    if (!userExists) {
      toast.error("Email not found. Please check your email address!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-message",
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      await authService.Login(email, password).then(
        () => {
          navigate("/");
          window.location.reload();
          Swal.fire({
            title: "Good job!",
            text: "Login Successful!",
            icon: "success",
          });
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast.error(
              "Email not found. Please check your email address. Or Incorrect password. Please try again.!",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: "toast-message",
                theme: "dark",
                transition: Bounce,
              }
            );
          } else {
            console.log(error);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        Copyright © MomentTravel.
        {new Date().getFullYear()}
      </Typography>
    );
  }

  return (
    <div className="background-all">
      <ToastContainer />
      <div className="Login-block">
        <div className="left_side">
          <div className="contant-above-login">
            <p className="big-text">
              Stay Connected <span id="text-effect">Always</span>
            </p>
            <p className="small-text">
              From here, your point of view regarding travel and the company
              system may change, and now you can register. We wish you happiness
              and safety.
            </p>
          </div>
          <div className="image-contant-login" />
        </div>

        <div className="Container-Login">
          <div className="Form-login-box">
            <Box
              sx={{
                my: 1,
                mx: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  error={error !== ""}
                  helperText={error}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorPass("");
                  }}
                  error={error !== "" || errorPassword !== ""}
                  helperText={errorPassword ? errorPassword : error}
                  InputProps={{
                    // عشان اخفي و اظهر الباس
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="btn-ready-login "
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to={"/forgetPassword"} variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    Don't have an account?
                    <Link to="/registration" variant="body2">
                      Sign Up
                    </Link>
                  </Grid>
                </Grid>
                <div className="signup-container">
                  <div className="separator">
                    <hr className="line" />
                    <span className="or-text">or</span>
                    <hr className="line" />
                  </div>
                  <div className="d-flex justify-content-center">
                    {/* <GoogleLogin
                      useOneTap
                      theme="filled_blue"
                      
                      onFailure={(error) =>
                        console.error("Google login failed:", error)
                      }
                    /> */}
                    <form
                      method="POST"
                      action={`http://localhost:3000/api/User/login-google`}
                    >
                      <IconButton type="submit" name="provider" value="Google">
                        {/* <Iconify icon="eva:google-fill" color="#DF3E30" /> */}Google
                      </IconButton>
                    </form>
                  </div>
                </div>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
