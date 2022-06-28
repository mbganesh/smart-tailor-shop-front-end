import { Badge, Modal, CircularProgress, Button, InputLabel, Checkbox, TextField, Card, Typography, Select, MenuItem, FormControl, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, React, useMemo, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Helpers from "./Helpers";
import useState from "react-usestateref";
import swal from "sweetalert2";
import salwarSVG from "./images/dressLogos/salwar_nav.svg";
import blouseSVG from "./images/dressLogos/blouse_nav.svg";
import shirtSVG from "./images/dressLogos/shirt.png";
import pantSVG from "./images/dressLogos/pant.png";
import { Colors, Fonts } from "./constants";
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import { faCalendarWeek, faBoxes, faCheck, faSpinner, faShoppingBag, faCheckDouble, faFolder, faUsers, faUser, } from '@fortawesome/free-solid-svg-icons'
import SalwarDressComponent from "./SalwarDressComponent";
import BlouseDressComponent from "./BlouseDressComponent";
import ShirtDressComponent from "./ShirtDressComponent";
import PantDressComponent from "./PantDressComponent";
import OrderDressBottomComponent from "./OrderDressBottomComponent";

import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { refType } from "@mui/utils";

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";


// Salwar Color Codes
const salwarColorCode = Colors.SALWAR_COLOR;
const salwarLightColorCode = Colors.SALWAR_LIGHT_COLOR;
// Blouse Color Codes
const blouseColorCode = Colors.BLOUSE_COLOR;
const blouseLightColorCode = Colors.BLOUSE_LIGHT_COLOR;
// Shirt Color Codes
const shirtColorCode = Colors.SHIRT_COLOR
const shirtLightColorCode = Colors.SHIRT_LIGHT_COLOR
// Pant Color Codes
const pantColorCode = Colors.PANT_COLOR
const pantLightColorCode = Colors.PANT_LIGHT_COLOR


const colorCode = Colors.ORDER_MAIN_COLOR;
const bgColor = "#f1dbc0"


export default function Addblousesalwar() {
  const [dataToSave, setDataToSave] = useState({});
  const [loadingModal, setLoadingModal] = useState(false)
  const [loadingModalText, setLoadingModalText] = useState("Adding Dress... Please Wait...")

  const orderDressBottomComponentRef = useRef();

  const [allItemDelivered, setAllItemDelivered, allItemDeliveredRef] = useState(false)

  const [savePreviewData, setSavePreviewData] = useState([]);
  const [savePreviewDataDialog, setSavePreviewDataDialog] = useState(false);

  const useStyles = useMemo(() => {
    return makeStyles((theme) => ({

      topBarText: {
        fontSize: 14, fontFamily: Fonts.LATO, height: 35,
        [theme.breakpoints.up("lg")]: {
          fontSize: 15,
        },
      },
      topBarTextLabel: {
        "&.Mui-focused": {
          color: Colors.ORDER_MAIN_COLOR
        }
      },
      topBarContainer: {
        display: designTeamContentHider, flexWrap: "wrap", justifyContent: "space-evenly", padding: "0.2%", marginTop: "0px", backgroundColor: Colors.ORDER_LIGHT_COLOR,
        [theme.breakpoints.down("sm")]: {
          flexDirection: "row",

        },
      },
      selectText: {
        "&:after": {
          borderBottomColor: "darkred",
        },
        fontSize: 14, fontFamily: Fonts.LATO, fontWeight: 500,
        [theme.breakpoints.up("lg")]: {
          fontSize: 15,
        },
      },
      textFieldCD: {
        fontWeight: "bold", fontSize: 14, fontFamily: Fonts.LATO,
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: colorCode,
        },
      },
      grantTotalView: {
        color: "white",
        fontWeight: "bold", fontFamily: Fonts.LATO,
        marginTop: 5,
        [theme.breakpoints.up("md")]: {
          fontSize: "24px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "18px",
        },
      },

      grantTotalViewCost: {
        color: "white", marginTop: 5, fontFamily: Fonts.UBUNTU, fontWeight: "BOLD",
        [theme.breakpoints.up("md")]: {
          fontSize: "24px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "18px",
        },
      },

      bottomBarContainer: {
        backgroundColor: colorCode, display: 'flex',
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column"
        },
      },

      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
    }))
  }, []);

  const styles = (theme) => ({
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

  const DialogTitle = withStyles(styles)((props) => {
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

  const navigate = useNavigate();
  const { state } = useLocation();

  const { orderDetailsData, mode, userName, prevPage, prevOrderStatus,prevSearchQuery } = state

  const [allInfoCompletionStatus, setAllInfoCompletionStatus, allInfoCompletionStatusRef] = useState(true);
  const [costs, setCosts] = useState({
    salwar: {
      salwarItemsList: {
        Basic: 790,
      },
      salwarItemsLiningList: {
        "With Lining": 100,
        "Without Lining": 0,
      },
      salwarItemsUtilitiesList: {
        Pocket: 30,
        Rope: 20,
        Zip: 75,
        "With Elastic": 75,
      },
      salwarItemsPipingList: {
        "Piping-Only Neck": 160,
        "Piping-Neck Sleeve": 310,
        "Side Slit": 100
      },
    },
    blouse: {
      blouseItemsList: {
        Basic: 500,
      },
      blouseItemsLiningList: {
        "With Lining": 150,
        "Without Lining": 0,
      },
      blouseItemsUtilitiesList: {
        Rope: 20,
        Zip: 75,
      },
      blouseItemsPipingList: {
        "Piping-Only Neck": 290,
        "Piping-Neck Sleeve": 390,
        "Double Piping-Neck Sleeve": 600,
        "Triple Piping-Neck Sleeve": 700,
      },
      blouseItemsCutList: {
        "Straight Cut": 0,
        "Cross Cut": 0,
        "Katori Cut": 890,
        "Princess Cut": 890,
      },
    },
  });

  const [pricesToShow, setPricesToShow] = useState({
    salwarMeasurementCheck: { Basic: 890 },
    Pocket: { Pocket: 30 },
    Zip: { Zip: 40 },
    Rope: { Rope: 20 },
    "With Elastic": { "With Elastic": 75 },
    pipingNeckCheck: {
      "Piping-Only Neck": 160,
    },
    pipingNeckSleeveCheck: {
      "Piping-Neck Sleeve": 310,
    },
    liningCheck: {
      "With Lining": 100,
    },

  });
  const [blousePricesToShow, setBlousePricesToShow] = useState({
    salwarMeasurementCheck: { Basic: 890 },
    Pocket: { Pocket: 30 },
    Zip: { Zip: 40 },
    Rope: { Rope: 20 },
    "With Elastic": { "With Elastic": 75 },
    pipingNeckCheck: {
      "Piping-Only Neck": 160,
    },
    pipingNeckSleeveCheck: {
      "Piping-Neck Sleeve": 310,
    },
    liningCheck: {
      "With Lining": 100,
    },
  });

  const [grantTotal, setGrantTotal,grantTotalRef] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0);
  const [todayDate, setTodayDate] = useState("");

  // Counters
  const [salwarCounter, setSalwarCounter, salwarCounterRef] = useState(0);
  const [blouseCounter, setBlouseCounter] = useState(0);
  const [shirtCounter, setShirtCounter] = useState(0)
  const [pantCounter, setPantCounter] = useState(0)

  const [designTeamContentHider, setDesignTeamContentHider] = useState("flex");
  const [orderDetailsPersonalData, setorderDetailsPersonalData] = useState({});





  // ============================================================
  const [gstChecked, setGstChecked] = useState(false);
  const [dcChecked, setDCChecked] = useState(false);
  const [dcTextFieldVisibler, setDCTextFieldVisibler] = useState("none");
  const [dcValue, setDCValue] = useState(0);
  const [payValue, setPayValue] = useState(0);
  const [textBoxDisabler, setTextBoxDisabler] = useState(false);
  const [measurementTextBoxDisabler, setMeasurementTextBoxDisabler] = useState(false);
  const [addBlouseSalwarCardVisibility, setaddBlouseSalwarCardVisibility] = useState("block");
  const [resetBtnVisibility, setResetBtnVisibility] = useState("");

  const [salwarData, setSalwarData, salwarDataRef] = useState([]);
  const [blouseData, setBlouseData, blouseDataRef] = useState([]);
  const [shirtData, setShirtData, shirtDataRef] = useState([]);
  const [pantData, setPantData, pantDataRef] = useState([]);

  const shirtMeasurementList = useMemo(() => { return ["Shirt Length", "Shoulder", "Sleeve Length", "Sleeve Open", "Chest Width", "Collar Length", "Pocket Down"]; }, []);
  const pantMeasurementList = useMemo(() => { return ["Pant Length", "Hip", "Inseam", "Seat", "Thigh Loose", "Knee", "Front Raise", "Back Raise", "Leg Opening"]; }, []);


  const [orderStatus, setorderStatus] = useState("Confirmed");
  const [deliveryDate, setdeliveryDate] = useState("");
  const [deliveryDateEntryError, setDeliveryDateEntryError] = useState(false);

  const [costEstimateFinal, setCostEstimateFinal, costEstimateFinalRef] = useState("");

  const onDCCheckBoxClick = (checked) => {
    setDCChecked(checked)
    if (checked) {
      setDCTextFieldVisibler("")
      return
    }
    setDCTextFieldVisibler("none")
    setDCValue(0)
  }

  const onDCTextFieldValueChange = (value) => {
    if (isNaN(parseInt(value))) {
      setDCValue(0)
      return;
    }
    if (value.length > 10) {
      return;
    }
    setDCValue(value)
  }

  const onPayTextFieldValueChange = (value) => {
    if (isNaN(parseInt(value))) {
      setPayValue(0)
      return;
    }
    if (value.length > 10) {
      return;
    }
    setPayValue(value)
  }
  var salwarOrderIDNos = []
  var blouseOrderIDNos = []

  const newCard = () => {

    return true
  }

  const OnAddSalwarBtnClick = async () => {
    setLoadingModal(true)
    let delayTime = 1000
    let bothSalwarBlouse = [...salwarDataRef.current, ...blouseDataRef.current]
    if (bothSalwarBlouse.length >= 5) {
      delayTime = 2000
    }
    setTimeout(function () {
      setLoadingModal(false)
    }, delayTime)
    if (bothSalwarBlouse.length >= 10) {
      setLoadingModal(false)
      sweetAlertShow("Maximum 10 Dresses are allowed per Order", "warning")
      return;
    }
    setSalwarCounter(salwarCounter + 1);
    for (let k in salwarDataRef.current) {
      let temp = salwarDataRef.current[k]["salwarOrderId"].split("-")[1].replace(/\D/g, "")
      salwarOrderIDNos.push(parseInt(temp))
    }
    salwarOrderIDNos = salwarOrderIDNos.sort()
    let orderIDNo = isNaN(salwarOrderIDNos.slice(-1)[0] + 1) ? 1 : salwarOrderIDNos.slice(-1)[0] + 1
    let salwarOrderId = orderDetailsPersonalData["orderID"] + "-s" + orderIDNo;
    let output = {}

    const salwarMeasurementList = ["Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Arm Hole", "Arm Length", "Arm Circum", "Neck F", "Neck B", "Full Length", "Ankle", "Pant Length", "Side Slit",  "personName"];


    let obj = salwarData.at(-1);
    try {
      let select = (salwarMeasurementList, obj) =>
        salwarMeasurementList.reduce(
          (r, e) => Object.assign(r, obj[e] ? { [e]: obj[e] } : null),
          {}
        );
      output = select(salwarMeasurementList, obj);
    } catch (err) {
      output = {};
    }

    let temp = {
      salwarOrderId: salwarOrderId,
      infoCompletionStatus: false,
      Amount: costs["salwar"]["salwarItemsList"]["Basic"],
      salwarMeasurementCheck: true,
      itemDeliverStatus: "Not Delivered"
    };
    Object.assign(temp, output);

    salwarData.push(temp)
    orderDressBottomComponentRef.current.calculateTotalAmount();
  }

  const OnAddBlouseBtnClick = () => {
    setLoadingModal(true)
    let delayTime = 1000
    let bothSalwarBlouse = [...salwarDataRef.current, ...blouseDataRef.current]
    if (bothSalwarBlouse.length >= 5) {
      delayTime = 2000
    }
    setTimeout(function () {
      setLoadingModal(false)
    }, delayTime)

    if (bothSalwarBlouse.length >= 10) {
      setLoadingModal(false)
      sweetAlertShow("Maximum 10 Dresses are allowed per Order", "warning")
      return;
    }
    setBlouseCounter(blouseCounter + 1);
    for (let k in blouseDataRef.current) {
      let temp = blouseDataRef.current[k]["blouseOrderId"].split("-")[1].replace(/\D/g, "")
      blouseOrderIDNos.push(parseInt(temp))
    }
    blouseOrderIDNos = blouseOrderIDNos.sort()
    let orderIDNo = isNaN(blouseOrderIDNos.slice(-1)[0] + 1) ? 1 : blouseOrderIDNos.slice(-1)[0] + 1
    let blouseOrderId = orderDetailsPersonalData["orderID"] + "-b" + orderIDNo;
    let output = {}
    const blouseMeasurementList =  [ "Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Arm Hole", "Arm Length", "Arm Circum", "Neck F", "Neck B", "Full Length", "Back Length","personName"]
    let obj = blouseData.at(-1);
    try {
      let select = (blouseMeasurementList, obj) =>
      blouseMeasurementList.reduce(
          (r, e) => Object.assign(r, obj[e] ? { [e]: obj[e] } : null),
          {}
        );
      output = select(blouseMeasurementList, obj);
    } catch (err) {
      output = {};
    }



    let temp = { blouseOrderId: blouseOrderId,
      infoCompletionStatus: false,
      Amount: costs["blouse"]["blouseItemsList"]["Basic"],
      blouseMeasurementCheck: true,
      itemDeliverStatus: "Not Delivered" };
    Object.assign(temp, output);
    setBlouseData((prevArray) => [...prevArray, temp]);
    orderDressBottomComponentRef.current.calculateTotalAmount();
  };



  const OnAddShirtBtnClick = () => {
    setShirtCounter(shirtCounter + 1);
    var shirtOrderId =
      orderDetailsPersonalData["orderID"] + "-s" + (shirtCounter + 1);

    let output = {};
    let obj = shirtData[0];
    try {
      let select = (shirtMeasurementList, obj) =>
        shirtMeasurementList.reduce(
          (r, e) => Object.assign(r, obj[e] ? { [e]: obj[e] } : null),
          {}
        );
      output = select(shirtMeasurementList, obj);
    } catch (err) {
      output = {};
    }
    let temp = {
      shirtOrderId: shirtOrderId,
      infoCompletionStatus: false,
      Amount: 300
      // Amount: costs["shirt"]["shirtItemsList"]["Basic"],
    };
    Object.assign(temp, output);

    setShirtData((prevArray) => [...prevArray, temp]);
  };

  const OnAddPantBtnClick = () => {
    setPantCounter(pantCounter + 1);
    var pantOrderId = orderDetailsPersonalData["orderID"] + "-s" + (pantCounter + 1);
    let output = {};
    let obj = pantData[0];
    try {
      let select = (pantMeasurementList, obj) =>
        pantMeasurementList.reduce(
          (r, e) => Object.assign(r, obj[e] ? { [e]: obj[e] } : null),
          {}
        );
      output = select(pantMeasurementList, obj);
    } catch (err) {
      output = {};
    }
    let temp = {
      pantOrderId: pantOrderId,
      infoCompletionStatus: false,
      Amount: 400,
      // Amount: costs["pant"]["pantItemsList"]["Basic"],
    };
    Object.assign(temp, output);
    setPantData((prevArray) => [...prevArray, temp]);
  };

  const generateBillData = (salwarDataForCalc, blouseDataForCalc) => {
    const billDataToTrim = [...salwarDataForCalc, ...blouseDataForCalc];
    var SandB = [];
    for (let i = 0; i < billDataToTrim.length; i++) {
      billDataToTrim[i]["salwarOrderId"] !== undefined
        ? SandB.push(billDataToTrim[i]["salwarOrderId"])
        : SandB.push(billDataToTrim[i]["blouseOrderId"]);
    }
    var SorB = [];
    for (let i = 0; i < SandB.length; i++) {
      var ord = SandB[i];
      var s = ord.split("-")[1];
      if (s[0] === "s") {
        SorB.push("Salwar");
      } else {
        SorB.push("Blouse");
      }
    }
    var addingData = billDataToTrim.map((text, index) => ({
      ...text,
      no: index + 1,
      dressId: SandB[index],
      quantity: 1,
      descripition: SorB[index],
      price: text.Amount,
    }));
    var trimData = [];
    for (let i = 0; i < addingData.length; i++) {
      const picked = (({ no, dressId, quantity, descripition, price }) => ({ no, dressId, quantity, descripition, price }))(addingData[i]);
      trimData.push(picked);
    }
    return trimData;
  };

  const getFinalAmount = (OrderDatas) => {
    let a = [];
    OrderDatas.map((row) => a.push(row.price));
    let c = a.reduce((a, b) => a + b, 0);
    return c;
  };

  const onDeliveryDateChange = (e) => {
    setDeliveryDateEntryError(false)
    setdeliveryDate(e.target.value)
    orderDressBottomComponentRef.current.calculateTotalAmount();
  }

  const createDataForSavePreview = (itemName, itemContent)  =>{
    return {
      itemName,
      itemQuantity: itemName==="Salwar"||itemName==="Blouse"?itemContent.length:"-",
      itemPrice:(itemName==="Salwar"||itemName==="Blouse")? (itemContent.map((text)=>{
         return text.Amount
     })).reduce((partialSum, a) => partialSum + a, 0):itemContent ,
     dressDatas:itemName==="Salwar"||itemName==="Blouse"? itemContent.map((text)=>{
         return ({
          "dressID": itemName==="Salwar"?text.salwarOrderId:text.blouseOrderId,
          "dressStatus": text.itemDeliverStatus,
          "dressAmount": text.Amount
        })
     }):[]
    };
  }

  const onSaveDialogBtnClick = () => {
    setSavePreviewDataDialog(false)
    setLoadingModal(true)
    setLoadingModalText("Saving Order... Please be patient...")
    axios
        .post(Helpers().apiURL + "/addOrder", dataToSave)
        .then((response) => {
          setLoadingModal(false)
          if (response.data.message === "DataStored") {
            swal.fire({ title: `Order Details Added Successfully`, text: "", icon: "success", confirmButtonColor: "#3085d6", cancelButtonColor: "#d33" })
              .then((willWarn) => {
                if (willWarn.isConfirmed) {
                  navigate('/orderDetailPage', { state: { userName: "Shop Owner", tohide: "", prevPage:0,prevOrderStatus:"All",prevSearchQuery:"" } });
                }
              })
              .catch(function (response) {
                sweetAlertShow("Server Down", "warning");
              });
          } else {
            sweetAlertShow("Server Down", "warning");
          }
        });
  }

  const onSaveBtnClick = (text) => {
    orderDressBottomComponentRef.current.calculateTotalAmount();
    let bothSalwarBlouseData = [...salwarDataRef.current, ...blouseDataRef.current, ...shirtDataRef.current, ...pantDataRef.current]

    for (let u in bothSalwarBlouseData) {
      let infoCheck = bothSalwarBlouseData[u]["infoCompletionStatus"]
      if (!infoCheck) {
        setAllInfoCompletionStatus(false)
        break
      }
      else {
        setAllInfoCompletionStatus(true)
      }
    }
    if (salwarData.length === 0 && blouseData.length === 0 && shirtData.length === 0 && pantData.length === 0) {
      sweetAlertShow("Please Add Salwar/Blouse", "warning");
      setLoadingModal(false)
      return;
    } else if (deliveryDate === "") {
      setLoadingModal(false)
      setDeliveryDateEntryError(true)
      sweetAlertShow("Please Enter Delivery Date", "warning");

      return;
    } else if (orderStatus === "") {
      setLoadingModal(false)
      sweetAlertShow("Please select Order Status", "warning");
      return;
    }

    var trimData = generateBillData(salwarData, blouseData);
    var FinalAmount = getFinalAmount(trimData);

    let dataToSave = {
      orderID: orderDetailsPersonalData["orderID"],
      orderDate: orderDetailsPersonalData["orderDate"],
      name: orderDetailsPersonalData["name"],
      mobNo: orderDetailsPersonalData["mobNo"],
      deliveryDate: deliveryDate,
      orderStatus: orderStatus,
      salwarCount: salwarCounter,
      blouseCount: blouseCounter,
      shirtCount: shirtCounter,
      pantCount: pantCounter,
      salwarData: salwarData,
      blouseData: blouseData,
      shirtData: shirtData,
      pantData: pantData,
      gst: gstChecked,
      dcStatus: dcChecked,
      dcAmount: dcValue,
      payAmount: payValue,
      "allInfoCompletionStatus": allInfoCompletionStatusRef.current,
      finalAmount: parseInt(FinalAmount),
      grandTotal: parseInt(grantTotalRef.current),
      fullPaymentReceived: payValue < parseInt(totalAmount) ? false : true
    };
    setDataToSave(dataToSave)
    setLoadingModal(false)

    let tempSavePreviewData = [
      createDataForSavePreview("Salwar", dataToSave["salwarData"]),
      createDataForSavePreview("Blouse", dataToSave["blouseData"]),
      createDataForSavePreview("Total Amount", dataToSave["finalAmount"]),
      createDataForSavePreview("GST",dataToSave["gst"]?(dataToSave["finalAmount"]*18)/100:0),
      createDataForSavePreview("Discount",dataToSave["dcStatus"]?dataToSave["dcAmount"]:0),
      createDataForSavePreview("GrantTotal", dataToSave["grandTotal"]),
      ]

    let filteredTempSavePreviewData = tempSavePreviewData.filter((data)=>{
      return data["itemPrice"] !==0
    })
    setSavePreviewData(filteredTempSavePreviewData)
    setSavePreviewDataDialog(true)
    return
  };

  const getDataByOrderID = (orderID, dress) => {
    if (dress === "salwar") {
      return salwarDataRef.current.find(el => el.salwarOrderId === orderID);
    }
    else {
      return blouseDataRef.current.find(el => el.blouseOrderId === orderID);
    }
  }

  const formatDate = (date) => {
    var a = new Date(date);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];
    var formattedDate =
      a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear();
    return formattedDate;
  };

  const orderDateDisplayFormat = (date) => {
    var formattedDate = "";
    try {
      var splittedDate = date.split("T")[0];
      formattedDate = formatDate(splittedDate);
    } catch (err) {
      formattedDate = "";
    }
    return formattedDate;
  };

  const setAllOrderData = (allOrderDetailsData) => {
    setorderDetailsPersonalData(allOrderDetailsData);
    setSalwarData(allOrderDetailsData.salwarData);
    setBlouseData(allOrderDetailsData.blouseData);
    setShirtData(allOrderDetailsData.shirtData);
    setPantData(allOrderDetailsData.pantData);
    setdeliveryDate(allOrderDetailsData.deliveryDate.split("T")[0]);
    setorderStatus(allOrderDetailsData.orderStatus);
    setSalwarCounter(allOrderDetailsData.salwarData.length);
    setBlouseCounter(allOrderDetailsData.blouseData.length);
    setDCChecked(allOrderDetailsData.dcStatus)
    setDCValue(allOrderDetailsData.dcAmount)
    setPayValue(allOrderDetailsData.payAmount)
    // setShirtCounter(allOrderDetailsData.shirtData.length);
    // setPantCounter(allOrderDetailsData.pantData.length);
    setGstChecked(allOrderDetailsData.gst);
    if (mode === "view") {
      setaddBlouseSalwarCardVisibility("none");
      setTextBoxDisabler(true);
      setMeasurementTextBoxDisabler("");
    }
    if (allOrderDetailsData.dcStatus) {
      setDCTextFieldVisibler("")
    }
  };

  const getSalwarBlouseCostData = () => {
    var dataToSend = { user: "admin" };
    try {
      axios
        .post(Helpers().apiURL + "/viewBlouseSalwarLastInsert", dataToSend)
        .then(function (response) {
          let input = response.data.message;
          if (response.data.message.length === 0) {
            sweetAlertShow("Please Fill Rates in Rate Updater Page", "warning")
            return;
          }

          let formattedCost = {
            salwar: {
              dateTime: input[0].dateTime,
              salwarId: input[0].salwarId,
              salwarItemsList: {
                Basic: input[0].salwarCost.Basic,
              },
              salwarItemsLiningList: {
                "With Lining": input[0].salwarCost["With Lining"],
                "Without Lining": input[0].salwarCost["Without Lining"],
              },
              salwarItemsUtilitiesList: {
                Pocket: input[0].salwarCost["Pocket"],
                Rope: input[0].salwarCost["Rope"],
                Zip: input[0].salwarCost["Zip"],
                "With Elastic": input[0].salwarCost["With Elastic"],
              },
              salwarItemsPipingList: {
                "Piping-Only Neck": input[0].salwarCost["Piping - Neck"],
                "Piping-Neck Sleeve": input[0].salwarCost["Piping - Neck Sleeve"],
                "Side Slit": input[0].salwarCost["Side Slit"]
              },
              salwarItemsNeckList: {
                "Boat - Neck": input[0].salwarCost["Boat - Neck"],
                "Collar - Neck": input[0].salwarCost["Collar - Neck"],
              },
              salwarItemsPantList: {
                "Parallel Elastic|Belt": input[0].salwarCost["Parallel Elastic|Belt"],
              }

            },
            blouse: {
              dateTime: input[1].dateTime,
              blouseId: input[1].blouseId,
              blouseItemsList: {
                Basic: input[1].blouseCost.Basic,
              },
              blouseItemsLiningList: {
                "With Lining": input[1].blouseCost["With Lining"],
                "Without Lining": input[1].blouseCost["Without Lining"],
              },
              blouseItemsUtilitiesList: {
                Rope: input[1].blouseCost["Rope"],
                Zip: input[1].blouseCost["Zip"],
                "Saree Falls": input[1].blouseCost["Saree Falls"],
                "Tazzles": input[1].blouseCost["Tazzles"],
              },
              blouseItemsPipingList: {
                "Piping-Only Neck": input[1].blouseCost["Piping - Neck"],
                "Piping-Neck Sleeve":
                  input[1].blouseCost["Piping - Neck Sleeve"],
                "Double Piping-Neck Sleeve":
                  input[1].blouseCost["Double Piping - Neck Sleeve"],
                "Triple Piping-Neck Sleeve":
                  input[1].blouseCost["Trible Piping - Neck Sleeve"],
              },
              blouseItemsCutList: {
                "Straight Cut": input[1].blouseCost["Straight Cut"],
                "Cross Cut": input[1].blouseCost["Cross Cut"],
                "Katori Cut": input[1].blouseCost["Katori Cut"],
                "Princess Cut": input[1].blouseCost["Princess Cut"],
              },
              blouseItemsNeckList: {
                "Boat - Neck": input[1].blouseCost["Boat - Neck"],
                "Collar - Neck": input[1].blouseCost["Collar - Neck"],
              }
            },
          };

          setCosts(formattedCost);

          setPricesToShow({
            salwarMeasurementCheck: { Basic: input[0].salwarCost.Basic },
            Pocket: { Pocket: input[0].salwarCost["Pocket"] },
            Zip: { Zip: input[0].salwarCost["Zip"] },
            Rope: { Rope: input[0].salwarCost["Rope"] },
            "With Elastic": {
              "With Elastic": input[0].salwarCost["With Elastic"],
            },
            pipingNeckCheck: {
              "Piping-Only Neck": input[0].salwarCost["Piping - Neck"],
            },
            pipingNeckSleeveCheck: {
              "Piping-Neck Sleeve": input[0].salwarCost["Piping - Neck Sleeve"],
            },
            pipingSideSlitCheck: {
              "Side Slit": input[0].salwarCost["Side Slit"],
            }
            ,
            liningCheck: {
              "With Lining": input[0].salwarCost["With Lining"],
            },
            boatNeckCheck: {
              "Boat Neck": input[0].salwarCost["Boat - Neck"],
            },
            collarNeckCheck: {
              "Collar Neck": input[0].salwarCost["Collar - Neck"],
            },
            parallelElasticBeltCheck: {
              "Parallel Elastic|Belt": input[0].salwarCost["Parallel Elastic|Belt"],
            }

          });

          setBlousePricesToShow({
            blouseMeasurementCheck: { Basic: input[1].blouseCost.Basic },
            Zip: { Zip: input[1].blouseCost["Zip"] },
            Rope: { Rope: input[1].blouseCost["Rope"] },
            "Saree Falls": { "Saree Falls": input[1].blouseCost["Saree Falls"] },
            "Tazzles": { "Tazzles": input[1].blouseCost["Tazzles"] },

            pipingNeckCheck: {
              "Piping-Only Neck": input[1].blouseCost["Piping - Neck"],
            },
            pipingNeckSleeveCheck: {
              "Piping-Neck Sleeve": input[1].blouseCost["Piping - Neck Sleeve"],
            },
            pipingDoubleSleeveCheck: {
              "Double Piping - Neck Sleeve": input[1].blouseCost["Double Piping - Neck Sleeve"],
            },
            pipingTripleSleeveCheck: {
              "Trible Piping - Neck Sleeve": input[1].blouseCost["Trible Piping - Neck Sleeve"],
            },
            liningCheck: {
              "With Lining": input[1].blouseCost["With Lining"],
            },
            cutKatori: {
              "Katori Cut": input[1].blouseCost["Katori Cut"],
            },
            cutBoat: {
              "Boat Neck": input[1].blouseCost["Boat Neck"],
            },
            cutPrincess: {
              "Princess Cut": input[1].blouseCost["Princess Cut"],
            },
            boatNeckCheck: {
              "Boat Neck": input[1].blouseCost["Boat - Neck"],
            },
            collarNeckCheck: {
              "Collar Neck": input[1].blouseCost["Collar - Neck"],
            }
          });
        });
    } catch (err) {
      alert("server down");
    }
  };


  const sweetAlertShow = useCallback((message, mode) => {
    swal.fire({ title: message, text: "", icon: mode, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33" })
      .then((willWarn) => {
        if (willWarn.isConfirmed) {
          if (message === "Please Fill Rates in Rate Updater Page") {
            handleBackBtn();
            return;
          }
          else {
            return;
          }
        }
      });
  }, [])

  const sweetAlertShowWithText = useCallback((message, text,mode) => {
    swal.fire({ title: message, text: text, icon:mode ,confirmButtonColor: "#3085d6", cancelButtonColor: "#d33" })
      .then((willWarn) => {
        if (willWarn.isConfirmed) {
          if (message === "Please Fill Rates in Rate Updater Page") {
            handleBackBtn();
            return;
          }
          else {
            return;
          }
        }
      });
  }, [])

  const handleBackBtn = () => {
    if (mode === "view" || mode === "edit") {
      navigate(-1);
      return
    }
    else {
      swal.fire({
        title: `Are you sure to go back ?`,
        text: "Changes you made so far will not be saved",
        icon: "warning",
        dangerMode: true,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((willWarn) => {
        if (willWarn.isConfirmed) {
          var datatoSend = { user: "admin", orderID: orderDetailsPersonalData["orderID"] }
          // return
          axios.post(Helpers().apiURL + "/removeOrderID", datatoSend).then((res) => {
            navigate(-2);
          });
        }
      });
    }
  };

  const onSalwarDataChange = (index, item) => {
    salwarData[index] = item
  }

  const onBlouseDataChange = (index, item) => {
    blouseData[index] = item
  }

  const getNotDeliveredDressIds = () => {
    let allDressDatas = salwarDataRef.current.concat(blouseDataRef.current).concat(shirtData).concat(pantData);
    setAllItemDelivered(allDressDatas.filter(e => e.itemDeliverStatus === "Not Delivered").length === 0 ? true : false)
    let notDeliveredDressDatas = allDressDatas.filter(e => e.itemDeliverStatus === "Not Delivered")
    let notDeliveredDressIDs = notDeliveredDressDatas.map((text)=>{
      return text.salwarOrderId ||text.blouseOrderId
    })
    return notDeliveredDressIDs
  }


  const orderStatusSetter = (value) => {
    if(value === "Delivered"){
      if(payValue < parseInt(totalAmount)){
        // alert("The Customer hasn't paid the full Amount Yet. Please make the Payment")
        sweetAlertShowWithText("Amount Not Paid","The Customer hasn't paid the full Amount Yet. Please make the Payment", "warning")
        return
      }
      let dressIDs = getNotDeliveredDressIds()
      if (dressIDs.length !==0){
        sweetAlertShowWithText("Dresses not Delivered","Please Deliver "+dressIDs +" Dresses", "warning")
        return
      }
    }
    setorderStatus(value)
  }


  useEffect(() => {
    console.log("costEstimateFinal changed!!")
  }, [costEstimateFinal]);

  useEffect(() => {
    orderDressBottomComponentRef.current.calculateTotalAmount();
    let allDressDatas = salwarData.concat(blouseData).concat(shirtData).concat(pantData);
    // DeliverCheck
    setAllItemDelivered(allDressDatas.filter(e => e.itemDeliverStatus === "Not Delivered").length === 0 ? true : false)
    var calculate = 0;
    for (let i = 0; i < allDressDatas.length; i++) {
      calculate = allDressDatas[i].Amount + calculate;
    }

    if (gstChecked) {
      let gstAmount = Math.round((calculate * 18) / 100)
      calculate = calculate + gstAmount;

    }
    if (dcValue !== "") {
      calculate = calculate - parseInt(dcValue);
    }
    setTotalAmount(calculate);
  }, [salwarData, blouseData, shirtData, pantData, dcValue, gstChecked]);




  useEffect(() => {
    getSalwarBlouseCostData();
    if (userName === "Designing Team") {
      setDesignTeamContentHider("none");
    }

    var date = orderDetailsData["orderDate"]
    // var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    var result = date.split("T")[0];
    setTodayDate(result);

    try {
      if (mode === "view") {
        setAllOrderData(orderDetailsData);
        setResetBtnVisibility("none")
      }
      else if (mode === "edit") {
        setAllOrderData(orderDetailsData);
      }
      else {
        setorderDetailsPersonalData(orderDetailsData);
      }
    } catch (err) {
      navigate("/");
    }
  }, []);


  const classes = useStyles();

  return (
    <div style={{ display: "flex", backgroundColor: "green", height: "100vh", flexDirection: "column", flex: 1 }}>

      {/* First Block */}
      <div style={{ backgroundColor: colorCode, width: "100%" }}>
        <div style={{ padding: "0.3%" }}>
          <Card variant="elevation" elevation={5} className={classes.topBarContainer}>
            <TextField margin="dense" InputProps={{ className: classes.topBarText }} InputLabelProps={{
              className: classes.topBarTextLabel
            }} size="small" inputProps={{ readOnly: true }} className={classes.textFieldCD} value={orderDetailsPersonalData["orderID"]} variant="outlined" style={{ marginTop: "5px", marginBottom: "5px", width: 100 }} label="Order Id" />
            <TextField size="small" InputProps={{ className: classes.topBarText }} InputLabelProps={{
              className: classes.topBarTextLabel
            }} inputProps={{ readOnly: true }} className={classes.textFieldCD} value={orderDateDisplayFormat(orderDetailsPersonalData["orderDate"])} variant="outlined" style={{ marginTop: "5px", marginBottom: "5px", width: 120 }} label="Order Date" />
            <TextField size="small" InputProps={{ className: classes.topBarText }} inputProps={{ readOnly: true }}
              InputLabelProps={{ className: classes.topBarTextLabel }} className={classes.textFieldCD} value={orderDetailsPersonalData["name"]} variant="outlined" style={{ marginTop: "5px", marginBottom: "5px" }} label="Name" />
            <TextField size="small" InputProps={{ className: classes.topBarText }} inputProps={{ readOnly: true }}
              InputLabelProps={{ className: classes.topBarTextLabel }}
              className={classes.textFieldCD} value={orderDetailsPersonalData["mobNo"]} variant="outlined" style={{ marginTop: "5px", marginBottom: "5px" }} label="Mobile No" />
            <TextField error={deliveryDateEntryError} 
            size="small" 
            InputProps={{ className: classes.topBarText }} 
            disabled={textBoxDisabler} className={classes.textFieldCD} value={deliveryDate} InputLabelProps={{ shrink: true, className: classes.topBarTextLabel }} 
            inputProps={{ min: todayDate }} onChange={(e) => { onDeliveryDateChange(e) }} variant="outlined" type="date" style={{ marginTop: "5px", marginBottom: "5px", width: 170 }} label="Delivery Date" />

            <FormControl size="small" className={classes.selectText} variant="outlined" style={{ minWidth: "150px", marginTop: "5px", marginBottom: "5px" }}>
              <InputLabel className={classes.topBarTextLabel}>Order Status</InputLabel>
              <Select className={classes.topBarText} disabled={textBoxDisabler} label="Order Status" value={orderStatus} onChange={(e) => orderStatusSetter(e.target.value)}>
                <MenuItem style={{ color: "#2940D3" }} value="Confirmed"><Typography className={classes.selectText}>Confirmed</Typography></MenuItem>
                <MenuItem style={{ color: "#D83A56" }} value="Processing"><Typography className={classes.selectText}>Processing</Typography></MenuItem>
                <MenuItem style={{ color: "#B24080" }} value="Ready"><Typography className={classes.selectText}>Ready</Typography></MenuItem>
                <MenuItem style={{ color: "#116530" }} value="Delivered"   ><Typography className={classes.selectText}>Delivered</Typography></MenuItem>
              </Select>
            </FormControl>

            <div >
              <TextField disabled={textBoxDisabler ? textBoxDisabler : orderStatus === "Delivered" ? true : false}
                InputLabelProps={{ className: classes.topBarTextLabel }}
                InputProps={{ className: classes.topBarText, startAdornment: <InputAdornment position="start">₹ </InputAdornment>, }}
                size="small" className={classes.textFieldCD} value={payValue === 0 ? "" : payValue} onChange={(e) => { onPayTextFieldValueChange(e.target.value) }} variant="outlined" style={{ marginTop: "5px", marginBottom: "5px", width: 120 }} label="Paid Amount" />
            </div>

            <Typography className={classes.topBarText}>
              <Checkbox
                style={{ color: "#BA7729" }}
                disabled={textBoxDisabler ? textBoxDisabler : orderStatus === "Delivered" ? true : false}
                checked={gstChecked}
                onChange={(e) => { setGstChecked(e.target.checked); }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              GST
            </Typography>

            <Typography className={classes.topBarText}>
              <Checkbox
                style={{ color: "#BA7729" }}
                disabled={textBoxDisabler ? textBoxDisabler : orderStatus === "Delivered" ? true : false}
                checked={dcChecked}
                onChange={(e) => { onDCCheckBoxClick(e.target.checked) }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              DC
            </Typography>

            <div style={{ display: dcTextFieldVisibler }}>
              <TextField disabled={textBoxDisabler ? textBoxDisabler : orderStatus === "Delivered" ? true : false}
                InputLabelProps={{ className: classes.topBarTextLabel }}
                InputProps={{ className: classes.topBarText, startAdornment: <InputAdornment position="start">₹ </InputAdornment>, }}
                size="small" className={classes.textFieldCD} value={dcValue === 0 ? "" : dcValue} onChange={(e) => { onDCTextFieldValueChange(e.target.value) }} variant="outlined" style={{ marginTop: "5px", marginBottom: "5px", width: 120 }} label="Discount" />
            </div>
          </Card>

          <div style={{ paddingTop: 10, display: "flex", justifyContent: "center", alignItems: "center", display: addBlouseSalwarCardVisibility, backgroundColor: Colors.ORDER_MAIN_COLOR, textAlign: "center", }}            >
            <Badge
              badgeContent={
                <div style={{ backgroundColor: Colors.SALWAR_LIGHT_COLOR, fontSize: 12, color: Colors.SALWAR_COLOR, padding: 2, paddingBottom: 6, borderRadius: 5, width: 10, height: 10 }}>
                  <Typography style={{ fontSize: 10 }}>
                    {salwarDataRef.current.length}
                  </Typography>
                </div>
              }
            >
              <Button
                onClick={OnAddSalwarBtnClick}
                disabled={loadingModal ? true : false}
                variant="contained"
                startIcon={<img
                  alt="salwarBtn"
                  style={{ width: "18px", filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(162deg) brightness(105%) contrast(102%)", }}
                  src={salwarSVG}
                />}
                style={{ color: "white", background: salwarColorCode, fontWeight: "bold", }}
              >
                Add Salwar
              </Button>
            </Badge>
            <Badge
              badgeContent={
                <div style={{ backgroundColor: Colors.BLOUSE_LIGHT_COLOR, fontSize: 12, color: Colors.BLOUSE_COLOR, padding: 2, paddingBottom: 6, borderRadius: 5, width: 10, height: 10 }}>
                  <Typography style={{ fontSize: 10 }}>
                    {blouseDataRef.current.length}
                  </Typography>
                </div>
              }
            >
              <Button
                onClick={OnAddBlouseBtnClick}
                variant="contained"
                startIcon={<img
                  alt="blouseBtn"
                  style={{ width: "18px", filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(162deg) brightness(105%) contrast(102%)", }}
                  src={blouseSVG}
                />}
                style={{ color: "white", background: blouseColorCode, fontWeight: "bold", marginLeft: 50 }}
              >
                Add Blouse
              </Button>
            </Badge>

            {/* <Button onClick={OnAddShirtBtnClick} variant="contained" style={{ color: "white", background: shirtColorCode, margin: "0.5%", width: "200px", fontWeight: "bold", fontSize: "14px" }} >
              <img
              alt = "shirtBtn"
                style={{ width: "18px", marginRight: "15px", filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(162deg) brightness(105%) contrast(102%)", }}
                src={shirtSVG}
              />{" "}
              Add Shirt
            </Button>

            <Button onClick={OnAddPantBtnClick} variant="contained" style={{ color: "white", background: pantColorCode, margin: "0.5%", width: "200px", fontWeight: "bold", fontSize: "14px", }} >
              <img
                alt = "pantBtn"
                style={{ width: "18px", marginRight: "15px", filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(162deg) brightness(105%) contrast(102%)", }}
                src={pantSVG}
              />{" "}
              Add Pant
            </Button> */}
          </div>
        </div>

      </div>
      {/* Second Block */}

      <div style={{ background: bgColor, display: "block", overflow: "auto", flex: 1 }}>

        {salwarDataRef.current.map((salwarDataObj, mainIndex) =>
          <SalwarDressComponent key={salwarDataObj.salwarOrderId} id={salwarDataObj.salwarOrderId} salwarDataObj={salwarDataObj} mainIndex={mainIndex}
            mode={mode} designTeamContentHider={designTeamContentHider}
            salwarPrevRegNames={orderDetailsPersonalData["salwarPersons"]}
            salwarData={salwarData} setSalwarData={setSalwarData}
            salwarCounter={salwarCounter} setSalwarCounter={setSalwarCounter}
            costs={costs} pricesToShow={pricesToShow}
            mobNo={orderDetailsPersonalData["mobNo"]}
            sweetAlertShow={sweetAlertShow}
            salwarDataRef={salwarDataRef}
            onSalwarDataChange={onSalwarDataChange}
          />
        )}

        {blouseData.map((blouseDataObj, blousemainIndex) => {
          return (
            <div key={blouseDataObj["blouseOrderId"]}>
              <BlouseDressComponent key={blouseDataObj.blouseOrderId} id={blouseDataObj.blouseOrderId} blouseDataObj={blouseDataObj} blousemainIndex={blousemainIndex}
                mode={mode} designTeamContentHider={designTeamContentHider}
                blousePrevRegNames={orderDetailsPersonalData["blousePersons"]}
                blouseData={blouseData} setBlouseData={setBlouseData}
                blouseCounter={blouseCounter} setBlouseCounter={setBlouseCounter}
                costs={costs} blousePricesToShow={blousePricesToShow}
                mobNo={orderDetailsPersonalData["mobNo"]}
                sweetAlertShow={sweetAlertShow}
                blouseDataRef={blouseDataRef}
                onBlouseDataChange={onBlouseDataChange}

              />
            </div>
          );
        })}

        {shirtData.map((shirtDataObj, shirtIndex) => {
          return (
            <div key={shirtDataObj["shirtOrderId"]}>
              <ShirtDressComponent shirtDataObj={shirtDataObj} shirtIndex={shirtIndex}
                mode={mode} designTeamContentHider={designTeamContentHider}
                shirtPrevRegNames={orderDetailsPersonalData["shirtPersons"]}
                shirtData={shirtData} setShirtData={setShirtData}
                shirtCounter={shirtCounter} setShirtCounter={setShirtCounter}
                costs={costs}
                mobNo={orderDetailsPersonalData["mobNo"]}
                sweetAlertShow={sweetAlertShow}
                shirtDataRef={shirtDataRef}
              />
            </div>
          )
        })}

        {pantData.map((pantDataObj, pantIndex) => {
          return (
            <PantDressComponent pantDataObj={pantDataObj} pantIndex={pantIndex}
              mode={mode} designTeamContentHider={designTeamContentHider}
              pantPrevRegNames={orderDetailsPersonalData["pantPersons"]}
              pantData={pantData} setPantData={setPantData}
              pantCounter={pantCounter} setPantCounter={setPantCounter}
              costs={costs}
              mobNo={orderDetailsPersonalData["mobNo"]}
              sweetAlertShow={sweetAlertShow}
              pantDataRef={pantDataRef}

            />
          )
        })}
      </div>

      {/* Third Block */}

      <OrderDressBottomComponent
        key={salwarDataRef.current}
        orderID={orderDetailsPersonalData["orderID"]} onSaveBtnClick={onSaveBtnClick}
        mode={mode}
        totalAmount={totalAmount}
        salwarData={salwarData}
        salwarDataRef = {salwarDataRef}
        blouseData = {blouseData}
        blouseDataRef = {blouseDataRef}
        dcValue = {dcValue}
        gstChecked = {gstChecked}
        setGrantTotal = {setGrantTotal}
        grantTotal = {grantTotal}
        ref = {orderDressBottomComponentRef}
        userName = {userName}
        prevPage = {prevPage}
        prevOrderStatus = {prevOrderStatus}
        prevSearchQuery = {prevSearchQuery}

      />

      <Modal
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={loadingModal}
      // onClose={handleClose}
      // aria-labelledby="simple-modal-title"
      // aria-describedby="simple-modal-description"
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 10, backgroundColor: "white" }}>
          <CircularProgress style={{ color: Colors.ORDER_MAIN_COLOR }} />
          <Typography style={{ color: Colors.ORDER_MAIN_COLOR }}>{loadingModalText}</Typography>
        </div>
      </Modal>

      <Dialog  fullWidth   onClose={()=>{setSavePreviewDataDialog(false)}} open={savePreviewDataDialog}>
        <DialogTitle style={{backgroundColor:Colors.ORDER_MAIN_COLOR, color:"white"}} >
          Save this Order {orderDetailsPersonalData["orderID"]}
        </DialogTitle>
        <DialogContent dividers>

          <TableContainer>
            <Table  >
              <TableHead>
                <TableRow>
                  <TableCell/>
                  <TableCell>Items</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {savePreviewData.map((row) => (
                  <Row key={row} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </DialogContent>
        <DialogActions style={{backgroundColor:Colors.ORDER_LIGHT_COLOR}}>
          <Button style={{fontSize: 14,  width: 120, height: "35px", marginLeft: "5%"}} variant = "outlined" onClick={()=>{setSavePreviewDataDialog(false)}} autoFocus>
            Cancel
          </Button>
          <Button onClick={onSaveDialogBtnClick}  variant="contained"  autoFocus color="primary"
          style={{ fontSize: 14, backgroundColor: Colors.ORDER_MAIN_COLOR, width: 120, height: "35px", marginLeft: "5%" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

function Row(props) {
  const { row } = props;
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            size="small"
            style={{
              display:
                row.itemName === "Salwar" || row.itemName === "Blouse"
                  ? ""
                  : "none"
            }}
            onClick={() => setDropOpen(!dropOpen)}
          >
            {dropOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">   {row.itemName}  </TableCell>
        <TableCell align="right">{row.itemQuantity}</TableCell>
        <TableCell align="right">{row.itemPrice}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={dropOpen} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography style={{fontFamily:Fonts.UBUNTU, fontSize:16, color:row.itemName === "Salwar"?Colors.SALWAR_COLOR:Colors.BLOUSE_COLOR}} gutterBottom component="div">
                {row.itemName === "Salwar"
                  ? "Salwar Dresses"
                  : "Blouse Dresses"}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Dress ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.dressDatas.map((historyRow) => (
                    <TableRow key={historyRow.dressID}>
                      <TableCell component="th" scope="row">
                        {historyRow.dressID}
                      </TableCell>
                      <TableCell>{historyRow.dressStatus}</TableCell>
                      <TableCell align="right">
                        {historyRow.dressAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}