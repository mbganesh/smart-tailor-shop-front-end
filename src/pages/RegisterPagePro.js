import { React, useState, useEffect } from "react";
import {
  Button,
  Stack,
  Typography,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Box,
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

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

const mainColor = Colors.HOME_MAIN_COLOR;
const lightColor = "#ffe6f0";

export default function RegisterPagePro() {
  const navigate = useNavigate();

  const registerSteps = ["Basic Details", "Shop Details", "Submit"];
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  let date = new Date();

  let addminutes = new Date(date.getTime() + 60 * 400000);

  const handleClickShowPassword = () => {
    console.log("firstff");
    setRegisterValues({
      ...registerValues,
      showPassword: !registerValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [buttonVisblity, setButtonVisblity] = useState(false);
  const [loginBtnLoading, setLoginBtnLoading] = useState(false);
  const [loginBtnText, setLoginBtnText] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => setShowPassword(!showPassword);
  // const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert1, setAlert1] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [registerValues, setRegisterValues] = useState({
    name: { text: "", isValid: false, errorMessage: "" },
    email: { text: "", isValid: false, errorMessage: "" },
    mobno: { text: "", isValid: false, errorMessage: "" },
    password: { text: "", isValid: false, errorMessage: "" },
    shopname: { text: "", isValid: false, errorMessage: "" },
    shopaddress: { text: "", isValid: false, errorMessage: "" },
    shopmobno: { text: "", isValid: false, errorMessage: "" },
    showPassword: false,
  });

  var allFieldNames = Object.keys(registerValues);
  allFieldNames.pop();

  function isNotFill(ob) {
    let isValidData = registerValues[ob].isValid;
    return isValidData;
  }
  //   allFieldNames.every(isNotFill)

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

  const onChangePassword = (e) => {
    setRegisterValues((prevStyle) => ({
      ...prevStyle,
      password: { ...prevStyle.password, text: e.target.value },
    }));
    if (registerValues.password.text) {
      return false;
    } else {
      setRegisterValues((prevStyle) => ({
        ...prevStyle,
        password: { ...prevStyle.password, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeName = (e) => {
    setRegisterValues((prevStyle) => ({
      ...prevStyle,
      name: { ...prevStyle.name, text: e.target.value },
    }));
    if (registerValues.name.text) {
      return false;
    } else {
      setRegisterValues((prevStyle) => ({
        ...prevStyle,
        name: { ...prevStyle.name, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeEmail = (e) => {
    setRegisterValues((prevStyle) => ({
      ...prevStyle,
      email: {
        ...prevStyle.email,
        text: e.target.value,
        errorMessage: "",
        isValid: false,
      },
    }));
    if (registerValues.email.text) {
      return false;
    } else {
      setRegisterValues((prevStyle) => ({
        ...prevStyle,
        email: { ...prevStyle.email, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeMobno = (e) => {
    setRegisterValues((prevStyle) => ({
      ...prevStyle,
      mobno: {
        ...prevStyle.mobno,
        text: e.target.value,
        isValid: false,
        errorMessage: "",
      },
    }));
    if (registerValues.mobno.text) {
      return false;
    } else {
      setRegisterValues((prevStyle) => ({
        ...prevStyle,
        mobno: { ...prevStyle.mobno, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeShopName = (e) => {
    setRegisterValues((prevStyle) => ({
      ...prevStyle,
      shopname: { ...prevStyle.shopname, text: e.target.value },
    }));
    if (registerValues.shopname.text) {
      return false;
    } else {
      setRegisterValues((prevStyle) => ({
        ...prevStyle,
        shopname: { ...prevStyle.shopname, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeShopMobNo = (e) => {
    setRegisterValues((prevStyle) => ({
      ...prevStyle,
      shopmobno: { ...prevStyle.shopmobno, text: e.target.value },
    }));
    if (registerValues.shopmobno.text) {
      return false;
    } else {
      setRegisterValues((prevStyle) => ({
        ...prevStyle,
        shopmobno: { ...prevStyle.shopmobno, isValid: false, errorMessage: "" },
      }));
    }
  };

  const onChangeshopAddress = (e) => {
    setRegisterValues((prevStyle) => ({
      ...prevStyle,
      shopaddress: { ...prevStyle.shopaddress, text: e.target.value },
    }));
    if (registerValues.shopaddress.text) {
      return false;
    } else {
      setRegisterValues((prevStyle) => ({
        ...prevStyle,
        shopaddress: {
          ...prevStyle.shopaddress,
          isValid: false,
          errorMessage: "",
        },
      }));
    }
  };

  function validMail(mail) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
      mail
    );
  }

  const checkAllFields = () => {
    let checkPost = false;

    let registerValuesKeys = Object.keys(registerValues);

    for (let item of registerValuesKeys) {
      if (registerValues[item].text === "") {
        setRegisterValues((prevStyle) => ({
          ...prevStyle,
          [item]: {
            ...prevStyle[item],
            isValid: true,
            errorMessage: "Please Enter Your " + item,
          },
        }));
        checkPost = false;
        break;
      } else if (item === "mobno" && registerValues[item].text.length < 10) {
        setRegisterValues((prevStyle) => ({
          ...prevStyle,
          [item]: {
            ...prevStyle[item],
            isValid: true,
            errorMessage: "Please Enter Your " + item,
          },
        }));
        checkPost = false;
        break;
      } else if (item === "email" && !validMail(registerValues[item].text)) {
        setRegisterValues((prevStyle) => ({
          ...prevStyle,
          [item]: {
            ...prevStyle[item],
            isValid: true,
            errorMessage: "Please Enter Your Valid " + item,
          },
        }));
        checkPost = false;
        break;
      } else if (item === "email" && validMail(registerValues[item].text)) {
        let splittedEmail = registerValues[item].text.split("@")[1];
        console.log(splittedEmail);
        if (splittedEmail !== "gmail.com") {
          setRegisterValues((prevStyle) => ({
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

  const onRegisterBtnClick = async () => {
    let isAllFieldEntered = checkAllFields();

    console.log(isAllFieldEntered);
    if (isAllFieldEntered) {
      console.log(registerValues);
      var registrationData = {
        name: registerValues.name.text,
        emailId: registerValues.email.text,
        mobNo: registerValues.mobno.text,
        password: registerValues.password.text,
        shopName: registerValues.shopname.text,
        shopAddress: registerValues.shopaddress.text,
        shopMobNo: registerValues.shopmobno.text,
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
            setTimeout(() => navigate("/login"), 5000);
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

  useEffect(() => {
    store.clearAll();
  }, []);

  return (
    <Box>
      <AppBarGeneral />

      <Stack alignItems={"center"}>
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

            <Stepper nonLinear activeStep={activeStep}>
              {registerSteps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            {allFieldNames.every(isNotFill) ? (
              <>
                <Button
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
                  Finish
                </Button>
              </>
            ) : (
              <>
                {activeStep === 0 ? (
                  <>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      size="small"
                      label="Name"
                      variant="outlined"
                      onChange={onChangeName}
                      value={registerValues.name.text}
                      error={registerValues.name.isValid}
                      helperText={registerValues.name.errorMessage}
                    />

                    <TextField
                      autoComplete="off"
                      fullWidth
                      size="small"
                      label="Email"
                      variant="outlined"
                      onChange={onChangeEmail}
                      value={registerValues.email.text}
                      error={registerValues.email.isValid}
                      helperText={registerValues.email.errorMessage}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      label="Mobile No"
                      variant="outlined"
                      inputProps={{ maxLength: 10 }}
                      onChange={onChangeMobno}
                      value={registerValues.mobno.text}
                      autoComplete="off"
                      error={registerValues.mobno.isValid}
                      helperText={registerValues.mobno.errorMessage}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Password"
                      variant="outlined"
                      type={registerValues.showPassword ? "text" : "password"}
                      value={registerValues.password.text}
                      autoComplete="off"
                      onChange={onChangePassword}
                      error={registerValues.password.isValid}
                      helperText={registerValues.password.errorMessage}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {registerValues.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Stack
                      direction={"row"}
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Button
                        onClick={() => setActiveStep(activeStep + 1)}
                        fullWidth
                        size="small"
                        variant="contained"
                        sx={{
                          bgcolor: Colors.MAIN_THEME_COLOR,
                          ":hover": {
                            bgcolor: Colors.MAIN_THEME_COLOR,
                          },
                          marginLeft: "10px",
                        }}
                      >
                        Next
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      label="Shop Name"
                      variant="outlined"
                      onChange={onChangeShopName}
                      value={registerValues.shopname.text}
                      autoComplete="off"
                      error={registerValues.shopname.isValid}
                      helperText={registerValues.shopname.errorMessage}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      label="Shop Phone Number"
                      variant="outlined"
                      onChange={onChangeShopMobNo}
                      value={registerValues.shopmobno.text}
                      autoComplete="off"
                      error={registerValues.shopmobno.isValid}
                      helperText={registerValues.shopmobno.errorMessage}
                    />

                    <TextField
                      rows={4}
                      multiline
                      fullWidth
                      size="small"
                      label="Shop Address"
                      variant="outlined"
                      onChange={onChangeshopAddress}
                      value={registerValues.shopaddress.text}
                      autoComplete="off"
                      error={registerValues.shopaddress.isValid}
                      helperText={registerValues.shopaddress.errorMessage}
                    />
                    <Stack
                      direction={"row"}
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Button
                        onClick={() => setActiveStep(activeStep - 1)}
                        fullWidth
                        size="small"
                        variant="contained"
                        sx={{
                          bgcolor: Colors.MAIN_THEME_COLOR,
                          ":hover": {
                            bgcolor: Colors.MAIN_THEME_COLOR,
                          },
                          marginRight: "10px",
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setActiveStep(activeStep + 1)}
                        fullWidth
                        size="small"
                        variant="contained"
                        sx={{
                          bgcolor: Colors.MAIN_THEME_COLOR,
                          ":hover": {
                            bgcolor: Colors.MAIN_THEME_COLOR,
                          },
                          marginLeft: "10px",
                        }}
                      >
                        Next
                      </Button>
                    </Stack>
                  </>
                )}
              </>
            )}

            {/* <Button onClick={onRegisterBtnClick} fullWidth size="small" variant="contained" sx={{
              bgcolor: Colors.MAIN_THEME_COLOR, ":hover": {
                bgcolor: Colors.MAIN_THEME_COLOR
              }
            }}>Register</Button> */}
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
