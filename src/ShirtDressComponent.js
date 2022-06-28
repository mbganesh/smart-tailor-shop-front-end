import Webcam from "react-webcam";
import { Badge, Avatar, Modal, CircularProgress, Tooltip, Button, IconButton, InputLabel, Box, styled, Checkbox, TextField, Card, Typography, Select, MenuItem, FormControl, Dialog, DialogTitle, InputAdornment } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, React, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Helpers from "./Helpers";
import useState from "react-usestateref";
import swal from "sweetalert2";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SaveIcon from "@material-ui/icons/Save";
import salwarSVG from "./images/dressLogos/salwar_nav.svg";
import blouseSVG from "./images/dressLogos/blouse_nav.svg";
import shirtSVG from "./images/dressLogos/shirt.png";
import pantSVG from "./images/dressLogos/pant.png";
import WarningIcon from '@material-ui/icons/Warning';
import CachedIcon from '@material-ui/icons/Cached';
import { Colors, Fonts } from "./constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-regular-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PrintIcon from '@material-ui/icons/Print';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { faCalendarWeek, faBoxes, faCheck, faSpinner, faShoppingBag, faCheckDouble, faFolder, faUsers, faUser, } from '@fortawesome/free-solid-svg-icons'
import SalwarDressComponent from "./SalwarDressComponent";


// Shirt Color Codes
const shirtColorCode = Colors.SHIRT_COLOR
const shirtLightColorCode = Colors.SHIRT_LIGHT_COLOR

