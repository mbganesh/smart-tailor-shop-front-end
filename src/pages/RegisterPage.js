import { React, useState, useEffect } from "react";
import {
  Button,
  InputAdornment,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Alert } from "@material-ui/lab";
import { useNavigate } from "react-router";

import swal from "sweetalert2";
import axios from "axios";
import Helpers from "../Helpers";
import store from "store2";
import startupLogo from "../images/login/startupLogo.png";
import { Fonts, Colors, APIClient } from "../constants";
import AppBarGeneral from "../components/AppBarGeneral";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FooterLandingPage from "../components/FooterLandingPage";

const mainColor = Colors.HOME_MAIN_COLOR;
const lightColor = "#ffe6f0";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [basicDetails, setBasicDetails] = useState({
    name: { text: "", isValid: false, errorMessage: "" },
    email: { text: "", isValid: false, errorMessage: "" },
    mobno: { text: "", isValid: false, errorMessage: "" },
    password: { text: "", isValid: false, errorMessage: "" },
    showPassword: false,
  });

  const [shopDetails, setShopDetails] = useState({
    shopname: { text: "", isValid: false, errorMessage: "" },
    shopmobno: { text: "", isValid: false, errorMessage: "" },
    shopaddress: { text: "", isValid: false, errorMessage: "" },
  });

  const [verifyData, setVerifyData] = useState({});

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Basic Details", "Shop Details", "Verify & Submit"];

  const handleClickShowPassword = () => {
    console.log("firstff");
    setBasicDetails({
      ...basicDetails,
      showPassword: !basicDetails.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangePassword = (e) => {
    setBasicDetails((prevStyle) => ({
      ...prevStyle,
      password: { ...prevStyle.password, text: e.target.value },
    }));
    if (basicDetails.password.text) {
      return false;
    } else {
      setBasicDetails((prevStyle) => ({
        ...prevStyle,
        password: { ...prevStyle.password, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeName = (e) => {
    setBasicDetails((prevStyle) => ({
      ...prevStyle,
      name: { ...prevStyle.name, text: e.target.value },
    }));
    if (basicDetails.name.text) {
      return false;
    } else {
      setBasicDetails((prevStyle) => ({
        ...prevStyle,
        name: { ...prevStyle.name, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeEmail = (e) => {
    setBasicDetails((prevStyle) => ({
      ...prevStyle,
      email: {
        ...prevStyle.email,
        text: e.target.value,
        errorMessage: "",
        isValid: false,
      },
    }));
    if (basicDetails.email.text) {
      return false;
    } else {
      setBasicDetails((prevStyle) => ({
        ...prevStyle,
        email: { ...prevStyle.email, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeMobno = (e) => {
    setBasicDetails((prevStyle) => ({
      ...prevStyle,
      mobno: {
        ...prevStyle.mobno,
        text: e.target.value,
        isValid: false,
        errorMessage: "",
      },
    }));
    if (basicDetails.mobno.text) {
      return false;
    } else {
      setBasicDetails((prevStyle) => ({
        ...prevStyle,
        mobno: { ...prevStyle.mobno, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeShopName = (e) => {
    setShopDetails((prevStyle) => ({
      ...prevStyle,
      shopname: { ...prevStyle.shopname, text: e.target.value },
    }));
    if (shopDetails.shopname.text) {
      return false;
    } else {
      setShopDetails((prevStyle) => ({
        ...prevStyle,
        shopname: { ...prevStyle.shopname, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeShopMobNo = (e) => {
    setShopDetails((prevStyle) => ({
      ...prevStyle,
      shopmobno: {
        ...prevStyle.shopmobno,
        text: e.target.value,
        isValid: false,
        errorMessage: "",
      },
    }));
    if (shopDetails.shopmobno.text) {
      return false;
    } else {
      setShopDetails((prevStyle) => ({
        ...prevStyle,
        shopmobno: { ...prevStyle.shopmobno, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeshopAddress = (e) => {
    setShopDetails((prevStyle) => ({
      ...prevStyle,
      shopaddress: { ...prevStyle.shopaddress, text: e.target.value },
    }));
    if (shopDetails.shopaddress.text) {
      return false;
    } else {
      setShopDetails((prevStyle) => ({
        ...prevStyle,
        shopaddress: {
          ...prevStyle.shopaddress,
          isValid: false,
          errorMessage: "",
        },
      }));
    }
  };

  const isValidBasicDetails = () => {
    let checkPost = false;

    let registerValuesKeys = Object.keys(basicDetails);
    // let registerValuesKeys = Object.keys(registerValues);
    console.log(registerValuesKeys);

    for (let item of registerValuesKeys) {
      if (basicDetails[item].text === "") {
        setBasicDetails((prevStyle) => ({
          ...prevStyle,
          [item]: {
            ...prevStyle[item],
            isValid: true,
            errorMessage: "Please Enter Your " + item,
          },
        }));
        checkPost = false;
        break;
      } else if (item === "mobno" && basicDetails[item].text.length < 10) {
        setBasicDetails((prevStyle) => ({
          ...prevStyle,
          [item]: {
            ...prevStyle[item],
            isValid: true,
            errorMessage: "Please Enter Your " + item,
          },
        }));
        checkPost = false;
        break;
      } else if (item === "email" && !validMail(basicDetails[item].text)) {
        setBasicDetails((prevStyle) => ({
          ...prevStyle,
          [item]: {
            ...prevStyle[item],
            isValid: true,
            errorMessage: "Please Enter Your Valid " + item,
          },
        }));
        checkPost = false;
        break;
      } else if (item === "email" && validMail(basicDetails[item].text)) {
        let splittedEmail = basicDetails[item].text.split("@")[1];
        console.log(splittedEmail);
        if (splittedEmail !== "gmail.com") {
          setBasicDetails((prevStyle) => ({
            ...prevStyle,
            [item]: {
              ...prevStyle[item],
              isValid: true,
              errorMessage:
                "Please Enter Your Gmail Only. Supports only Gmail Accounts ",
            },
          }));
          checkPost = false;
          break;
        }
      } else {
        checkPost = true;
      }
    }

    return checkPost;
  };

  const isValidShopDetails = () => {
    let checkPost = false;

    let registerValuesKeys = Object.keys(shopDetails);
    // let registerValuesKeys = Object.keys(registerValues);
    console.log(registerValuesKeys);

    for (let item of registerValuesKeys) {
      if (shopDetails[item].text === "") {
        setShopDetails((prevStyle) => ({
          ...prevStyle,
          [item]: {
            ...prevStyle[item],
            isValid: true,
            errorMessage: "Please Enter Your " + item,
          },
        }));
        checkPost = false;
        break;
      } else if (item === "shopmobno" && shopDetails[item].text.length < 10) {
        setShopDetails((prevStyle) => ({
          ...prevStyle,
          [item]: {
            ...prevStyle[item],
            isValid: true,
            errorMessage: "Please Enter Your " + item,
          },
        }));
        checkPost = false;
        break;
      } else {
        checkPost = true;
      }
    }

    return checkPost;
  };

  function validMail(mail) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
      mail
    );
  }

  const showAlert = (title, text, icon) => {
    swal
      .fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      })
      .then((willWarn) => {
        if (willWarn.isConfirmed) {
          // ok
        }
      });
  };

  const onRegisterBtnClick = async () => {
    let isAllFieldEntered = isValidBasicDetails() && isValidShopDetails();

    console.log(isAllFieldEntered);
    if (isAllFieldEntered) {
      console.log({ shopDetails }, { basicDetails });
      var registrationData = {
        name: basicDetails.name.text,
        emailId: basicDetails.email.text,
        mobNo: basicDetails.mobno.text,
        password: basicDetails.password.text,
        shopName: shopDetails.shopname.text,
        shopAddress: shopDetails.shopaddress.text,
        shopMobNo: shopDetails.shopmobno.text,
      };
      console.log(registrationData);
      console.log(APIClient.API_BASE_URL);
      axios
        .post(
          APIClient.API_BASE_URL + "/registrationProcess/register",
          registrationData
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            showAlert(res.data.message, "", "success");
          } else {
            showAlert(res.data.message, "", "warning");
          }
        })
        .catch(function (error) {
          showAlert("Server Down", "", "warning");
          console.log("Server Down");
        });
    }
  };

  const handleBasicNextBtn = () => {
    //
    if (isValidBasicDetails()) {
      setActiveStep((prev) => prev + 1);
    } else {
      console.log("is Not Valid");
    }
  };

  const handleShopNextBtn = () => {
    //
    if (isValidShopDetails()) {
      setActiveStep((prev) => prev + 1);
      let displayData = {
        Name: basicDetails.name.text,
        "Email ID": basicDetails.email.text,
        "Mobile No": basicDetails.mobno.text,
        Password: basicDetails.password.text,
        "Shop Name": shopDetails.shopname.text,
        "Shop Address": shopDetails.shopaddress.text,
        "shop Mobile No": shopDetails.shopmobno.text,
      };
      setVerifyData(displayData);
    } else {
      console.log("is Not Valid");
    }
  };

  const handleSubmitBtn = () => {
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      onRegisterBtnClick();
    }, 2000);
  };

  useEffect(() => {
    store.clearAll();
  }, []);

  return (
    <Box>
      <AppBarGeneral />
      <Stack alignItems="center">
        <Paper
          variant="outlined"
          sx={{
            mt: 5,
            mb: 5,
            width: { md: 500, xs: 350 },
            p: 5,
            boxShadow: {
              xs: "none",
              md: "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={4}
          >
            <Typography
              fontSize={{ lg: 34, md: 34, sm: 30, xs: 30 }}
              sx={{ color: Colors.MAIN_THEME_COLOR, fontWeight: "bold" }}
            >
              Create an Account
            </Typography>

            {/* StepperHead */}
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length ? (
              <Stack alignItems="center">
                <Typography
                  fontSize={{ lg: 30, md: 30, sm: 28, xs: 28 }}
                  sx={{ color: Colors.MAIN_THEME_COLOR, fontWeight: "bold" }}
                >
                  Congratulation
                </Typography>
                <br />
                <Typography
                  fontSize={{ lg: 25, md: 25, sm: 20, xs: 20 }}
                  sx={{ color: Colors.HOME_MAIN_COLOR, fontWeight: "bold" }}
                >
                  Your Registration has been Successfully
                </Typography>
                <br />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: Colors.MAIN_THEME_COLOR,
                    "&:hover": { backgroundColor: Colors.MAIN_THEME_COLOR },
                  }}
                  onClick={() => navigate("/login   ")}
                >
                  Close
                </Button>
                <br />
              </Stack>
            ) : activeStep === 0 ? (
              <>
                <TextField
                  autoComplete="off"
                  fullWidth
                  size="small"
                  label="Name"
                  variant="outlined"
                  onChange={onChangeName}
                  value={basicDetails.name.text}
                  error={basicDetails.name.isValid}
                  helperText={basicDetails.name.errorMessage}
                />
                <TextField
                  autoComplete="off"
                  fullWidth
                  size="small"
                  label="Email"
                  variant="outlined"
                  onChange={onChangeEmail}
                  value={basicDetails.email.text}
                  error={basicDetails.email.isValid}
                  helperText={basicDetails.email.errorMessage}
                />

                <TextField
                  fullWidth
                  size="small"
                  label="Mobile No"
                  variant="outlined"
                  inputProps={{ maxLength: 10 }}
                  onChange={onChangeMobno}
                  value={basicDetails.mobno.text}
                  autoComplete="off"
                  error={basicDetails.mobno.isValid}
                  helperText={basicDetails.mobno.errorMessage}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Password"
                  variant="outlined"
                  type={basicDetails.showPassword ? "text" : "password"}
                  value={basicDetails.password.text}
                  autoComplete="off"
                  onChange={onChangePassword}
                  error={basicDetails.password.isValid}
                  helperText={basicDetails.password.errorMessage}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {basicDetails.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: Colors.MAIN_THEME_COLOR,
                    "&:hover": { backgroundColor: Colors.MAIN_THEME_COLOR },
                  }}
                  onClick={() => handleBasicNextBtn()}
                >
                  Next
                </Button>
              </>
            ) : activeStep === 1 ? (
              <>
                <TextField
                  fullWidth
                  size="small"
                  label="Shop Name"
                  variant="outlined"
                  onChange={onChangeShopName}
                  value={shopDetails.shopname.text}
                  autoComplete="off"
                  error={shopDetails.shopname.isValid}
                  helperText={shopDetails.shopname.errorMessage}
                />

                <TextField
                  fullWidth
                  size="small"
                  label="Shop Phone Number"
                  variant="outlined"
                  inputProps={{ maxLength: 10 }}
                  onChange={onChangeShopMobNo}
                  value={shopDetails.shopmobno.text}
                  autoComplete="off"
                  error={shopDetails.shopmobno.isValid}
                  helperText={shopDetails.shopmobno.errorMessage}
                />

                <TextField
                  rows={4}
                  multiline
                  fullWidth
                  size="small"
                  label="Shop Address"
                  variant="outlined"
                  onChange={onChangeshopAddress}
                  value={shopDetails.shopaddress.text}
                  autoComplete="off"
                  error={shopDetails.shopaddress.isValid}
                  helperText={shopDetails.shopaddress.errorMessage}
                />
                <Stack
                  direction={"row"}
                  width="100%"
                  justifyContent="space-between"
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: Colors.DARK_THREE,
                      "&:hover": { backgroundColor: Colors.DARK_THREE },
                    }}
                    onClick={() => setActiveStep((prev) => prev - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: Colors.MAIN_THEME_COLOR,
                      "&:hover": { backgroundColor: Colors.MAIN_THEME_COLOR },
                    }}
                    onClick={() => handleShopNextBtn()}
                  >
                    Next
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Typography
                  fontSize={{ lg: 25, md: 25, sm: 20, xs: 20 }}
                  sx={{
                    color: Colors.MAIN_THEME_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  Verify Your Details
                </Typography>
                <Box sx={{ border: "1px solid #000", width: "100%" }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    textAlign="center"
                  >
                    <Typography
                      fontSize={{ lg: 25, md: 25, sm: 20, xs: 20 }}
                      sx={{
                        color: Colors.MAIN_THEME_COLOR,
                        fontWeight: "bold",
                        flex: 1,
                        borderRight: "1px solid #000",
                      }}
                    >
                      {" "}
                      Field{" "}
                    </Typography>

                    <Typography
                      fontSize={{ lg: 25, md: 25, sm: 20, xs: 20 }}
                      sx={{
                        color: Colors.MAIN_THEME_COLOR,
                        fontWeight: "bold",
                        flex: 1,
                      }}
                    >
                      {" "}
                      Data{" "}
                    </Typography>
                  </Stack>
                  {Object.keys(verifyData).map((obj) => (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      borderTop="1px solid #000"
                    >
                      <Typography
                        fontSize={{ lg: 20, md: 20, sm: 18, xs: 18 }}
                        sx={{
                          color: Colors.MAIN_THEME_COLOR,
                          paddingLeft: 2,
                          flex: 1,
                          borderRight: "1px solid #000",
                        }}
                      >
                        {obj}
                      </Typography>

                      <Typography
                        fontSize={{ lg: 20, md: 20, sm: 18, xs: 18 }}
                        sx={{
                          color: Colors.MAIN_THEME_COLOR,
                          paddingLeft: 2,
                          flex: 1,
                        }}
                      >
                        {verifyData[obj]}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
                {/* <Button
                  onClick={onRegisterBtnClick}
                  fullWidth
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: Colors.MAIN_THEME_COLOR,
                    ":hover": {
                      bgcolor: Colors.MAIN_THEME_COLOR,
                    },
                  }}
                >
                  Register
                </Button> */}

                <Stack
                  direction={"row"}
                  width="100%"
                  justifyContent="space-between"
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: Colors.DARK_THREE,
                      "&:hover": { backgroundColor: Colors.DARK_THREE },
                    }}
                    onClick={() => setActiveStep((prev) => prev - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: Colors.MAIN_THEME_COLOR,
                      "&:hover": { backgroundColor: Colors.MAIN_THEME_COLOR },
                    }}
                    onClick={() => handleSubmitBtn()}
                  >
                    Submit & Finish
                  </Button>
                </Stack>
              </>
            )}

            <Stack direction={"row"}>
              <Typography>Already have an Account?</Typography>
              <Typography
                onClick={() => {
                  navigate("/login");
                }}
                ml={1}
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: Colors.MAIN_THEME_COLOR,
                }}
              >
                Login
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <FooterLandingPage />
    </Box>
  );
}
