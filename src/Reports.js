import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableHead, TableRow, Typography, TextField, Card } from "@material-ui/core";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

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

  TextField: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: Colors.REPORT_MAIN_COLOR,
    }
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
    flexWrap:'wrap',
    justifyContent:'space-between',

    [theme.breakpoints.down('sm')]: {
      flexDirection: "column"
    },
    
  },
  secContainerItemsdiv1:{
    width:'49%', 
    [theme.breakpoints.down('sm')]: {
      width:'100%',
      height:'55vh'
    },
  },
  secContainerItemsdiv2:{
  width:'49%', 
  [theme.breakpoints.down('sm')]: {
    width:'100%'
  },
},
secContainerItemsCard:{
  height: "40vh", position: "relative", marginBottom: "2%", paddingTop: "1%", paddingBottom: "6%", paddingLeft: "2%", paddingRight: "2%", borderColor: Colors.CUSTOMER_MAIN_COLOR, border: "1px solid",
  
  [theme.breakpoints.down('lg')]: {
    paddingBottom: "9%",paddingTop: "2%",
  },
  [theme.breakpoints.down('md')]: {
    paddingBottom: "9%",paddingTop: "2%",
  },
  
  [theme.breakpoints.down('sm')]: {
    paddingBottom: "10%",paddingTop: "2%", marginBottom:"2%"
  },
  [theme.breakpoints.down('xs')]: {
    paddingBottom: "22%",paddingTop: "2%",
  },
},
firstContainerItemsCard:{
  height: "40vh", position: "relative", marginBottom: "2%", paddingTop: "1%", paddingBottom: "6%", paddingLeft: "2%", paddingRight: "2%", borderColor: Colors.CUSTOMER_MAIN_COLOR, border: "1px solid",
  [theme.breakpoints.down('md')]: {
    paddingBottom: "9%",paddingTop: "2%",
  },
  [theme.breakpoints.down('sm')]: {
    paddingBottom: "16%",paddingTop: "2%",
  },
  [theme.breakpoints.down('xs')]: {
    paddingBottom: "22%",paddingTop: "2%",
  },
}

}));

