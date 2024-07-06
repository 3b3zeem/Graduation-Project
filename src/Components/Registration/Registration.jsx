import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.scoped.css";
import authService from "../../Service/auth-service";

//MUI Material
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import im1 from "../../im&ve/sign_up.svg";

import Swal from "sweetalert2";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import GoogleButton from "react-google-button";

function Registration() {
  const [userName, setUserName] = useState("");
  const [userError, setUserError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
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
    if (password !== confirmPassword) {
      toast.error("Password don't match!", {
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
      await authService
        .Register(
          firstName,
          lastName,
          userName,
          country,
          city,
          address,
          password,
          email
        )
        .then(
          (response) => {
            console.log("Successfully registered", response);
            Swal.fire({
              title: "Good job!",
              text: "Successfully registered!",
              icon: "success",
            });
            navigate("/login");
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      toast.error(error.response.data, {
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
    }
  };

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="registration-block">
        <div className="image-register">
          <div className="contant-above-login">
            <p className="big-text">
              Join us in <span id="text-effect">MomentTravel</span>
            </p>
            <p className="small-text">
              do not miss! Sign up for special promotions and discounts at
              companies.
            </p>
            <Grid container justifyContent="flex-start" className="already">
              <Grid item>
                Already have an account?
                <Link href="/login" variant="body2">
                  Sign In
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
                    <GoogleButton />
                  </div>
            </div>
          </div>
          <img src={im1} alt="" />
        </div>
        <div className="form-field-register">
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSignUp}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="user"
                    label="User Name"
                    name="user"
                    autoComplete="user"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {userError && <p style={{ color: "red" }}>{userError}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleShowPassword}
                            edge="end"
                            aria-label="toggle password visibility"
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm_password"
                    autoComplete="new-confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleShowConfirmPassword}
                            edge="end"
                            aria-label="toggle confirm password visibility"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="country"
                    label="Your country"
                    name="country"
                    // autoComplete="email"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="Your city"
                    name="city"
                    // autoComplete="email"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Your Address"
                    name="address"
                    // autoComplete="email"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                {confirmPasswordError && (
                  <p style={{ color: "red" }}>{confirmPasswordError}</p>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  Already have an account?
                  <Link href="/login" variant="body2">
                    Sign in
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Registration;
