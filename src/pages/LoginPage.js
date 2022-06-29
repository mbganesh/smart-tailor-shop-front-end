import { React, useState, useEffect } from "react";
import { Button, Stack, Typography, Paper, TextField, IconButton, InputAdornment, Box, Tooltip } from '@mui/material';

import { Alert } from "@material-ui/lab";
import { useNavigate } from "react-router";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import swal from "sweetalert2";
import axios from "axios";
import Helpers from '../Helpers'
import store from "store2";
import startupLogo from '../images/login/startupLogo.png'
import { Fonts, Colors, APIClient } from "../constants";

import AppBarGeneral from "../components/AppBarGeneral"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FooterLandingPage from "../components/FooterLandingPage";
import { isExpired, decodeToken } from "react-jwt";
import { CustomAlert } from "../utils/CustomAlert";


const mainColor = Colors.HOME_MAIN_COLOR
const lightColor = "#ffe6f0"


export default function LoginPage() {
  const navigate = useNavigate();

  let date = new Date();

  let addminutes = new Date(date.getTime() + (60 * 400000))

  const [loginValues, setloginValues] = useState({
    username: "",
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setloginValues({ ...loginValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    console.log("firstff")
    setloginValues({
      ...loginValues,
      showPassword: !loginValues.showPassword,
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


  const handleClose = (event, reason) => {
    if (reason === "clickway") {
      return;
    }
    setAlert1(false);
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUserPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onLoginClick();
    }
  };

  const apiChecker = () => {
    // setLoader(true)
    axios.get(Helpers().apiURL + "/apiCheck").then((result) => {
      var res = result.data;
      // setLoader(false)
      let loginData = { user: "admin", username: username, password: password }
      axios.post(Helpers().apiURL + "/login", loginData).then((res) => {
        var resdata = res.data
        let users = resdata.message
        if (users === "Shop Owner") {
          store.session("date", addminutes);
          navigate('/homepage', { state: { userName: users, tohide: '' } });
        }
        else if (users === "Designing Team") {
          store.session("date", addminutes);
          navigate('/homepage', { state: { userName: users, tohide: 'none' } });
        }
        else {
          setButtonVisblity(false)
          setLoginBtnLoading(false)
          setLoginBtnText("Login")
          setAlert1(true);
          setAlertMessage("Please enter valid username and password!");
        }
      })
    })
      .catch((error) => {
        setButtonVisblity(false)
        setLoginBtnLoading(false)
        setLoginBtnText("Login")
        // setLoader(false)
        CustomAlert("Server Down", "", "warning")
      });
  };

  const showAlert = (title, text, icon) => {
    swal.fire({ title: title, text: text, icon: icon, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33", })
      .then((willWarn) => {
        if (willWarn.isConfirmed) {
          // ok
        }
      });
  };

  const callLoginAPI = async () => {
      let loginData = {  username: loginValues.username, password: loginValues.password }
      console.log()
      axios.post(APIClient.API_BASE_URL + "/registrationProcess/login", loginData).then((res) => {
        var resdata = res.data
        console.log(resdata)
        if(resdata.success){
          console.log(resdata)
          console.log(decodeToken(resdata.token))
          sessionStorage.setItem('stsToken', resdata.token);
          navigate('/homepage', { state: { userName: "Shop Owner", tohide: '' } });
        }
        else{
          CustomAlert(resdata.message, "", "warning")
          // showAlert(resdata.message, "", "warning")
         
        }
      }).catch((error) => {
        setButtonVisblity(false)
        setLoginBtnLoading(false)
        setLoginBtnText("Login")
        sessionStorage.removeItem('stsToken')
        // setLoader(false)
        CustomAlert("Server Down", "", "warning")
      });
  }


  const onLoginClick = async (e) => {
    setButtonVisblity(true)
    setLoginBtnLoading(true)
    setLoginBtnText("Logging in...")
    console.log(loginValues)

    if (Object.values(loginValues).includes("")) {
      setButtonVisblity(false)
      setLoginBtnLoading(false)
      setLoginBtnText("Login")
      // setAlert1(true);
      // setAlertMessage("Please enter username and password!");
      CustomAlert("Please enter username and password!", "", "warning")
      return;
    }
    callLoginAPI()
    // apiChecker();
  };


  useEffect(() => {
    store.clearAll()
  }, []);

  return (
    <Box >
      <AppBarGeneral />
      <Stack alignItems={"center"} >
        <Paper sx={{ mt: 5, mb: 5, width: { md: 500, xs: 350 }, p: 5, boxShadow: { xs: "none", md: "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)" } }} >
          <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} gap={4}>
            <Typography fontSize={{ lg: 34, md: 34, sm: 30, xs: 30 }} sx={{ color: Colors.MAIN_THEME_COLOR, fontWeight: "bold" }}>Login</Typography>
            <TextField onChange={(e)=>{setloginValues({ ...loginValues, username: e.target.value })}} fullWidth size="small" label="Email" variant="outlined" />

            <Stack sx={{ width: "100%" }} gap={1}>
              <TextField fullWidth size="small" label="Password" variant="outlined"
                type={loginValues.showPassword ? 'text' : 'password'} value={loginValues.password}
                onChange={(e)=>{setloginValues({ ...loginValues, password: e.target.value })}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {loginValues.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }} />
              <Typography sx={{ color: Colors.MAIN_THEME_COLOR, cursor: "pointer", justifyContent: "flex-end", display: "flex", width: "100%" }}>Forgot Password</Typography>
            </Stack>

            <Button onClick={onLoginClick} fullWidth size="small" variant="contained" sx={{
              bgcolor: Colors.MAIN_THEME_COLOR, ":hover": {
                bgcolor: Colors.MAIN_THEME_COLOR
              }
            }}>Login</Button>
            <Stack direction={"row"}>
              <Typography>Don't have an Account?</Typography>
          
              <Typography onClick={() => { navigate("/register") }} ml={1} sx={{ cursor: "pointer", textDecoration: "underline", color: Colors.MAIN_THEME_COLOR }} >Create One</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
      <Box sx={{ position: { lg: "absolute" }, bottom: 0, width: "100%" }}>
        <FooterLandingPage />
      </Box>

    </Box>
  );
}
