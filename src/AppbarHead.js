import React, { useEffect, useState } from "react";
import { Button, AppBar, Toolbar, Drawer, IconButton, List, ListItem, ListItemText, makeStyles, Box } from "@material-ui/core";
import { ArrowForward,  Menu } from "@material-ui/icons";
import { useNavigate } from "react-router";
import Logo from './images/logo/logo.svg'
import swal from "sweetalert2";
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ViewListIcon from '@material-ui/icons/ViewList';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Fonts } from "./constants";
import BarChartIcon from '@mui/icons-material/BarChart';
import { Typography } from "@mui/material";

const styles = makeStyles((theme) => ({
    container: {},
    appBarStyle: {
        backgroundColor: "#333333",
    },
    appBarTitleStyle: {
        flex: 1,
        fontWeight: "bold",
        fontSize: "20px",
    },
    appBarBtntyle: {
        backgroundColor: "#00adb5",
        color: "#fff",
    },
    buttons: {
        marginLeft: "1px",
        color: "white",
        fontWeight: "bold",
        fontSize: 13,
        fontFamily:Fonts.UBUNTU
    },

    appBarAllButtons: {                           // appbar buttons
        [theme.breakpoints.up("lg")]: {
            visibility: "visible",
        },
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    appBarMenuBtnStyle: {                        // appbar menu buttons
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
        [theme.breakpoints.down("md")]: {
            display: "visible",
        },
    },
    drawerStyle: {
        // [theme.breakpoints.down("md")]: {
        //   display: "visible",
        // },
        // [theme.breakpoints.up("md")]: {
        //   display: "none",
        // },
    },
}));

function AppbarHead(props) {
    const classes = styles();

    const navigate = useNavigate();
    const [dataFromParents] = useState(props.dataParent);
    const [contentBus, setContentBus] = useState(dataFromParents.userNameFrom)
    

    const [tokenData, settokenData] = useState({})

    const [btnText, setbtnText] = useState(dataFromParents.appBtnText)
    const [appBtnColor, setappBtnColor] = useState(dataFromParents.appBtnColor)
    const [open, setOpen] = useState(false);
    const [buttonAppbar] = useState(["Home", "Customer Details", "Order Details", "Report","DashBoard" , "Rate Updater","Logout"]);
    const [buttonAppbarForTeam] = useState(["Home", "Order Details", "Logout"]);
    const appBarIcons = [<HomeIcon/>, <SupervisorAccountIcon/>, <ViewListIcon/>,<DescriptionIcon/>,<BarChartIcon/>, <LocalOfferIcon/>, <ExitToAppIcon/>]
    const appBarIconsForDesigningTeam = [<HomeIcon/>,  <ViewListIcon/>, <ExitToAppIcon/>]
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const onAppBtnClick = (text, user) => {
        if (user === "owner") {
            if (text === "Logout") {
                swal.fire({
                        title: `Are you want to Logout?`,
                        text: "",
                        icon: "warning",
                        dangerMode: true,
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes'
                    }).then((willWarn) => {
                      if (willWarn.isConfirmed) {
                        navigate[0] = navigate[navigate.length - 1]
                       
                        navigate('/', { replace: true })
                        // navigate("/")
                      }
                    });

                  }
            else if (text === "Home") {
                navigate('/homepage', { state: { userName: "Shop Owner" } });
            }
            else if (text === "Customer Details") {
                navigate('/customer-details', { state: { currentUser: "Shop Owner" } });
            }
            else if (text === "Order Details") {
                navigate('/orderDetailPage', { state: { userName: "Owner", tohide: '', prevPage:0 } });
            }
            else if (text === "Report") {
                navigate('/reports');
            }
            else if (text === "DashBoard") {
                navigate('/dashboard');
            }
            else if (text === "Rate Updater") {
                navigate("/ratesupdater");
            }
        }
        else {
            if (text === "Logout") {
                swal.fire({ title: `Are you sure to Logout?`, text: "You won't be able to revert this!", icon: "warning", dangerMode: true, showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Logout it!' }).then((willWarn) => {
                      if (willWarn.isConfirmed) {
                       navigate("/")
                      }
                    });
                  }
            else if (text === "Home") {
                navigate('/homepage', { state: { userName: "Designing Team" } });
            }
            else if (text === "Order Details") {
                navigate('/orderDetailPage', { state: { userName: "Designing Team", tohide: 'none', prevPage:0 } });
            }
        }
    };
    const onLogoClick = (username) => {
        navigate('/homepage', { state: { userName: username } });
    }

    useEffect(() => {
        console.log(contentBus);
    }, [contentBus]);


    return (
        <>
            <div >
                <div >
                    <AppBar   className={classes.appBarStyle} position="fixed">
                        <Toolbar>
                            <Box display='flex' flexGrow={1} >
                                {/* <img style={{cursor:'pointer'}} onClick={()=>onLogoClick(contentBus !== "Designing Team"?"Shop Owner":"Designing Team")} alt= "logo" src={Logo} height='45px'></img> */}
                                <Typography sx={{fontWeight:"bold", fontSize:{ xl:24,lg: 20, md: 20, sm: 20, xs: 20 }}}>{dataFromParents.userData.shopName}</Typography>
                            </Box>
                            <div className={classes.appBarAllButtons}>
                                {
                                    contentBus !== "Designing Team" ?
                                        buttonAppbar.map((text, index) => (
                                            <Button startIcon={appBarIcons[index]} className={classes.buttons} onClick={() => { onAppBtnClick(text, "owner") }} style={{ boxShadow: 'none', backgroundColor: (btnText === text) ? appBtnColor : "#333333", width: '180px', height: '64px',borderRadius:0 }} color="#000000" >{text}</Button>
                                        ))
                                        :
                                        buttonAppbarForTeam.map((text,index) => (
                                            <Button  startIcon={appBarIconsForDesigningTeam[index]}  className={classes.buttons} onClick={() => { onAppBtnClick(text, "team") }} style={{ boxShadow: 'none', backgroundColor: (btnText === text) ? appBtnColor : "#333333", width: '180px', height: '45px' }} color="#000000" >{text}</Button>
                                        ))
                                }
                            </div>

                            <div className={classes.appBarMenuBtnStyle}>
                                <IconButton onClick={handleDrawerOpen}>
                                    <Menu style={{ color: "#fff" }} />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Toolbar />
                </div>

                <Drawer open={open} anchor="right">
                    <List>
                        <div>
                            <IconButton onClick={handleDrawerClose}>
                                <ArrowForward />
                            </IconButton>{" "}
                        </div>
                        {
                            contentBus !== "Designing Team" ?
                                buttonAppbar.map((text) => (
                                    <ListItem button key={text} onClick={() => { onAppBtnClick(text, "owner") }}>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))
                                :
                                buttonAppbarForTeam.map((text) => (
                                    <ListItem button key={text} onClick={() => { onAppBtnClick(text, "team") }}>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))
                        }
                    </List>
                </Drawer>
            </div>
        </>
    );
}

export default AppbarHead;