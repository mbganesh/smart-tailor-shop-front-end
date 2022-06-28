import Features from "./Features";

import PricingPlan from "./PricingPlan";
import About from "./About";
import AppDemo from "./AppDemo";
import { Toolbar, Button, Typography, Box, ListItem, ListItemButton, ListItemText, Divider,List,   } from "@mui/material";
import { useRef } from "react";
import Home from "./Home";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import MuiAppBar from "@mui/material/AppBar";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { useNavigate } from "react-router-dom";
import logo from '../images/landingPageImages/logo.png'




export default function AppBarLandingPage() {
    const navigate = useNavigate()

    const drawerWidth = 240;

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: drawerWidth,
        }),
    }));

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-start",
    }));

    const MenuButton = (theme) => ({
        color: "gray",
        fontWeight: "bold",
        margin: "0px 10px",
        [theme.breakpoints.down("lg")]: {
            display: "none",
        },
    });

    const ButtonHide = (theme) => ({
        color: "#fff",
        backgroundColor: Colors.MAIN_THEME_COLOR,
        "&:hover": { backgroundColor: Colors.MAIN_THEME_COLOR },
        fontWeight: "bold",
        margin: "0px 10px",
        [theme.breakpoints.down("lg")]: {
            display: "none",
        }
    })


    const TitleStyle = (theme) => ({
        flexGrow: 1,
        color: Colors.MAIN_THEME_COLOR,
        whiteSpace: 'nowrap',
        fontWeight: 'bold',

        fontFamily: Fonts.MAIN_FONT,


    })

    const HomeRef = useRef(null);
    const FeaturesRef = useRef(null);
    const DemoRef = useRef(null);
    const PricingRef = useRef(null);

    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const DrawerMenu = (theme) => ({
        color: Colors.MAIN_THEME_COLOR,
        ...(open && { display: "none" }),

        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
    });

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: "smooth",
        });

        handleDrawerClose();
    };

    const AppBarData = [
        {
            text: "Home",
            ref: HomeRef,
        },
        {
            text: "Features",
            ref: FeaturesRef,
        },
        {
            text: "Demo",
            ref: DemoRef,
        },
        {
            text: "Pricing",
            ref: PricingRef,
        },
    ];


    return (
        <div>
            <div style={{ display: "flex" }}>
                <AppBar elevation={0} position="fixed" open={open} sx={{ bgcolor: "white" }}>
                    <Toolbar >

                        <Box
                            component="img"
                            sx={{
                                height: 30,
                                width: 30,
                                mr:1
                                
                            }}
                            src={logo}
                        />

                        <Typography variant="h5" sx={TitleStyle}>
                            Smart Tailor Shop
                        </Typography>

                        {AppBarData.map((obj, i) => (
                            <Button
                                key={i}
                                sx={MenuButton}
                                onClick={
                                    obj.text !== 'Home' ?
                                        () => { scrollToSection(obj.ref) }
                                        :
                                        () => { window.scrollTo({ top: -50, behavior: 'smooth', }) }
                                }
                            >
                                {obj.text}
                            </Button>
                        ))}

                        <Button
                            variant="contained"
                            sx={ButtonHide}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                        <IconButton

                            onClick={handleDrawerOpen}
                            sx={DrawerMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Toolbar />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {AppBarData.map((obj, i) => (
                            <ListItem key={obj} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        scrollToSection(obj.ref);
                                    }}
                                >
                                    <ListItemText primary={obj.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>

            <div ref={HomeRef}>
                <Home />
            </div>

            <About />

            <div ref={FeaturesRef}>
                <Features />
            </div>

            <div ref={DemoRef}>
                <AppDemo />
            </div>

            <div ref={PricingRef} >
                <PricingPlan />
            </div>

        </div>
    )
}