import { Typography } from "@material-ui/core";
import React from "react";
import date from "date-and-time";
import InputAdornment from '@material-ui/core/InputAdornment';




export class ComponentToPrintIds extends React.PureComponent {
  state = {
    currentDataTime: "", responseData: [], subAmount: 0, gst: 0, totalAmount: 0, dueAmount: 0, value: '',
    paymentStatus: "Total Due", name: "", orderID: "", deliveryDate: "", orderDate: "", billHeadColor: "#EEEEEE", gstStatus: false, gstHider: "", cusId: "", billDate: ""
  }

  calculateDueAmount(e) {
    var Amount = this.state.totalAmount - e.target.value

    if (Amount < 0) {
      this.setState({ paymentStatus: "Change" })
      this.setState({ dueAmount: Amount * (-1) })
    }
    else {
      this.setState({ paymentStatus: "Total Due" })
      this.setState({ dueAmount: Amount })
    }
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
  // getCurrentDataAndTime() {
  //   var currentdate = new Date();
  //   var todayDate = date.format(currentdate, "DD/MM/YYYY ")
  //   this.setState({ currentDataTime: todayDate })
  // }

  componentDidMount() {
    var billDataReceived = this.props.dataFromParentIds
    this.setState({ responseData: billDataReceived.OrderDatas, orderDate: billDataReceived.orderDate, deliveryDate: billDataReceived.deliveryDate, orderID: billDataReceived.orderID, name: billDataReceived.name, gstStatus: billDataReceived.gst, cusId: billDataReceived.cusId })
    this.getCurrentDataAndTime()
    var a = [];
    {
      billDataReceived.OrderDatas.map((row) => (
        a.push(row.price)
      ))
    }
    var c = a.reduce((a, b) => a + b, 0)
    this.setState({ subAmount: c })
    if (billDataReceived.gst) {
      var d = (c * 18) / 100
      this.setState({ gst: d })
      var e = c + d
      this.setState({ gstHider: "" })
    }
    else {
      var e = c
      this.setState({ gstHider: "none" })
    }

    this.setState({ totalAmount: Math.round(e) })
    this.setState({ dueAmount: Math.round(e) })
  }


  render() {

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row',alignItems: 'flex-start', flexWrap: 'wrap', marginTop: '1%', marginBottom: '1%',  marginLeft: '0%',
        marginRight:"5%", width: "100%" }}>
          {this.state.responseData.map((row, index) => (

            <div style={{ width: "32%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", marginTop: 18, marginBottom: 13 }}>
              <Typography style={{ fontSize: 9, marginTop: 15, fontWeight: "bold" }}>Shivane's Designing</Typography>
              <Typography noWrap style={{ fontSize: 10, marginTop: 3, textOverflow: "ellipsis", width:"90px",textAlign:"center" }}>{this.state.name}</Typography>
              <Typography style={{ fontSize: 20, fontWeight: 900 }} >{row.dressId} </Typography>
            </div>
          ))}
        </div>
      </>
    );
  }
}