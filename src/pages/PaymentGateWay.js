import {
  Modal,
  CardContent,
  Divider,
  Card,
  makeStyles,
  withStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Avatar,
  Button,
  IconButton,
} from "@material-ui/core";
import React, { useEffect } from "react";
import axios from "axios";
import ViewIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Zoom from "@material-ui/core/Zoom";
import swal from "sweetalert2";
import useState from "react-usestateref";
import { APIClient, Colors, Fonts } from "../constants";
import Stack from "@mui/material/Stack";
import PhoneIcon from "@material-ui/icons/Phone";
import CloseIcon from '@mui/icons-material/Close';
import UpgradeIcon from "@mui/icons-material/Verified";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  parentDiv: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  childExpiryDiv: {
    width: "100%",
    flex: 1,
    paddingTop: "0%",
    filter: `blur(5px)`,
    pointerEvents: "none",
    userSelect: "none",
  },
  childRemoveExpiryDiv: {
    width: "100%",
    flex: 1,
    paddingTop: "0%",
  },
  tableContentSize: {
    marginLeft: "1%",
    fontSize: 14,
    fontFamily: Fonts.LATO,
    [theme.breakpoints.up("lg")]: {
      fontSize: 16,
    },
  },
  tableMobContentSize: {
    marginLeft: "1%",
    fontSize: 12,
    fontFamily: Fonts.LATO,
    [theme.breakpoints.up("lg")]: {
      fontSize: 14,
    },
  },

  alertCard: {
    position: "absolute",
    top: "50%",
    left: " 50%",
    transform: `translate(-50%, -50%)`,
    zIndex: 3,
    padding: 10,
    borderRadius: "11px",
    border: "1px solid black",
    background: `linear-gradient(145deg, white, white)`,
    boxShadow: `8px 8px 5px #9e9e9e, -8px -8px 5px #ffffff`,
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
  },

  removeAlertCard: {
    display: "none",
  },

  ModalRoot: {
    display: "flex",
    margin: "0 auto",

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      flexDirection: "column",
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      width: "67%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    [theme.breakpoints.up("lg")]: {
      width: "82%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    [theme.breakpoints.up("xl")]: {
      width: "67%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },

  textFieldBox: {
    ".MuiFormLabel-root.Mui-focused": {
      color: "red !important",
    },
    ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "red !important",
    },
  },
}));

