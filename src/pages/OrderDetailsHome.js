import { Modal, InputBase, ListItemText, Menu, IconButton, Button, Avatar, InputAdornment, makeStyles, withStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableHead, TableRow, Chip, Card, FormControl, InputLabel, Select, MenuItem, Typography, Tooltip, } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useRef, useLayoutEffect, useMemo } from "react";
import axios from "axios";
import AppbarHead from '../AppbarHead'
import SendIcon from "@material-ui/icons/Send";
import { useNavigate, useLocation } from "react-router";
import ConfirmedIcon from "@material-ui/icons/Done";
import ProccessIcon from "@material-ui/icons/Cached";
import ReadIcon from '@material-ui/icons/LocalMall';
import DeliveryIcon from "@material-ui/icons/DoneAll";
import PrintIcon from '@material-ui/icons/Print';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Helpers from '../Helpers'
import PhoneIcon from '@material-ui/icons/Phone';
import Zoom from '@material-ui/core/Zoom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import GetAppIcon from '@material-ui/icons/GetApp';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import AddIcon from '@material-ui/icons/Add';
import swal from "sweetalert2";
import useState from 'react-usestateref'
import ReactExport from "react-data-export";
import Footer from '../components/Footer';
import ServerError from '../images/logo/serverError.svg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import WarningIcon from '@material-ui/icons/Warning';

import store from "store2";
import Stack from '@mui/material/Stack';
import Pagination from '@material-ui/lab/Pagination';
import LootieNoData from '../images/imgOrderDetails/noData.json'
import LootieAddCustomer from '../images/imgOrderDetails/newCustomers.json'
import Lottie from "lottie-react";
import AddOrderDialogContent from "../components/AddOrderDialogContent";

import { decodeToken, isExpired } from "react-jwt";
import { SessionChecker } from "../utils/SessionChecker";
import { Fonts, Colors, APIClient } from "../constants";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const bgColor = "#f1dbc0"
const colorCode = "#DE834D";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Colors.ORDER_MAIN_COLOR,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


const useStyles = makeStyles((theme) => ({

  selectedPageNoColor: {
    '& .MuiPaginationItem-root': {
      '&.Mui-selected': {
        background: Colors.ORDER_MAIN_COLOR,
        color: 'white',
        // borderRadius: '50%',
      },

    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  appBarStyle: {
    display: "flex",
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: Colors.ORDER_MAIN_COLOR,
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#00adb5 !important",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

  serverDownImage: {
    height: '40%', width: '40%',
    [theme.breakpoints.down('sm')]: {
      height: '60%', width: '60%'
    }
  },
  serverDownHeadText: {
    [theme.breakpoints.down('sm')]: {
      display: "block",
      fontSize: "1.87em",
      marginTop: "1em",
      marginBottom: "0.5em",
      marginLeft: 0,
      marginRight: 0,
      fontWeight: "bold"
    }
  },
  serverDownSubText: {
    display: 'flex', textAlign: 'center'
  },

  dropDown: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: Colors.ORDER_MAIN_COLOR,
    }
  },

  headFontSize: {
    color: "white",
    fontWeight: "500",
    fontFamily: Fonts.UBUNTU,
    fontSize: 14,

    [theme.breakpoints.up('xl')]: {
      fontSize: 16
    }
  },

  tableContentSize: {
    marginLeft: "1%",
    fontSize: 12,
    fontFamily: Fonts.LATO,
    [theme.breakpoints.down('lg')]: {
      fontSize: 14,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 16,
    }

  },
  tableMobContentSize: {

    fontSize: 12,
    fontFamily: Fonts.LATO,
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    }
  },

  hidingAction: {
    [theme.breakpoints.up('xl')]: {
      display: 'none'
    }
  },
  textFieldLabel: {
    fontFamily: Fonts.LATO
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


  fourIconHid: {
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  mainContainer: {
    backgroundColor: Colors.ORDER_LIGHT_COLOR, overflow: "hidden", minHeight: "96.8vh", maxWidth: "100vw"

  },
  subContainer1: {
    marginBottom: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", paddingLeft: "1%", paddingRight: "1%", paddingTop: "2%",
  },
  retryBtn: {
    width: '150px', backgroundColor: '#BA7729', color: 'white', marginTop: "2%",
    "&:hover": {
      backgroundColor: '#BA7729',
    },

  },
  headerBP:
  {
    marginRight: "3%", height: 40, display: "flex", alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flex: 1
    },
  },
  headText: {
    color: Colors.ORDER_MAIN_COLOR, fontWeight: "bold", fontSize: 22, fontFamily: Fonts.UBUNTU
  },
  subContainer2: {
    display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "1%", paddingRight: "1%",
  },
  searchDesktop: {
    flex: 1, marginRight: "3%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  twoIconButtons: {
    flexDirection: "row", display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row", display: "flex", width: 120, justifyContent: 'space-around'
    },
  },
  btnNewDesktop: {
    fontSize: 14,
    backgroundColor: Colors.ORDER_MAIN_COLOR,
    width: 180,
    height: 40,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "&:hover": {
      backgroundColor: Colors.ORDER_MAIN_COLOR,
    },
  },
  btnDownloadDesktop: {
    fontSize: 14,
    backgroundColor: "#E05D5D",
    width: 180,
    height: 40,
    marginLeft: 10,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "&:hover": {
      backgroundColor: "#E05D5D",
    },
  },
  mobTabSearch: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    [theme.breakpoints.up("xl")]: {
      display: "none",
    },
  },
  mobTabSearchX: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100vw',
    flex: 1, marginRight: "1%", marginLeft: "1%", marginBottom: '1%',
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    [theme.breakpoints.up("xl")]: {
      display: "none",
    },

  },
  myDrop: {
    flex: 1, marginRight: "5%", marginLeft: "1%", height: 40
  },
  mobTabDrop: {
    marginRight: '0%', marginLeft: '1%',

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  btnMobileCard: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 35

  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
}));

