
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import { Typography, TextField, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@material-ui/core";
import React from "react";
import date from "date-and-time";
import InputAdornment from '@material-ui/core/InputAdornment';
import Logo from "./images/logo/logo.svg";
import ShivaneLogo from "./images/billAssets/1.png";
import { faCalendarWeek, faBoxes, faCheck, faSpinner, faShoppingBag, faCheckDouble, faFolder, faUsers, faUser, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




export class ComponentToPrint extends React.PureComponent {
  state = {
    currentDataTime: "", responseData: [], allOrderData: {}, subAmount: 0, gst: 0, totalAmount: 0, dueAmount: 0, value: '',
    paymentStatus: "Total due", name: "", orderID: "", deliveryDate: "", orderDate: "", billHeadColor: "#EEEEEE", gstStatus: false, gstHider: "", dcHider: "", cusId: "", billDate: "",

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  formatDate(date) {
    var a = new Date(date)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var formattedDate = a.getDate() + "-" + months[a.getMonth()] + "-" + a.getFullYear()
    return formattedDate
  }

  getCurrentDataAndTime() {
    var currentdate = new Date().toISOString()
    this.setState({ billDate: currentdate })

  };


  componentDidMount() {
    var billDataReceived = this.props.dataFromParent
    this.setState({ allOrderData: billDataReceived, responseData: billDataReceived.OrderDatas, orderDate: billDataReceived.orderDate, deliveryDate: billDataReceived.deliveryDate, orderID: billDataReceived.orderID, name: billDataReceived.name, gstStatus: billDataReceived.gst, cusId: billDataReceived.cusId })
    this.getCurrentDataAndTime()
    var a = [];
    billDataReceived.OrderDatas.map((row) => (
      a.push(row.price)
    ))
    var c = a.reduce((a, b) => a + b, 0)
    this.setState({ subAmount: c })

    var e = 0
    if (billDataReceived.gst) {
      var d = (c * 18) / 100
      this.setState({ gst: d })
      e = c + d
      this.setState({ gstHider: "" })
    }
    else {
      e = c
      this.setState({ gstHider: "none" })
    }
    if (!billDataReceived.dcStatus) {
      this.setState({ dcHider: "none" })
    }
    else {
      e = e - billDataReceived.dcAmount
    }
    this.setState({ totalAmount: Math.round(e) })
    // this.setState({ dueAmount: Math.round(e) })
    let Amount = billDataReceived.grandTotal - billDataReceived.payAmount
    if (Amount <= 0) {
      this.setState({ paymentStatus: "Change" })
      this.setState({ dueAmount: Amount * (-1) })
    }
    else {
      this.setState({ paymentStatus: "Total Due" })
      this.setState({ dueAmount: Amount })
    }
  }

  render() {

    return (
      <div  >
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
          <Typography style={{ fontSize: '16px' }}>     </Typography>
        </div>

        <div >
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: "center" }}>
            <Typography variant={"h5"} style={{ fontWeight: 'bold', }}>{this.state.allOrderData.shopName}</Typography>

            <Typography variant={"subtitle2"} >{this.state.allOrderData.shopAddress}</Typography>
            {/* <Typography variant={"subtitle2"} >Tirunelveli - 627002<br /></Typography> */}
            <Typography variant={"subtitle2"} >Cell: {this.state.allOrderData.shopMobNo}</Typography>
            <Divider style={{ color: "red", height: "1px", backgroundColor: "black", width: "90%", margin: "auto" }} />

          </div>

          <div style={{ display: 'flex', width: '90%', margin: 'auto', marginTop: '1%', }}>
            <Typography variant={"subtitle2"}>Customer ID:</Typography>
            <Typography variant={"subtitle2"} style={{  marginLeft: 10 }}> {this.state.allOrderData.cusId}</Typography>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              <Typography variant={"subtitle2"} inline>Bill Date:</Typography>
              <Typography variant={"subtitle2"} style={{  marginLeft: 10 }}>{this.formatDate(this.state.allOrderData.deliveryDate)}</Typography>
            </div>
          </div>

          <div style={{ display: 'flex', width: '90%', margin: 'auto', marginTop: '1%', }}>
            <Typography variant={"subtitle2"}>Tentative Delivery Date:</Typography>
            <Typography variant={"subtitle2"} style={{  marginLeft: 10 }}> {this.formatDate(this.state.allOrderData.deliveryDate)}</Typography>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              <Typography variant={"subtitle2"} inline>Customer Name:</Typography>
              <Typography variant={"subtitle2"} style={{  marginLeft: 10 }}>{this.state.allOrderData.name}</Typography>
            </div>
          </div>

          <div style={{ display: 'flex', width: '90%', margin: 'auto', marginTop: '1%' }}>
            <div style={{ flex: '1', display: 'flex' }}>
              <Typography variant={"subtitle2"}> Order Date:</Typography>
              <Typography variant={"subtitle2"} style={{ marginLeft: 10 }}>{this.formatDate(this.state.allOrderData.orderDate)}</Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography variant={"subtitle2"} style={{ fontWeight: 'bold',}} >Bill No.:</Typography>
              <Typography variant={"subtitle2"} style={{ fontWeight: 'bold', marginLeft: 10 }}>{this.state.allOrderData.orderID}</Typography>
            </div>
          </div>
          <Divider style={{ color: "red", height: "1px", backgroundColor: "black", width: "90%", margin: "auto" }} />
          <div style={{ flex: 1, paddingTop: "1%", width: '90%', margin: 'auto' }}>
            <Box border={1} borderColor={"black"}>
            <TableContainer component={Paper}  >
              <Table size={'small'}>
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
                  {this.state.responseData.map((row) => (
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
                    <TableCell align="right" >₹ {this.state.subAmount}</TableCell>
                  </TableRow>

                  <TableRow style={{ display: this.state.gstHider }} >
                    <TableCell colSpan={4} />
                    <TableCell align="right" >GST(18%)</TableCell>
                    <TableCell align="right"  >₹ {this.state.gst}</TableCell>
                  </TableRow>

                  <TableRow style={{ display: this.state.dcHider }}>
                    <TableCell colSpan={4} />
                    <TableCell align="right">Discount Applied </TableCell>
                    <TableCell align="right">₹ {this.state.allOrderData.dcAmount}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell style={{ fontWeight: 'bold',fontSize:14 }} align="right">Grand Total </TableCell>
                    <TableCell style={{ fontWeight: 'bold',fontSize:14  }} align="right">₹ {this.state.totalAmount}</TableCell>
                  </TableRow>

                  <TableRow style={{ display: "" }}>
                    <TableCell colSpan={4} />
                    <TableCell align="right">Received Amount </TableCell>
                    <TableCell align="right">₹ {this.state.allOrderData.payAmount}</TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell align="right">{this.state.paymentStatus}</TableCell>
                    <TableCell align="right" >₹{this.state.dueAmount} </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell align="right">Payment mode</TableCell>
                    <TableCell align="right" >

                      <Select size="small" IconComponent="none" disableUnderline style={{ minWidth: 75, border: 0, fontSize: 14 }} onChange={this.handleChange.bind(this)} label={"Payment Mode"}>
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
            </Box>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center", marginTop: 15, marginBottom: 15 }}>
              <Typography variant='subtitle1'>Thank you for your support </Typography>
              <Typography style={{color:"grey"}} variant='subtitle2'>Powered by Netcom Computers Pvt. Ltd. </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}