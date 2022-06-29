import { TextField, Modal, InputBase, Divider, IconButton, Button, Card, CircularProgress, InputAdornment, makeStyles, withStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableHead, TableRow, Tooltip, Typography, Snackbar, Avatar } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { Alert } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
import AppBarHead from "../AppbarHead";
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Helpers from '../Helpers'
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Zoom from '@material-ui/core/Zoom';
import GetAppIcon from '@material-ui/icons/GetApp';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import WarningIcon from '@material-ui/icons/Warning';
import CachedIcon from '@material-ui/icons/Cached';
import swal from "sweetalert2";
import ReactExport from "react-data-export";
import useState from 'react-usestateref'
import Footer from '../components/Footer';
import ServerError from '../images/logo/serverCustDetail.svg';
import { APIClient, Colors, Fonts } from "../constants";
import Stack from '@mui/material/Stack';
import store from "store2";
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import LootieNoData from '../images/imgCustomerDetails/noData.json'

import LootieAddCustomer from '../images/imgCustomerDetails/newCustomers.json'
import Lottie from "lottie-react";
import { decodeToken, isExpired } from "react-jwt";
import { SessionChecker } from "../utils/SessionChecker";




const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: Colors.CUSTOMER_MAIN_COLOR,
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

const useStyles = makeStyles((theme) => ({
  selectedPageNoColor: {
    '& .MuiPaginationItem-root': {
      '&.Mui-selected': {
        background: Colors.CUSTOMER_MAIN_COLOR,
        color: 'white',
        // borderRadius: '50%',
      },

    },
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





  hideContent: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
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
    display: 'flex', textAlign: 'center', fontFamily: Fonts.LATO
  },

  title: {
    flexGrow: 1,
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#00adb5 !important",
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
    fontSize: 14,
    fontFamily: Fonts.LATO,
    [theme.breakpoints.up('lg')]: {
      fontSize: 16,
    }

  },
  tableMobContentSize: {
    marginLeft: "1%",
    fontSize: 12,
    fontFamily: Fonts.LATO,
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    }
  },
  mainContainer: {
    backgroundColor: Colors.CUSTOMER_LIGHT_COLOR,
    overflow: "hidden", minHeight: "96.8vh", maxWidth: "100vw"

  },
  subContainer1: {
    marginBottom: "5px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: "1%",
    paddingRight: "1%",
    paddingTop: "2%", paddingBottom: "2%",
    justifyContent: "space-between",

    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px",
    }
  },
  subContainer2: {
    display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "1%", paddingRight: "1%"
  },
  headText: {
    color: Colors.CUSTOMER_MAIN_COLOR, fontWeight: "bold", fontSize: 24, fontFamily: Fonts.UBUNTU,
  },
  mobTabSearch: {
    marginLeft: 10, marginBottom: 20, marginRight: 10,
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
  searchDesktop: {
    flex: 1, marginRight: "3%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  btnNewDesktop: {
    fontSize: 14,
    backgroundColor: Colors.CUSTOMER_MAIN_COLOR,
    width: 180,
    height: 40,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "&:hover": {
      backgroundColor: Colors.CUSTOMER_MAIN_COLOR,
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
  btnMobileCard: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  twoIconButtons: {
    flexDirection: "row", display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row", display: "flex", width: 120, justifyContent: 'space-around'
    },
  },
  headerBP:
  {
    marginRight: "3%", height: 40, display: "flex", alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flex: 1
    },
  }
}));