export default function OrderDetailsHome() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  var { userName, tohide, prevPage, prevOrderStatus, prevSearchQuery } = state;
  const [Dataset, setDataset] = useState([]);
  const [sharedOrdersList, setShareOrdersList, sharedOrdersListRef] = useState([])
  const [orderStatus, setorderStatus, orderStatusRef] = useState("All")
  const [hide, sethide] = useState('');
  const [loader, setLoader] = useState(true);
  const [allOrderDatas, setAllOrderDatas, allOrderDatasRef] = useState([]);
  const [allOrderDatasForTable, setAllOrderDatasForTable, allOrderDatasForTableRef] = useState([]);
  const [loadingModal, setLoadingModal, loadingModalRef] = useState(true)
  const [loadingTextForDesigningTeam, setloadingTextForDesigningTeam] = useState("Loading Assigned Orders... Please Wait...")

  const [serverDown, setServerDown] = useState(false);
  const [hideSvg, sethideSvg] = useState('hidden');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [page, setPage] = useState(0);
  const [page, setPage, pageRef] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, allOrderDatas.length - page * rowsPerPage);
  const emptyRows = 0;
  const [orderId, setorderId, orderIdRef] = useState("")

  const [totalOrderCount, setTotalOrderCount] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addOrderDataDialog, setAddOrderDataDialog] = useState(false)
  const [searchQuery, setsearchQuery, searchQueryRef] = useState("")
  const [tokenData, settokenData] = useState({})

  const btnExcelDownloadRef = useRef(null);

  const handleMenuClick = (event) => {
    setMenuOpen(true)
    setAnchorEl(event.currentTarget);
  }

  const formatDate = (date) => {
    var a = new Date(date)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formattedDate = a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear()
    return formattedDate
  }
  const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
  }


  const sharedOrderListUpdater = () => {
    console.log("enter")
    var dataToSend = { designTeamOrderIDs: sharedOrdersListRef.current , username:tokenData.userData.emailId};
    axios
      .post(APIClient.API_BASE_URL +"/orderProcess/addDesigningTeamOrders", dataToSend,APIClient.API_HEADERS)
      .then((response) => {
        if (userName === "Designing Team") {
          sethide("none");
          getDesignTeamOrderData()
        }
        else {
          getAllOrderDataNew(tokenData);
        }
      });
  }

  const shareOrderBtnClick = (orderID) => {
    if (sharedOrdersList.includes(orderID)) {
      setShareOrdersList(sharedOrdersList.filter(item => item !== orderID));
      sharedOrderListUpdater()
      sweetAlertShow("Removed from Stitching Team", "warning")
    }
    else {
      setShareOrdersList(prevState => [...prevState, orderID])
      sharedOrderListUpdater()
      sweetAlertShow("Assigned to Stitching Team", "success")
    }
  }

  const onOrderSearch = (value) => {
    setLoadingModal(true)
    setPage(1)
    if (value.length > 12) {
      setLoadingModal(false)
      return
    }
    setsearchQuery(value)
    getAllOrderDataNew(tokenData)
    return
  }

  const viewBtnClick = (orderID, mobNo) => {
    setLoadingModal(true)

    setAnchorEl(null)
    var dataToSend = { user: "admin", username:tokenData.userData.emailId, orderID: orderID, cusMobNo: mobNo };
    axios
      .post(APIClient.API_BASE_URL +"/orderProcess/getOrderData", dataToSend,APIClient.API_HEADERS)
      .then((response) => {
        setLoadingModal(false)
        try {
          if (userName === "Designing Team") {
            navigate('/designingTeamView', { state: { orderDetailsData: response.data.message, mode: "view", userName: userName, prevPage: pageRef.current, prevOrderStatus: orderStatusRef.current, prevSearchQuery: searchQueryRef.current } });
            setAllOrderDatas(response.data.message);

          }
          else {
            navigate('/addblousesalwar', { state: { orderDetailsData: response.data.message, mode: "view", userName: userName, prevPage: pageRef.current, prevOrderStatus: orderStatusRef.current, prevSearchQuery: searchQueryRef.current } });
            setAllOrderDatas(response.data.message);

          }
        }
        catch {
          navigate("/")
        }

      }).catch((err) => {
        setLoadingModal(false)
        sweetAlertShow("Server Down", "warning")
      });


  };

  const editBtnClick = (orderID, mobNo) => {
    setLoadingModal(true)
    setAnchorEl(null)

    if (sharedOrdersListRef.current.includes(orderID) && userName !== "Designing Team") {
      sweetAlertShow("Please UnAssign for Editing this Order", "warning")
      setLoadingModal(false)
      return
    }
    var dataToSend = { user: "admin", username:tokenData.userData.emailId, orderID: orderID, cusMobNo: mobNo };

    axios
      .post(APIClient.API_BASE_URL +"/orderProcess/getOrderData", dataToSend,APIClient.API_HEADERS)
      .then((response) => {
        setLoadingModal(false)
        if (userName === "Designing Team") {
          setLoadingModal(false)
          navigate('/designingTeamView', { state: { orderDetailsData: response.data.message, mode: "edit", userName: userName, prevPage: pageRef.current, prevOrderStatus: orderStatusRef.current, prevSearchQuery: searchQueryRef.current } });
        }
        else {
          setLoadingModal(false)
          navigate('/addblousesalwar', { state: { orderDetailsData: response.data.message, mode: "edit", userName: userName, prevPage: pageRef.current, prevOrderStatus: orderStatusRef.current, prevSearchQuery: searchQueryRef.current } });
        }
      }).catch((err) => {
        setLoadingModal(false)
        sweetAlertShow("Server Down", "warning")
      });;
  }

  const printBtnClick = (orderID, mobNo) => {
    setLoadingModal(true)
    setAnchorEl(null)
    var dataToSend = { user: "admin", username:tokenData.userData.emailId, orderID: orderID, cusMobNo: mobNo };
    axios.post(APIClient.API_BASE_URL +"/orderProcess/getOrderData", dataToSend,APIClient.API_HEADERS)
      .then((response) => {
        console.log(response.data)
        setLoadingModal(false)
        var blouseDataForCalc = response.data.message.blouseData
        var salwarDataForCalc = response.data.message.salwarData
        Array.prototype.push.apply(salwarDataForCalc, blouseDataForCalc)
        var billDataToTrim = salwarDataForCalc
        var SandB = []

        for (let i = 0; i < billDataToTrim.length; i++) {
          (billDataToTrim[i]["salwarOrderId"] !== undefined) ? SandB.push(billDataToTrim[i]["salwarOrderId"]) : SandB.push(billDataToTrim[i]["blouseOrderId"])
        }
        var SorB = []
        for (let i = 0; i < SandB.length; i++) {
          var ord = SandB[i]
          var s = ord.split("-")[1]
          if (s[0] === "s") {
            SorB.push("Salwar")
          }
          else {
            SorB.push("Blouse")
          }
        }
        var addingData = billDataToTrim.map((text, index) => ({ ...text, no: (index + 1), dressId: SandB[index], quantity: 1, descripition: SorB[index], price: text.Amount }))
        var trimData = []
        for (let i = 0; i < addingData.length; i++) {
          const picked = (({ no, dressId, quantity, descripition, price, itemDeliverStatus }) => ({ no, dressId, quantity, descripition, price, itemDeliverStatus }))(addingData[i]);
          trimData.push(picked)
        }
        var billDataToPrint = {
          "orderID": response.data.message["orderID"],
          "gst": response.data.message["gst"],
          "orderDate": response.data.message["orderDate"],
          "name": response.data.message["name"],
          "mobNo": response.data.message["mobNo"],
          "deliveryDate": response.data.message.deliveryDate,
          "cusId": response.data.message["cusId"],
          "payAmount": response.data.message["payAmount"],
          "grandTotal": response.data.message["grandTotal"],
          "dcStatus": response.data.message["dcStatus"],
          "dcAmount": response.data.message["dcAmount"],
          "orderStatus": response.data.message.orderStatus, "OrderDatas": trimData, "shopName":tokenData.userData.shopName,"shopAddress":tokenData.userData.shopAddress, shopMobNo:tokenData.userData.mobNo 
        }
        navigate('/billPage', { state: { billData: billDataToPrint, userName: "Shop Owner", prevPage: pageRef.current, prevOrderStatus: orderStatusRef.current, prevSearchQuery: searchQueryRef.current } });
      }).catch((err) => {
        setLoadingModal(false)
        sweetAlertShow("Server Down", "warning")
      });


  };


  const onOrderStatusChange = (value) => {
    setorderStatus(value)
    // sessionCheck()
    setPage(1)
    if (userName !== "Designing Team") {
      getAllOrderDataNew(tokenData)
    }
  }

  const getDesigningTeamSharedIDs = (tokenData) => {
    console.log("getDesigningTeamSharedIDs")

    var dataToSend = { user: "admin",  username:tokenData.userData.emailId };
    axios
      .post(APIClient.API_BASE_URL +"/orderProcess/getDesigningTeamOrders", dataToSend,APIClient.API_HEADERS)
      .then((response) => {
        console.log(response.data)
        if (response.data.message.length !== 0) {
          setShareOrdersList(response.data.message[0]["designTeamOrderIDs"]);
          sharedOrderListUpdater()
        }
        else {
          console.log("getDesigningTeamSharedIDs else")
          getAllOrderDataNew(tokenData);
          setLoader(false);
        }
      }).catch((err) => {
        setLoader(false);
      });;
  };


  const retryBtn = () => { window.location.reload() }

  const getDesignTeamOrderData = async () => {

    var dataToSend = { user: "admin", username:tokenData.userData.emailId, orderID: (sharedOrdersListRef.current).sort().reverse(), size: 10, page: (parseInt(pageRef.current)) };

    await axios
      .post(APIClient.API_BASE_URL +"/orderProcess/getMultiOrderIdData", dataToSend,APIClient.API_HEADERS)
      .then((response) => {
        let sortedOrders = response.data.message.sort((a, b) => (a["orderID"] < b["orderID"] ? 1 : -1))
        setAllOrderDatas(sortedOrders);
        setTotalOrderCount(response.data.totalOrderCount)
        setServerDown(true);
        setLoader(false)
        setLoadingModal(false)

      }).catch((err) => {
        setLoadingModal(false)
        setLoader(false)
        sweetAlertShow("Server Down", "warning")
      });
  }

  const getAllOrderDataNew = (tokenData) => {
    console.log("enter2")
    var letterCheckRegex = '/^[^a-zA-Z]*$/';
    if (searchQueryRef.current !== "") {
      if (isNumeric(searchQueryRef.current)) {
        dataToSend = { user: "admin", username:tokenData.userData.emailId, searchQuery: searchQueryRef.current, field: "mobNo", orderStatus: orderStatusRef.current, size: 10, page: (parseInt(pageRef.current)) }
      }
      else if (searchQueryRef.current.toLowerCase()[0] === "k" && isNumeric(searchQueryRef.current[1])) {
        dataToSend = { user: "admin", username:tokenData.userData.emailId, searchQuery: searchQueryRef.current, field: "orderID", orderStatus: orderStatusRef.current, size: 10, page: (parseInt(pageRef.current)) }

      }
      else if (/^[a-zA-Z\u00C0-\u00ff]+$/.test(searchQueryRef.current)) {
        dataToSend = { user: "admin", username:tokenData.userData.emailId, searchQuery: searchQueryRef.current, field: "name", orderStatus: orderStatusRef.current, size: 10, page: (parseInt(pageRef.current)) }
      }
    }
    else {
      var dataToSend = { user: "admin", username:tokenData.userData.emailId, searchQuery: "", field: "", orderStatus: orderStatusRef.current, page: (parseInt(pageRef.current)), size: 10 };
    }

    axios
      .post(APIClient.API_BASE_URL +"/orderProcess/getOrderByStatus", dataToSend,APIClient.API_HEADERS)
      .then((response) => {
        console.log(response.data)
        if (userName === "Designing Team") {
          return
        }
        setTotalOrderCount(response.data.totalOrderCount)
        setServerDown(true);
        let sortedOrders
        if (orderStatusRef.current !== "Next 10 Days Deliveries") {
          sortedOrders = response.data.message.sort((a, b) => (a["orderID"] < b["orderID"] ? 1 : -1))
        }
        else {
          sortedOrders = response.data.message
        }
        if (userName === "Designing Team") {
          return
        }
        setAllOrderDatas(sortedOrders);
        setLoader(false)

        setLoadingModal(false)

      }).catch((err) => {
        setLoadingModal(false)
        setServerDown(false);
        sethideSvg('visible');
      })
  };


  const getAllOrderDataForExcelFile = () => {
    var dataToSend = { user: "admin", username:tokenData.userData.emailId, orderStatus: orderStatusRef.current, page: 1, size: 10 };
    axios
      .post(APIClient.API_BASE_URL +"/orderProcess/getOrderByStatusForExcelFile", dataToSend,APIClient.API_HEADERS)
      .then((response) => {
        setServerDown(true);
        let sortedOrders
        if (orderStatusRef.current !== "Next 10 Days Deliveries") {
          sortedOrders = response.data.message.sort((a, b) => (a["orderID"] < b["orderID"] ? 1 : -1))
        }
        else {
          sortedOrders = response.data.message
        }
        if (userName === "Designing Team") {
          return
        }

        setLoader(false)

        let tempData = response.data.message
        var temp = []
        for (let i in tempData) {
          let con = { "Order ID": tempData[i]["orderID"], "Order Date": (tempData[i]["orderDate"]).split("T")[0], "Name": tempData[i]["name"], "Mob No": tempData[i]["mobNo"], "Delivery Date": tempData[i]["deliveryDate"], "Order Status": tempData[i]["orderStatus"], "Salwar Count": tempData[i]["salwarCount"], "Blouse Count": tempData[i]["blouseCount"], "Due Amount": ((tempData[i]["grandTotal"] - tempData[i]["payAmount"]) < 0 ? 0 : tempData[i]["grandTotal"] - tempData[i]["payAmount"]), "Paid Amount": tempData[i]["payAmount"], "Grand Total": tempData[i]["grandTotal"], "Customer ID": tempData[i]["cusId"] }
          temp.push(con)
        }
        setAllOrderDatasForTable(temp)

        setDataset([
          {
            columns: [
              {
                title: "Order ID",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 }
              },
              {
                title: "Name",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Mob No",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Order Date",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Delivery Date",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Salwar Count",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Blouse Count",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Due Amount",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Paid Amount",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Grand Total",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              }


            ],
            data: (allOrderDatasForTableRef.current).map((data) => [
              { value: data["Order ID"], style: { font: { sz: "12" } } },
              { value: data["Name"], style: { font: { sz: "12" } } },
              { value: data["Mob No"], style: { font: { sz: "12" } } },
              { value: formatDate(data["Order Date"]), style: { font: { sz: "12" } } },
              { value: formatDate(data["Delivery Date"]), style: { font: { sz: "12" } } },
              { value: data["Salwar Count"], style: { font: { sz: "12" } } },
              { value: data["Blouse Count"], style: { font: { sz: "12" } } },
              { value: data["Due Amount"], style: { font: { sz: "12" } } },
              { value: data["Paid Amount"], style: { font: { sz: "12" } } },
              { value: data["Grand Total"] + "", style: { font: { sz: "12" } } }
            ]),
          },
        ])
        btnExcelDownloadRef.current.click()
      }).catch((err) => {
        setServerDown(false);
        sethideSvg('visible');
      })
  };

  const sendBtnClick = () => {
    setAnchorEl(null)
    sweetAlertShow("Message Feature Coming Soon", "warning")
  }

  const delBtnClick = (orderID, mobNo) => {
    setLoadingModal(true)
    setAnchorEl(null)
    var dataToSend = { user: "admin", username:tokenData.userData.emailId, cusMobNo: mobNo, orderID: orderID };
    setLoadingModal(false)
    if (sharedOrdersListRef.current.includes(orderID)) {
      sweetAlertShow("Please UnAssign this order", "warning")
      return
    }

    swal.fire({ title: `Are you sure to delete this Order ${orderID}?`, text: "You won't be able to revert this!", icon: "warning", dangerMode: true, showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6', confirmButtonText: 'Yes, delete it!' }).then((willWarn) => {
      if (willWarn.isConfirmed) {
        axios
          .post(APIClient.API_BASE_URL +"/orderProcess/removeOrderData", dataToSend,APIClient.API_HEADERS)
          .then((res) => {
            setLoadingModal(false)
            getAllOrderDataNew(tokenData);
          }).catch((err) => {
            setLoadingModal(false)
            sweetAlertShow("Server Down", "warning")
          });
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setLoadingModal(true)
    setPage(newPage);
    if (userName === "Designing Team") {
      getDesignTeamOrderData()
    }
    else {
      getAllOrderDataNew(tokenData)

    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getOrderID = () => {
    var dataToSend = { user: "admin", username:tokenData.userData.emailId }
    axios.post(APIClient.API_BASE_URL +"/orderProcess/generateOrderID", dataToSend,APIClient.API_HEADERS).then((res) => {
      setorderId(res.data.message)
    });
  };

  const onAddOrderBtnClick = () => {
    getOrderID()
    setAddOrderDataDialog(true)
  };

  const sweetAlertShow = (message, mode) => {
    swal.fire({ title: message, text: "", icon: mode, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', }).then((willWarn) => {
      if (willWarn.isConfirmed) {
        return
      }
    });
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
      return decodedData
    }
  }

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ').trim();
  };

  useLayoutEffect(() => {

    // Session Check
    let decodedTokenData =   SessionChecker()
    decodedTokenData.success? settokenData(decodedTokenData.message):navigate("/")
    
    prevPage = (prevPage == 0 ? 1 : prevPage)
    setPage(prevPage)
    setorderStatus(prevOrderStatus === undefined ? "All" : prevOrderStatus)
    setsearchQuery(prevSearchQuery === undefined ? "" : prevSearchQuery)
    getDesigningTeamSharedIDs(decodedTokenData.message)

  }, []);





  return (
    <>

      {
        Object.keys(tokenData).length === 0 ?
          <div >Loading... Please Wait</div>
          :
          <div>
            <div className={classes.mainContainer}>
              <div>
                <AppbarHead dataParent={{ userNameFrom: userName, appBtnColor: Colors.ORDER_MAIN_COLOR, appBtnText: "Order Details", userData: tokenData.userData }} />
              </div>
              {
                serverDown === false ?
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2%', visibility: hideSvg }}>
                    <img alt="serverDown" className={classes.serverDownImage} src={ServerError} />
                    <Typography className={classes.serverDownHeadText} variant='h3'>Server Maintenance</Typography>
                    <Typography className={classes.serverDownSubText} variant='subtitle1'>We sincerely apologize for the inconvenience.</Typography>
                    <Typography className={classes.serverDownSubText} variant='subtitle1'>Our Site is currently under maintainence and will return shortly.</Typography>
                    <Typography className={classes.serverDownSubText} variant='subtitle1'>Please Try Again later or Contact Netcom.</Typography>
                    <Button className={classes.retryBtn} onClick={() => retryBtn()}>Retry</Button>
                  </div>
                  :
                  <div>
                    <div className={classes.subContainer1}>
                      <div className={classes.headerBP}>
                        <Typography variant="h5" className={classes.headText}>  Order Details </Typography>
                      </div>

                      <div style={{ display: hide }} className={classes.searchDesktop} >

                        <Paper className={classes.searchRoot}>
                          <InputBase
                            autoFocus
                            // innerRef ={inputSearchRef}
                            // disabled={loadingModal}
                            // inputProps={{maxLength:5}}
                            value={searchQuery}
                            onChange={(e) => { onOrderSearch(e.target.value) }}
                            fullWidth
                            className={classes.searchInput}
                            placeholder="Search Mobile No/ Name/ Order ID..."

                          />
                          <IconButton className={classes.searchIconButton} aria-label="search">
                            <SearchIcon />
                          </IconButton>
                        </Paper>

                      </div>

                      {/* *********TWO ICONS*************** */}
                      <div className={classes.twoIconButtons}>
                        <div style={{ marginBottom: "1%", display: hide }}>
                          <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            className={classes.btnNewDesktop}
                            onClick={onAddOrderBtnClick}
                          >
                            New Order
                          </Button>

                          <div className={classes.mobTabSearch}>
                            <Card elevation={1} className={classes.btnMobileCard} >
                              <IconButton style={{ padding: 0 }}>
                                <ControlPointIcon
                                  fontSize="medium"
                                  onClick={onAddOrderBtnClick}
                                  style={{ color: Colors.ORDER_MAIN_COLOR, marginRight: "2%" }}
                                />
                              </IconButton>
                            </Card>
                          </div>
                        </div>


                        <div>
                          <Button
                            style={{ display: hide }}
                            onClick={() => { getAllOrderDataForExcelFile() }}
                            variant="contained"
                            className={classes.btnDownloadDesktop}
                            startIcon={<GetAppIcon />}
                          >
                            Download File
                          </Button>

                          <div style={{ display: hide }} className={classes.mobTabSearch}>
                            <Card
                              elevation={1}
                              className={classes.btnMobileCard}
                            >
                              <IconButton onClick={() => { getAllOrderDataForExcelFile() }} style={{ padding: 0 }}>
                                <GetAppIcon
                                  fontSize="medium"
                                  style={{ color: "#E05D5D", marginLeft: "2%" }}
                                />
                              </IconButton>
                            </Card>
                          </div>
                        </div>


                        <div>
                          <ExcelFile
                            filename="Order Data"
                            element={
                              <div style={{ display: "none" }}>
                                <Button
                                  innerRef={btnExcelDownloadRef}
                                  variant="contained"
                                  className={classes.btnDownloadDesktop}
                                  startIcon={<GetAppIcon />}
                                >
                                  Download File
                                </Button>

                                <div className={classes.mobTabSearch}>
                                  <Card elevation={1} className={classes.btnMobileCard} >
                                    <IconButton style={{ padding: 0 }}>
                                      <GetAppIcon fontSize="medium" style={{ color: "#E05D5D", marginLeft: "2%" }} />
                                    </IconButton>
                                  </Card>
                                </div>
                              </div>
                            }
                          >
                            <ExcelSheet dataSet={Dataset} name="Order Data Set" />
                          </ExcelFile>
                        </div>

                      </div>

                      {/* Mobile Status Drop Down */}
                      <div className={classes.mobTabDrop}>
                        <FormControl size="small" variant="outlined" className={classes.dropDown} style={{ marginTop: '2px', marginBottom: '5px', width: 230, display: hide }}>
                          <InputLabel style={{ color: 'black' }} >Orders</InputLabel>
                          <Select label="Orders" value={orderStatus} onChange={(e) => onOrderStatusChange(e.target.value)}>
                            <MenuItem value="All">All Orders</MenuItem>
                            <MenuItem value="Next 10 Days Deliveries">Next 10 Days Deliveries</MenuItem>
                            <MenuItem value="Confirmed">Confirmed Orders</MenuItem>
                            <MenuItem value="Processing" >Processing Orders</MenuItem>
                            <MenuItem value="Ready">Ready Orders</MenuItem>
                            <MenuItem value="Delivered">Delivered Orders</MenuItem>
                            <MenuItem value="Today's Orders">Today's Orders</MenuItem>
                            <MenuItem value="Today's Deliveries">Today's Deliveries</MenuItem>
                            <MenuItem value="Assigned Orders">Assigned Orders</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    {/* Mobile Tab Search */}
                    <div className={classes.mobTabSearchX}>
                      <div style={{ flex: 1, height: 40, marginBottom: '0.5%', display: hide }}>
                        <Paper className={classes.searchRoot}>
                          <InputBase

                            value={searchQuery}
                            onChange={(e) => { onOrderSearch(e.target.value) }}
                            fullWidth
                            className={classes.searchInput}
                            placeholder="Search ....."
                            inputProps={{ 'aria-label': 'Search ' }}
                          />
                          <IconButton className={classes.searchIconButton} aria-label="search">
                            <SearchIcon />
                          </IconButton>
                        </Paper>
                      </div>

                      {/* ***************DROPDOWN*******************/}
                      <div className={classes.myDrop} style={{ flex: 1 }} >
                        <FormControl size="small" variant="outlined" className={classes.dropDown} style={{ width: "100%", marginTop: '2px', marginBottom: '5px', display: hide, marginRight: "1%", marginLeft: "1%", }}>
                          <InputLabel style={{ color: 'black' }} >Orders</InputLabel>
                          <Select label="Orders" value={orderStatus} onChange={(e) => setorderStatus(e.target.value)}>
                            <MenuItem value="All">All Orders</MenuItem>
                            <MenuItem value="Next 10 Days Deliveries">Next 10 Days Deliveries</MenuItem>
                            <MenuItem value="Confirmed">Confirmed Orders</MenuItem>
                            <MenuItem value="Processing" >Processing Orders</MenuItem>
                            <MenuItem value="Ready">Ready Orders</MenuItem>
                            <MenuItem value="Delivered">Delivered Orders</MenuItem>
                            <MenuItem value="Today's Orders">Today's Orders</MenuItem>
                            <MenuItem value="Today's Deliveries">Today's Deliveries</MenuItem>
                            <MenuItem value="Assigned Orders">Assigned Orders</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    {
                      loadingModal ?
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: Colors.ORDER_LIGHT_COLOR, flexDirection: "column", marginTop: 30 }}>
                          <CircularProgress style={{ color: Colors.ORDER_MAIN_COLOR }} disableShrink />
                          <Typography variant="h6" style={{ marginTop: 10, color: Colors.ORDER_MAIN_COLOR, fontFamily: Fonts.LATO }}>Loading Orders.... Please Be Patient.... </Typography>
                        </div>

                        :

                        <div className={classes.subContainer2} >

                          {
                            allOrderDatasRef.current.length === 0 ?
                              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                                <div style={{ display: "flex" }}>
                                  {
                                    searchQuery === "" && userName !== "Designing Team" ?
                                      <div>
                                        <Lottie style={{ height: 400, width: 700 }} autoPlay={true} loop={true} animationData={LootieAddCustomer} />
                                        <Typography variant="h6">Add Your Orders to keep track of who's paid you and who owes you money</Typography>
                                        <Button
                                          style={{ marginTop: 20, height: 50, width: 200, backgroundColor: Colors.ORDER_MAIN_COLOR, color: "white" }}
                                          startIcon={<AddIcon />}
                                          variant="contained"
                                          onClick={onAddOrderBtnClick}
                                        > New Order
                                        </Button>
                                      </div>
                                      :
                                      searchQuery === "" && userName == "Designing Team" ?
                                        <div>
                                          <Lottie style={{ height: 500, width: 500 }} animationData={LootieNoData} />
                                          <Typography variant="h6"> No Assigned Orders Found!!!! </Typography>
                                        </div>
                                        :
                                        <div>
                                          <Lottie style={{ height: 500, width: 500 }} animationData={LootieNoData} />
                                          <Typography variant="h6">No Search Results Found for&nbsp; <span style={{ fontWeight: "bold", color: Colors.ORDER_MAIN_COLOR }}>{searchQuery}</span> </Typography>
                                        </div>
                                  }
                                </div>
                              </div>
                              :
                              <div >
                                <Card elevation={5}>
                                  <TableContainer component={Paper}>
                                    <Table size="small">
                                      <TableHead>
                                        <TableRow style={{ backgroundColor: Colors.ORDER_MAIN_COLOR, justifyContent: "center" }}>
                                          <StyledTableCell className={classes.tabC1} align="left"   >
                                            <Typography className={classes.headFontSize}  >  Order ID</Typography>
                                          </StyledTableCell>

                                          <StyledTableCell className={classes.tabC2} align="left" style={{ display: hide }}  >
                                            <Typography className={classes.headFontSize}    > Customer Name/Mob No</Typography>
                                          </StyledTableCell>

                                          <StyledTableCell className={classes.tabC3} align="left"  >
                                            <Typography className={classes.headFontSize}   >  Ordered Date</Typography>
                                          </StyledTableCell>

                                          <StyledTableCell className={classes.tabC4} align="left" >
                                            <Typography className={classes.headFontSize}  > Delivery Date</Typography>
                                          </StyledTableCell>

                                          <StyledTableCell className={classes.tabC5} align="left" >
                                            <Typography className={classes.headFontSize}  >Salwar</Typography>
                                          </StyledTableCell>

                                          <StyledTableCell className={classes.tabC6} align="left" >
                                            <Typography className={classes.headFontSize} >  Blouse</Typography>
                                          </StyledTableCell>

                                          <StyledTableCell className={classes.tabC7} align="left" style={{ display: hide }}>
                                            <Typography className={classes.headFontSize}  >  Due Amount</Typography>
                                          </StyledTableCell>

                                          <StyledTableCell className={classes.tabC8} align="left" >
                                            <Typography className={classes.headFontSize}>Status</Typography>
                                          </StyledTableCell>

                                          <StyledTableCell className={classes.tabC9} align="center" >
                                            <Typography className={classes.headFontSize}  >  Action</Typography>
                                          </StyledTableCell>

                                          <StyledTableCell className={classes.tabC10} style={{ display: hide }} align="center" >
                                            <Typography className={classes.headFontSize} >To Stitching Team</Typography>
                                          </StyledTableCell>
                                        </TableRow>
                                      </TableHead>

                                      <TableBody>
                                        {(allOrderDatasRef.current
                                        ).map((row) => (
                                          <StyledTableRow>
                                            <StyledTableCell className={classes.tabC1} align="left">
                                              <Typography className={classes.tableContentSize} style={{ width: 70 }} >{row.orderID}</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell className={classes.tabC2} align="left" style={{ display: hide }}>
                                              <div style={{ display: "flex", alignItems: "center" }}>

                                                <Badge
                                                  overlap="circular"
                                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                                                  badgeContent={!row.allInfoCompletionStatus ? <WarningIcon style={{ color: "#FF5959", height: 15, width: 15 }} /> : ""}
                                                >
                                                  <Avatar variant="rounded" style={{ backgroundColor: row.cusColor, height: 35, width: 35 }}>{(row.name)[0]}</Avatar>
                                                </Badge>

                                                <div style={{ display: "flex", flexDirection: "column", marginLeft: 5 }}>
                                                  <Tooltip title={toTitleCase(row.name)} arrow TransitionComponent={Zoom}>
                                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '7rem' }}>
                                                      <Typography noWrap={true} className={classes.tableContentSize} style={{ marginLeft: "3%", color: "black" }}>{toTitleCase(row.name)}</Typography>
                                                    </div>
                                                  </Tooltip>
                                                  <Stack direction="row" alignItems="center" gap={0}  >

                                                    <PhoneIcon style={{ width: 15, height: 13, color: "grey" }} />
                                                    <Typography className={classes.tableMobContentSize} style={{ color: "grey", fontSize: 14, marginLeft: "2%" }}>
                                                      {row.mobNo}
                                                    </Typography>
                                                  </Stack>
                                                </div>
                                              </div>
                                            </StyledTableCell>

                                            <StyledTableCell className={classes.tabC3} align="left">
                                              <div style={{ display: "flex", alignItems: "center" }}>
                                                {/* <CalendarTodayIcon /> */}
                                                <Typography className={classes.tableContentSize} noWrap={true} style={{ marginLeft: "3%", width: "100px" }}>{formatDate((row.orderDate).split("T")[0])}</Typography>
                                              </div>
                                            </StyledTableCell>

                                            <StyledTableCell className={classes.tabC4} align="left">
                                              <div style={{ display: "flex", alignItems: "center" }}>
                                                {/* <CalendarTodayIcon /> */}
                                                <Typography className={classes.tableContentSize} noWrap={true} style={{ marginLeft: "3%", width: "100px" }}> {formatDate((row.deliveryDate).split("T")[0])} </Typography>
                                              </div>
                                            </StyledTableCell>

                                            <StyledTableCell className={classes.tabC5} align="center">
                                              <Avatar variant="square" style={{ backgroundColor: "#00A19D", width: 30, height: 30 }}>
                                                <Typography style={{ fontSize: 16 }}> {row.salwarCount}</Typography>
                                              </Avatar>
                                            </StyledTableCell>

                                            <StyledTableCell className={classes.tabC6} align="center">
                                              <Avatar variant="square" style={{ backgroundColor: "#6F69AC", width: 30, height: 30 }}>
                                                <Typography style={{ fontSize: 16 }}>  {row.blouseCount}</Typography>
                                              </Avatar>
                                            </StyledTableCell>

                                            <StyledTableCell className={classes.tabC7} align="left" style={{ display: hide }} >
                                              <div style={{ display: "flex", alignItems: "center" }}>
                                                <Typography className={classes.tableContentSize} style={{ fontWeight: "bold", color: (row.grandTotal - row.payAmount) > 0 ? "#DD4A48" : "#4AA96C" }}  > ₹ {(row.grandTotal - row.payAmount > 0 ? row.grandTotal - row.payAmount : 0)}</Typography>
                                              </div>
                                            </StyledTableCell>

                                            <StyledTableCell className={classes.tabC8} align="left" >
                                              <Chip
                                                icon={row.orderStatus === "Ready" ? <ReadIcon style={{ color: "white" }} /> : row.orderStatus === "Processing" ? <ProccessIcon style={{ color: "white" }} /> : row.orderStatus === "Confirmed" ? <ConfirmedIcon style={{ color: "white", width: 20, height: 20 }} /> : <DeliveryIcon style={{ color: "white" }} />}
                                                style={{
                                                  width: 120,
                                                  backgroundColor: row.orderStatus === "Ready" ? "#B24080" : row.orderStatus === "Processing" ? "#D83A56" : row.orderStatus === "Confirmed" ? "#2940D3" : "#1C7947",
                                                  color: "white"
                                                }}
                                                label={<Typography className={classes.tableContentSize} >  {row.orderStatus}</Typography>} />
                                            </StyledTableCell>

                                            <StyledTableCell align="center" className={classes.hidingAction} >
                                              {/* <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleMenuClick}
                              >
                                <MoreVertIcon />
                              </IconButton>

                              <StyledMenu
                                id={row.id}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => { setAnchorEl(null) }}
                              >

                                <StyledMenuItem key={"View"} onClick={() => viewBtnClick(row.orderID, row.mobNo)}>
                                  <ListItemIcon>
                                    <ViewIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary="View" />

                                </StyledMenuItem>
                                <StyledMenuItem key={"Edit"} onClick={() => editBtnClick(row.orderID, row.mobNo)}>
                                  <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary="Edit" />

                                </StyledMenuItem>
                                <StyledMenuItem key={"Delete"} onClick={() => delBtnClick(row.orderID, row.mobNo)}>
                                  <ListItemIcon>
                                    <DeleteIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary="Delete" />

                                </StyledMenuItem>
                                <StyledMenuItem key={"Send SMS"} onClick={sendBtnClick}>
                                  <ListItemIcon>
                                    <SendIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary="Send SMS" />

                                </StyledMenuItem>
                                <StyledMenuItem key={"Print Bill"} onClick={() => printBtnClick(row.orderID, row.mobNo)}>
                                  <ListItemIcon>
                                    <PrintIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary="Print Bill" />


                                </StyledMenuItem>

                              </StyledMenu> */}

                                              <FormControl size="small" style={{ width: 50, height: 50 }}>
                                                <InputLabel style={{ fontSize: '100%' }} ><MoreVertIcon /></InputLabel>
                                                <Select IconComponent="none" disableUnderline>
                                                  <MenuItem style={{ color: "green" }} onClick={() => viewBtnClick(row.orderID, row.mobNo)}  ><ViewIcon /> &nbsp;View</MenuItem>
                                                  <MenuItem style={{ color: "orange" }} onClick={() => editBtnClick(row.orderID, row.mobNo)}  ><EditIcon /> &nbsp; Edit</MenuItem>
                                                  <MenuItem onClick={() => delBtnClick(row.orderID, row.mobNo)} style={{ display: hide, color: "red" }} ><DeleteIcon /> &nbsp; Delete</MenuItem>
                                                  <MenuItem onClick={sendBtnClick} style={{ display: hide, color: "#FF865E" }} ><SendIcon /> &nbsp;Send Msg</MenuItem>
                                                  <MenuItem onClick={() => printBtnClick(row.orderID, row.mobNo)} style={{ display: hide, color: "blue" }} ><PrintIcon /> &nbsp;Print Bill</MenuItem>
                                                </Select>
                                              </FormControl>
                                            </StyledTableCell>

                                            <StyledTableCell align="center" className={classes.fourIconHid}>
                                              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                <Card elevation="3" style={{ display: "flex", padding: "2%" }}>
                                                  <Tooltip title="View" arrow TransitionComponent={Zoom} >
                                                    <ViewIcon
                                                      onClick={() => viewBtnClick(row.orderID, row.mobNo)}
                                                      style={{ alignItems: "center", color: "green", marginRight: '10px', marginLeft: '10px', width: 30, height: 30, verticalAlign: "middle", cursor: "pointer" }}
                                                    />
                                                  </Tooltip>
                                                  <Divider orientation="vertical" flexItem />
                                                  <Tooltip title="Edit" arrow TransitionComponent={Zoom} >
                                                    <EditIcon
                                                      onClick={() => editBtnClick(row.orderID, row.mobNo)}
                                                      style={{ alignItems: "center", color: "orange", marginLeft: "10px", marginRight: "10px", width: 30, height: 30, verticalAlign: "middle", cursor: "pointer" }}
                                                    />
                                                  </Tooltip>
                                                  <Divider orientation="vertical" flexItem style={{ display: hide }} />
                                                  <Tooltip title="Delete" arrow TransitionComponent={Zoom} >
                                                    <DeleteIcon
                                                      onClick={() => delBtnClick(row.orderID, row.mobNo)}
                                                      style={{ alignItems: "center", color: "red", marginLeft: "10px", marginRight: "10px", width: 30, height: 30, verticalAlign: "middle", display: hide, cursor: "pointer" }}
                                                    />

                                                  </Tooltip>

                                                  <Divider orientation="vertical" flexItem style={{ display: hide }} />
                                                  <Tooltip title="Send Message" arrow TransitionComponent={Zoom} >
                                                    <SendIcon style={{ alignItems: "center", color: "#FF865E", width: 30, height: 30, marginLeft: "10px", marginRight: "10px", verticalAlign: "middle", display: hide, cursor: "pointer" }} />
                                                  </Tooltip>
                                                  <Divider orientation="vertical" flexItem style={{ display: hide }} />
                                                  <Tooltip title="Print Bill" arrow TransitionComponent={Zoom} >
                                                    <PrintIcon
                                                      onClick={() => printBtnClick(row.orderID, row.mobNo)}
                                                      style={{ alignItems: "center", color: "blue", width: 30, height: 30, marginLeft: "10px", verticalAlign: "middle", display: hide, cursor: "pointer" }}
                                                    />
                                                  </Tooltip>
                                                </Card>

                                              </div>
                                            </StyledTableCell>
                                            <StyledTableCell className={classes.tabC10} align="right" style={{ display: hide }} >
                                              <Button variant="contained"
                                                color="primary"
                                                onClick={() => { shareOrderBtnClick(row.orderID) }}
                                                disabled={(row.orderStatus === "Delivered" || !row.allInfoCompletionStatus) ? true : false}
                                                style={{ fontSize: "14px", backgroundColor: sharedOrdersList.includes(row.orderID) ? "#D54062" : "#59886B", width: 100, height: 35 }}>
                                                {sharedOrdersList.includes(row.orderID) ? "UnAssign" : "Assign"}</Button>
                                            </StyledTableCell>
                                          </StyledTableRow>
                                        ))}

                                        {emptyRows > 0 && (
                                          <StyledTableRow style={{ height: 53 * emptyRows }}>
                                            <StyledTableCell colSpan={6} />
                                          </StyledTableRow>
                                        )}
                                      </TableBody>


                                    </Table>


                                    <TableFooter style={{ display: "flex", justifyContent: "center", marginTop: 15, marginBottom: 15, }}>
                                      <TableRow>



                                        <Pagination
                                          // siblingCount={0} 
                                          style={{ color: "red" }}
                                          variant="outlined" shape="rounded" color="primary"
                                          showFirstButton showLastButton
                                          // rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 },]}
                                          // rowsPerPageOptions={[]}
                                          // colSpan={3}
                                          // count={allCustomerDatas.length}
                                          // count={totalCustomerCount}
                                          count={Math.ceil(totalOrderCount / 10)}
                                          // rowsPerPage={rowsPerPage}
                                          page={pageRef.current}
                                          // SelectProps={{ inputProps: { "aria-label": "rows per page" }, native: true, }}
                                          onChange={handleChangePage}
                                          classes={{
                                            root: classes.selectedPageNoColor,
                                          }}
                                        // onRowsPerPageChange={handleChangeRowsPerPage}
                                        />


                                        {/* <TablePagination
                            rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                            colSpan={3}
                            count={allOrderDatas.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{ inputProps: { "aria-label": "rows per page" }, native: true }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          /> */}
                                      </TableRow>
                                    </TableFooter>
                                  </TableContainer>
                                </Card>
                              </div>

                          }

                        </div>
                    }
                  </div>
              }

              <Backdrop className={classes.backdrop} open={loader} >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>

            <Footer dataBackParent={{ backColor: Colors.ORDER_LIGHT_COLOR }} />




            {/* Add Order Dialog */}
            <AddOrderDialogContent addOrderDataDialog={addOrderDataDialog} setAddOrderDataDialog={setAddOrderDataDialog} orderId={orderId} prevPage={prevPage} />
          </div>
      }
    </>
  );
}

