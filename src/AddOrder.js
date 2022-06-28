import {
  Typography,
  TextField,
  Button,
  makeStyles, Card
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import React, {  useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import AppbarHead from './AppbarHead'
import { Colors, Fonts } from "./constants";
import Helpers from './Helpers'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useState from "react-usestateref";

const colorCode = "#DE834D";
const bgColor = "#f1dbc0"
const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: Colors.ORDER_LIGHT_COLOR,
    overflow:"hidden",
    minHeight: "100vh",
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
  logBtn: {
    fontSize: "21px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  heading: {
    textAlign: "center",
    fontSize: "21px",
    padding: theme.spacing(2),
    fontWeight: "bold",
    color: colorCode,
  },
  textfiedFlexItem:
  {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colorCode,
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
  divFlexBox:
  {
    display: 'flex', flexDirection: 'column', alignItems: "center"
  },
  titleText: {

    textAlign: "center",
    fontFamily: Fonts.UBUNTU,
    margin: 20,
    fontWeight: "bold",
    color: Colors.ORDER_MAIN_COLOR,
    fontSize: 35,
    [theme.breakpoints.down('sm')]: {
      fontSize: 30
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 35
    },
  },
  card: {
    border: "1px solid", borderColor: Colors.ORDER_MAIN_COLOR,
    paddingLeft: 35, paddingRight: 35, paddingTop: 30, height: 550, paddingBottom: 30, display: "flex", justifyContent: "space-between", flexDirection: "column",
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
  textFieldLabel: {
    fontFamily: Fonts.LATO
  },
  btnBack: {
    fontSize: 14, fontWeight: 'bold', color: Colors.ORDER_MAIN_COLOR, borderColor: Colors.ORDER_MAIN_COLOR
  },
  btnNext: {
    backgroundColor: Colors.ORDER_MAIN_COLOR, fontSize: 14, fontWeight: 'bold', color: "white", marginLeft: 100,
    "&:hover": {
      backgroundColor: Colors.ORDER_MAIN_COLOR,
    },

  }
}));

function AddOrder() {
  const classes = styles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userName, mode } = state;
  const [allMobNos, setAllMobNos] = useState({})
  const [orderId, setorderId, orderIdRef] = useState("")
  const [customerName, setcustomerName] = useState("")
  const [customerAddress, setcustomerAddress] = useState("")
  const [salwarPersons, setSalwarPersons] = useState([])
  const [blousePersons, setBlousePersons] = useState([])
  const [shirtPersons, setShirtPersons] = useState([])
  const [pantPersons, setPantPersons] = useState([])
  const [mobileNo, setmobileNo] = useState("")
  const [currentDataTime, setcurrentDataTime] = useState("")


  const getOrderID = () => {
    var dataToSend = { user: "admin" }
    axios.post(Helpers().apiURL + "/generateOrderID", dataToSend).then((res) => {
      setorderId(res.data.message)
    });
  };

  const getMobileNo = (typedMobNo) => {
    var datatoSend = { user: "admin", cusMobNo: typedMobNo }
    // return
    axios.post(Helpers().apiURL + "/getCustomerData", datatoSend).then((res) => {
      setcustomerName(res.data.message.cusName)
      setcustomerAddress(res.data.message.cusAddress)
      setSalwarPersons(res.data.message.salwarPersons)
      setBlousePersons(res.data.message.blousePersons)
      setShirtPersons(res.data.message.shirtPersons)
      setPantPersons(res.data.message.pantPersons)
    });
  };

  const getCurrentDataAndTime = () => {
    var currentdate = new Date().toISOString()
    setcurrentDataTime(currentdate)
  };

  const formatDate = (date) => {
    var a = new Date(date)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formattedDate = a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear()
    return formattedDate
  }

  const userNumber = (value) => {
    setmobileNo(value)
    getCurrentDataAndTime()
    var typedMobNo = value
    if (typedMobNo.length === 10) {
      getMobileNo(typedMobNo)
      getCurrentDataAndTime()
    }
    else {
      setcustomerName("")
      setcustomerAddress("")
      setcurrentDataTime("")
    }
  };

  const getAllMobNos = () => {
    var datatoSend = { user: "admin" }
    axios.post(Helpers().apiURL + "/getAllCusMobNos", datatoSend).then((res) => {

      setAllMobNos(res.data.message)
    });
  }

  const onNextBtnClick = () => {
    if (mobileNo === "") {
      alert("Please Enter Mobile Number")
      return
    }
    if (customerName === "" || customerName === undefined) {
      alert("New Customer!! Please Register it in Customer Details ")
      return
    }
    var dataToPass = { "orderDate": currentDataTime, "name": customerName, "orderID": orderId, "mobNo": mobileNo, "salwarPersons": salwarPersons, "blousePersons": blousePersons, "shirtPersons": shirtPersons, "pantPersons": pantPersons }
    navigate('/addblousesalwar', {
      state: {
        orderDetailsData: dataToPass, mode: "add", userName: userName
      }
    });

  };


  //  Back Btn
  const handleBackBtn = () => {
    var datatoSend = { user: "admin", orderID: orderId }
    // return
    axios.post(Helpers().apiURL + "/removeOrderID", datatoSend).then((res) => {
      navigate(-1);
    });
    // navigate('/orderDetailPage', { state: { userName: "Shop Owner" } });
  }



  const [finishStatus, setfinishStatus] = useState(false);

  const onBackButtonEvent = (e) => {
   
    // handleBackBtn()
    e.preventDefault();
    setfinishStatus(true)
    var datatoSend = { user: "admin", orderID: orderIdRef.current }
    axios.post(Helpers().apiURL + "/removeOrderID", datatoSend).then((res) => {
          navigate(-1)
        });

  }

  useEffect(() => {
    getAllMobNos()
    getOrderID()
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };

    
  }, [])

  return (
    <div className={classes.root} >
      {/* <div>
        <AppbarHead dataParent={{ userNameFrom: userName, appBtnColor: colorCode, appBtnText: "Order Details" }} />
      </div> */}
      <Typography className={classes.titleText}>Add Order</Typography>

      <div className={classes.divFlexBox} >
        <div>
          <Card elevation={5} className={classes.card} >
            <div className={classes.textfiedFlexItem}  >
              <Typography className={classes.textFieldLabel}>Order ID</Typography>
              <TextField size="small" variant="outlined" disabled fullWidth value={orderId}></TextField>
            </div>

            <div className={classes.textfiedFlexItem} >
              <Typography className={classes.textFieldLabel}>Mobile No</Typography>
              <Autocomplete
                size="small"
                disableClearable
                onChange={(e, v) => v === null ? "" : userNumber(v["cusMobNo"])}
                options={allMobNos}
                getOptionLabel={(option) => option.cusMobNo +" ("+option.cusName+")"}
                fullWidth
                renderInput={(params) => <TextField fullWidth {...params} variant="outlined" placeholder="Enter Mob No" onChange={({ target }) => userNumber(target.value)} />}
              />
            </div>

            <div className={classes.textfiedFlexItem} >
              <Typography className={classes.textFieldLabel}>Name</Typography>
              <TextField size="small" variant="outlined" value={customerName} type="text" disabled fullWidth></TextField>
            </div>

            <div className={classes.textfiedFlexItem}>
              <Typography className={classes.textFieldLabel}>Location</Typography>
              <TextField size="small" multiline rows={4} disabled fullWidth variant="outlined" type="text" value={customerAddress} ></TextField>
            </div>

            <div className={classes.textfiedFlexItem} >
              <Typography className={classes.textFieldLabel}>Order Date</Typography>
              <TextField
                disabled
                fullWidth
                size="small"
                variant="outlined"
                value={currentDataTime !== "" ? formatDate(currentDataTime.split("T")[0]) : ""}

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
                endIcon={<ArrowForwardIcon />}
                className={classes.btnNext}
                variant="contained"
                fullWidth
                onClick={onNextBtnClick}
              >
                Next
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>

  );
}

export default AddOrder;