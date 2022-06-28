
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import { Typography, TextField, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@material-ui/core";
import React,{useState, useEffect} from "react";
import date from "date-and-time";
import InputAdornment from '@material-ui/core/InputAdornment';
import Logo from "./images/logo/logo.svg";
import ShivaneLogo from "./images/billAssets/1.png";
import { faCalendarWeek, faBoxes, faCheck, faSpinner, faShoppingBag, faCheckDouble, faFolder, faUsers, faUser, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const useStyles = makeStyles((theme) => ({
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
    color: "#00adb5",
  },
  billTable:{
    minWidth: 650,
    "& .MuiTableCell-root": {
      borderLeft: "1px solid black",
      borderRight:"1px solid black",
      borderTop:"1px solid black",
      borderBottom:"1px solid black",
    }
  }
}));


function ComponentToPrintFun(props) {
  const [billDataReceived, setbillDataReceived] = useState({})
  const [orderDatas, setOrderDatas] = useState([])
  const [subAmount, setSubAmount] = useState(0)
  const [gst, setGst] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [dueAmount, setDueAmount] = useState(0)
  const [value, setvalue] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("Total Due")
  const [gstHider, setGstHider] = useState("")
  const [dcHider, setDcHider] = useState("")
  const [billDate, setBillDate] = useState("")

const handleChange = (event) =>{
  setvalue(event.target.value)
}

const formatDate = (date) =>{
  var a = new Date(date)
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var formattedDate = a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear()
  return formattedDate
}

const getCurrentDataAndTime = () =>{
  var currentdate = new Date().toISOString()
  setBillDate(currentdate)
}


useEffect(() => {
  var billDataReceived = props.dataFromParent
  console.log(billDataReceived)
  setOrderDatas(billDataReceived.OrderDatas)
  setbillDataReceived(billDataReceived)
  getCurrentDataAndTime()
  var a = [];
  billDataReceived.OrderDatas.map((row) => (
    a.push(row.price)
  ))
  var c = a.reduce((a, b) => a + b, 0)
  setSubAmount(c)

  var e = 0

  if (billDataReceived.gst) {
    var d = (c * 18) / 100
    setGst(d)
    e = c + d
    setGstHider("")
  }
  else {
    e = c
    setGstHider("none")
  }
  if (!billDataReceived.dcStatus) {
    setDcHider("none")
  }
  else {
    console.log(e)
    console.log(e)
    e = e - billDataReceived.dcAmount
    console.log(e)
  }
  setTotalAmount(Math.round(e))
  let Amount = billDataReceived.grandTotal - billDataReceived.payAmount
  if (Amount <= 0) {
    setPaymentStatus("Change")
    setDueAmount(Amount * (-1))
  }
  else {
    setPaymentStatus("Total Due")
    setDueAmount(Amount)
  }
}, [])

  return(
    <div  >
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
      <Typography style={{ fontSize: '16px' }}>     </Typography>
    </div>

    <div >
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: "center" }}>
        <Typography variant={"h5"} style={{ fontWeight: 'bold', }}>Komala Creation</Typography>
      
        <Typography variant={"subtitle2"} >4, Chinnakoil, Murugankurichi<br /></Typography>
        <Typography variant={"subtitle2"} >Tirunelveli - 627002<br /></Typography>
        <Typography variant={"subtitle2"} >Cell: +91 9585501760</Typography>
        <Divider style={{ color: "red", height: "1px", backgroundColor: "grey", width: "90%", margin: "auto" }} />

      </div>

      <div style={{ display: 'flex', width: '90%', margin: 'auto', marginTop: '1%', }}>
        <Typography variant={"subtitle2"}>Customer ID:</Typography>
        <Typography variant={"subtitle2"} style={{ fontWeight: 'bold', marginLeft: 10 }}> {billDataReceived.cusId}</Typography>
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          <Typography variant={"subtitle2"} inline>Bill Date:</Typography>
          <Typography variant={"subtitle2"} style={{ fontWeight: 'bold', marginLeft: 10 }}>{()=>{formatDate(billDataReceived.deliveryDate)}}</Typography>
        </div>
      </div>

      <div style={{ display: 'flex', width: '90%', margin: 'auto', marginTop: '1%', }}>
        <Typography variant={"subtitle2"}>Tentative Delivery Date:</Typography>
        <Typography variant={"subtitle2"} style={{ fontWeight: 'bold', marginLeft: 10 }}> {()=>{formatDate(billDataReceived.deliveryDate)}}</Typography>
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          <Typography variant={"subtitle2"} inline>Customer Name:</Typography>
          <Typography variant={"subtitle2"} style={{ fontWeight: 'bold', marginLeft: 10 }}>{billDataReceived.name}</Typography>
        </div>
      </div>

      <div style={{ display: 'flex', width: '90%', margin: 'auto', marginTop: '1%' }}>
        <div style={{ flex: '1', display: 'flex' }}>
          <Typography variant={"subtitle2"}> Order Date:</Typography>
          <Typography variant={"subtitle2"} style={{ fontWeight: 'bold', marginLeft: 10 }}>{()=>{formatDate(billDataReceived.orderDate)}}</Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography variant={"subtitle2"} >Bill No.:</Typography>
          <Typography variant={"subtitle2"} style={{ fontWeight: 'bold', marginLeft: 10 }}>{billDataReceived.orderID}</Typography>
        </div>
      </div>
      <Divider style={{ color: "red", height: "1px", backgroundColor: "grey", width: "90%", margin: "auto" }} />
      <div style={{ flex: 1, paddingTop: "1%", width: '90%', margin: 'auto' }}>
        <TableContainer component={Paper}  >
          <Table   size={'small'}>
            <TableHead>
              <TableRow >
                <TableCell align="center">
                  <Typography style={{ color: "black", fontWeight: "bold" }} variant={"subtitle2"}>No</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography style={{ color: "black", fontWeight: "bold" }} variant={"subtitle2"}>Dress Id</Typography>
                </TableCell>
               

                <TableCell align="left" >
                  <Typography style={{ color: "black", fontWeight: "bold" }} variant={"subtitle2"}>Description</Typography>
                </TableCell>

                <TableCell align="center"  >
                  <Typography style={{ color: "black", fontWeight: "bold" }} variant={"subtitle2"}>Quantity</Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography style={{ color: "black", fontWeight: "bold" }} variant={"subtitle2"}>Dress Status</Typography>
                </TableCell>

                <TableCell align="right" >
                  <Typography style={{ color: "black", fontWeight: "bold" }} variant={"subtitle2"}>Price</Typography>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {orderDatas.map((row) => (
                <TableRow>
                  <TableCell align="center"> <Typography variant={"subtitle2"}> {row.no}</Typography> </TableCell>
                  <TableCell align="center">
                    {row.dressId}
                  </TableCell>
                  <TableCell align="left">{row.descripition}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="left">{row.itemDeliverStatus === "Not Delivered" ? <div><FontAwesomeIcon style={{ color: "#D83A56" }} icon={faSpinner} /> Not Delivered</div> : <div><FontAwesomeIcon style={{ color: "#1C7947" }} icon={faCheckDouble} /> Delivered</div>}</TableCell>

                  <TableCell align="right">₹ {row.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} />
                <TableCell colSpan={1} align="right">Subtotal</TableCell>
                <TableCell align="right" >₹ {subAmount}</TableCell>
              </TableRow>

              <TableRow style={{ display: gstHider }} >
                <TableCell colSpan={4} />
                <TableCell align="right" >GST(18%)</TableCell>
                <TableCell align="right"  >₹ {gst}</TableCell>
              </TableRow>

              <TableRow style={{ display: dcHider }}>
                <TableCell colSpan={4} />
                <TableCell align="right">Discount Applied </TableCell>

                <TableCell align="right">₹ {billDataReceived.dcAmount}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={4} />
                <TableCell style={{ fontWeight: 'bold' }} align="right">Grand Total </TableCell>

                <TableCell style={{ fontWeight: 'bold' }} align="right">₹ {totalAmount}</TableCell>
              </TableRow>

              <TableRow style={{ display: "" }}>
                <TableCell colSpan={4} />
                <TableCell align="right">Received Amount </TableCell>

                <TableCell align="right">₹ {billDataReceived.payAmount}</TableCell>
              </TableRow>


              <TableRow>
                <TableCell colSpan={4} />
                <TableCell align="right">{paymentStatus}</TableCell>
                <TableCell align="right" >₹{dueAmount} </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={4} />
                <TableCell align="right">Payment mode</TableCell>
                <TableCell align="right" >

                  <Select size="small" IconComponent="none" disableUnderline style={{ minWidth: 75, border: 0, fontSize: 14 }} onChange={handleChange} label={"Payment Mode"}>
                    <MenuItem value='None'> None </MenuItem>
                    <MenuItem value='Cash' >Cash</MenuItem>
                    <MenuItem value='Card'>Card</MenuItem>
                    <MenuItem value='Paytm'>Paytm</MenuItem>
                    <MenuItem value='Google Pay'>Google Pay</MenuItem>
                    <MenuItem value='Phone Pay'>Phone Pay</MenuItem>
                    <MenuItem value='Amazon Pay'>Amazon Pay</MenuItem>
                    <MenuItem value='Bank Account'>Bank Account</MenuItem>
                  </Select>

                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:"center", marginTop:15, marginBottom:15 }}>
          <Typography variant='subtitle1'>Thank you for your support </Typography>
          <Typography variant='subtitle2'>Powered By Netcom Computers Pvt. Ltd. </Typography>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ComponentToPrintFun

