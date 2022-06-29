import { Button, InputAdornment, makeStyles, Snackbar, TextField, Typography, Card } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

import AppBarHead from "../AppbarHead";

import swal from "sweetalert2";
import { Colors, Fonts,  APIClient} from "../constants";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import { decodeToken, isExpired } from "react-jwt";
import { SessionChecker } from "../utils/SessionChecker";

export default function EmployeeCRUD() {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: Colors.CUSTOMER_LIGHT_COLOR, minHeight: "100vh",
      [theme.breakpoints.down('sm')]: {
        backgroundColor: "white",
        height: "100%"
      },
    },
    toolBar: {
      backgroundColor: "#00adb5",
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      fontSize: "21px",
      fontWeight: "bold",
      "&:hover": {
        cursor: "pointer",
      },
    },

    titleText: {
      textAlign: "center",
      fontFamily: Fonts.UBUNTU,
      margin: 20,
      fontWeight: "bold",
      color: Colors.CUSTOMER_MAIN_COLOR,
      fontSize: 35,
      [theme.breakpoints.down('sm')]: {
        fontSize: 30
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: 35
      },
    },
    textField: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00adb5",
      },
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
      {
        display: "none",
      },
    },
    textFieldLabel: {
      fontFamily: Fonts.LATO
    },

    divFlexBox:
    {
      display: 'flex', flexDirection: 'column', alignItems: "center"

    },
    textfiedFlexItem:
    {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: Colors.CUSTOMER_MAIN_COLOR,
      },
      [theme.breakpoints.up("md")]:
      {
        width: "100%"
      },
      [theme.breakpoints.down("sm")]:
      {
        width: "100%"
      }
    },
    card: {
      border: "1px solid", borderColor: Colors.CUSTOMER_MAIN_COLOR,
      paddingLeft: 35, paddingRight: 35, paddingTop: 30, height: 550, display: "flex", justifyContent: "space-between", flexDirection: "column",
      [theme.breakpoints.down('sm')]: {
        width: 350,
        border: "none",
        boxShadow: "none",
        paddingTop: 10
      },
      [theme.breakpoints.up('sm')]: {
        width: 500,
      },
      [theme.breakpoints.up('md')]: {
        width: 500,
      },
      [theme.breakpoints.up('lg')]: {
        width: 600,
      },
      [theme.breakpoints.up('xl')]: {
        width: 800,
      }
    },
    btnBack: {
      fontSize: 14, fontWeight: 'bold', color: Colors.CUSTOMER_MAIN_COLOR, borderColor: Colors.CUSTOMER_MAIN_COLOR
    },
    btnSave: {
      backgroundColor: Colors.CUSTOMER_MAIN_COLOR, fontSize: 14, fontWeight: 'bold', display: btnVisibility, color: "white", marginLeft: 100,
      "&:hover": {
        backgroundColor: Colors.CUSTOMER_MAIN_COLOR,
      },

    }
  }));
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data, page } = state;

  const [errorMobStatus, setMobErrorStatus] =useState(false);
