import Webcam from "react-webcam";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button, InputLabel, Box, styled, Tooltip, IconButton,Modal, CircularProgress  } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import { useState, useEffect, React, useMemo } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppbarHead from './AppbarHead'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Helpers from './Helpers';
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SaveIcon from "@material-ui/icons/Save";
import swal from "sweetalert2";
import { Colors, Fonts } from "./constants";
import CachedIcon from '@material-ui/icons/Cached';

const salwarColorCode = "#00A19D"
const salwarLightColorCode = "#e5fffe"
const blouseColorCode = "#6F69AC"
const blouseLightColorCode = "#efeff6"
const colorCode = "#BA7729";
const bgColor = "#f1dbc0"

const useStyles = makeStyles((theme) => ({
    cardroot: {
        [theme.breakpoints.between('xs', 'sm')]:
        {
            width: 300,
            padding: 30,
            margin: 20,
        },

        [theme.breakpoints.between('sm', 'md')]:
        {
            width: 400,
            padding: 30,
            margin: 30,
        },

        [theme.breakpoints.between('md', 'lg')]:
        {
            width: 500,
            padding: 30,
            margin: 30,

        },
        [theme.breakpoints.between('lg', 'xl')]:
        {
            width: 600,
            padding: 30,
            margin: 30,
        }

    },
    selectDesign: {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '& fieldset': {
                borderColor: 'white',
            }
        },
        width: "90%"
    },
    adornment: {
        backgroundColor: salwarColorCode,
        width: "450px",
        paddingTop: "8%",
        paddingBottom: "8%",
        paddingLeft: "10px",
        borderTopLeftRadius: theme.shape.borderRadius + "px",
        borderBottomLeftRadius: theme.shape.borderRadius + "px",
    },
    blouseAdornment: {
        backgroundColor: blouseColorCode,
        width: "450px",
        paddingTop: "8%",
        paddingBottom: "8%",
        paddingLeft: "10px",
        borderTopLeftRadius: theme.shape.borderRadius + "px",
        borderBottomLeftRadius: theme.shape.borderRadius + "px",
    },
    textField: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: salwarColorCode,
        },
        "& .MuiOutlinedInput-root": {
            paddingLeft: 0,
        },
    },
    textFieldBlouse: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: blouseColorCode,
        },
        "& .MuiOutlinedInput-root": {
            paddingLeft: 0,
        },
    },
    imagePreview: {
        width: "20%",
        height: "20%",
        '&:hover': {
            transform: 'scale(2.0)',
            transition: 'all 0.8s ease'
        }
    },
    salwarMeasurementHeadText: {
        width: 130, backgroundColor: salwarColorCode, color: "white", alignItems: "center", display: "flex", paddingLeft: "3%", borderRadius: 0, fontSize: 14, fontFamily: Fonts.LATO,
        [theme.breakpoints.up("xl")]: {
            fontSize: 16,
        },
    },

    salwarMeasurementTextField: {
        [`& fieldset`]: {
            borderRadius: 0,
        },


        // focused color for input with variant='outlined'
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: salwarColorCode
            }
        }

    },

    blouseMeasurementHeadText: {
        width: 130, backgroundColor: blouseColorCode, color: "white", alignItems: "center", display: "flex", paddingLeft: "3%", borderRadius: 0, fontSize: 14, fontFamily: Fonts.LATO,
        [theme.breakpoints.up("xl")]: {
            fontSize: 16,
        },
    },
    blouseMeasurementTextField: {
        [`& fieldset`]: {
            borderRadius: 0,
        },


        // focused color for input with variant='outlined'
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: blouseColorCode
            }
        }

    },
    dressBlockTitleText: {
        fontSize: 14, fontFamily: Fonts.UBUNTU, fontWeight: "BOLD", color: "white",
        [theme.breakpoints.up("lg")]: {
            fontSize: 16,
        },
    },
}));



