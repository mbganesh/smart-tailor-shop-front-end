import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableHead, TableRow, Typography, Card } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBarHead from "./AppbarHead";
import GetAppIcon from '@material-ui/icons/GetApp';
import Helpers from './Helpers'
import ReactExport from "react-data-export";
import Footer from './Footer'
import { Colors, Fonts } from "./constants";
import store from "store2";
import { useNavigate } from "react-router";
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const bgColor = "#bcdcf6"
const colorCode = "rgba(6, 101, 178, 0.7)";
const useStyles = makeStyles((theme) => ({
  hideContent: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  appBarStyle: {
    display: "flex",
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "#00ADB5",
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#00adb5 !important",
  },



  reportMain: {
    display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: "1%", marginBottom: "1%", alignItems: "center",
    [theme.breakpoints.down('xs')]: {
      marginTop: "2%", marginBottom: "2%"
    },
  },

  fromText: {
    [theme.breakpoints.down('xs')]: {
      marginTop: "4%"
    },
  },

  toText: {
    marginLeft: "2%",
    marginRight: "2%",
    [theme.breakpoints.down('xs')]: {
      marginTop: "4%"
    },
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      marginTop: "4%"
    },
  },

  secContainer: {
    display: "flex", width: "100%",
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      flexDirection: "column"
    },

  },
  secContainerItemsdiv1: {
    width: '49%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '55vh'
    },
  },
  secContainerItemsdiv2: {
    width: '49%', 
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  secContainerItemsCard: {
    height: "40vh", position: "relative", marginBottom: "2%", paddingTop: "1%", paddingBottom: "10%", paddingLeft: "2%", paddingRight: "2%", borderColor: Colors.CUSTOMER_MAIN_COLOR, border: "1px solid",

    [theme.breakpoints.down('lg')]: {
      paddingBottom: "13%", paddingTop: "2%",
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: "18%", paddingTop: "2%",
    },

    [theme.breakpoints.down('sm')]: {
      paddingBottom: "15%", paddingTop: "2%", marginBottom: "2%"
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: "45%", paddingTop: "2%",
    },
  },
  firstContainerItemsCard: {
    height: "40vh", position: "relative", marginBottom: "2%", paddingTop: "1%", paddingBottom: "6%", paddingLeft: "2%", paddingRight: "2%", borderColor: Colors.CUSTOMER_MAIN_COLOR, border: "1px solid",
    [theme.breakpoints.down('md')]: {
      paddingBottom: "9%", paddingTop: "2%",
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: "16%", paddingTop: "2%",
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: "22%", paddingTop: "2%",
    },
  }

}));