const [mobErrorText, setMobErrorText] = useState("");
  const [btnName, setBtnName] = useState("Save");
  const [btnVisibility, setBtnVisibility] = useState("visible");
  const [textFieldReadOnly, settextFieldReadOnly] = useState(false);
  const [dateTextVisibility, setDateTextVisibility] = useState("visible");
  var currentDataTime = "";
  const [tokenData, settokenData] = useState({})
  const [customerDetails, setCustomerDetails] = useState({
    cusDate: "",
    cusName: "",
    cusEmail: "",
    cusMobNo: "",
    cusAddress: "",
    user: "admin"
  });

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ').trim();
  };

  //back btn
  const handleBackBtn = () => {

    navigate(-1);
  }

  // SnackBar
  const [openSnackbar, setopenSnackbar] = useState(false);
  const [severity, setseverity] = useState("");
  const [message, setmessage] = useState("");

  function validateNumber(e) {
    const pattern = /^[0-9]$/;
    return pattern.test(e.key )
}

  const handleClose = (event, reason) => {
    if (reason === "clickway") {
      return;
    }
    setopenSnackbar(false);
  };

  const addCustomerDate = (e) => {
    setCustomerDetails({ ...customerDetails, cusDate: e.target.value });
  };
  const addCustomerName = (e) => {
    setCustomerDetails({ ...customerDetails, cusName: e.target.value });
  };
  const addCustomerEmail = (e) => {
    setCustomerDetails({ ...customerDetails, cusEmail: (e.target.value).toLowerCase() });
  };
  const addCustomerMobNo = (e) => {
    if (isNaN(parseInt(e.target.value))) {
      setCustomerDetails({ ...customerDetails, cusMobNo: "" });
      return;
    }
    if( /^-?[0-9]+$/.test(e.target.value+'') === false || e.target.value.length > 10 ){
      return;
    }
    setCustomerDetails({ ...customerDetails, cusMobNo: e.target.value });
  };

  const addCustomerAddress = (e) => {
    setCustomerDetails({ ...customerDetails, cusAddress: e.target.value });
  };

  const formatDate = (date) => {
    var a = new Date(date)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formattedDate = a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear()
    return formattedDate
  }

  const getCurrentDataAndTime = () => {
    var currentdate = new Date().toISOString()
    currentDataTime = currentdate;
  };

  const saveBtn = () => {
    customerDetails["username"] = tokenData.userData.emailId
    if (page === "Edit") {
      if (customerDetails.cusName === "" || customerDetails.cusMobNo === "" || customerDetails.cusAddress === "") {
        setopenSnackbar(true);
        setseverity("error");
        setmessage("Please Fill All Texfields");
        return;
      }
      if (customerDetails.cusEmail !== "") {
        let emailCheck = validateEmail(customerDetails.cusEmail)
        if (!emailCheck) {
          setopenSnackbar(true);
          setseverity("error");
          setmessage("Please Enter Valid Email ID");
          return
        }
      }

      if ((customerDetails.cusMobNo).length === 10) {
        axios.post(APIClient.API_BASE_URL + "/customerProcess/updateCustomerData", customerDetails,APIClient.API_HEADERS)
          .then((response) => {
            setmessage(response.data.message);
            if (response.data.message === "updated") {
              swal.fire({
                title: `Customer Details Updated Successfully`,
                text: "",
                icon: "success",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',

              }).then((willWarn) => {
                if (willWarn.isConfirmed) {
                  navigate('/customer-details', { state: { currentUser: "Shop Owner" } });
                }
              });
            }
            else if (response.data.message === "MobileNumberExists") {
              setopenSnackbar(true)
              setseverity("error")
              setmessage("Mobile Number already Exists!!!")
            }
          });

      }
      else {
        setopenSnackbar(true)
        setseverity("error")
        setmessage("Please enter valid Mobile No.")
      }
    }
    else if (page === "Add") {
      if (
        customerDetails.cusName === "" ||
        customerDetails.cusMobNo === "" ||
        customerDetails.cusAddress === ""
      ) {
        setopenSnackbar(true);
        setseverity("error");
        setmessage("Please Fill All Texfields");
        return;
      }
      if (customerDetails.cusEmail !== "") {
        let emailCheck = validateEmail(customerDetails.cusEmail)
        if (!emailCheck) {
          setopenSnackbar(true);
          setseverity("error");
          setmessage("Please Enter Valid Email ID");
          return
        }
      }

      if ((customerDetails.cusMobNo).length === 10) {
        customerDetails["cusName"] = toTitleCase(customerDetails["cusName"])
        axios.post(APIClient.API_BASE_URL + "/customerProcess/addCustomerData", customerDetails,APIClient.API_HEADERS)
          .then((response) => {
            console.log(response)
            setmessage(response.data.message);
            if (response.data.message === "RegistrationSuccess") {
              setmessage("Customer Details Added Successfully");
              setopenSnackbar(true);
              setseverity("success");
              setCustomerDetails({ cusName: "", cusEmail: "", cusMobNo: "", cusAddress: "", });
              swal.fire({
                title: `Customer Details Added Successfully`,
                text: "",
                icon: "success",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',

              }).then((willWarn) => {
                if (willWarn.isConfirmed) {
                  navigate('/customer-details', { state: { currentUser: "Shop Owner" } });
                }
              });

            } else if (response.data.message === "UserExists") {
              setopenSnackbar(true);
              setseverity("warning");
              setmessage("Customer Mobile No Already Exists");
            }
          });
      }
      else {
        setopenSnackbar(true)
        setseverity("error")
        setmessage("Please enter valid Mobile No.")
      }
    }
    else {
      setopenSnackbar(true);
      setseverity("error");
      setmessage("Server Down.");
    }
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const sessionCheck = () => {
    let token = sessionStorage.getItem('stsToken')
    console.log(token)
    if (isExpired(token)) {
      navigate("/");
    }
    else {
      let decodedData = decodeToken(token)
      settokenData(decodedData)
      console.log(decodedData)

    }
  }

  useEffect(() => {
    let decodedTokenData =   SessionChecker()
    decodedTokenData.success? settokenData(decodedTokenData.message):navigate("/")
    if (page === "Add") {
      setBtnName("Save");
      getCurrentDataAndTime();
      setCustomerDetails({ ...customerDetails });
      setDateTextVisibility("none");
      setBtnVisibility("visible");
    }

    else if (page === "Edit") {
      setDateTextVisibility("none");
      setBtnName("Update");
      setCustomerDetails(data);
    }

    else if (page === "View") {
      settextFieldReadOnly(true);
      setBtnVisibility("none");
      setCustomerDetails(data);
    }

    else {
      navigate('/homepage', { state: { userName: "Shop Owner" } });
    }
  }, [state]);
  const classes = useStyles();

  return (

    <>
      {
        Object.keys(tokenData).length === 0 ?
          <div>Loading... Please Wait</div>
          :
          <div className={classes.root} >
          <AppBarHead dataParent={{ appBtnColor: Colors.CUSTOMER_MAIN_COLOR, appBtnText: "Customer Details", userData: tokenData.userData }} />
          <Typography className={classes.titleText}>{page} Customer </Typography>

          <div className={classes.divFlexBox} >
            <div>
              <Card elevation={5} className={classes.card} >

                <div className={classes.textfiedFlexItem}
                  style={{ display: dateTextVisibility }} >
                  <Typography className={classes.textFieldLabel}>Date</Typography>

                  <TextField
                    size="small"
                    variant="outlined"
                    type="text"
                    inputProps={{ readOnly: textFieldReadOnly }}
                    value={formatDate(customerDetails.cusDate)}
                    fullWidth
                    className={classes.textField}
                  ></TextField>
                </div>


                <div className={classes.textfiedFlexItem} >
                  <Typography className={classes.textFieldLabel}>Name</Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    type="text"
                    inputProps={{ readOnly: textFieldReadOnly }}
                    fullWidth

                    placeholder="Enter Name"
                    value={customerDetails.cusName}
                    onChange={addCustomerName}
                  ></TextField>
                </div>



                <div className={classes.textfiedFlexItem} >
                  <Typography className={classes.textFieldLabel}>Mobile No</Typography>
                  <TextField

                    autoComplete='ViewCrunch'
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="tel"
                    inputProps={{ readOnly: textFieldReadOnly }}
                    placeholder="Enter Mobile No"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91</InputAdornment>
                      ),
                    }}
                    value={customerDetails.cusMobNo}
                    onChange={addCustomerMobNo}
                  ></TextField>
                </div>

                <div className={classes.textfiedFlexItem} >
                  <Typography className={classes.textFieldLabel}>Email</Typography>
                  <TextField
                    autoComplete='ViewCrunch'
                    size="small"
                    variant="outlined"
                    type="email"
                    placeholder="Enter Email ID"
                    inputProps={{ readOnly: textFieldReadOnly }}
                    fullWidth
                    value={customerDetails.cusEmail}
                    onChange={addCustomerEmail}
                  ></TextField>
                </div>

                <div className={classes.textfiedFlexItem} >
                  <Typography className={classes.textFieldLabel}>Address</Typography>

                  <TextField
                    autoComplete='ViewCrunch'
                    multiline
                    rows={4}
                    variant="outlined"
                    type="text"
                    placeholder="Enter Address"
                    fullWidth
                    value={customerDetails.cusAddress}
                    onChange={addCustomerAddress}
                    inputProps={{ readOnly: textFieldReadOnly }}
                  ></TextField>
                </div>

                <div style={{ display: "flex", flexDirection: "row", }}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    fullWidth
                    className={classes.btnBack}
                    variant="outlined"
                    onClick={handleBackBtn}
                  >
                    Back
                  </Button>

                  <Button
                    startIcon={<SaveIcon />}
                    className={classes.btnSave}
                    variant="contained"
                    fullWidth
                    onClick={saveBtn}
                  >
                    {btnName}
                  </Button>
                </div>
                <div>
                </div>
              </Card>
            </div>
          </div>




          <div>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              open={openSnackbar}
              autoHideDuration={1000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity={severity}>
                {message}
              </Alert>
            </Snackbar>
          </div>

        </div>
}

    </>


  );
}