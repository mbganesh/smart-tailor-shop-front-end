import React, { useState, useEffect } from "react";
import { useNavigate, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import customerDetails from "../images/imgHomepageShopOwner/customer details.png";
import orders from "../images/imgHomepageShopOwner/orders.png";
import ratesUpdater from "../images/imgHomepageShopOwner/rates updater.png";
import report from "../images/imgHomepageShopOwner/report.png";
import wave1 from "../images/imgHomepageShopOwner/wave1.svg";
import { useLocation } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";
import AppBarHead from '../AppbarHead'
import Footer from '../components/Footer'
import axios from "axios";
import CountUp from "react-countup";
import { Colors, Fonts, APIClient } from "../constants";
import store from "store2";
import swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCalendarWeek, faBoxes, faCheck, faSpinner, faShoppingBag, faCheckDouble, faFolder, faUsers, faUser, } from '@fortawesome/free-solid-svg-icons'
import { decodeToken, isExpired } from "react-jwt";
import { Button, Stack, Typography, Paper, TextField, IconButton, Card, Box, Avatar } from '@mui/material';
import { SessionChecker } from "../utils/SessionChecker";
import HomePageStyles from "../PageStyles/HomePageStyles";


const bgColor = "#E5E5E5"

export default function HomePage(props) {
  const useStyles = makeStyles((theme) => ({
    
    smallsize: {
      fontSize: '25px' 
      // [theme.breakpoints.down('sm')]: { fontSize: '25px' },
      // [theme.breakpoints.up('md')]: { fontSize: '50px' }
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
      .post(APIClient.API_BASE_URL + "/dashboardProcess/dashBoard", dataToSend,APIClient.API_HEADERS)
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
  // window.location.reload(); 

  const classes = useStyles();
  const orderIcons = [
    <FontAwesomeIcon style={{ color: "#CA965C",  fontSize: '30px'  }} icon={faCalendarWeek} />,
    <FontAwesomeIcon style={{ color: "#876445",  fontSize: '30px' }}  icon={faCalendarWeek} />,
    <FontAwesomeIcon style={{ color: "#35858B",  fontSize: '30px' }}  icon={faBoxes} />,
    <FontAwesomeIcon style={{ color: "#2940D3",  fontSize: '30px' }} icon={faCheck} />,
    <FontAwesomeIcon style={{ color: "#D83A56" ,  fontSize: '30px'}} icon={faSpinner} />,
    <FontAwesomeIcon style={{ color: "#B24080",  fontSize: '30px' }}  icon={faShoppingBag} />,
    <FontAwesomeIcon style={{ color: "#1C7947",  fontSize: '30px' }}  icon={faCheckDouble} />,
    <FontAwesomeIcon style={{ color: "#FF5959",  fontSize: '30px' }} icon={faFolder} />
  ]

  const customerIcons = [
    <FontAwesomeIcon style={{ color: "#FF7F3F",  fontSize: '30px' }} icon={faUsers} />,
    <FontAwesomeIcon style={{ color: "#EA5C2B",  fontSize: '30px' }}  icon={faUser} />,
  ]

  const dressIcons = [
    <Avatar style={{ backgroundColor: Colors.SALWAR_COLOR, height: 30, width: 30 }}  >S</Avatar>,
    <Avatar style={{ backgroundColor: Colors.BLOUSE_COLOR, height: 30, width: 30}}  >B</Avatar>,
    <Avatar style={{ backgroundColor: Colors.SALWAR_COLOR, height: 30, width: 30 }}  >S</Avatar>,
    <Avatar style={{ backgroundColor: Colors.BLOUSE_COLOR, height: 30, width: 30 }}  >B</Avatar>
  ]

  return (
    <>

      {
        Object.keys(tokenData).length === 0 ?
          <div>Loading... Please Wait</div>
          :
          <div>
            <Box sx={HomePageStyles.style1}>
              {/* AppBar */}
                <AppBarHead dataParent={{ userNameFrom: userName, appBtnColor: Colors.HOME_MAIN_COLOR, appBtnText: "Home", userData: tokenData.userData }} />
              {/* MainContent */}
              <Zoom in={true} >
                <div>
                  <Stack textAlign={"center"}>
                    <Typography mt={{lg: 5, md: 5, sm: 1, xs: 1}} sx={  HomePageStyles.style2 } >
                      Welcome {tokenData.userData === undefined ? "" : tokenData.userData.name}
                    </Typography>
                  </Stack>

                  {/* Root */}
                  <Stack sx={HomePageStyles.style3} >
                    {/* Items */}
                    {nameofcard.map((text, index) => (
                      <div style={{ margin: '3%' }} >
                        <Paper onClick={() => onHomeCardClick(text)} elevation={3} sx={{ display: "flex", flexDirection: "column", backgroundColor: colorofcard[index], cursor: 'pointer', width: { lg: 300, md: 250, sm: 200, xs: 100 }, height: { lg: 300, md: 250, sm: 200, xs: 100 }, border: `2px solid ${colorofcard[index]}` }}   >
                          <Card sx={{ display: 'flex',justifyContent: 'center', alignContent: 'center',p:{xs:1, sm:3},  backgroundColor: 'white' }} square>

                            <Box
                              component="img"
                              sx={{
                                height: { lg: 200, md: 150, sm: 100, xs: 50 },
                                width: { lg: 200, md: 150, sm: 100, xs: 50 },
                              }}
                              alt="The house from the offer."
                              src={imgofcard[index]}
                            />
                            {/* <img alt="card Name" src={imgofcard[index]}></img> */}
                          </Card>
                          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingTop: '5%', paddingBottom: '5%', textAlign: "center" }}>
                            <Typography noWrap sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.DEFAULT_WHITE, fontSize: { lg: 24, md: 16, sm: 16, xs: 14 } }}   > {text}</Typography>
                          </div>
                        </Paper>
                      </div>
                    ))}
                  </Stack>

                  <div style={{backgroundColor: "#FAFAFE", display: designTeamHomeItemsBlock}}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <Stack textAlign={"center"} direction={"row"}>
                        <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.DEFAULT_BLACK, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }}>Our&nbsp; </Typography>
                        <Typography sx={ HomePageStyles.style2 }  >
                          Orders
                        </Typography>
                      </Stack>
                    </div>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
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

                  <div style={{display: designTeamHomeItemsBlock}}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <Stack textAlign={"center"} direction={"row"}>
                        <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.DEFAULT_BLACK, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }}>Our&nbsp; </Typography>
                        <Typography sx={ HomePageStyles.style2 }  >
                          Customers
                        </Typography>
                      </Stack>

                    </div>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
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


                  <div style={{backgroundColor: "#FAFAFE",display: designTeamHomeItemsBlock}}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <Stack textAlign={"center"} direction={"row"}>
                        <Typography sx={{ fontFamily: Fonts.UBUNTU, fontWeight: "bold", color: Colors.DEFAULT_BLACK, fontSize: { lg: 34, md: 34, sm: 20, xs: 20 } }}>Dress&nbsp; </Typography>
                        <Typography sx={ HomePageStyles.style2 }  >
                          Sales
                        </Typography>
                      </Stack>

                    </div>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
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
                  
                </div>
              </Zoom>
            </Box>
            <Footer dataBackParent={{ backColor: bgColor }} />
          </div>
      }

    </>
  );
}