export default function ShirtDressComponent(props) {

    console.log("Shirt  Dress Component Rendered!!!")
//    Props

const mode = props.mode
const shirtDataRef = props.shirtDataRef
const defaultImage = "https://image.freepik.com/free-vector/cardboard-box-opened-isolated-cartoon-style_1308-49807.jpg"
const shirtData = props.shirtData
const setShirtData = props.setShirtData
const shirtCounter = props.shirtCounter
const setShirtCounter = props.setShirtCounter

const shirtPrevRegNames = props.shirtPrevRegNames
const designTeamContentHider = props.designTeamContentHider
const mobNo = props.mobNo
const sweetAlertShow = props.sweetAlertShow
const costs  = props.costs
const shirtDataObj = props.shirtDataObj
const shirtIndex = props.shirtIndex

const textBoxDisabler = mode==="view"?true:false


const useStyles = useMemo(() => {
    return makeStyles((theme) => ({

      topBarText: {
        fontSize: 14, fontFamily: Fonts.LATO, height: 35,
        [theme.breakpoints.up("lg")]: {
          fontSize: 15,
        },
      },
 
    
      dressBlockTitleText: {
        fontSize: 14, fontFamily: Fonts.UBUNTU, fontWeight: "BOLD", color: "white",
        [theme.breakpoints.up("lg")]: {
          fontSize: 16,
        },
      },
      dressBlockCloseBtn: {
        backgroundColor: "#FF4848", color: "white", fontSize: 14, fontWeight: "bold", display: mode==="view"?"none":"block", padding: 0,
        "&:hover": {
          backgroundColor: "#FF4848",
        },
      },
      dressBlockIDText: {
        fontWeight: "bold", height: 0, color: "white", fontFamily: Fonts.LATO,
      },
      dressBlockSubHeadText: {
        color: "white", marginLeft: "10px", marginTop: 5, textAlign: "start", fontWeight: "bold", flex: 1, fontFamily: Fonts.LATO, fontSize: 14
      },
     
      shirtAdornment: {
        backgroundColor: shirtColorCode,
        width: "550px",
        paddingTop: "8%",
        paddingBottom: "8%",
        paddingLeft: "10px",
        borderTopLeftRadius: theme.shape.borderRadius + "px",
        borderBottomLeftRadius: theme.shape.borderRadius + "px",
      },
 
      textFieldCD: {
        fontWeight: "bold", fontSize: 14, fontFamily: Fonts.LATO,
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: shirtColorCode,
        },
      },
    
      ShirtTextField: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: shirtColorCode,
        },
        "& .MuiOutlinedInput-root": {
          paddingLeft: 0,
        },
        '& .MuiOutlinedInput-input': {
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
          },

        }
      },
 
      imagePreview: {
        width: "20%",
        height: "20%",
        "&:hover": {
          transform: "scale(2.0)",
          // transition: theme.transitions.create('transform'),
          transition: "all 0.8s ease",
        },
      },
      button: {
        margin: theme.spacing(1),
      },
      sbCardheight: {
        [theme.breakpoints.down("md")]: {
          height: "100%",
          background: "#EEEEEE",
          marginBottom: "60px",
        },
        [theme.breakpoints.up("lg")]: {
          background: "#EEEEEE",
          marginBottom: "45px",
        },
      },

     
      personNameContainer: {
        display: "flex", justifyContent: "right", flex: 1, flexWrap: "wrap"
      },

    }))
  }, []);
  // shirt Reqs
  const shirtTextFields = useMemo(() => {
    return ["Shirt Length", "Shoulder", "Sleeve Length", "Sleeve Open", "Chest Width", "Collar Length", "Pocket Down"];
  }, []);
  const shirtMeasurementList = useMemo(() => {
    return ["Shirt Length", "Shoulder", "Sleeve Length", "Sleeve Open", "Chest Width", "Collar Length", "Pocket Down"];
  }, []);

  const shirtdataFormatMeasurementList = useMemo(() => {
    return ["shirtOrderId", "Amount", "Shirt Length", "Shoulder", "Sleeve Length", "Sleeve Open", "Chest Width", "Collar Length", "Pocket Down", "dressImage"];
  }, []);


  const [shirtCaptureDialog, setShirtCaptureDialog] = useState(false);
  const [imageIndex, setImageIndex] = useState();

  const OnShirtBtnClickClose = (OrderId) => {
    setShirtCounter(shirtCounter - 1);
    setShirtData(shirtData.filter((item) => item.shirtOrderId !== OrderId));
  };

  const onShirtMeasurementValueSet = (e, text, orderID, dataHeadName, blouseDataindex) => {
    if (dataHeadName === "shirtMeasurements") {
      const result = shirtData.map((item) => {
        if (item.shirtOrderId === orderID) {
          if (item.shirtMeasurementCheck) {
            return { ...item, [text]: e.target.value };
          } else {
            return {
              ...item,
              [text]: e.target.value,
              Amount: item.Amount,
              shirtMeasurementCheck: true,
            };
          }
        }
        return item;
      });
      setShirtData(result);
    }
    else if (dataHeadName === "personNameSelected") {
      const result = shirtData.map((item) => {
        if (item.shirtOrderId === orderID) {
          if (e.target.value === "None") {
            removeData("shirt", orderID, shirtMeasurementList);
            return {
              ...item,
              [text]: e.target.value,
              personNameDisabler: false,
              personName: "",
              personNameVisibler: "",
            };
          } else {
            getMeasurementDataForPerson(orderID, e.target.value, "shirt", text);
          }
        }
        return item;
      });
      setShirtData(result);
    }
    else if (dataHeadName === "personName") {
      const result = shirtData.map((item) => {
        if (item.shirtOrderId === orderID) {
          if (e.target.value === "") {
            return { ...item, [text]: e.target.value, personNameSelectorDisabler: false, };
          } else {
            return { ...item, [text]: e.target.value, personNameSelectorDisabler: true, };
          }
        }
        return item;
      });
      setShirtData(result);
    }
    else if (dataHeadName === "extraCharges") {
      const result = shirtData.map((item) => {
        if (item.shirtOrderId === orderID) {
          var prevCharge = 0;
          if (item["Customization Charges"] !== undefined) {
            prevCharge = parseInt(item["Customization Charges"]);
          }
          if (isNaN(prevCharge)) {
            prevCharge = 0;
          }
          return {
            ...item,
            [text]: e.target.value,
            Amount: item.Amount - prevCharge + (e.target.value === "" ? 0 : parseInt(e.target.value)),
          };
        }
        return item;
      });
      setShirtData(result);
    }
  }

  const openShirtCaptureDialog = (mainIndex) => {
    setImageIndex(mainIndex)
    setShirtCaptureDialog(true);
  };

  const removeData = (dress, orderID, dataToRemove) => {
   if (dress === "shirt") {
      for (let i in shirtData) {
        if (shirtData[i]["shirtOrderId"] === orderID) {
          for (let j in dataToRemove) {
            let tempKey = dataToRemove[j];
            delete shirtData[i][tempKey];
          }
        }
      }
      setShirtData((prev) =>
        prev.map((el) =>
          el.shirtOrderId === orderID
            ? {
              ...el,
              // Amount: 300,
              Amount: costs["shirt"]["shirtItemsList"]["Basic"],
              shirtMeasurementCheck: true,
            }
            : el
        )
      );
    }
    
  };

  const getMeasurementDataForPerson = (orderID, selectedPersonValue, dress, text) => {
    var dataToSend = { user: "admin", mobNo: mobNo, personName: selectedPersonValue, };
    try {
      axios.post(Helpers().apiURL + "/getMeasurementDataForPerson", dataToSend)
        .then(function (response) {
          if (dress === "shirt") {
            const result = shirtData.map((item) => {
              if (item.shirtOrderId === orderID) {
                return {
                  ...item,
                  ...response.data.message.shirtData,
                  [text]: selectedPersonValue,
                  personName: selectedPersonValue,
                  personNameDisabler: true,
                  personNameVisibler: "none",
                };
              }
              return item;
            });
            setShirtData(result);
          }
          
        });
    } catch (err) {
      alert("server down");
    }
  };

  const storeImage = async (orderID, dressImage) => {
    let picBase64 = webcamRef.current.getScreenshot();

    picBase64 = await process_image(picBase64);

    if (dressImage === "shirtDressImage") {
      setShirtData((prev) =>
        prev.map((el) =>
          el.shirtOrderId === orderID
            ? {
              ...el,
              dressImage: picBase64,
              dressImageName: orderID + " Sample_IMG",
            }
            : el
        )
      );
      setShirtCaptureDialog(false);
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

  async function reduce_image_file_size(base64Str, MAX_WIDTH = 450, MAX_HEIGHT = 450) {
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

  function calc_image_size(image) {
    let y = 1;
    if (image.endsWith("==")) {
      y = 2;
    }
    const x_size = image.length * (3 / 4) - y;
    return Math.round(x_size / 1024);
  }

 
  const webcamRef = useRef(null);
      const classes = useStyles();

return(
    <>
    <div style={{ padding: "1%" }}>
      <Card elevation={10} className={classes.sbCardheight} style={{ backgroundColor: shirtLightColorCode }}>
        <div>
          {/* shirt Name Header and Close Card */}
          <Card style={{ backgroundColor: shirtColorCode }}>
            <div style={{ display: "flex", height: 25 }}>
              <div style={{ margin: "auto" }}>
                <Typography className={classes.dressBlockTitleText}>
                  Shirt
                </Typography>
              </div>
              <Button
                className={classes.dressBlockCloseBtn}
                onClick={() => { OnShirtBtnClickClose(shirtDataObj["shirtOrderId"]); }}
              >
                X
              </Button>
            </div>
          </Card>

          {/* Order Id shirt count and Previous textField */}
          <Card elevation={5} style={{ marginLeft: 30, marginRight: 30, marginTop: 10, display: "flex", backgroundColor: shirtLightColorCode }}>
            <div style={{ display: "flex", paddingTop: "10px", paddingLeft: "2%", backgroundColor: shirtColorCode, paddingRight: "5%", borderTopRightRadius: "50%", borderBottomRightRadius: "50%", }}                          >
              <div>
                <Typography className={classes.dressBlockIDText} >
                  ID - {shirtDataObj["shirtOrderId"]}
                </Typography>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "right", flex: 1 }} >
              <TextField
                InputProps={{ className: classes.topBarText }}
                disabled={shirtDataObj["personNameDisabler"]}
                value={shirtDataObj["personName"]}
                variant="outlined"
                size="small"
                label="Person Name"
                style={{ minWidth: "235px", margin: "5px 5px", display: shirtDataObj["personNameVisibler"] }}
                onChange={(e) => { onShirtMeasurementValueSet(e, "personName", shirtDataObj["shirtOrderId"], "personName", shirtIndex) }}
              />

              <FormControl
                size="small"
                className={classes.textFieldCD}
                variant="outlined"
                disabled={mode === "view" ? textBoxDisabler : shirtDataObj["personNameSelectorDisabler"]}
                style={{ minWidth: "235px", margin: "5px 5px" }}
              >
                <InputLabel>Previous Name List</InputLabel>

                <Select
                  style={{ height: 35 }}
                  onChange={(e) => { onShirtMeasurementValueSet(e, "personNameSelected", shirtDataObj["shirtOrderId"], "personNameSelected", shirtIndex); }}
                  value={shirtDataObj["personNameSelected"] === undefined ? "" : shirtDataObj["personNameSelected"]}
                  label="Previous Name List"
                >
                  <MenuItem value="None">None</MenuItem>
                  {(shirtPrevRegNames ===
                    undefined
                    ? []
                    : shirtPrevRegNames
                  ).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>


          </Card>

          {/* Measurents for Shirt */}
          <Card elevation={5} style={{ padding: 15, marginLeft: 30, marginRight: 30, marginTop: 10, display: "flex", flexWrap: "wrap", }} >

            {/* Measurement Textfield */}
            <Box style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}  >
              <div style={{ display: "flex", backgroundColor: shirtColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }} >
                <Typography className={classes.dressBlockSubHeadText} >
                  Measurements
                </Typography>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: shirtColorCode }}>
                {shirtTextFields.map((text, index) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <TextField
                        type="number"
                        onInput={(e) => e.target.value = e.target.value.slice(0, 5)}
                        style={{ margin: 8, width: "250px" }}
                        inputProps={{ readonly: mode ==="view"?"":false }}
                        value={shirtDataObj[text] === undefined ? "" : shirtDataObj[text]}
                        className={classes.ShirtTextField}
                        variant="outlined"
                        size="small"
                        onChange={(e) => { onShirtMeasurementValueSet(e, text, shirtDataObj["shirtOrderId"], "shirtMeasurements"); }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment className={classes.shirtAdornment} position="start" >
                              <div style={{ color: "white", fontSize: 16, fontFamily: Fonts.LATO }}>{text}</div>
                            </InputAdornment>
                          ),
                          endAdornment: (<InputAdornment position="end">inch</InputAdornment>),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Box>

            <Box style={{ marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: (mode === "edit" || mode === "add") ? "none" : "" }} >
              <div>
                <div style={{ display: "flex", backgroundColor: shirtLightColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
                  <Typography className={classes.dressBlockSubHeadText} >
                    Stiched Dress
                  </Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: shirtLightColorCode }}>
                  <div style={{ display: "flex", flexDirection: "row", }} >
                    <TextField size="small"
                      disabled={textBoxDisabler}
                      label={"Dress Image"}
                      value={shirtDataObj["stichedDressImageName"] || ""}
                      inputProps={{ maxLength: 2 }}
                      style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%" }}
                      variant="outlined"
                    />
                    <img alt="shirt dress" className={classes.imagePreview} style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, }} src={shirtDataObj["stichedDressImage"] || defaultImage} />
                  </div>
                </div>
              </div>
            </Box>

            {/* Extra Charges Card  */}
            <Box style={{ marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: designTeamContentHider }} >
              <div>
                <div style={{ display: "flex", backgroundColor: shirtColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }} >
                  <Typography className={classes.dressBlockSubHeadText} >
                    Extra Charges
                  </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid", borderColor: shirtColorCode }} >
                  <div style={{ display: "flex", flexDirection: "row" }} >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                      <TextField size="small" type="number"
                        onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
                        className={classes.BlouseTextField}
                        value={shirtDataObj["Customization Charges"] === undefined ? "" : shirtDataObj["Customization Charges"]}
                        disabled={textBoxDisabler}
                        onChange={(e) => { onShirtMeasurementValueSet(e, "Customization Charges", shirtDataObj["shirtOrderId"], "extraCharges", shirtIndex) }}
                        label="Customization Charges"
                        style={{ margin: "4%" }}
                        InputProps={{ startAdornment: (<InputAdornment position="start" style={{ marginLeft: 10 }}> ₹ </InputAdornment>), }}
                        variant="outlined"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </Box>

            {/* Remarks  Card*/}
            <Box style={{ marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}  >
              <div>
                <div style={{ display: "flex", backgroundColor: shirtColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}     >
                  <Typography className={classes.dressBlockSubHeadText}   >
                    Remarks
                  </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid ", borderColor: shirtColorCode, }}                          >
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", border: "2px solid white", }}                            >
                    <TextField
                      size="small"
                      value={shirtDataObj["Remarks"]}
                      disabled={textBoxDisabler}
                      onChange={(e) => { onShirtMeasurementValueSet(e, "Remarks", shirtDataObj["shirtOrderId"], "shirtMeasurements", shirtIndex); }}
                      label={"Remarks"}
                      style={{ margin: "2%", width: "350px" }}
                      inputProps={{ maxLength: 150 }}
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
            </Box>

            {/* Dress Image Card  */}
            <Box style={{ marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}  >
              <div>
                <div style={{ display: "flex", backgroundColor: shirtColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}  >
                  <Typography className={classes.dressBlockSubHeadText}  >
                    Dress
                  </Typography>
                  {/* <Button variant="contained" color="secondary" startIcon={<AutorenewIcon />}>Reset</Button> */}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: shirtColorCode }} >
                  <div style={{ display: "flex", flexDirection: "row" }} >
                    <TextField
                      size="small"
                      disabled={textBoxDisabler}
                      label={"Dress Image"}
                      value={shirtDataObj["dressImageName"] || ""}
                      inputProps={{ maxLength: 2 }}
                      style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%", }}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <Button
                            style={{ paddingTop: "7px", paddingBottom: "7px", paddingRight: "30px", paddingLeft: "20px", marginRight: "-13px", background: shirtColorCode, color: "white", display: mode==="view"?"none":"block" }}
                            onClick={() => { openShirtCaptureDialog(shirtIndex) }}
                          >
                            CAPTURE
                          </Button>
                        ),
                      }}
                    />
                    <img
                      alt="shirt dress"
                      className={classes.imagePreview}
                      style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, }}
                      src={shirtDataObj["dressImage"] || defaultImage}
                    />
                  </div>
                </div>
                <div>
                  <Dialog
                    open={shirtCaptureDialog}
                    onClose={() => {
                      setShirtCaptureDialog(false);
                    }}
                  >
                    <DialogTitle style={{ backgroundColor: shirtColorCode, color: "white", }}  >
                      {"Capture your Shirt Image"}
                    </DialogTitle>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column" }} >
                      <Webcam style={{ width: "100%", height: "35%" }} screenshotFormat="image/png" ref={webcamRef} />
                      <Button
                        style={{ backgroundColor: shirtColorCode, color: "white", fontWeight: "bold" }}
                        disabled={textBoxDisabler}
                        variant="contained"
                        onClick={() => { storeImage(shirtDataObj["shirtOrderId"], "shirtDressImage", shirtIndex) }}
                      >
                        Capture Shirt Image
                      </Button>
                    </div>
                  </Dialog>
                </div>
              </div>
            </Box>

          </Card>


          {/* cost Estimate Details  */}
          <Card elevation={5} style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10, display: designTeamContentHider, justifyContent: "center", backgroundColor: shirtLightColorCode }}                    >
            <div style={{ flex: 1 }}>
              <Typography style={{ display: "flex", flexDirection: "row", marginLeft: 30, fontWeight: "bold", }} variant="subtitle1"  >
                Cost Estimate
              </Typography>
            </div>
            <div style={{ justifyContent: "flex-end", alignItems: "flex-end", marginRight: 30 }} >
              <Typography style={{ fontWeight: "bold", color: "#FF4C29" }} variant="subtitle1" >
                {shirtDataObj["CostEstimateFinal"]}
              </Typography>
            </div>
          </Card>



          {/* Amount of Shirt  */}
          <Card elevation={5} style={{ display: designTeamContentHider, justifyContent: "center", backgroundColor: shirtColorCode }}  >
            <div style={{ flex: 1 }}>
              <Typography style={{ color: "white", display: "flex", flexDirection: "row", marginLeft: 30, fontWeight: "bold", }} variant="h6"  >
                Amount
              </Typography>
            </div>
            <div style={{ justifyContent: "flex-end", border: "2px solid ", borderColor: shirtLightColorCode, alignItems: "flex-end", marginRight: 0, width: "10%", backgroundColor: "white" }} >
              <Typography style={{ fontWeight: "bold", color: "green", textAlign: "center", }} variant="h5" >
                ₹ {shirtDataObj["Amount"]}
              </Typography>
            </div>
          </Card>

        </div>
      </Card>
    </div>
  </>
)
}