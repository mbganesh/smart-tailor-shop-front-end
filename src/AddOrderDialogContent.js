import { Typography, TextField, Button, makeStyles, Card, withStyles, IconButton } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import React, {  useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import AppbarHead from './AppbarHead'
import { Colors, Fonts } from "./constants";
import Helpers from './Helpers'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useState from "react-usestateref";


import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

const colorCode = "#DE834D";
const bgColor = "#f1dbc0"



const dialogStyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(dialogStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);





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
    marginTop:10,marginBottom:10,
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





function AddOrderDialogContent(props) {
  const classes = styles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userName, mode } = state;
  const [allMobNos, setAllMobNos] = useState({})
 
  const [customerName, setcustomerName] = useState("")
  const [customerAddress, setcustomerAddress] = useState("")
  const [salwarPersons, setSalwarPersons] = useState([])
  const [blousePersons, setBlousePersons] = useState([])
  const [shirtPersons, setShirtPersons] = useState([])
  const [pantPersons, setPantPersons] = useState([])
  const [mobileNo, setmobileNo] = useState("")
  const [currentDataTime, setcurrentDataTime] = useState("")

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
    var dataToPass = { "orderDate": currentDataTime, "name": customerName, "orderID": props.orderId, "mobNo": mobileNo, "salwarPersons": salwarPersons, "blousePersons": blousePersons, "shirtPersons": shirtPersons, "pantPersons": pantPersons }
    navigate('/addblousesalwar', {
      state: {
        orderDetailsData: dataToPass, mode: "add", userName: userName, prevPage:props.prevPage
      }
    });

  };


  //  Back Btn
  const handleBackBtn = () => {
    var datatoSend = { user: "admin", orderID: props.orderId }
    // return
    axios.post(Helpers().apiURL + "/removeOrderID", datatoSend).then((res) => {
      // navigate(-1);
      props.setAddOrderDataDialog(false)
      setcustomerName("")
      setcustomerAddress("")
      setcurrentDataTime("")

    });
    // navigate('/orderDetailPage', { state: { userName: "Shop Owner" } });
  }

  const [finishStatus, setfinishStatus] = useState(false);

  useEffect(() => {
    getAllMobNos()
  }, [])

  return (

    <Dialog  fullWidth   onClose={handleBackBtn} open={props.addOrderDataDialog}>
        <DialogTitle style={{backgroundColor:Colors.ORDER_MAIN_COLOR, color:"white"}} >
          Add New Order
        </DialogTitle>
        <DialogContent dividers>

        <div>
            <div className={classes.textfiedFlexItem}  >
              <Typography className={classes.textFieldLabel}>Order ID</Typography>
              <TextField size="small" variant="outlined" disabled fullWidth value={props.orderId}></TextField>
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
        </div>
        </DialogContent>
        <DialogActions style={{backgroundColor:Colors.ORDER_LIGHT_COLOR}}>
          <Button style={{fontSize: 14,  width: 120, height: "35px", marginLeft: "5%"}} variant = "outlined" onClick={handleBackBtn}  autoFocus>
            Cancel
          </Button>
          <Button  variant="contained"  autoFocus color="primary"  onClick={onNextBtnClick}
          style={{ fontSize: 14, backgroundColor: Colors.ORDER_MAIN_COLOR, width: 120, height: "35px", marginLeft: "5%" }}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>











  );
}

export default AddOrderDialogContent;