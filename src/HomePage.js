import React, { useState, useEffect } from "react";
import { useNavigate, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import customerDetails from "./images/imgHomepageShopOwner/customer details.png";
import orders from "./images/imgHomepageShopOwner/orders.png";
import ratesUpdater from "./images/imgHomepageShopOwner/rates updater.png";
import report from "./images/imgHomepageShopOwner/report.png";
import wave1 from "./images/imgHomepageShopOwner/wave1.svg";
import { useLocation } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";
import AppBarHead from './AppbarHead'
import Helpers from './Helpers'
import Footer from './Footer'
import axios from "axios";
import CountUp from "react-countup";
import { Colors, Fonts } from "./constants";
import store from "store2";
import swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCalendarWeek, faBoxes, faCheck, faSpinner, faShoppingBag, faCheckDouble, faFolder, faUsers, faUser, } from '@fortawesome/free-solid-svg-icons'
import { decodeToken, isExpired } from "react-jwt";
import { Button, Stack, Typography, Paper, TextField, IconButton, Card, Box, Avatar } from '@mui/material';
import { SessionChecker } from "./utils/SessionChecker";

const bgColor = "#E5E5E5"

export default function HomePage(props) {
  const useStyles = makeStyles((theme) => ({
    appbar: {
      backgroundColor: "#00adb5",
    },
    smallsize: {
      [theme.breakpoints.down('sm')]: { fontSize: '25px' },
      [theme.breakpoints.up('md')]: { fontSize: '50px' }
    }
    ,
    appbarTypo: {
      flexGrow: "1",
      fontSize: "24px",
      fontWeight: "bold",
    },
    headingDiv: {
      display: "flex",
      justifyContent: "center",
    },
    headingWelcome: {
      marginTop: theme.spacing(4),
      fontWeight: "bold",
      fontSize: "30px",
      color: "#00adb5",
    },
    grid: {
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(55),
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(47),
      },
    },
    card: {
      [theme.breakpoints.up("md")]: {
        alignItems: "center",
        display: "inline-block",
        background: "white",
        width: "250px",
        height: "200px",
        paddingLeft: "10px",
        paddingRight: "10px",
        margin: "40px",
        cursor: "pointer",
      },
      [theme.breakpoints.down("sm")]: {
        alignItems: "center",
        display: "inline-block",
        background: "white",
        color: "black",
        fontWeight: "bold",
        width: "260px",
        height: "180px",
        paddingLeft: "10px",
        paddingRight: "10px",
        margin: "12px",
        cursor: "pointer",
      },
    },
    imgCard: {
      [theme.breakpoints.down("sm")]: {
        marginTop: "10px",
        width: "90px",
        height: "85px",
        marginLeft: theme.spacing(10),
      },
      [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(5),
        width: "100px",
        height: "100px",
        marginLeft: theme.spacing(10),
      },
    },
    carddiv: {
      [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(25),
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(5),
      },
    },
    typograpyCardtext: {
      [theme.breakpoints.up("sm")]: {
        fontWeight: "bold",
      },
    },
    cardsize: {
      [theme.breakpoints.down('sm')]: {
        width: 150,
        height: 165,
      },
      [theme.breakpoints.up('md')]: {
        width: 230,
        height: 230,
      },
      [theme.breakpoints.up('lg')]: {
        width: 230,
        height: 230,
      },
      [theme.breakpoints.up('xl')]: {
        width: 340,
        height: 400,
      },
      "&:hover": {
        boxShadow: "rgb(226, 106, 44) 0px 20px 30px -10px"
      }
    },
    mainCardText: {
      fontFamily: Fonts.LATO,
      fontWeight: 700,
      fontSize: 22,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: 28
      }
    },
    overallbackcolor: {
      backgroundColor: Colors.HOME_LIGHT_COLOR,
      overflow: "hidden",
      minHeight: "96.8vh",
      maxWidth: "100vw",
    },
    titlePreText: {
      marginTop: 20,
      fontFamily: Fonts.UBUNTU,
      fontWeight: "400",
      color: "#161616",
      fontSize: 35,

      [theme.breakpoints.down('sm')]: {
        fontSize: 25
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: 35
      },
    },
    titleText: {
      marginTop: 20,
      fontFamily: Fonts.UBUNTU,
      fontWeight: "500", width: "100%",
      color: Colors.HOME_MAIN_COLOR,
      fontSize: 35,
      textAlign: "center",
      width: "100%",
      [theme.breakpoints.down('sm')]: {
        fontSize: 25
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: 35
      },
    },
    subCard: {
      display: "flex",
      flexDirection: "column",
      width: 310,
      height: 85,
      [theme.breakpoints.down('sm')]: {
        width: 150,
        height: 88,
      },
    },
    subCardCusOr: {
      display: "flex",
      flexDirection: "column",
      width: 310,
      height: 85,
      [theme.breakpoints.down('sm')]: {
        width: 310,
        height: 60,
      }
    },
    subCardText: {
      display: "flex", flexDirection: "column", marginLeft: 5
    },
    subCardTextTitle: {
      fontFamily: Fonts.LATO,
      fontWeight: 500,
      fontSize: 20,
      marginTop: 6,
      [theme.breakpoints.down('sm')]: {
        fontSize: 17,
        color: 'grey'
      },
    },
    subCardTextContent: {
      color: Colors.HOME_MAIN_COLOR, fontFamily: Fonts.LATO, fontWeight: "bold", fontSize: 30,
      [theme.breakpoints.down('sm')]: {
        fontSize: 18
      },
    },
    container1: {
      display: "flex", flexDirection: "column", alignItems: "center"
    },
    container2: {
      display: "flex", flexWrap: "wrap", margin: "1%", justifyContent: "center"
    },
    container3: {
      backgroundColor: "#FAFAFE", display: designTeamHomeItemsBlock
    },
    container4: {
      display: designTeamHomeItemsBlock
    },
    subContainer: {
      display: "flex", justifyContent: "center"


    },
    subSubContainer: {
      display: "flex", flexWrap: "wrap", justifyContent: "center"
    },
    iconsStyle: {
      alignItems: "center", justifyContent: "center", display: "flex", marginLeft: 10, marginRight: 10
    }
  }));
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userName, tohide } = state;
  const [user, setuser] = useState("");
  const colorofcard = [Colors.CUSTOMER_MAIN_COLOR, Colors.ORDER_MAIN_COLOR, Colors.REPORT_MAIN_COLOR, Colors.RATE_MAIN_COLOR]
  const [imgofcard, setimgofcard] = useState([customerDetails, orders, report, ratesUpdater]);
  const [nameofcard, setnameofcard] = useState(["Customer Details", "Order Details", "Report", "Rates Updater"]);
  const OrdersCardName = ["Today's Orders", "Today's Deliveries", "All Orders", "Confirmed Orders", "Processing Orders", "Ready Orders", "Delivered Orders", "Assigned Orders"];
  const CustomerCardName = ["All Customers", "New Customers Today"];
  const DressCardName = ["Salwar Ordered Today", "Blouse Ordered Today", "Salwar", "Blouse"];
  const [ordersCountResponseData, setOrdersCountResponseData] = useState({});
  const [designTeamHomeItemsBlock, setDesignTeamHomeItemsBlock] = useState("")

  const [tokenData, settokenData] = useState({})



  var dtImgofcard = [orders];
  var dtNameofcard = ["Order Details"];
  var custImgofcard = [orders];
  var custNameofcard = ["Order Details"];

  const getOrdersDashboardData = (tokenData) => {
    var dataToSend = { user: "admin", username:tokenData.userData.emailId };
    axios
      .post(Helpers().apiURL + "/dashBoard", dataToSend)
      .then((response) => {
        setOrdersCountResponseData(response.data.message)
      })
  }

  const onHomeCardClick = (text) => {
    if (text === "Customer Details") {
      navigate('/customer-details', { state: { currentUser: user } });
    }
    else if (text === "Order Details") {
      navigate('/orderDetailPage', { state: { userName: user, prevPage: 0 } });
    }
    else if (text === "Report") {
      navigate('/reports', { state: { currentUser: user } });
    }
    else if (text === "Rates Updater") {
      navigate('/ratesupdater', { state: { currentUser: user } });
    }
    else {
      alert("Under Construction");
    }
  };
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


  useEffect(() => {
    // Session Check
    let decodedTokenData =   SessionChecker()
    decodedTokenData.success? settokenData(decodedTokenData.message):navigate("/")
   
    try {
      getOrdersDashboardData(decodedTokenData.message)
      // setuser(userName);
      // if (userName === "Designing Team") {
      //   setimgofcard(dtImgofcard);
      //   setnameofcard(dtNameofcard);
      //   setDesignTeamHomeItemsBlock("none")
      // }
      // else if (userName === "Shop Owner") {
      //   setimgofcard(imgofcard);
      //   setnameofcard(nameofcard);
      // }
      // else {
      //   setimgofcard(custImgofcard);
      //   setnameofcard(custNameofcard);
      // }
    }
    catch (err) {
      navigate("/");
    }
  }, []);

  const classes = useStyles();
  const orderIcons = [
    <FontAwesomeIcon style={{ color: "#CA965C" }} className={classes.smallsize} icon={faCalendarWeek} />,
    <FontAwesomeIcon style={{ color: "#876445" }} className={classes.smallsize} icon={faCalendarWeek} />,
    <FontAwesomeIcon style={{ color: "#35858B" }} className={classes.smallsize} icon={faBoxes} />,
    <FontAwesomeIcon style={{ color: "#2940D3" }} className={classes.smallsize} icon={faCheck} />,
    <FontAwesomeIcon style={{ color: "#D83A56" }} className={classes.smallsize} icon={faSpinner} />,
    <FontAwesomeIcon style={{ color: "#B24080" }} className={classes.smallsize} icon={faShoppingBag} />,
    <FontAwesomeIcon style={{ color: "#1C7947" }} className={classes.smallsize} icon={faCheckDouble} />,
    <FontAwesomeIcon style={{ color: "#FF5959" }} className={classes.smallsize} icon={faFolder} />
  ]

  const customerIcons = [
    <FontAwesomeIcon style={{ color: "#FF7F3F" }} className={classes.smallsize} icon={faUsers} />,
    <FontAwesomeIcon style={{ color: "#EA5C2B" }} className={classes.smallsize} icon={faUser} />,
  ]

  const dressIcons = [
    <Avatar style={{ backgroundColor: Colors.SALWAR_COLOR, height: 50, width: 50 }}  >S</Avatar>,
    <Avatar style={{ backgroundColor: Colors.BLOUSE_COLOR, height: 50, width: 50 }}  >B</Avatar>,
    <Avatar style={{ backgroundColor: Colors.SALWAR_COLOR, height: 50, width: 50 }}  >S</Avatar>,
    <Avatar style={{ backgroundColor: Colors.BLOUSE_COLOR, height: 50, width: 50 }}  >B</Avatar>
  ]

  return (
    <>

      {
        Object.keys(tokenData).length === 0 ?
          <div>Loading... Please Wait</div>
          :
          <div>
            <Box sx={{ backgroundColor: Colors.HOME_LIGHT_COLOR, overflow: "hidden", minHeight: "96.8vh", maxWidth: "100vw", }}>
              {/* AppBar */}
              <div>
                <AppBarHead dataParent={{ userNameFrom: userName, appBtnColor: Colors.HOME_MAIN_COLOR, appBtnText: "Home", userData: tokenData.userData }} />
              </div>
              {/* MainContent */}
              <Zoom in={true} >
                <div>
                  <Stack textAlign={"center"}>
                    <Typography sx={{ mt: { lg: 5, md: 5, sm: 1, xs: 1 }, fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.HOME_MAIN_COLOR, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }} >
                      Welcome {tokenData.userData === undefined ? "" : tokenData.userData.name}
                    </Typography>
                  </Stack>

                  {/* Root */}
                  <Stack direction={"row"} sx={{ flexWrap: "wrap", justifyContent: "center", margin: "1%" }} >
                    {/* Items */}
                    {nameofcard.map((text, index) => (
                      <div style={{ margin: '3%' }} >
                        <Paper onClick={() => onHomeCardClick(text)} elevation={3} sx={{ display: "flex", flexDirection: "column", backgroundColor: colorofcard[index], cursor: 'pointer', width: { lg: 300, md: 300, sm: 200, xs: 200 }, height: { lg: 300, md: 300, sm: 200, xs: 200 }, border: `2px solid ${colorofcard[index]}`, '&:hover':{boxShadow:`0 0 10px 5px ${colorofcard[index]}` , transition:'0.6s' } }}   >
                          <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', padding: '10%', backgroundColor: 'white' }} square>

                            <Box
                              component="img"
                              sx={{
                                height: { lg: 200, md: 200, sm: 100, xs: 120 },
                                width: { lg: 200, md: 200, sm: 100, xs: 120 },
                              }}
                              alt="The house from the offer."
                              src={imgofcard[index]}
                            />
                            {/* <img alt="card Name" src={imgofcard[index]}></img> */}
                          </Card>
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingTop: '5%', paddingBottom: '5%', textAlign: "center" }}>
                            <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.DEFAULT_WHITE, fontSize: { lg: 24, md: 16, sm: 16, xs: 16 } }}   > {text}</Typography>
                          </div>
                        </Paper>
                      </div>
                    ))}
                  </Stack>

                  <div className={classes.container3}>
                    <div className={classes.subContainer}>
                      <Stack textAlign={"center"} direction={"row"}>
                        <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.DEFAULT_BLACK, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }}>Our&nbsp; </Typography>
                        <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.HOME_MAIN_COLOR, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }}  >
                          Orders
                        </Typography>
                      </Stack>
                    </div>
                    <div className={classes.subSubContainer}>
                      {OrdersCardName.map((text, index) => (
                        <div style={{ margin: '3%' }} >
                          <Paper elevation={5} sx={{ width: 300, p: 1 }} >

                            <Stack direction={"row"} sx={{ textAlign: 'left' }} >
                              <div style={{ alignItems: "center", justifyContent: "center", display: "flex", marginLeft: 10, marginRight: 10 }}>
                                {orderIcons[index]}
                              </div>
                              <div>
                                <Stack >
                                  <Typography sx={{ fontFamily: Fonts.LATO, fontSize: { lg: 20, md: 20, sm: 16, xs: 16 } }}>
                                    {text}
                                  </Typography>
                                  <Typography sx={{ fontFamily: Fonts.LATO, color: Colors.HOME_MAIN_COLOR, fontWeight: "bold", fontSize: { lg: 22, md: 22, sm: 18, xs: 18 } }}>
                                    {ordersCountResponseData[text]}
                                  </Typography>
                                </Stack>
                              </div>
                            </Stack>

                          </Paper>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={classes.container4}>
                    <div className={classes.subContainer}>
                      <Stack textAlign={"center"} direction={"row"}>
                        <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.DEFAULT_BLACK, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }}>Our&nbsp; </Typography>
                        <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.HOME_MAIN_COLOR, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }}  >
                          Customers
                        </Typography>
                      </Stack>

                    </div>
                    <div className={classes.subSubContainer}>
                      {CustomerCardName.map((text, index) => (
                        <div style={{ margin: '3%' }} >

                          <Paper elevation={5} sx={{ width: 300, p: 1 }} >

                            <Stack direction={"row"} sx={{ textAlign: 'left' }} >
                              <div style={{ alignItems: "center", justifyContent: "center", display: "flex", marginLeft: 10, marginRight: 10 }}>
                                {customerIcons[index]}
                              </div>
                              <div>
                                <Stack >
                                  <Typography sx={{ fontFamily: Fonts.LATO, fontSize: { lg: 20, md: 20, sm: 16, xs: 16 } }}>
                                    {text}
                                  </Typography>
                                  <Typography sx={{ fontFamily: Fonts.LATO, color: Colors.HOME_MAIN_COLOR, fontWeight: "bold", fontSize: { lg: 22, md: 22, sm: 18, xs: 18 } }}>
                                    <CountUp end={parseInt(ordersCountResponseData[text])} duration={2} />
                                  </Typography>
                                </Stack>
                              </div>
                            </Stack>

                          </Paper>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={classes.container3}>
                    <div className={classes.subContainer}>
                      <Stack textAlign={"center"} direction={"row"}>

                        <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.DEFAULT_BLACK, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }}>Dress&nbsp; </Typography>
                        <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.HOME_MAIN_COLOR, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }}  >
                          Sales
                        </Typography>
                      </Stack>

                    </div>
                    <div className={classes.subSubContainer}>
                      {DressCardName.map((text, index) => (
                        <div style={{ margin: '3%' }} >

                          <Paper elevation={5} sx={{ width: 300, p: 1 }} >

                            <Stack direction={"row"} sx={{ textAlign: 'left' }} >
                              <div style={{ alignItems: "center", justifyContent: "center", display: "flex", marginLeft: 10, marginRight: 10 }}>
                                {dressIcons[index]}
                              </div>
                              <div>
                                <Stack >
                                  <Typography sx={{ fontFamily: Fonts.LATO, fontSize: { lg: 20, md: 20, sm: 16, xs: 16 } }}>
                                    {text}
                                  </Typography>
                                  <Typography sx={{ fontFamily: Fonts.LATO, color: Colors.HOME_MAIN_COLOR, fontWeight: "bold", fontSize: { lg: 22, md: 22, sm: 18, xs: 18 } }}>
                                    {ordersCountResponseData[text]} 
                                  </Typography>
                                </Stack>
                              </div>
                            </Stack>

                          </Paper>

                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </Zoom>
            </Box>
            <Footer dataBackParent={{ backColor: bgColor }} />
          </div>
      }

    </>
  );
}