export default function PaymentGateWay() {
  const [allCustomerDatas, setAllCustomerDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(true);
  const [loading, setLoading] = useState(false);
  const [styled, setStyled] = useState(2);

  const [errorName, seterrorName] = useState(false);
  const [errorEmail, seterrorEmail] = useState(false);
  const [errorPhoneNo, seterrorPhoneNo] = useState(false);

  const detailsForms = ["Name", "PhoneNo", "Email"];
  const cardName = [
    { PlanName: "Standard", amount: "₹899", PlanAmount: "₹699" },
    { PlanName: "Pro", amount: "₹999", PlanAmount: "₹799" },
    { PlanName: "Ulimate", amount: "₹1199", PlanAmount: "₹999" },
  ];

  const [submitButton, setsubmitButton, submitButtonRef] = useState({
    Name: "",
    PhoneNo: "",
    Email: "",
    Plan:"",
  });

  const handleChange = (text, value) => {
    setsubmitButton({ ...submitButton, [text]: value });

    const re = /^[0-9\b]+$/;
    if (text === "Name") {
      setsubmitButton({ ...submitButton, Name: value });
      seterrorName(false);
    } else if (text === "Email") {
      console.log("working");
      setsubmitButton({ ...submitButton, Email: value });
      seterrorEmail(false);
    } else if (text === "PhoneNo") {
      if (value === "" || re.test(value)) {
        setsubmitButton({
          ...submitButton,
          PhoneNo: (value = value.slice(0, 10)),
        });
        seterrorPhoneNo(false);
      }
    }
  };

  const handleClickButton = () => {
    const echecking =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    {
      submitButton["Name"] === ""
        ? seterrorName(true)
        : submitButton["Email"] === "" || !echecking.test(submitButton["Email"])
        ? seterrorEmail(true)
        : submitButton["PhoneNo"] === ""
        ? seterrorPhoneNo(true)
        : seterrorPhoneNo(false);
    }
    if (
      submitButton["Name"] != "" &&
      submitButton["Email"] != "" &&
      echecking.test(submitButton["Email"]) &&
      submitButton["PhoneNo"] != ""
    ) {
      setsubmitButton({ Name: "", Email: "", PhoneNo: "" });
      setOpen(false);
      loadRazorpay();
    }
  };

  const handleClick = (obj, indexNo) => {
    setStyled(indexNo);
    setsubmitButton({ ...submitButton, Plan: obj.PlanAmount });
  };

  useEffect(() => {
    let x = [
      {
        cusId: "001",
        cusDate: "1-3-2020",
        cusColor: "red",
        cusName: "dse xc",
        cusMobNo: "3141343242",
        cusEmail: "test@gmail.com",
        salwarCount: 12,
        blouseCount: 13,
        finalAmount: 23112,
      },
      {
        cusId: "002",
        cusDate: "2-10-2021",
        cusColor: "red",
        cusName: "dse xc",
        cusMobNo: "3141343242",
        cusEmail: "mb@yahoo.com",
        salwarCount: 32,
        blouseCount: 13,
        finalAmount: 23112,
      },
      {
        cusId: "003",
        cusDate: "1-1-2020",
        cusColor: "red",
        cusName: "dse xc",
        cusMobNo: "3141343242",
        cusEmail: "mb@hdfsm.com",
        salwarCount: 32,
        blouseCount: 13,
        finalAmount: 23112,
      },
      {
        cusId: "004",
        cusDate: "15-9-2020",
        cusColor: "red",
        cusName: "dse xc",
        cusMobNo: "3141343242",
        cusEmail: "mb@hdfsm.com",
        salwarCount: 32,
        blouseCount: 13,
        finalAmount: 23112,
      },
      {
        cusId: "005",
        cusDate: "23-3-2022",
        cusColor: "red",
        cusName: "dse xc",
        cusMobNo: "3141343242",
        cusEmail: "mb@hdfsm.com",
        salwarCount: 32,
        blouseCount: 13,
        finalAmount: 23112,
      },
    ];

    setsubmitButton({ ...submitButton, Plan: "₹9999" });

    // setIsExpired(false);
    setAllCustomerDatas(x);
  }, []);

  function loadRazorpay() {
    console.log("loaf=dRazorPay");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    //localstoragetoken
    let LocalStorageToken = localStorage.getItem("token");
    script.onload = async () => {
      try {
        setLoading(true);

        const result = await axios.post("http://localhost:3008/create-order", {
          name: submitButton.Name,
          email: submitButton.Email,
          contact: submitButton.PhoneNo,
          amount: submitButton.Plan + "00",
          token: 'LocalStorageToken',
        });
        console.log("result " + JSON.stringify(result));
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get("http://localhost:3008/get-razorpay-key");

        const options = {
          key: razorpayKey,
          amount: amount,
          currency: currency,
          name: submitButton.Name,
          description: "",
          order_id: order_id,

          prefill: {
            name: submitButton.Name,
            email: submitButton.Email,
            contact: submitButton.PhoneNo,
          },
          notes: {
            address: "example address",
          },
          theme: {
            color: "#FF4949",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  const classes = useStyles();
  return (
    <>
      <div className={classes.parentDiv}>
        <Paper
          className={isExpired ? classes.alertCard : classes.removeAlertCard}
        >
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Unlock to retrieve data please upgrade your plan.
          </Typography>
          <br />
          <Button
            style={{
              textTransform: "none",
            }}
            variant="contained"
            color="secondary"
            endIcon={<UpgradeIcon />}
            onClick={() => {
              setOpen(true);
            }}
          >
            Update Your Plan
          </Button>
        </Paper>
        <div
          className={
            isExpired ? classes.childExpiryDiv : classes.childRemoveExpiryDiv
          }
        >
          <Card elevation={5}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell
                      className={classes.hideContent}
                      align="left"
                    >
                      <Typography className={classes.headFontSize}>
                        Customer ID
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.hideContent}
                      align="left"
                    >
                      <Typography className={classes.headFontSize}>
                        {" "}
                        Registered Date
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography className={classes.headFontSize}>
                        {" "}
                        Customer Name
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell
                      className={classes.hideContent}
                      align="left"
                    >
                      <Typography className={classes.headFontSize}>
                        {" "}
                        Customer Email ID
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.hideContent}
                      align="left"
                    >
                      <Typography className={classes.headFontSize}>
                        {" "}
                        Salwar
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.hideContent}
                      align="left"
                    >
                      <Typography className={classes.headFontSize}>
                        {" "}
                        Blouse
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.hideContent}
                      align="left"
                    >
                      <Typography className={classes.headFontSize}>
                        {" "}
                        Amount
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography className={classes.headFontSize}>
                        {" "}
                        Action
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {allCustomerDatas.map((row) => (
                    <StyledTableRow>
                      <StyledTableCell className={classes.hideContent}>
                        <Typography className={classes.tableContentSize}>
                          {" "}
                          {row.cusId}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.hideContent}
                      >
                        <Stack direction="row" alignItems="center" gap={1}>
                          <CalendarTodayIcon style={{ color: "grey" }} />
                          <Typography
                            className={classes.tableContentSize}
                            style={{ width: "100%" }}
                          >
                            {" "}
                            {row.cusDate}
                          </Typography>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            variant="rounded"
                            style={{ backgroundColor: row.cusColor }}
                          >
                            {row.cusName.toUpperCase()[0]}
                          </Avatar>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: 5,
                            }}
                          >
                            <Tooltip
                              title={"row.cusName"}
                              arrow
                              TransitionComponent={Zoom}
                            >
                              <div
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  width: "7rem",
                                }}
                              >
                                <Typography
                                  noWrap={true}
                                  className={classes.tableContentSize}
                                  style={{ color: "black" }}
                                >
                                  {"row.cusName"}
                                </Typography>
                              </div>
                            </Tooltip>
                            <Stack direction="row" alignItems="center" gap={0}>
                              <PhoneIcon
                                style={{ width: 15, height: 13, color: "grey" }}
                              />
                              <Typography
                                className={classes.tableMobContentSize}
                                style={{ color: "grey" }}
                              >
                                {row.cusMobNo}
                              </Typography>
                            </Stack>
                          </div>
                        </div>
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        className={classes.hideContent}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography className={classes.tableContentSize}>
                            {" "}
                            {row.cusEmail === "" ? "-" : row.cusEmail}
                          </Typography>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={classes.hideContent}
                      >
                        <Avatar
                          variant="square"
                          style={{
                            backgroundColor: Colors.SALWAR_COLOR,
                            width: 30,
                            height: 30,
                          }}
                        >
                          <Typography style={{ fontSize: 16 }}>
                            {" "}
                            {row.salwarCount}
                          </Typography>
                        </Avatar>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={classes.hideContent}
                      >
                        <Avatar
                          variant="square"
                          style={{
                            backgroundColor: Colors.BLOUSE_COLOR,
                            width: 30,
                            height: 30,
                          }}
                        >
                          <Typography style={{ fontSize: 16 }}>
                            {" "}
                            {row.blouseCount}
                          </Typography>
                        </Avatar>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.hideContent}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            className={classes.tableContentSize}
                            style={{
                              marginLeft: "3%",
                              color: "green",
                              fontWeight: "bold",
                            }}
                          >
                            ₹ {row.finalAmount}
                          </Typography>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Card
                            elevation="3"
                            style={{ display: "flex", padding: "2%" }}
                          >
                            <Tooltip
                              title="View"
                              arrow
                              TransitionComponent={Zoom}
                            >
                              <ViewIcon
                                style={{
                                  alignItems: "center",
                                  color: "green",
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                  width: 30,
                                  height: 30,
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                              />
                            </Tooltip>
                            <Divider orientation="vertical" flexItem />
                            <Tooltip
                              title="Edit"
                              arrow
                              TransitionComponent={Zoom}
                            >
                              <EditIcon
                                style={{
                                  alignItems: "center",
                                  color: "orange",
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                  width: 30,
                                  height: 30,
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                              />
                            </Tooltip>
                            <Divider orientation="vertical" flexItem />
                            <Tooltip
                              title="Delete"
                              arrow
                              TransitionComponent={Zoom}
                            >
                              <DeleteIcon
                                style={{
                                  alignItems: "center",
                                  color: "red",
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                  width: 30,
                                  height: 30,
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                              />
                            </Tooltip>
                          </Card>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        style={{ backdropFilter: "blur(2px)" }}
      >
        <div className={classes.ModalRoot}>
          <Card style={{ width: 520, height: 680, margin: "0 auto" }}>
           <Stack direction='row' alignItems='center' textAlign='center' style={{backgroundColor:'red'}} p={1} width='100%' justifyContent='space-between'>
           <Typography
              variant="h5"
              style={{
                backgroundColor: "red",
                paddingTop: 1,
                color: "white",
                paddingBottom: 1,
                display: "flex",
                justifyContent: "center",
                marginLeft:15
              }}
            >
              Subscription
            </Typography>
            <IconButton style={{backgroundColor:'#fff' , color:'red', marginRight:15}}
            onClick={() => setOpen(false)}
            >
                <CloseIcon />
            </IconButton>
           </Stack>
            
            {detailsForms.map((text, indexNo) => (
              <div
                style={{ marginTop: 35, paddingLeft: "5%", paddingRight: "5%" }}
              >
                <TextField
                  error={
                    text === "Name"
                      ? text === "PhoneNo"
                        ? errorPhoneNo
                        : errorName
                      : text === "Email"
                      ? errorEmail
                      : null
                  }
                  helperText={
                    text === "Name"
                      ? !errorName
                        ? ""
                        : "Please enter your name"
                      : text === "PhoneNo"
                      ? !errorPhoneNo
                        ? ""
                        : "Please enter contact no"
                      : text === "Email"
                      ? !errorEmail
                        ? ""
                        : "Please enter your valid mail id"
                      : null
                  }
                  value={submitButton[text]}
                  fullWidth
                  size="small"
                  label={text}
                  variant="outlined"
                  onChange={(e) => {
                    handleChange(text, e.target.value);
                  }}
                  className={classes.textfieldBox}
                />
              </div>
            ))}

            <Typography
              variant="h5"
              style={{
                marginTop: 35,
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
              }}
            >
              Choose Your Plan
            </Typography>

            <div
              style={{
                display: "flex",
                marginTop: 35,
                justifyContent: "space-around",
                paddingLeft: "5%",
                paddingRight: "5%",
              }}
            >
              {cardName.map((obj, indexNo) => (
                <Card
                  onClick={() => {
                    handleClick(obj, indexNo);
                  }}
                  style={{
                    width: 135,
                    height: 145,
                    border: indexNo === styled ? "2px solid red" : "none",
                    backgroundColor: indexNo === styled ? "#fedada" : "white",
                    boxShadow:
                      indexNo === styled
                        ? "rgba(0, 0, 0, 0.24) 8px 8px 8px"
                        : "rgba(0, 0, 0, 0.10) 1px 1px 1px 1px",
                    cursor: "pointer",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {obj.PlanName}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        cursor: "pointer",
                        textDecoration: "line-through",
                      }}
                    >
                      {" "}
                      {obj.amount}
                    </Typography>

                    <Typography
                      variant="h6"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {obj.PlanAmount}
                    </Typography>
                    <Button
                      style={{
                        textTransform: "none",
                        backgroundColor: indexNo === styled ? "red" : "#565064",
                        color: "white",
                        justifyContent: "center",
                        display: "flex",
                        marginLeft: 17,
                        maxHeight: "30px",
                        marginTop: 15,
                      }}
                    >
                      Monthly
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Typography
              variant="subtitle1"
              style={{
                marginTop: 30,
                justifyContent: "center",
                display: "flex",
              }}
            >
              * Buy now to a enjoy 30 days free trial
            </Typography>

            <div
              style={{ marginTop: 5, paddingLeft: "5%", paddingRight: "5%" }}
            >
              <Button
                fullWidth
                variant="h6"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  textTransform: "none",
                }}
                onClick={handleClickButton}
              >
                Next
              </Button>
            </div>
          </Card>
        </div>
      </Modal>
    </>
  );
}