export default function DesignTeamView() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { orderDetailsData, mode, userName,prevPage, prevOrderStatus,prevSearchQuery } = state
    const [salwarBlouseBoxHeight, setSalwarBlouseBoxHeight] = useState("680px");
    const [facingMode, setFacingMode] = useState("user");
    const [loading, setLoading] = useState(true);
    const handleUserMedia = () => setTimeout(() => setLoading(false), 1_000);

    const [loadingModal, setloadingModal] = useState(false)

    const [costs, setCosts] = useState({
        "salwar": {
            "salwarItemsList": {
                "Basic": 790
            },
            "salwarItemsLiningList": {
                "With Lining": 100,
                "Without Lining": 0
            },
            "salwarItemsUtilitiesList": {
                "Pocket": 30,
                "Rope": 20,
                "Zip": 75,
                "With Elastic": 75
            },
            "salwarItemsPipingList": {

                "Piping-Only Neck": 160, "Piping-Neck Sleeve": 310
            }
        },
        "blouse": {
            "blouseItemsList": {
                "Basic": 500
            },
            "blouseItemsLiningList": {
                "With Lining": 150,
                "Without Lining": 0
            },
            "blouseItemsUtilitiesList": {
                "Rope": 20,
                "Zip": 75
            },
            "blouseItemsPipingList": {
                "Piping-Only Neck": 290,
                "Piping-Neck Sleeve": 390,
                "Double Piping-Neck Sleeve": 600,
                "Triple Piping-Neck Sleeve": 700
            },
            "blouseItemsCutList": {
                "Straight Cut": 0,
                "Cross Cut": 0,
                "Katori Cut": 890,

                "Princess Cut": 890
            }
        }
    })


    const [todayDate, setTodayDate] = useState("");
    const [salwarCounter, setsalwarCounter] = useState(0);
    const [blouseCounter, setblouseCounter] = useState(0);

    const [designTeamContentHider, setDesignTeamContentHider] = useState("flex");
    const [orderDetailsPersonalData, setorderDetailsPersonalData] = useState({});

    const bigSalwarMeasurements = useMemo(() => { return ["Arm Length", "Arm Circum", "Ankle", "Pant Length"] }, []);
    const salwarTextFields = useMemo(() => { return ["Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Neck F", "Neck B", "Full Length", "Side Slit", "Arm Hole", "Arm Length", "Arm Circum", "Ankle", "Pant Length"]; }, []);

    // var salwarTextFields = ["Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Neck F", "Neck B", "Full Length", "Ankle", "Pant Length", "Arm Hole", "Arm Length", "Arm Circum"]
    var salwarCheckBoxFields = ["Pocket", "Rope", "Zip", "With Elastic"]
    var salwarDesigningStyle = ["Dart", "Neck Type", "Pant Style", "Piping", "Lining"]
    var salwarPatternStyle = ["Neck Pattern ID", "Sleeve Pattern ID"]
    var salwarTuckStyle = ["Tuck Point", "Tuck Side"]



    var blouseTextFields = ["Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Neck F", "Neck B", "Full Length", "Back Length", "Arm Hole", "Arm Length", "Arm Circum"]
    var blouseCheckBoxFields = ["Rope", "Zip", "Saree Falls", "Tazzles"]
    var blouseTuckStyle = ["Tuck Point", "Tuck Side"]
    var blouseDesigningStyle = ["Cut", "Neck Type", "Lining", "Piping"]
    var blousePatternStyle = ["Neck Pattern ID", "Sleeve Pattern ID", "Work Blouse ID"]
    // ============================================================
    const [gstchecked, setGstChecked] = useState(false)

    const [textBoxDisabler, setTextBoxDisabler] = useState(false)
    const [measurementTextBoxDisabler, setMeasurementTextBoxDisabler] = useState(false)
    const [addBlouseSalwarCardVisibility, setaddBlouseSalwarCardVisibility] = useState("block")

    const [salwarData, setsalwarData] = useState([])
    const [blouseData, setblouseData] = useState([])
    const [imageIndex, setImageIndex] = useState(0);

    const [blouseimageIndex, setBlouseImageIndex] = useState(0);

    const [orderStatus, setorderStatus] = useState("")
    const [deliveryDate, setdeliveryDate] = useState("")

    // new staff
    const [salwarCaptureDialog, setSalwarCaptureDialog] = useState(false);
    const [blouseCaptureDialog, setBlouseCaptureDialog] = useState(false);



    const openSalwarCaptureDialog = (mainIndex) => {
        setImageIndex(mainIndex)
        setSalwarCaptureDialog(true);
    };

    const openBlouseCaptureDialog = (mainIndex) => {
        setBlouseImageIndex(mainIndex)
        setBlouseCaptureDialog(true);
    };

    const storeStitchedImage = async (orderID, dressImage) => {
        let picBase64 = webcamRef.current.getScreenshot();
        picBase64 = await process_image(picBase64);
        if (dressImage === "stichedSalwarDressImage") {
            setsalwarData((prev) =>
                prev.map((el) =>
                    el.salwarOrderId === orderID
                        ? {
                            ...el,
                            stichedDressImage: picBase64,
                            stichedDressImageName: orderID + "Stiched_IMG",
                        }
                        : el
                )
            );
            setSalwarCaptureDialog(false);
        }
        else {
            setblouseData((prev) =>
                prev.map((el) =>
                    el.blouseOrderId === orderID
                        ? {
                            ...el,
                            stichedDressImage: picBase64,
                            stichedDressImageName: orderID + "Stiched_IMG",
                        }
                        : el
                )
            );
            setBlouseCaptureDialog(false);
        }
    };

    async function process_image(res, min_image_size = 50) {
        if (res) {
            const old_size = calc_image_size(res);
            if (old_size > min_image_size) {
                const resized = await reduce_image_file_size(res);
                const new_size = calc_image_size(resized);
            
                return resized;
            } else {
                return res;
            }
        } else {
            return null;
        }
    }

    function calc_image_size(image) {
        let y = 1;
        if (image.endsWith("==")) {
            y = 2;
        }
        const x_size = image.length * (3 / 4) - y;
        return Math.round(x_size / 1024);
    }

    async function reduce_image_file_size(
        base64Str,
        MAX_WIDTH = 450,
        MAX_HEIGHT = 450
    ) {
        let resized_base64 = await new Promise((resolve) => {
            let img = new Image();
            img.src = base64Str;
            img.onload = () => {
                let canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/jpeg", 0.7)); // this will return base64 image results after resize
            };
        });
        return resized_base64;
    }

    const saveBtnClick = () => {
        setloadingModal(true)
        let tempSalwarStrichArr = []
        let tempSalwarStrichObj = {}
        let tempBlouseStrichArr = []
        let tempBlouseStrichObj = {}
        for (let i in salwarData) {
            tempSalwarStrichObj["DressID"] = salwarData[i]["salwarOrderId"]
            tempSalwarStrichObj["stichedDressImage"] = salwarData[i]["stichedDressImage"] === undefined ? "" : salwarData[i]["stichedDressImage"]
            tempSalwarStrichObj["stichedDressImageName"] = salwarData[i]["stichedDressImageName"] === undefined ? "" : salwarData[i]["stichedDressImageName"]
            tempSalwarStrichArr.push(tempSalwarStrichObj)
            tempSalwarStrichObj = {}
        }
        for (let i in blouseData) {
            tempBlouseStrichObj["DressID"] = blouseData[i]["blouseOrderId"]
            tempBlouseStrichObj["stichedDressImage"] = blouseData[i]["stichedDressImage"] === undefined ? "" : blouseData[i]["stichedDressImage"]
            tempBlouseStrichObj["stichedDressImageName"] = blouseData[i]["stichedDressImageName"] === undefined ? "" : blouseData[i]["stichedDressImageName"]
            tempBlouseStrichArr.push(tempBlouseStrichObj)
            tempBlouseStrichObj = {}
        }

        var dataToUpdate = {
            "user": "admin",
            "orderID": orderDetailsPersonalData["orderID"],
            "orderDate":orderDetailsPersonalData["orderDate"],
            "mobNo":orderDetailsPersonalData["mobNo"],
            "orderStatus": orderStatus,
            "stitchedSalwarImage": tempSalwarStrichArr,
            "stitchedBlouseImage": tempBlouseStrichArr
        }
        axios
            .post(Helpers().apiURL + "/designingTeamEdit", dataToUpdate)
            .then((response) => {
                if (response.data.message === "DataStored") {
                    swal
                        .fire({
                            title: `Order Details Updated Successfully`,
                            text: "",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                        })
                        .then((willWarn) => {
                            if (willWarn.isConfirmed) {
                                navigate('/orderDetailPage', { state: { userName: "Designing Team", tohide: "none",prevPage:prevPage  } });
                            }
                        })
                        setloadingModal(false)
                }
                else {
                    setloadingModal(false)
                    alert("Server Down")
                }
            }).catch((error) => {
                setloadingModal(false)
                alert("Server Down!!")
            })

    }


    // Sleeve Pattern Charge
    const onSalwarBtnClickClose = (OrderId) => {
        setsalwarCounter(salwarCounter - 1);
        setsalwarData(salwarData.filter(item => item.salwarOrderId !== OrderId));

    };
    const OnBlouseBtnClickClose = (OrderId) => {
        setblouseCounter(blouseCounter - 1);
        setblouseData(blouseData.filter(item => item.blouseOrderId !== OrderId));
    };


    const [image] = useState({
        image:
            "https://image.freepik.com/free-vector/cardboard-box-opened-isolated-cartoon-style_1308-49807.jpg",
        name: "",
    });
    const webcamRef = useRef(null);

    const [open, setopen] = useState(false);
    const [open2, setopen2] = useState(false);
    const [stichedSalwarDialogOpener, setStichedSalwarDialogOpener] = useState(false);

    const openPops2 = (mainIndex) => {
        setImageIndex(mainIndex)
        setopen2(true);
    };
    const close2 = () => {
        setopen2(false);
    };

    const [salwarpatternview, setsalwarpatternview] = useState("")
    const [salwarpatterviewname, setsalwarpatterviewname] = useState("")


    const openPops = (item, name) => {
        setopen(true);
        setsalwarpatternview(item);
        setsalwarpatterviewname(name);
    };
    const close = () => {
        setopen(false);
    };

    const [blouseopen, setblouseopen] = useState(false);
    const [blouseopen2, setblouseopen2] = useState(false);
    const [stichedBlouseDialogOpener, setStichedBlouseDialogOpener] = useState(false);

    const blouseopenPops2 = (blousemainIndex) => {
        setBlouseImageIndex(blousemainIndex)
        setblouseopen2(true);
    };

    const stichedBlouseDialog = (blousemainIndex) => {
        setBlouseImageIndex(blousemainIndex)
        setStichedBlouseDialogOpener(true);
    };

    const stichedSalwarDialog = (mainIndex) => {
        setImageIndex(mainIndex)
        setStichedSalwarDialogOpener(true);
    };

    const blouseclose2 = () => {
        setblouseopen2(false);
    };

    const [blousepatternview, setblousepatternview] = useState("")
    const [blousepatterviewname, setblousepatterviewname] = useState("")


    const blouseopenPops = (item, name) => {
        setblouseopen(true);
        setblousepatternview(item);
        setblousepatterviewname(name);
    };

    const blouseclose = () => {
        setblouseopen(false);
    };


    const Input = styled('input')({
        display: 'none',
    });


    const setAllOrderData = (allOrderDetailsData) => {
        setorderDetailsPersonalData(allOrderDetailsData);
        setsalwarData(allOrderDetailsData.salwarData)
        setblouseData(allOrderDetailsData.blouseData)
        setdeliveryDate(allOrderDetailsData.deliveryDate)
        setorderStatus(allOrderDetailsData.orderStatus)
        setsalwarCounter(allOrderDetailsData.salwarData.length)
        setblouseCounter(allOrderDetailsData.blouseData.length)
        setGstChecked(allOrderDetailsData.gst)
        if (mode === "view") {
            setaddBlouseSalwarCardVisibility("none")
            setTextBoxDisabler(true)
            setMeasurementTextBoxDisabler('')
        } else if (mode === "edit") {
            setaddBlouseSalwarCardVisibility("none")
            setTextBoxDisabler(true)
            setMeasurementTextBoxDisabler('')
        }
    }

    const handleBackBtn = () => {
        navigate('/orderDetailPage', { state: { userName: "Designing Team", tohide: "none",prevPage:prevPage } });
    }

    const switchCam = () => {
        const newFcMode = facingMode === "user" ? { exact: "environment" } : "user";
        setFacingMode(newFcMode);
    };

    useEffect(() => {
        if (userName === "Designing Team") {
            setDesignTeamContentHider("none")
        }
        try {
            if (mode === "view") {
                if (window.innerHeight === 959) {
                    setSalwarBlouseBoxHeight("790px");
                } else if (window.innerHeight === 856) {
                    setSalwarBlouseBoxHeight("658px");
                } else if (window.innerHeight === 1122) {
                    setSalwarBlouseBoxHeight("975px");
                } if (window.innerHeight > 500) {
                    setSalwarBlouseBoxHeight("960px");
                } else if (window.innerHeight > 900) {
                    setSalwarBlouseBoxHeight("500px");
                }
                setAllOrderData(orderDetailsData)
            }
            else if (mode === "edit") {
                if (window.innerHeight === 959) {
                    setSalwarBlouseBoxHeight("790px");
                }
                else if (window.innerHeight === 856) {
                    setSalwarBlouseBoxHeight("658px");
                }
                else if (window.innerHeight === 927) {
                    setSalwarBlouseBoxHeight("760px");
                }
                else if (window.innerHeight === 1122) {
                    setSalwarBlouseBoxHeight("947px");
                } else if (window.innerHeight === 1280) {
                    setSalwarBlouseBoxHeight("975px");
                } else if (window.innerHeight >= 500) {
                    setSalwarBlouseBoxHeight("960px");
                }
                setAllOrderData(orderDetailsData)
            }
            else {
                setorderDetailsPersonalData(orderDetailsData);
            }
        } catch (err) {
            navigate("/");
        }
    }, []);

    return (
        <div style={{ display: "flex", backgroundColor: "green", height: "100vh", flexDirection: "column", flex: 1 }}>
            {/* First Block */}
            <div style={{ backgroundColor: "red", width: "100%" }}>
                <AppbarHead dataParent={{ userNameFrom: userName, appBtnColor: colorCode, appBtnText: "Order Details" }} />
            </div>
            {/* Second Block */}
            <div style={{ background: "pink", display: "block", overflow: "auto", flex: 1 }}>
                {salwarData.map((text, mainIndex) => {
                    return (
                        <>
                            <div style={{ padding: '1%' }}>
                                <Card elevation={10} style={{ background: "#EEEEEE" }} >
                                    <div>
                                        <Card style={{ backgroundColor: salwarColorCode }}>
                                            <div style={{ display: 'flex', height: 25 }}>
                                                <div style={{ margin: 'auto' }}>
                                                    <Typography variant="h6" className={classes.dressBlockTitleText}>
                                                        SALWAR
                                                    </Typography>
                                                </div>
                                                <Button style={{ backgroundColor: "#FF4848", color: "white", fontSize: "14px", fontWeight: "bold", display: addBlouseSalwarCardVisibility }} onClick={() => { onSalwarBtnClickClose(salwarData[mainIndex]["salwarOrderId"]) }} >X</Button>
                                            </div>
                                        </Card>

                                        <Card elevation={5} style={{ marginLeft: 10, marginRight: 10, marginTop: 10, display: 'flex', justifyContent: "center", backgroundColor: salwarLightColorCode }}>
                                            <div style={{ border: "2px solid", borderColor: salwarLightColorCode }}>
                                                <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold", height: 0 }} >ID: </Typography>
                                            </div>
                                            <div style={{ border: "2px solid white" }}>
                                                <Typography style={{ marginLeft: "10%", width: "100%", color: salwarColorCode, fontWeight: "bold" }} variant="subtitle1" >{salwarData[mainIndex]["salwarOrderId"]}</Typography>
                                            </div>
                                        </Card>

                                        <Card elevation={5} style={{ padding: 15, marginLeft: 10, marginRight: 10, marginTop: 10, display: 'flex', flexWrap: 'wrap' }} >
                                            <Box style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }} >
                                                <div>
                                                    <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "8px", borderTopRightRadius: "8px", }} >
                                                        <Typography style={{ color: "white", marginLeft: "10px", marginTop: 5, textAlign: "start", fontWeight: "bold", flex: 1, }} variant="subtitle2"  >
                                                            Measurements
                                                        </Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode, }} >
                                                        {salwarTextFields.map(
                                                            (text, textFieldIndex) => (
                                                                <div style={{ display: "flex", alignItems: "center", }}  >
                                                                    <div>
                                                                        <Box style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: "flex", margin: "10px" }}>
                                                                            <Typography noWrap className={classes.salwarMeasurementHeadText}>
                                                                                {text}
                                                                            </Typography>

                                                                            <TextField
                                                                                className={classes.salwarMeasurementTextField}
                                                                                value={salwarData[mainIndex][text] === undefined ? "" : salwarData[mainIndex][text]}
                                                                                inputProps={{ readonly: measurementTextBoxDisabler }}
                                                                                style={{ width: bigSalwarMeasurements.includes(text) ? 200 : 120 }}
                                                                                size="small"
                                                                                variant="outlined"
                                                                                type="text"
                                                                                fullWidth
                                                                                InputProps={{
                                                                                    endAdornment: (
                                                                                        <InputAdornment position="end">
                                                                                            inch
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                }}
                                                                            >
                                                                            </TextField>
                                                                        </Box>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </Box>

                                            <Box style={{ border: '2px solid', borderColor: salwarColorCode, marginTop: 30, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                                                <div>
                                                    <div style={{ backgroundColor: salwarColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} >
                                                        <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Tuck Style</Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 10 }} >

                                                        {salwarTuckStyle.map((text, index) => (

                                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>

                                                                <div >

                                                                    <Box style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: "flex", margin: "10px" }}>
                                                                        <Typography noWrap className={classes.salwarMeasurementHeadText}>
                                                                            {text}
                                                                        </Typography>

                                                                        <TextField
                                                                            className={classes.salwarMeasurementTextField}
                                                                            value={salwarData[mainIndex][text] === undefined ? "" : salwarData[mainIndex][text]}
                                                                            inputProps={{ readonly: measurementTextBoxDisabler }}
                                                                            style={{ width: 120 }}
                                                                            size="small"
                                                                            variant="outlined"
                                                                            type="text"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                endAdornment: (
                                                                                    <InputAdornment position="end">
                                                                                        inch
                                                                                    </InputAdornment>
                                                                                ),
                                                                            }}
                                                                        ></TextField>

                                                                    </Box>
                                                                </div>
                                                            </div>

                                                        ))}
                                                    </div>
                                                </div>
                                            </Box>

                                            <Box style={{ border: '2px solid', borderColor: salwarColorCode, marginTop: 10, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                                <div >
                                                    <div style={{ backgroundColor: salwarColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                                                        <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Design Selection</Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: 14, marginBottom: 10 }} >
                                                        {salwarCheckBoxFields.map((text, index) => (
                                                            <div style={{ display: 'flex', alignItems: "center" }}>
                                                                <div>
                                                                    <TextField
                                                                        style={{ margin: 8, width: "250px", display: salwarData[mainIndex][text] === true ? "" : "none" }}
                                                                        inputProps={{ readonly: measurementTextBoxDisabler }}
                                                                        value={salwarData[mainIndex][text] === true ? "Yes" : ""}
                                                                        className={classes.textField}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        InputProps={{
                                                                            startAdornment: (
                                                                                <InputAdornment className={classes.adornment} position="start">
                                                                                    <div style={{ color: "white" }}>
                                                                                        {text}
                                                                                    </div>
                                                                                </InputAdornment>
                                                                            )
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </Box>

                                            <Box style={{ border: '2px solid', borderColor: salwarColorCode, marginTop: 10, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                                                <div>
                                                    <div style={{ backgroundColor: salwarColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} >
                                                        <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Designing Style</Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} >
                                                        {salwarDesigningStyle.map((dropDownText, index) => (
                                                            <div style={{ display: 'flex', alignItems: "center", marginTop: 14 }}>
                                                                <div>
                                                                    <TextField
                                                                        style={{ margin: 8, width: "270px", display: salwarData[mainIndex][dropDownText] === "None" ? "none" : "" }}
                                                                        inputProps={{ readonly: measurementTextBoxDisabler }}
                                                                        value={salwarData[mainIndex][dropDownText]}
                                                                        className={classes.textField}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        InputProps={{
                                                                            startAdornment: (
                                                                                <InputAdornment className={classes.adornment} position="start" style={{ width: '150px' }}>
                                                                                    <div style={{ color: "white" }}>
                                                                                        {dropDownText}
                                                                                    </div>
                                                                                </InputAdornment>
                                                                            ),
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                </InputAdornment>
                                                                            ),
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Box>

                                            <Box style={{ border: '2px solid', borderColor: salwarColorCode, marginTop: 10, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                                <div>
                                                    <div style={{ backgroundColor: salwarColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                                                        <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Patterns</Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexWrap: "wrap" }} >
                                                        {salwarPatternStyle.map((text, index) => (
                                                            <div style={{ display: 'flex', alignItems: "center" }}>
                                                                <TextField disabled={textBoxDisabler} label={text} value={salwarData[mainIndex][text + " name"] || ''} inputProps={{ maxLength: 0 }} style={{ margin: '5%' }} variant="outlined" InputProps={{
                                                                    readOnly: true,
                                                                }} />
                                                                <img style={{ width: 60, height: 60, marginRight: 10 }} onClick={() => openPops(salwarData[mainIndex][text + " image"] || image.image, salwarData[mainIndex][text + " name"] || '')} src={salwarData[mainIndex][text + " image"] || image.image} alt="img" >
                                                                </img>
                                                                <div>
                                                                    <Dialog open={open} onClose={close} >
                                                                        <DialogTitle>{salwarpatterviewname}</DialogTitle>
                                                                        <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column" }} >
                                                                            <img style={{ width: 500, height: 500, marginRight: 10 }} src={salwarpatternview} alt="img" >
                                                                            </img>
                                                                        </div>
                                                                    </Dialog>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Box>

                                            <Box style={{ border: '2px solid', borderColor: salwarColorCode, marginTop: 10, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                                <div>
                                                    <div style={{ backgroundColor: salwarColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} >
                                                        <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Remarks</Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid white" }} >
                                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", border: "2px solid white" }}>

                                                            <TextField value={salwarData[mainIndex]["Remarks"]} disabled={textBoxDisabler} label={"Remarks"} style={{ marginTop: 14, marginRight: 10, marginLeft: 10, marginBottom: 10 }} inputProps={{ maxLength: 150 }} variant="outlined" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Box>


                                            <Box style={{ border: '2px solid', borderColor: salwarColorCode, marginTop: 10, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                                                <div>
                                                    <div style={{ backgroundColor: salwarColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                                                        <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Dress</Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid white", justifyContent: 'center' }} >
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                <TextField disabled={textBoxDisabler} label={"Dress Image"} value={salwarData[mainIndex]["dressImageName"] || ''} style={{ marginTop: 14, marginLeft: 10, marginRight: 10, marginBottom: 10 }} inputProps={{ maxLength: 2 }} variant="outlined" />
                                                                <img alt="salwar dress" style={{ width: 60, height: 60, marginRight: 10 }} onClick={() => { openPops2(mainIndex) }} src={salwarData[mainIndex]["dressImage"] || image.image} />
                                                                <div>
                                                                    <Dialog open={open2} onClose={close2}  >
                                                                        <DialogTitle>{salwarData[imageIndex]["dressImageName"] || ''}</DialogTitle>
                                                                        <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column" }} >
                                                                            <img alt="salwar dress" style={{ width: 600, height: 600 }} src={salwarData[imageIndex]["dressImage"] || image.image} />
                                                                        </div>
                                                                    </Dialog>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Box>

                                            {/* Streched Image Code  Start -> */}
                                            <Box
                                                style={{ border: '2px solid', borderColor: salwarColorCode, marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} >
                                                <div>
                                                    <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
                                                        <Typography style={{ color: "white", marginLeft: "10px", marginTop: 5, textAlign: "start", fontWeight: "bold", flex: 1, }} variant="subtitle2" >
                                                            Stitched Dress
                                                        </Typography>
                                                        {/* <Button variant="contained" color="secondary" startIcon={<AutorenewIcon />}>Reset</Button> */}
                                                    </div>
                                                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                        <div style={{ display: "flex", flexDirection: "row" }} >
                                                            <TextField size="small"
                                                                disabled={textBoxDisabler}
                                                                label={"Dress Image"}
                                                                value={salwarData[mainIndex]["stichedDressImageName"] || ""}
                                                                inputProps={{ maxLength: 2 }}
                                                                style={{ marginTop: '20px', marginLeft: 10, marginRight: 10, marginBottom: 'auto' }}
                                                                variant="outlined"
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <Button
                                                                            style={{ paddingTop: "7px", paddingBottom: "7px", paddingRight: "30px", paddingLeft: "20px", marginRight: "-13px", background: salwarColorCode, color: "white", display: mode === "view" ? "none" : "" }}
                                                                            onClick={() => { openSalwarCaptureDialog(mainIndex) }}
                                                                        >
                                                                            CAPTURE
                                                                        </Button>
                                                                    ),
                                                                }}
                                                            />
                                                            <img
                                                                alt="salwar dress"
                                                                onClick={() => { stichedSalwarDialog(mainIndex) }}
                                                                className={classes.imagePreview}
                                                                style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, marginTop: '12px', marginBottom: 'auto' }}
                                                                src={
                                                                    salwarData[mainIndex]["stichedDressImage"] ||
                                                                    image.image
                                                                }
                                                            />
                                                            <div>
                                                                <Dialog open={stichedSalwarDialogOpener} onClose={() => { setStichedSalwarDialogOpener(false) }}  >
                                                                    <DialogTitle>{salwarData[imageIndex]["stichedDressImageName"] || ''}</DialogTitle>
                                                                    <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column" }} >
                                                                        <img alt="salwar dress" style={{ width: 600, height: 600 }} src={salwarData[imageIndex]["stichedDressImage"] || image.image} />
                                                                    </div>
                                                                </Dialog>
                                                            </div>





                                                        </div>
                                                    </div>
                                                    <div>



                                                        <Dialog open={salwarCaptureDialog} onClose={() => { setSalwarCaptureDialog(false) }}>

                                                            <div style={{
                                                                display: 'flex', backgroundColor: salwarColorCode, color: "white", height: '50px', justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}>
                                                                <DialogTitle style={{
                                                                    flex: 1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                }}>
                                                                    Capture your Stiched Salwar Dress
                                                                </DialogTitle>
                                                                <div style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', }}>
                                                                    <Tooltip title="Switch Camera">
                                                                        <IconButton onClick={() => switchCam()} aria-label="cameraSwitch">
                                                                            <CachedIcon style={{ color: salwarColorCode }} />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>

                                                            <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column" }} >
                                                                {loading && <Typography style={{ textAlign: 'center' }} > Camera Loading... </Typography>}
                                                                <Webcam
                                                                    videoConstraints={{ facingMode: facingMode }}
                                                                    style={{ width: "100%", height: "35%", opacity: loading ? 0 : 1 }}
                                                                    screenshotFormat="image/png"
                                                                    ref={webcamRef}
                                                                    onUserMedia={handleUserMedia} />

                                                                <Button
                                                                    style={{ backgroundColor: salwarColorCode, color: "white", fontWeight: "bold", }}
                                                                   
                                                                    variant="contained"
                                                                    onClick={() => { storeStitchedImage(salwarData[imageIndex]["salwarOrderId"], "stichedSalwarDressImage", imageIndex) }}
                                                                >
                                                                    Capture Stiched Salwar Dress
                                                                </Button>
                                                            </div>
                                                        </Dialog>

                                                    </div>
                                                </div>
                                            </Box>

                                        </Card>
                                    </div>
                                </Card>
                            </div>
                        </>
                    );
                })}

                {
                    blouseData.map((text, blousemainIndex) => {
                        return (
                            <>
                                <div style={{ padding: '1%' }}>
                                    <Card elevation={10} style={{ background: "#EEEEEE" }} >
                                        <div >
                                            <Card style={{ backgroundColor: blouseColorCode }}>
                                                <div style={{ display: 'flex', height: 25 }}>
                                                    <div style={{ margin: 'auto' }}>
                                                        <Typography variant="h6" className={classes.dressBlockTitleText}>BLOUSE</Typography>
                                                    </div>
                                                    <Button style={{ backgroundColor: "#FF4848", color: "white", fontSize: "18px", fontWeight: "bold", display: addBlouseSalwarCardVisibility }} onClick={() => { OnBlouseBtnClickClose(blouseData[blousemainIndex]["blouseOrderId"]) }} >X</Button>
                                                </div>
                                            </Card>

                                            <Card elevation={5} style={{ marginLeft: 10, marginRight: 10, marginTop: 10, display: 'flex', justifyContent: "center", backgroundColor: blouseLightColorCode }}>
                                                <div style={{ border: "2px solid", borderColor: blouseLightColorCode }}>
                                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold", height: 0, color: blouseColorCode }} >ID</Typography>
                                                </div>
                                                <div style={{ border: "2px solid", borderColor: blouseLightColorCode }}>
                                                    <Typography style={{ marginLeft: "10%", width: "100%", color: blouseColorCode, fontWeight: "bold" }} variant="subtitle1" >{blouseData[blousemainIndex]["blouseOrderId"]}</Typography>
                                                </div>
                                            </Card>

                                            <Card elevation={5} style={{ padding: 15, marginLeft: 10, marginRight: 10, marginTop: 10, display: 'flex', flexWrap: 'wrap' }} >
                                                <Box style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}                          >
                                                    <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}                            >
                                                        <Typography
                                                            style={{ color: "white", marginLeft: "10px", marginTop: 5, textAlign: "start", fontWeight: "bold", flex: 1, }}
                                                            variant="subtitle2"
                                                        >
                                                            Measurements
                                                        </Typography>
                                                    </div>
                                                    <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: blouseColorCode, }}                                                        >
                                                        {blouseTextFields.map((text, index) => (
                                                            <div style={{ display: "flex", alignItems: "center", }}                                >
                                                                <div>

                                                                    <Box style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: "flex", margin: "10px" }}>
                                                                        <Typography noWrap className={classes.blouseMeasurementHeadText}>
                                                                            {text}
                                                                        </Typography>

                                                                        <TextField
                                                                            className={classes.blouseMeasurementTextField}
                                                                            value={blouseData[blousemainIndex][text] === undefined ? "" : blouseData[blousemainIndex][text]}
                                                                            inputProps={{ readonly: measurementTextBoxDisabler }}
                                                                            style={{ width: text === "Arm Length" || text === "Arm Circum" ? 200 : 120 }}
                                                                            size="small"
                                                                            variant="outlined"
                                                                            type="text"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                endAdornment: (
                                                                                    <InputAdornment position="end">
                                                                                        inch
                                                                                    </InputAdornment>
                                                                                ),
                                                                            }}
                                                                        ></TextField>

                                                                    </Box>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Box>


                                                <Box style={{ border: '2px solid', borderColor: blouseColorCode, marginTop: 30, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                                                    <div>
                                                        <div style={{ backgroundColor: blouseColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} >
                                                            <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Tuck Style</Typography>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 10 }} >

                                                            {blouseTuckStyle.map((text, index) => (

                                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>

                                                                    <div >
                                                                        <TextField
                                                                            style={{ margin: 8, width: "250px" }}
                                                                            inputProps={{ readonly: measurementTextBoxDisabler }}
                                                                            value={blouseData[blousemainIndex][text]}
                                                                            className={classes.textFieldBlouse}
                                                                            variant="outlined"
                                                                            size="small"
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment className={classes.blouseAdornment} position="start" >
                                                                                        <div style={{ color: "white" }}>
                                                                                            {text}
                                                                                        </div>
                                                                                    </InputAdornment>
                                                                                ),
                                                                                endAdornment: (
                                                                                    <InputAdornment position="end">
                                                                                        inch
                                                                                    </InputAdornment>
                                                                                ),
                                                                            }}
                                                                        />

                                                                    </div>
                                                                </div>

                                                            ))}
                                                        </div>
                                                    </div>
                                                </Box>

                                                <Box style={{ border: '2px solid', borderColor: blouseColorCode, marginTop: 30, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                                    <div>
                                                        <div style={{ backgroundColor: blouseColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                                                            <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Design Selection</Typography>
                                                        </div>
                                                        <div style={{ display: "flex", flexWrap: "wrap", marginTop: 14, marginBottom: 10 }} >
                                                            {blouseCheckBoxFields.map((text, index) => (
                                                                <div style={{ display: 'flex', alignItems: "center" }}>
                                                                    <div >

                                                                        <TextField
                                                                            style={{
                                                                                margin: 8, width: "250px", display: blouseData[blousemainIndex][text] ===
                                                                                    true ? "" : "none"
                                                                            }}
                                                                            inputProps={{ readonly: measurementTextBoxDisabler, }}

                                                                            value={blouseData[blousemainIndex][text] === true ? "Yes" : "No"}
                                                                            className={classes.textFieldBlouse}
                                                                            variant="outlined"
                                                                            size="small"
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment className={classes.blouseAdornment} position="start">
                                                                                        <div style={{ color: "white" }}>
                                                                                            {text}
                                                                                        </div>
                                                                                    </InputAdornment>
                                                                                )
                                                                            }}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Box>
                                                <Box style={{ border: '2px solid', borderColor: blouseColorCode, marginTop: 30, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                                                    <div>
                                                        <div style={{ backgroundColor: blouseColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} >
                                                            <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Designing Style</Typography>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid white" }} >

                                                            {blouseDesigningStyle.map((blousedropDownText, index) => (
                                                                <div style={{ display: 'flex', alignItems: "center", marginTop: 14 }}>
                                                                    <div>
                                                                        <TextField
                                                                            style={{ margin: 8, width: "270px", display: blouseData[blousemainIndex][blousedropDownText] === 'None' ? "none" : "" }}
                                                                            inputProps={{ readonly: measurementTextBoxDisabler, }}
                                                                            value={blouseData[blousemainIndex][blousedropDownText]}
                                                                            className={classes.textFieldBlouse}
                                                                            variant="outlined"
                                                                            size="small"
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment className={classes.blouseAdornment} position="start" style={{ width: '150px' }}>
                                                                                        <div style={{ color: "white" }}>
                                                                                            {blousedropDownText}
                                                                                        </div>
                                                                                    </InputAdornment>
                                                                                )
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Box>

                                                <Box style={{ border: '2px solid', borderColor: blouseColorCode, marginTop: 30, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                                    <div>
                                                        <div style={{ backgroundColor: blouseColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                                                            <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Patterns</Typography>
                                                        </div>
                                                        <div style={{ display: "flex", flexWrap: "wrap" }} >
                                                            {blousePatternStyle.map((text, index) => (
                                                                <div style={{ display: 'flex', alignItems: "center" }}>
                                                                    <TextField size="small" disabled={textBoxDisabler} label={text} value={blouseData[blousemainIndex][text + " name"] || ''} inputProps={{ maxLength: 0 }} style={{ margin: '5%' }} variant="outlined" InputProps={{
                                                                        readOnly: true,
                                                                        endAdornment:
                                                                            <label>
                                                                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                                                                <Button variant="contained" component="span" style={{ paddingTop: "15px", paddingBottom: "15px", paddingRight: "20px", paddingLeft: "20px", marginRight: "-15px", background: blouseColorCode, color: "white", display: addBlouseSalwarCardVisibility }} >
                                                                                    Browse
                                                                                </Button>
                                                                            </label>
                                                                    }} />
                                                                    <img style={{ width: 60, height: 60, marginRight: 10 }} onClick={() => blouseopenPops(blouseData[blousemainIndex][text + " image"] || image.image, blouseData[blousemainIndex][text + " name"] || '')} src={blouseData[blousemainIndex][text + " image"] || image.image} alt="img" >
                                                                    </img>
                                                                    <div>
                                                                        <Dialog open={blouseopen} onClose={blouseclose}>
                                                                            <DialogTitle>{blousepatterviewname}</DialogTitle>
                                                                            <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column" }}>
                                                                                <img style={{ width: 500, height: 500, marginRight: 10 }} src={blousepatternview} alt="img" >
                                                                                </img>
                                                                            </div>
                                                                        </Dialog>
                                                                    </div>
                                                                </div>

                                                            ))}
                                                        </div>
                                                    </div>
                                                </Box>

                                                <Box style={{ border: '2px solid', borderColor: blouseColorCode, marginTop: 10, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                                    <div>
                                                        <div style={{ backgroundColor: blouseColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} >
                                                            <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Remarks</Typography>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid white" }} >
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", border: "2px solid white" }}>

                                                                <TextField value={blouseData[blousemainIndex]["Remarks"]} disabled={textBoxDisabler} label={"Remarks"} style={{ marginTop: 14, marginRight: 10, marginLeft: 10, marginBottom: 10 }} inputProps={{ maxLength: 150 }} variant="outlined" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Box>

                                                <Box style={{ border: '2px solid', borderColor: blouseColorCode, marginTop: 30, marginRight: 30, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} >
                                                    <div>
                                                        <div style={{ backgroundColor: blouseColorCode, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                                                            <Typography style={{ color: "white", marginLeft: '10px', textAlign: "start", fontWeight: "bold" }} variant="subtitle2" >Dress</Typography>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid white", justifyContent: 'center' }} >
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <TextField size="small" disabled={textBoxDisabler} label={"Dress Image"} value={blouseData[blousemainIndex]["dressImageName"] || ''} style={{ marginTop: 14, marginLeft: 10, marginRight: 10, marginBottom: 10 }} inputProps={{ maxLength: 2 }} variant="outlined" />
                                                                    <img alt="blouse dress" style={{ width: 60, height: 60, marginRight: 10 }} onClick={() => { blouseopenPops2(blousemainIndex) }} src={blouseData[blousemainIndex]["dressImage"] || image.image} />
                                                                    <div>
                                                                        <Dialog open={blouseopen2} onClose={blouseclose2}>
                                                                            <DialogTitle>{blouseData[blouseimageIndex]["dressImageName"] || ''}</DialogTitle>
                                                                            <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", }} >
                                                                                <img alt="blouse dress" style={{ width: 600, height: 600 }} src={blouseData[blouseimageIndex]["dressImage"] || image.image} />
                                                                            </div>
                                                                        </Dialog>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Box>




                                                {/* Streched Blouse Image Code  Start -> */}
                                                <Box
                                                    style={{ border: '2px solid', borderColor: blouseColorCode, marginTop: 30, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} >
                                                    <div>
                                                        <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
                                                            <Typography style={{ color: "white", marginLeft: "10px", marginTop: 5, textAlign: "start", fontWeight: "bold", flex: 1, }} variant="subtitle2" >
                                                                Stitched Dress
                                                            </Typography>
                                                            {/* <Button variant="contained" color="secondary" startIcon={<AutorenewIcon />}>Reset</Button> */}
                                                        </div>
                                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                                <TextField size="small"
                                                                    disabled={textBoxDisabler}
                                                                    label={"Dress Image"}
                                                                    value={blouseData[blousemainIndex]["stichedDressImageName"] || ""}
                                                                    inputProps={{ maxLength: 2 }}
                                                                    style={{ marginTop: 13, marginLeft: 10, marginRight: 10, marginBottom: 'auto' }}
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <Button
                                                                                style={{ paddingTop: "7px", paddingBottom: "7px", paddingRight: "30px", paddingLeft: "20px", marginRight: "-13px", background: blouseColorCode, color: "white", display: mode === "view" ? "none" : "" }}
                                                                                onClick={() => { openBlouseCaptureDialog(blousemainIndex) }}
                                                                            >
                                                                                CAPTURE
                                                                            </Button>
                                                                        ),
                                                                    }}
                                                                />
                                                                <img
                                                                    alt="blouse dress"
                                                                    className={classes.imagePreview}
                                                                    onClick={() => { stichedBlouseDialog(blousemainIndex) }}
                                                                    style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, marginTop: 1 }}
                                                                    src={blouseData[blousemainIndex]["stichedDressImage"] || image.image}
                                                                />
                                                                <div>
                                                                    <Dialog open={stichedBlouseDialogOpener} onClose={() => { setStichedBlouseDialogOpener(false) }}>
                                                                        <DialogTitle>{blouseData[blouseimageIndex]["stichedDressImageName"] || ''}</DialogTitle>
                                                                        <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", }} >
                                                                            <img alt="blouse dress" style={{ width: 600, height: 600 }} src={blouseData[blouseimageIndex]["stichedDressImage"] || image.image} />
                                                                        </div>
                                                                    </Dialog>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>


                                                            <Dialog open={blouseCaptureDialog} onClose={() => { setBlouseCaptureDialog(false) }}>

                                                                <div style={{
                                                                    display: 'flex', backgroundColor: blouseColorCode, color: "white", height: '50px', justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                }}>
                                                                    <DialogTitle style={{
                                                                        flex: 1,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                    }}>
                                                                        Capture your Stiched Blouse Dress
                                                                    </DialogTitle>
                                                                    <div style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', }}>
                                                                        <Tooltip title="Switch Camera">
                                                                            <IconButton onClick={() => switchCam()} aria-label="cameraSwitch">
                                                                                <CachedIcon style={{ color: blouseColorCode }} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>

                                                                <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column" }} >
                                                                    {loading && <Typography style={{ textAlign: 'center' }} > Camera Loading... </Typography>}
                                                                    <Webcam
                                                                        videoConstraints={{ facingMode: facingMode }}
                                                                        style={{ width: "100%", height: "35%", opacity: loading ? 0 : 1 }}
                                                                        screenshotFormat="image/png"
                                                                        ref={webcamRef}
                                                                        onUserMedia={handleUserMedia} />

                                                                    <Button
                                                                        style={{ backgroundColor: blouseColorCode, color: "white", fontWeight: "bold", }}
                                                                  
                                                                        variant="contained"
                                                                        onClick={() => { storeStitchedImage(blouseData[blouseimageIndex]["blouseOrderId"], "stichedBlouseDressImage", blouseimageIndex); }}
                                                                    >
                                                                        Capture Stiched Blouse Dress
                                                                    </Button>
                                                                </div>
                                                            </Dialog>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </Card>

                                        </div>
                                    </Card>
                                </div>
                            </>
                        );
                    })
                }
            </div>
            {/* Third Block */}
            <div style={{ marginTop: "auto", backgroundColor: colorCode, display: 'flex' }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "80%", marginRight: 10, flex: 1 }}          >
                    <div style={{ display: "flex", flexDirection: "row", marginLeft: "13%", marginRight: "5%", marginTop: "auto", marginBottom: "auto" }} >
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ fontSize: "16px", width: 150, height: "35px", marginRight: "5%", }}
                            onClick={() => { handleBackBtn(); }}
                            startIcon={<KeyboardBackspaceIcon />}
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={saveBtnClick} style={{ fontSize: "16px", backgroundColor: "green", width: 150, height: "35px", marginLeft: "5%", display: mode === "edit" ? "" : "none" }} startIcon={<SaveIcon />}  >
                            Save
                        </Button>
                    </div>
                </div>
                <div
                    style={{ flexDirection: "row", justifyContent: 'center', backgroundColor: colorCode, height: "50px", paddingTop: 8, width: '250px' }}>
                    <FormControl disabled={mode === "view" ? true : false} className={classes.selectDesign} size="small" variant="outlined" >
                        <InputLabel style={{ color: 'black' }} >Order Status</InputLabel>
                        <Select style={{ color: 'black' }} label="Order Status" value={orderStatus} onChange={(e) => setorderStatus(e.target.value)} >
                            <MenuItem value="Confirmed">Confirmed</MenuItem>
                            <MenuItem value="Processing" >Processing</MenuItem>
                            <MenuItem value="Ready">Ready</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>


            <Modal
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            open={loadingModal}
        
        >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 10, backgroundColor: "white" }}>
          <CircularProgress style={{ color: Colors.ORDER_MAIN_COLOR }} />
          <Typography style={{ color: Colors.ORDER_MAIN_COLOR }}>Updating Order Details...Please Wait...</Typography>
        </div>
      </Modal>

        </div>
    )
}