export default function ReportPage() {

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
  const [chartBlouseData, setChartBlouseData] = useState([])
  const [chartAmountData, setChartAmountData] = useState([])
  const [chartCusLabels, setChartCusLabels] = useState([])
  const [chartCusData, setChartCusData] = useState([])



  const [chartSalwarDataTotal, setChartSalwarDataTotal] = useState(0)
  const [chartBlouseDataTotal, setChartBlouseDataTotal] = useState(0)
  const [chartAmountTotal, setChartAmountTotal] = useState(0)
  const [chartCusDataTotal, setChartCusTotal] = useState(0)


  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Salwar',
        data: chartSalwarData,
        backgroundColor: Colors.SALWAR_LIGHT_COLOR,
        borderColor: Colors.SALWAR_COLOR,
        borderWidth: 2
      },
      {
        label: 'Blouse',
        data: chartBlouseData,
        backgroundColor: Colors.BLOUSE_LIGHT_COLOR,
        borderColor: Colors.BLOUSE_COLOR,
        borderWidth: 2
      },

    ],
  };


  const customerData = {
    labels: chartCusLabels,
    datasets: [
      {
        label: 'New Customers',
        fill: "start",
        data: chartCusData,
        backgroundColor: Colors.CUSTOMER_LIGHT_COLOR,
        borderColor: Colors.CUSTOMER_MAIN_COLOR,
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

    // let dtFormat = new Intl.DateTimeFormat('en-IN', {
    //   day: '2-digit',
    //   month: 'short',
    //   year: 'numeric',
    // })
    // let convertedDate = new Date(date)
    // let formattedDate = dtFormat.format(convertedDate)
    return formattedDate
  }

  const formatNumber = (number) => {
    // const formattedNumber = number.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    const formattedNumber = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number)
    return formattedNumber

  }

  const onGenerateReportBtnClick = () => {
    if (fromDate === "" || toDate === "") {
      alert("Please Fill From Date and To Date!!")
      return
    }

    var dataToSend = { user: "admin", fromDate: fromDate + "T00:00:00.000Z", toDate: toDate + "T24:00:00.000Z" };
    axios
      .post(Helpers().apiURL + "/fromtodate", dataToSend)
      .then((response) => {

        if (response.data.message.length === 0) {
          setHideTable("none")
          alert("No Data Found")
          setAllCustomerDatas(response.data.message);
          setAllCustomerData(response.data.message);

        }
        else {
          setAllCustomerDatas(response.data.message);
          setAllCustomerData(response.data.message);
          setReportTableData(response.data.message)
          let tempData = response.data.message
          let customerData = response.data.customerReportData


          setChartLabels((tempData.map((text) => { return text.dailyDate })).slice(0, -1))
          setChartSalwarData((tempData.map((text) => { return text.salwarCount })).slice(0, -1))
          setChartBlouseData((tempData.map((text) => { return text.blouseCount })).slice(0, -1))
          setChartAmountData((tempData.map((text) => { return text.grandTotal })).slice(0, -1))

          setChartCusLabels((customerData.map((text) => { return text.dailyDate })).slice(0, -1))

          setChartCusData((customerData.map((text) => { return text.customerCount })).slice(0, -1))

          setChartCusTotal(customerData.at(-1)["customerCount"])

          setChartSalwarDataTotal(tempData.at(-1)["salwarCount"])
          setChartBlouseDataTotal(tempData.at(-1)["blouseCount"])
          setChartAmountTotal(tempData.at(-1)["grandTotal"])




          setDataset([
            {
              columns: [
                {
                  title: "Date",
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
              data: tempData.map((data) => [
                { value: data["dailyDate"], style: { font: { sz: "12" } } },
                { value: data["salwarCount"], style: { font: { sz: "12" } } },
                { value: data["blouseCount"], style: { font: { sz: "12" } } },
                { value: data["grandTotal"], style: { font: { sz: "12" } } }


              ]),
            },
          ]);
          setHideTable("")
        }

      });
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

  useEffect(() => {
    sessionCheck()
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: Colors.REPORT_LIGHT_COLOR,
          overflow: "hidden",
          minHeight: "96.8vh",
          maxWidth: "100vw",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <AppBarHead dataParent={{ appBtnColor: Colors.REPORT_MAIN_COLOR, appBtnText: "Report" }} />
        </div>

        <div style={{ marginTop: "1%", display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "90%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Typography
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: Fonts.UBUNTU,
                backgroundColor: Colors.REPORT_MAIN_COLOR,
                color: "#fff",
                width: "100%",
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Reports
            </Typography>
            <div className={classes.reportMain}>
              <div className={classes.fromText}>
                <TextField size="small" value={fromDate} InputLabelProps={{ shrink: true }} variant="outlined" type="date" onChange={(e) => { setFromDate(e.target.value) }} className={classes.TextField} label="From Date" />
              </div>
              <div className={classes.toText}>
                <TextField size="small" value={toDate} InputLabelProps={{ shrink: true }} variant="outlined" type="date" className={classes.TextField} onChange={(e) => { setToDate(e.target.value) }} label="To Date" />
              </div>
              <div className={classes.button}>
                <Button variant="contained" size="medium" style={{ backgroundColor: Colors.REPORT_MAIN_COLOR, color: "white", width: 180, height: 40, }} onClick={() => { onGenerateReportBtnClick() }}>
                  Generate Report
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ width: "90%", margin: 'auto', flex: 1, paddingTop: "1%", display: hideTable }}>
        <Card elevation={3} className={classes.firstContainerItemsCard}>
            <div>
              <Typography variant="subtitle1">
                Sales Report of{" "}{formatDate(fromDate)}{" "}to{" "}{formatDate(toDate)}
              </Typography>
              <Typography variant="subtitle2" style={{ color: "grey" }}>
                Total Salwar Sales - {formatNumber(chartSalwarDataTotal)}
              </Typography>
              <Typography variant="subtitle2" style={{ color: "grey" }}>
                Total Blouse Sales - {formatNumber(chartBlouseDataTotal)}
              </Typography>


            </div>
            <Bar options={options} data={chartData} />
          </Card>








          <div className={classes.secContainer}>
            <div className={classes.secContainerItemsdiv1}>
              <Card elevation={3}  className={classes.secContainerItemsCard}>
                <div >
                  <Typography variant="subtitle1">
                    Customer Report of{" "}{formatDate(fromDate)}{" "}to{" "}{formatDate(toDate)}
                  </Typography>
                  <Typography variant="subtitle2" style={{ color: "grey" }}>
                    Total Customers - {formatNumber(chartCusDataTotal)}
                  </Typography>
                </div>
                <Line options={customerDataOptions} data={customerData} />
              </Card>
            </div>

            <div className={classes.secContainerItemsdiv2}>
              <Card elevation={3}  className={classes.secContainerItemsCard}>
                <div >
                  <Typography variant="subtitle1">
                    Amount Gained Report of{" "}{formatDate(fromDate)}{" "}to{" "}{formatDate(toDate)}
                  </Typography>
                  <Typography variant="subtitle2" style={{ color: "grey" }}>
                    Total Amount Gained - {"₹ " + formatNumber(chartAmountTotal)}
                  </Typography>
                </div>
                <Bar options={customerDataOptions} data={amountData}  />
              </Card>
            </div>
          </div>


          <div>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow style={{ backgroundColor: Colors.REPORT_MAIN_COLOR, }}>
                    <TableCell
                      align="left"
                      style={{ color: "#fff", fontWeight: "bold" }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ color: "#fff", fontWeight: "bold" }}
                    >
                      Salwar
                    </TableCell>
                    <TableCell
                      style={{ color: "#fff", fontWeight: "bold" }}
                      align="left"
                    >
                      Blouse
                    </TableCell>
                    <TableCell
                      style={{ color: "#fff", fontWeight: "bold" }}
                      align="left"
                    >
                      Amount
                    </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? allCustomerDatas.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : allCustomerDatas
                  ).map((row) => (
                    <TableRow>
                      <TableCell>
                        {row.dailyDate}
                      </TableCell>
                      <TableCell align="left" >
                        {row.salwarCount}
                      </TableCell>
                      <TableCell align="left">{row.blouseCount}</TableCell>
                      <TableCell align="left">{"₹ " + row.grandTotal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TableFooter
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                    colSpan={3}
                    count={allCustomerDatas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </TableContainer>
          </div>

          <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%", paddingBottom: "1%" }}>
            <div >
              {reportTableData.length !== 0 ? (
                <ExcelFile
                  filename="Sales Report Data"
                  element={
                    <Button variant="contained"
                      color="primary"
                      startIcon={<GetAppIcon />}
                      style={{
                        backgroundColor: "#E05D5D", width: 180,
                        height: 40,
                      }}
                    > Download File
                    </Button>}>
                  <ExcelSheet dataSet={Dataset} name="Sales Report" />
                </ExcelFile>
              ) : null}

            </div>
          </div>

        </div>

      </div>
      <Footer dataBackParent={{ backColor: Colors.REPORT_LIGHT_COLOR }} />
    </>
  );
}