export default function DashBoard() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [hideTable, setHideTable] = useState("none");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportTableData, setReportTableData] = useState([]);
  const [Dataset, setDataset] = useState([]);
  const [allCustomerDatas, setAllCustomerDatas] = useState([]);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // const [yearValue, setYearValue] = useState(new Date())
  const [customerDatas, setCustomerDatas] = useState([])


  const options = {
    // responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const customerDataOptions = {
    // responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };

  const [chartLabels, setChartLabels] = useState([])
  const [chartSalwarData, setChartSalwarData] = useState([])
  const [chartDressData, setChartDressData] = useState([])
  const [chartBlouseData, setChartBlouseData] = useState([])
  const [chartAmountData, setChartAmountData] = useState([])
  const [chartCusLabels, setChartCusLabels] = useState([])
  const [chartDressLabels, setChartDressLabels] = useState([])
  const [chartCusData, setChartCusData] = useState([])

  const [cusDataYearLabels, setCusDataYearLabels] =useState([])
  const [cusDataYearData, setCusDataYearData] = useState([])



  const [chartSalwarDataTotal, setChartSalwarDataTotal] = useState(0)
  const [chartBlouseDataTotal, setChartBlouseDataTotal] = useState(0)
  const [chartAmountTotal, setChartAmountTotal] = useState(0)
  const [chartCusDataTotal, setChartCusTotal] = useState(0)

  const [yearValue, setYearValue] = useState(new Date());


  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Customers',
        data: chartSalwarData,
        backgroundColor: Colors.SALWAR_LIGHT_COLOR,
        borderColor: Colors.SALWAR_COLOR,
        borderWidth: 2
      },
    ],
  };


  const top10customerData = {
    labels: chartCusLabels,
    datasets: [
      {
        label: 'Amount Gained',

        data: chartCusData,
        backgroundColor: "#ecc5d3",
        borderColor: "#D885A3",
        borderWidth: 2
      }

    ],
  };

  const customerYearChartData = {
    labels: cusDataYearLabels,
    datasets: [
      {
        label: 'Customers',
        data: cusDataYearData,
        backgroundColor: Colors.CUSTOMER_LIGHT_COLOR,
        borderColor: Colors.CUSTOMER_MAIN_COLOR,
        borderWidth: 2
      }

    ],
  };


  const dressData = {
    labels: chartDressLabels,
    datasets: [
      {
        label: 'Dress Quantity',
        data: chartDressData,
        backgroundColor: [Colors.SALWAR_LIGHT_COLOR, Colors.BLOUSE_LIGHT_COLOR],
        borderColor: [Colors.SALWAR_COLOR, Colors.BLOUSE_COLOR],
        borderWidth: 2
      }
    ],
  };

  const amountData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Amount Gained',
        data: chartAmountData,
        backgroundColor: Colors.ORDER_LIGHT_COLOR,
        borderColor: Colors.ORDER_MAIN_COLOR,
        borderWidth: 2
      }

    ],
  };


  const formatDate = (date) => {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let dateArr = date.split("-")
    const formattedDate = dateArr[2] + "-" + month[dateArr[1] - 1] + "-" + dateArr[0]


    return formattedDate
  }

  const formatNumber = (number) => {
    // const formattedNumber = number.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    const formattedNumber = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number)
    return formattedNumber

  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sessionCheck = () => {
    let currentDateTime = new Date();
    let sessionDateTime = store.session("date");

    if (sessionDateTime > currentDateTime.toISOString()) {
      console.log(true)
    }
    else {
      navigate("/");
      return
    }
  }

  const getYearBasedCustomerData = (year,allCustomerData) => {
    let monthwithNo = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' }
    let nums = Object.values(monthwithNo)
    let mons = Object.keys(monthwithNo)
    let customerYearBasedData = {}
    let myReg = new RegExp(`${year.getFullYear()}`, '');

    let x = allCustomerData.filter(el => myReg.test(el['cusDate'].split('-')[0]))

    for (let i = 0; i < 12; i++) {
      let oneMon = x.filter(el => nums[i] === el['cusDate'].split('-')[1])
      customerYearBasedData[mons[i]] = oneMon.length
    }

    setCusDataYearLabels(Object.keys(customerYearBasedData))
    setCusDataYearData(Object.values(customerYearBasedData))
  }

  const getCustomerDatas = () => {
    var dataToSend = { user: "admin" };
    var url = Helpers().apiURL + "/allCustomerData"

    axios
      .post(Helpers().apiURL + "/allCustomerData", dataToSend)
      .then((response) => {
        let allCustomerData = response.data.message
        setAllCustomerData(response.data.message)
        let top10CustomersArr = response.data.top10Customer
      
        setChartCusLabels((top10CustomersArr.map((text) => { return text.cusName })))
        setChartCusData((top10CustomersArr.map((text) => { return text.finalAmount })))

        getYearBasedCustomerData(yearValue,response.data.message )

      }).catch((error) => {
        console.log(error)
      })
  };

  const getProductSales = () => {
    var dataToSend = { user: "admin" };
    axios
      .post(Helpers().apiURL + "/dashBoard", dataToSend)
      .then((response) => {
        let dressData = { "Salwar": response.data.message.Salwar, "Blouse": response.data.message.Blouse }
        setChartDressLabels(Object.keys(dressData))
        setChartDressData(Object.values(dressData))
      })
  }

  const onYearChange = (value) => {
    setYearValue(value);
    getYearBasedCustomerData(value, allCustomerData)
  };


  useEffect(() => {
    sessionCheck()
    getCustomerDatas()
    getProductSales()
  }, []);

  return (
    <>
      <div style={{ backgroundColor: Colors.REPORT_LIGHT_COLOR, overflow: "hidden", minHeight: "96.8vh", maxWidth: "100vw", backgroundRepeat: "no-repeat" }} >
        <div>
          <AppBarHead dataParent={{ appBtnColor: Colors.DASHBOARD_MAIN_COLOR, appBtnText: "DashBoard" }} />
        </div>

        <div style={{ width: "90%", margin: 'auto', flex: 1, paddingTop: "1%", display: "" }}>
          <Card elevation={3} className={classes.firstContainerItemsCard}>
            <div >
              <Typography variant="subtitle1" style={{color:Colors.DASHBOARD_MAIN_COLOR, fontWeight:"bold"}}>
                Our Top 10 Customers
              </Typography>
            </div>
            <Bar options={customerDataOptions} data={top10customerData} />
          </Card>

          <div className={classes.secContainer}>
            <div className={classes.secContainerItemsdiv1}>
              <Card elevation={3} className={classes.secContainerItemsCard}>
                <div >
                  <Typography variant="subtitle1"  style={{color:Colors.DASHBOARD_MAIN_COLOR, fontWeight:"bold"}}>
                    Our Product Sales
                  </Typography>
                  <Typography variant="subtitle2" style={{ color: "grey" }}>
                    Salwar - {formatNumber(chartDressData[0])} &nbsp;&nbsp;
                    Blouse - {formatNumber(chartDressData[1])}
                  </Typography>
                </div>
                <Doughnut options={customerDataOptions} data={dressData} />
              </Card>
            </div>

            <div className={classes.secContainerItemsdiv2}>
              <Card elevation={3} className={classes.secContainerItemsCard}>
                <div style={{ display: "flex" }} >
                  <div>
                    <Typography variant="subtitle1"  style={{color:Colors.DASHBOARD_MAIN_COLOR, fontWeight:"bold"}}>
                      Customer Report
                    </Typography>
                    <Typography variant="subtitle2" style={{ color: "grey" }}>
                      Total Customers for Year {yearValue.getFullYear().toString()}  : {cusDataYearData.reduce((partialSum, a) => partialSum + a, 0)}
                    </Typography>
                    <Typography variant="subtitle2" style={{ color: "grey" }}>
                      Total Customers of All Years : {allCustomerData.length}
                    </Typography>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <div style={{ width: 200 }}>
                        <DatePicker
                          inputFormat="yyyy"
                          views={["year"]}
                          label="Year"
                          minDate={new Date("2021-03-01")}
                          maxDate={new Date("2030-06-01")}
                          value={yearValue}
                          onChange={(value) => {
                            onYearChange(value);
                          }}
                          renderInput={(params) => <TextField {...params} helperText={null} />}
                        />
                      </div>
                    </LocalizationProvider>
                  </div>
                </div>
                <Line options={customerDataOptions} data={customerYearChartData} />
              </Card>
            </div>
          </div>


        
        </div>

      </div>
      <Footer dataBackParent={{ backColor: Colors.REPORT_LIGHT_COLOR }} />
    </>
  );
}