export default function EmployeeDetails() {
  const navigate = useNavigate();
  const [alert1, setAlert1] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openSend, setOpenSend] = React.useState(false);
  const [hideSvg, sethideSvg] = useState('hidden');
  const [pageLoading, setPageLoading] = useState("flex")
  const [serverDown, setServerDown] = useState(false);

  const [loadingModal, setloadingModal] = useState(false)

  const btnExcelDownloadRef = useRef(null);

  const inputSearchRef = useRef(null);

  const [searchQuery, setsearchQuery, searchQueryRef] = useState("")

  const [tokenData, settokenData] = useState({})

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickway") {
      return;
    }
    setAlert1(false);
  };
  const [Dataset, setDataset, DatasetRef] = useState([]);
  const [allCustomerDatas, setAllCustomerDatas, allCustomerDatasRef] = useState([]);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [allCustomerDataForTable, setAllCustomerDataForTable, allCustomerDataForTableRef] = useState([]);
  const [searched, setSearched] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage, pageRef] = useState(1);
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, allCustomerDatasRef.current.length - pageRef.current * rowsPerPage);
  const emptyRows = 0;
  const [totalCustomerCount, setTotalCustomerCount] = useState(0)


  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ').trim();
  };


  const requestSearch = (searchedVal) => {
    setPage(0)
    let searchTempCustomerDatas = allCustomerData
    if (searchedVal === "") {
      setAllCustomerDatas(allCustomerData);
    } else {
      setAllCustomerDatas(allCustomerData);
      const filteredRows = searchTempCustomerDatas.filter((row) => {
        if (isNumeric(searchedVal)) {
          return row.cusMobNo.toLowerCase().includes(searchedVal.toLowerCase());
        }
        else {
          return row.cusName.toLowerCase().includes(searchedVal.toLowerCase());
        }
      });
      setAllCustomerDatas(filteredRows);
    }
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };





  const isLetters = (value) => {
    return /\d/.test(value);
  }

  const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
  }

  const onCusSearch = (value) => {
    setloadingModal(true)
    setPage(1)
    if (value.length > 12) {
      setloadingModal(false)
      return
    }
    setsearchQuery(value)
    getAllCustomerDataNew()
    return
  }


  const viewBtnClick = (mobNo) => {
    for (let i = 0; i < allCustomerDatas.length; i++) {
      if (allCustomerDatas[i]["cusMobNo"] === mobNo) {
        const oneData = allCustomerDatas[i];
        navigate('/customer', { state: { data: oneData, page: 'View' } });
      }
    }
  };
  const editBtnClick = (mobNo) => {
    for (let i = 0; i < allCustomerDatas.length; i++) {
      if (allCustomerDatas[i]["cusMobNo"] === mobNo) {
        const oneData = allCustomerDatas[i];
        oneData["user"] = "admin";
        navigate('/customer', { state: { data: oneData, page: 'Edit' } });
      }
    }
  };
  const sendSMSClick = (name, mobileNo) => {
    var customerName = name;
    var mobileNo = mobileNo;
    var bodyFormData = new FormData();
    bodyFormData.append("From", "Komala");
    bodyFormData.append("To", mobileNo);
    bodyFormData.append("TemplateName", "orderConfirmation");
    bodyFormData.append("VAR1", customerName);
    axios({
      method: "post",
      url: "http://2factor.in/API/V1/bbc33d3e-1b5e-11ec-a13b-0200cd936042/ADDON_SERVICES/SEND/TSMS",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
    setOpenSend(false);
    setAlert1(true);
    setAlertMessage("Message Sended Successfully.");
  };


  const retryBtn = () => {
    window.location.reload()
  }


  const getAllCustomerDataNew = (tokenData) => {
    var dataToSend = {}

    if (searchQueryRef.current !== "") {
      if (isNumeric(searchQueryRef.current)) {
        dataToSend = { user: "admin", searchQuery: searchQueryRef.current, field: "cusMobNo", size: 10, page: (parseInt(pageRef.current)),username:tokenData.userData.emailId }
      }
      else {
        dataToSend = { user: "admin", searchQuery: searchQueryRef.current, field: "cusName", size: 10, page: (parseInt(pageRef.current)),username:tokenData.userData.emailId }
      }
    }
    else {
      var dataToSend = { user: "admin", searchQuery: "", field: "", size: 10, page: (parseInt(pageRef.current)),username:tokenData.userData.emailId };
    }

   
    axios
      .post(APIClient.API_BASE_URL + "/customerProcess/getAllCustomerData", dataToSend,APIClient.API_HEADERS)
      .then((response) => {

        // inputSearchRef.current.focus()
        setloadingModal(false)
        setPageLoading("none")
        setServerDown(true)
        setTotalCustomerCount(response.data.totalCustomerCount)
        let data = response.data.message
        let sortedCustomers = []
        sortedCustomers = data.sort(function (a, b) {
          var dateA = new Date(a.cusDate).getTime();
          var dateB = new Date(b.cusDate).getTime();
          return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
        });
        setAllCustomerDatas(sortedCustomers);
        setAllCustomerData(sortedCustomers);
        var temp = []
        for (let i in sortedCustomers) {
          let con = { "Name": sortedCustomers[i]["cusName"], "Registered Date": sortedCustomers[i]["cusDate"], "Email": sortedCustomers[i]["cusEmail"], "Mob No": sortedCustomers[i]["cusMobNo"], "Address": sortedCustomers[i]["cusAddress"], "Password": sortedCustomers[i]["cusId"], "Customer ID": sortedCustomers[i]["cusId"], "Salwar Count": sortedCustomers[i]["salwarCount"], "Blouse Count": sortedCustomers[i]["blouseCount"], "Amount": sortedCustomers[i]["finalAmount"] }
          temp.push(con)
        }
        setAllCustomerDataForTable(temp)
        setDataset([
          {
            columns: [
              {
                title: "Customer ID",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Registered Date",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
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
                title: "Address",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Password",
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
                title: "Total Amount",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              }


            ],
            data: (allCustomerDataForTableRef.current).map((data) => [
              { value: data["Customer ID"], style: { font: { sz: "12" } } },
              { value: formatDate(data["Registered Date"]), style: { font: { sz: "12" } } },
              { value: data["Name"], style: { font: { sz: "12" } } },
              { value: data["Mob No"], style: { font: { sz: "12" } } },
              { value: data["Address"], style: { font: { sz: "12" } } },
              { value: data["Password"], style: { font: { sz: "12" } } },
              { value: data["Salwar Count"], style: { font: { sz: "12" } } },
              { value: data["Blouse Count"], style: { font: { sz: "12" } } },
              { value: data["Amount"], style: { font: { sz: "12" } } }

            ]),
          },
        ]);


      }).catch((error) => {
        setPageLoading("none")
        setServerDown(false);
        sethideSvg('visible');
      })
  };


  const getAllCustomerDataForExcelFile = () => {
    var dataToSend = { user: "admin" ,username:tokenData.userData.emailId};

    axios
      .post(APIClient.API_BASE_URL + "/customerProcess/allCustomerData", dataToSend,APIClient.API_HEADERS)
      .then((response) => {
        // inputSearchRef.current.focus()
        setPageLoading("none")
        setServerDown(true)
        let data = response.data.message
        let sortedCustomers = []
        sortedCustomers = data.sort(function (a, b) {
          var dateA = new Date(a.cusDate).getTime();
          var dateB = new Date(b.cusDate).getTime();
          return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
        });
        // setAllCustomerDatas(sortedCustomers);
        // setAllCustomerData(sortedCustomers);
        var temp = []
        for (let i in sortedCustomers) {
          let con = { "Name": sortedCustomers[i]["cusName"], "Registered Date": sortedCustomers[i]["cusDate"], "Email": sortedCustomers[i]["cusEmail"], "Mob No": sortedCustomers[i]["cusMobNo"], "Address": sortedCustomers[i]["cusAddress"], "Password": sortedCustomers[i]["cusId"], "Customer ID": sortedCustomers[i]["cusId"], "Salwar Count": sortedCustomers[i]["salwarCount"], "Blouse Count": sortedCustomers[i]["blouseCount"], "Amount": sortedCustomers[i]["finalAmount"] }
          temp.push(con)
        }
        setAllCustomerDataForTable(temp)
        setDataset([
          {
            columns: [
              {
                title: "Customer ID",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Registered Date",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
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
                title: "Address",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              },
              {
                title: "Password",
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
                title: "Total Amount",
                style: { font: { sz: "13", bold: true } },
                width: { wpx: 125 },
              }


            ],
            data: (allCustomerDataForTableRef.current).map((data) => [
              { value: data["Customer ID"], style: { font: { sz: "12" } } },
              { value: formatDate(data["Registered Date"]), style: { font: { sz: "12" } } },
              { value: data["Name"], style: { font: { sz: "12" } } },
              { value: data["Mob No"], style: { font: { sz: "12" } } },
              { value: data["Address"], style: { font: { sz: "12" } } },
              { value: data["Password"], style: { font: { sz: "12" } } },
              { value: data["Salwar Count"], style: { font: { sz: "12" } } },
              { value: data["Blouse Count"], style: { font: { sz: "12" } } },
              { value: data["Amount"], style: { font: { sz: "12" } } }

            ]),
          },
        ]);

        btnExcelDownloadRef.current.click()

      }).catch((error) => {
        setPageLoading("none")
        setServerDown(false);
        sethideSvg('visible');
      })
  };



  const delBtnClick = (cusMobNo) => {
    var dataToSend = { user: "admin", cusMobNo: cusMobNo, username:tokenData.userData.emailId };
    swal.fire({
      title: `Are you sure to delete this Customer ${cusMobNo} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      dangerMode: true,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((willWarn) => {
      if (willWarn.isConfirmed) {
        axios.post(APIClient.API_BASE_URL + "/customerProcess/deleteCustomerData", dataToSend,APIClient.API_HEADERS)
          .then((res) => {
            if (res.data.message !== "Deleted") {
              sweetAlertShow("Please Delete Orders of this Customer", "warning")
            }
            else {
              // getAllCustomerData();
              getAllCustomerDataNew(tokenData)
            }
          });
      }
    });
    setOpen(false);
  }

  const formatDate = (date) => {
    var a = new Date(date)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formattedDate = a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear()
    return formattedDate
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getAllCustomerDataNew()
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onAddCustomerBtnClick = () => {
    navigate('/customer', { state: { data: "", page: 'Add' } });
  };

  const sweetAlertShow = (message, mode) => {
    swal.fire({ title: message, text: "", icon: mode, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', }).then((willWarn) => {
      if (willWarn.isConfirmed) {
        return
      }
    });
  }
  

  useEffect(() => {
    let decodedTokenData =   SessionChecker()
    decodedTokenData.success? settokenData(decodedTokenData.message):navigate("/")
    // getAllCustomerData();

    getAllCustomerDataNew(decodedTokenData.message)
  }, []);

  useEffect(() => {
    console.log("Working!")
  }, [allCustomerDatas])

  const classes = useStyles();
  return (
    <>
      {
        Object.keys(tokenData).length === 0 ?
          <div>Loading... Please Wait</div>
          :
          <div>
            <div className={classes.mainContainer}>
              <div>
                <AppBarHead dataParent={{ appBtnColor: Colors.CUSTOMER_MAIN_COLOR, appBtnText: "Customer Details", userData: tokenData.userData }} />
              </div>
              <div style={{ display: pageLoading, alignItems: "center", justifyContent: "center", backgroundColor: Colors.CUSTOMER_LIGHT_COLOR, height: "100vh", flexDirection: "column" }}>
                <CircularProgress style={{ color: Colors.CUSTOMER_MAIN_COLOR }} disableShrink />
                <Typography variant="h6" style={{ marginTop: 10, color: Colors.CUSTOMER_MAIN_COLOR, fontFamily: Fonts.LATO }}>Loading Customers.... Please Wait.... </Typography>
              </div>

              {
                serverDown === false ?
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2%', visibility: hideSvg }}>
                    <img alt="serverDown" className={classes.serverDownImage} src={ServerError} />
                    <Typography className={classes.serverDownHeadText} variant='h3'>Server Maintenance</Typography>
                    <Typography className={classes.serverDownSubText} variant='subtitle1'>We sincerely apologize for the inconvenience.</Typography>
                    <Typography className={classes.serverDownSubText} variant='subtitle1'>Our Site is currently under maintainence and will return shortly.</Typography>
                    <Typography className={classes.serverDownSubText} variant='subtitle1'>Please Try Again later or Contact Netcom.</Typography>
                    <Button style={{ width: '150px', backgroundColor: Colors.CUSTOMER_MAIN_COLOR, color: 'white', marginTop: "2%" }} onClick={() => retryBtn()}>Retry</Button>
                  </div>
                  :
                  <Slide direction='down' in='true'>
                    <div>

                      <div className={classes.subContainer1}>
                        <Typography>{serverDown}</Typography>

                        <div className={classes.headerBP}>
                          <Typography noWrap className={classes.headText}>
                            Customer Details
                          </Typography>
                        </div>

                        <div className={classes.searchDesktop} >

                          <Paper className={classes.searchRoot}>
                            <InputBase
                              autoFocus
                              // innerRef ={inputSearchRef}
                              // disabled={loadingModal}
                              // inputProps={{maxLength:5}}
                              value={searchQuery}
                              onChange={(e) => { onCusSearch(e.target.value) }}
                              fullWidth
                              className={classes.searchInput}
                              placeholder="Search Mobile No/ Name....."

                            />
                            <IconButton className={classes.searchIconButton} aria-label="search">
                              <SearchIcon />
                            </IconButton>
                          </Paper>

                        </div>

                        <div className={classes.twoIconButtons}>
                          <div style={{ marginBottom: "1%" }}>
                            <Button
                              startIcon={<AddIcon />}
                              variant="contained"
                              className={classes.btnNewDesktop}
                              onClick={onAddCustomerBtnClick}
                            > New Customer
                            </Button>

                            <div className={classes.mobTabSearch}>
                              <Card elevation={1} className={classes.btnMobileCard} >
                                <IconButton style={{ padding: 0 }}>
                                  <ControlPointIcon
                                    fontSize="medium"
                                    onClick={onAddCustomerBtnClick}
                                    style={{ color: "#4f8132", marginRight: "2%" }}
                                  />
                                </IconButton>
                              </Card>
                            </div>
                          </div>

                          <div>
                            <Button
                              onClick={() => { getAllCustomerDataForExcelFile() }}
                              variant="contained"
                              className={classes.btnDownloadDesktop}
                              startIcon={<GetAppIcon />}
                            >
                              Download File
                            </Button>

                            <div className={classes.mobTabSearch}>
                              <Card
                                elevation={1}
                                className={classes.btnMobileCard}
                              >
                                <IconButton onClick={() => { getAllCustomerDataForExcelFile() }} style={{ padding: 0 }}>
                                  <GetAppIcon
                                    fontSize="medium"
                                    style={{ color: "#E05D5D", marginLeft: "2%" }}
                                  />
                                </IconButton>
                              </Card>
                            </div>
                          </div>


                          {/* <Button onClick={() => { getAllCustomerDataForExcelFile() }} >Download</Button> */}

                          <div>
                            <ExcelFile
                              filename="Customer Data"
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


                                </div>

                              }
                            >
                              <ExcelSheet dataSet={Dataset} name="Customer Data Set" />
                            </ExcelFile>
                          </div>

                        </div>
                      </div>

                      {/* <div
                  style={{ flex: 1, marginRight: "1%", marginLeft: "1%" }}
                  className={classes.mobTabSearch}
                >

                  <SearchBar
                    style={{ height: 40 }}
                    color="#00abb5"
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search Mobile No/ Name....."
                    variant="outlined"
                  />
                  
                </div> */}


                      <div className={classes.mobTabSearch} >

                        <Paper className={classes.searchRoot}>
                          <InputBase

                            value={searchQuery}
                            onChange={(e) => { onCusSearch(e.target.value) }}
                            fullWidth
                            className={classes.searchInput}
                            placeholder="Search Mobile No/ Name....."
                            inputProps={{ 'aria-label': 'Search Mobile No/ Name' }}
                          />
                          <IconButton className={classes.searchIconButton} aria-label="search">
                            <SearchIcon />
                          </IconButton>
                        </Paper>

                      </div>



                      {
                        loadingModal ?
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: Colors.CUSTOMER_LIGHT_COLOR, flexDirection: "column", marginTop: 30 }}>
                            <CircularProgress style={{ color: Colors.CUSTOMER_MAIN_COLOR }} disableShrink />
                            <Typography variant="h6" style={{ marginTop: 10, color: Colors.CUSTOMER_MAIN_COLOR, fontFamily: Fonts.LATO }}>Loading Customers.... Please Be Patient.... </Typography>
                          </div>
                          :
                          <div className={classes.subContainer2} >

                            {
                              allCustomerDatasRef.current.length === 0 ?
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                                  <div style={{ display: "flex" }}>
                                    {
                                      searchQuery === "" ?
                                        <div>
                                          <Lottie style={{ height: 400, width: 700 }} autoPlay={true} loop={true} animationData={LootieAddCustomer} />
                                          <Typography variant="h6">Add Your Customers to keep track of who's paid you and who owes you money</Typography>
                                          <Button
                                            style={{ marginTop: 20, height: 50, width: 200, backgroundColor: Colors.CUSTOMER_MAIN_COLOR, color: "white" }}
                                            startIcon={<AddIcon />}
                                            variant="contained"

                                            onClick={onAddCustomerBtnClick}
                                          > New Customer
                                          </Button>
                                        </div>
                                        :
                                        <div>
                                          <Lottie style={{ height: 500, width: 500 }} animationData={LootieNoData} />
                                          <Typography variant="h6">No Search Results Found for&nbsp; <span style={{ fontWeight: "bold", color: Colors.CUSTOMER_MAIN_COLOR }}>{searchQuery}</span> </Typography>
                                        </div>
                                    }


                                  </div>



                                </div>

                                :
                                <div style={{ width: "100%", flex: 1, paddingTop: "0%" }}>
                                  <Card elevation={5}>
                                    <TableContainer component={Paper}>
                                      <Table size="small" >
                                        <TableHead>
                                          <StyledTableRow >
                                            <StyledTableCell className={classes.hideContent} align="left" >
                                              <Typography className={classes.headFontSize}  >Customer ID</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell className={classes.hideContent} align="left">
                                              <Typography className={classes.headFontSize} > Registered Date</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                              <Typography className={classes.headFontSize} >  Customer Name</Typography>
                                            </StyledTableCell>
                                            {/* <StyledTableCell align="left">
                                <Typography  variant={"subtitle1"} >   Customer Mob.No</Typography>
                              </StyledTableCell> */}
                                            <StyledTableCell className={classes.hideContent} align="left" >
                                              <Typography className={classes.headFontSize} >  Customer Email ID</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell className={classes.hideContent} align="left">
                                              <Typography className={classes.headFontSize} >  Salwar</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell className={classes.hideContent} align="left" >
                                              <Typography className={classes.headFontSize} >  Blouse</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell className={classes.hideContent} align="left" >
                                              <Typography className={classes.headFontSize} >  Amount</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center" >
                                              <Typography className={classes.headFontSize} >  Action</Typography>
                                            </StyledTableCell>
                                          </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                          {allCustomerDatasRef.current.map((row) => (
                                            <StyledTableRow>
                                              <StyledTableCell className={classes.hideContent}>
                                                <Typography className={classes.tableContentSize} > {row.cusId}</Typography>
                                              </StyledTableCell>
                                              <StyledTableCell align="left" className={classes.hideContent}>
                                                <Stack direction="row" alignItems="center" gap={1}>
                                                  <CalendarTodayIcon style={{ color: "grey" }} />
                                                  <Typography className={classes.tableContentSize} style={{ width: "100%" }}> {formatDate((row.cusDate).split("T")[0])}</Typography>
                                                </Stack>
                                              </StyledTableCell>
                                              <StyledTableCell align="left">
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                  <Avatar variant="rounded" style={{ backgroundColor: row.cusColor }}>{(row.cusName.toUpperCase())[0]}</Avatar>
                                                  <div style={{ display: "flex", flexDirection: "column", marginLeft: 5 }}>
                                                    <Tooltip title={toTitleCase(row.cusName)} arrow TransitionComponent={Zoom}>
                                                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '7rem' }}>
                                                        <Typography noWrap={true} className={classes.tableContentSize} style={{ color: "black" }}>{toTitleCase(row.cusName)}</Typography>
                                                      </div>
                                                    </Tooltip>
                                                    <Stack direction="row" alignItems="center" gap={0}  >

                                                      <PhoneIcon style={{ width: 15, height: 13, color: "grey" }} />
                                                      <Typography className={classes.tableMobContentSize} style={{ color: "grey" }}>{row.cusMobNo}</Typography>
                                                    </Stack>
                                                  </div>

                                                </div>
                                              </StyledTableCell>



                                              <StyledTableCell align="left" className={classes.hideContent}>
                                                <div style={{ display: "flex", alignItems: "center" }}>

                                                  <Typography className={classes.tableContentSize} > {row.cusEmail === "" ? "-" : row.cusEmail}</Typography>
                                                </div>
                                              </StyledTableCell>
                                              <StyledTableCell align="center" className={classes.hideContent}>
                                                <Avatar variant="square" style={{ backgroundColor: Colors.SALWAR_COLOR, width: 30, height: 30 }}>
                                                  <Typography style={{ fontSize: 16 }}> {row.salwarCount}</Typography>
                                                </Avatar>
                                              </StyledTableCell>
                                              <StyledTableCell align="center" className={classes.hideContent}>
                                                <Avatar variant="square" style={{ backgroundColor: Colors.BLOUSE_COLOR, width: 30, height: 30 }}>
                                                  <Typography style={{ fontSize: 16 }}>  {row.blouseCount}</Typography>
                                                </Avatar>

                                              </StyledTableCell>
                                              <StyledTableCell align="left" className={classes.hideContent}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                  <Typography className={classes.tableContentSize} style={{ marginLeft: "3%", color: "green", fontWeight: "bold" }}>₹ {row.finalAmount}</Typography>
                                                </div>
                                              </StyledTableCell>
                                              <StyledTableCell align="center">
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}  >
                                                  <Card elevation="3" style={{ display: "flex", padding: "2%" }}>
                                                    <Tooltip title="View" arrow TransitionComponent={Zoom} >
                                                      <ViewIcon
                                                        onClick={() => viewBtnClick(row.cusMobNo)}
                                                        style={{ alignItems: "center", color: "green", marginLeft: "10px", marginRight: "10px", width: 30, height: 30, verticalAlign: "middle", cursor: "pointer" }}
                                                      />
                                                    </Tooltip>
                                                    <Divider orientation="vertical" flexItem />
                                                    <Tooltip title="Edit" arrow TransitionComponent={Zoom} >
                                                      <EditIcon
                                                        onClick={() => editBtnClick(row.cusMobNo)}
                                                        style={{ alignItems: "center", color: "orange", marginLeft: "10px", marginRight: "10px", width: 30, height: 30, verticalAlign: "middle", cursor: "pointer" }}
                                                      />
                                                    </Tooltip>
                                                    <Divider orientation="vertical" flexItem />
                                                    <Tooltip title="Delete" arrow TransitionComponent={Zoom} >
                                                      <DeleteIcon
                                                        onClick={() => delBtnClick(row.cusMobNo)}
                                                        style={{ alignItems: "center", color: "red", marginLeft: "10px", marginRight: "10px", width: 30, height: 30, verticalAlign: "middle", cursor: "pointer" }}
                                                      />
                                                    </Tooltip>
                                                  </Card>
                                                </div>
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
                                            count={Math.ceil(totalCustomerCount / 10)}
                                            // rowsPerPage={rowsPerPage}
                                            page={pageRef.current}
                                            // SelectProps={{ inputProps: { "aria-label": "rows per page" }, native: true, }}
                                            onChange={handleChangePage}
                                            classes={{
                                              root: classes.selectedPageNoColor,
                                            }}
                                          // onRowsPerPageChange={handleChangeRowsPerPage}
                                          />
                                        </TableRow>
                                      </TableFooter>
                                    </TableContainer>
                                  </Card>
                                </div>
                            }


                          </div>

                      }



                      <div>
                        <Snackbar open={alert1} autoHideDuration={2000} onClose={handleCloseAlert}>
                          <Alert onClose={handleCloseAlert} severity="success">
                            {alertMessage}
                          </Alert>
                        </Snackbar>
                      </div>

                      {/* <Modal
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  open={loadingModal}
               
                >
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 10, backgroundColor: "white" }}>
                    <CircularProgress style={{ color: Colors.CUSTOMER_MAIN_COLOR }} />
                    <Typography style={{ color: Colors.CUSTOMER_MAIN_COLOR }}>Loading Customers... Please be patient</Typography>
                  </div>
                </Modal> */}
                    </div>
                  </Slide>


              }


            </div>
            <Footer dataBackParent={{ backColor: Colors.CUSTOMER_LIGHT_COLOR }} />
          </div>
      }
    </>
  );
}