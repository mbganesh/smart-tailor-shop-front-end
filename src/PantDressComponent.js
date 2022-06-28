import Webcam from "react-webcam";
import { Badge, Avatar, Modal, CircularProgress, Tooltip, Button, IconButton, InputLabel, Box, styled, Checkbox, TextField, Card, Typography, Select, MenuItem, FormControl, Dialog, DialogTitle, InputAdornment } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, React, useMemo, useCallback } from "react";
import axios from "axios";
import Helpers from "./Helpers";
import useState from "react-usestateref";
import swal from "sweetalert2";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { Colors, Fonts } from "./constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { faCalendarWeek, faBoxes, faCheck, faSpinner, faShoppingBag, faCheckDouble, faFolder, faUsers, faUser, } from '@fortawesome/free-solid-svg-icons'


// Pant Color Codes
const pantColorCode = Colors.PANT_COLOR
const pantLightColorCode = Colors.PANT_LIGHT_COLOR

export default function PantDressComponent(props) {

    console.log("Pant  Dress Component Rendered!!!")
//    Props
const mode = props.mode
const pantDataRef = props.pantDataRef
const defaultImage = "https://image.freepik.com/free-vector/cardboard-box-opened-isolated-cartoon-style_1308-49807.jpg"
const pantData = props.pantData
const setPantData = props.setPantData
const pantCounter = props.pantCounter
const setPantCounter = props.setPantCounter

const pantPrevRegNames = props.pantPrevRegNames
const designTeamContentHider = props.designTeamContentHider
const mobNo = props.mobNo
const sweetAlertShow = props.sweetAlertShow
const costs  = props.costs
const pantDataObj = props.pantDataObj
const pantIndex = props.pantIndex

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
    
      pantAdornment: {
        backgroundColor: pantColorCode,
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
          borderColor: pantColorCode,
        },
      },
   
      PantTextField: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: pantColorCode,
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
      badgeBtn: {
        margin: theme.spacing.unit * 2,
        width: "100%"
      }

    }))
  }, []);

  // pant Reqs
  const pantTextFields = useMemo(() => {
    return ["Pant Length", "Hip", "Inseam", "Seat", "Thigh Loose", "Knee", "Front Raise", "Back Raise", "Leg Opening"];
  }, []);
  const pantMeasurementList = useMemo(() => {
    return ["Pant Length", "Hip", "Inseam", "Seat", "Thigh Loose", "Knee", "Front Raise", "Back Raise", "Leg Opening"];
  }, []);

  const pantdataFormatMeasurementList = useMemo(() => {
    return ["pantOrderId", "Amount", "Pant Length", "Hip", "Inseam", "Seat", "Thigh Loose", "Knee", "Front Raise", "Back Raise", "Leg Opening", "dressImage"];
  }, []);

// States 
  const [pantCaptureDialog, setPantCaptureDialog] = useState(false);
  const [imageIndex, setImageIndex] = useState();


//   Functions
const OnPantBtnClickClose = (OrderId) => {
    setPantCounter(pantCounter - 1);
    setPantData(pantData.filter((item) => item.pantOrderId !== OrderId));
  };

  const getMeasurementDataForPerson = (orderID, selectedPersonValue, dress, text) => {
    var dataToSend = { user: "admin", mobNo: mobNo, personName: selectedPersonValue, };
    try {
      axios.post(Helpers().apiURL + "/getMeasurementDataForPerson", dataToSend)
        .then(function (response) {
         if (dress === "pant") {
            const result = pantData.map((item) => {
              if (item.pantOrderId === orderID) {
                return {
                  ...item,
                  ...response.data.message.pantData,
                  [text]: selectedPersonValue,
                  personName: selectedPersonValue,
                  personNameDisabler: true,
                  personNameVisibler: "none",
                };
              }
              return item;
            });
            setPantData(result);
          }
         
        });
    } catch (err) {
      alert("server down");
    }
  };

  const onPantMeasurementValueSet = (e, text, orderID, dataHeadName, pantDataindex) => {
    if (dataHeadName === "pantMeasurements") {
      const result = pantData.map((item) => {
        if (item.pantOrderId === orderID) {
          if (item.pantMeasurementCheck) {
            return { ...item, [text]: e.target.value };
          } else {
            return {
              ...item,
              [text]: e.target.value,
              Amount: item.Amount,
              pantMeasurementCheck: true,
            };
          }
        }
        return item;
      });
      setPantData(result);
    }
    else if (dataHeadName === "personNameSelected") {
      const result = pantData.map((item) => {
        if (item.pantOrderId === orderID) {
          if (e.target.value === "None") {
            removeData("pant", orderID, pantMeasurementList);
            return {
              ...item,
              [text]: e.target.value,
              personNameDisabler: false,
              personName: "",
              personNameVisibler: "",
            };
          } else {
            getMeasurementDataForPerson(orderID, e.target.value, "pant", text);
          }
        }
        return item;
      });
      setPantData(result);
    }
    else if (dataHeadName === "personName") {
      const result = pantData.map((item) => {
        if (item.pantOrderId === orderID) {
          if (e.target.value === "") {
            return { ...item, [text]: e.target.value, personNameSelectorDisabler: false, };
          } else {
            return { ...item, [text]: e.target.value, personNameSelectorDisabler: true, };
          }
        }
        return item;
      });
      setPantData(result);
    }
    else if (dataHeadName === "extraCharges") {
      const result = pantData.map((item) => {
        if (item.pantOrderId === orderID) {
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
      setPantData(result);
    }
  }

 

  const openPantCaptureDialog = (mainIndex) => {
    setImageIndex(mainIndex)
    setPantCaptureDialog(true);
  };

  const storeImage = async (orderID, dressImage) => {
    let picBase64 = webcamRef.current.getScreenshot();

    picBase64 = await process_image(picBase64);
     if (dressImage === "pantDressImage") {
      setPantData((prev) =>
        prev.map((el) =>
          el.pantOrderId === orderID
            ? {
              ...el,
              dressImage: picBase64,
              dressImageName: orderID + " Sample_IMG",
            }
            : el
        )
      );
      setPantCaptureDialog(false);
    }
   
  };

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

  const removeData = (dress, orderID, dataToRemove) => {
     if (dress === "pant") {
      for (let i in pantData) {
        if (pantData[i]["pantOrderId"] === orderID) {
          for (let j in dataToRemove) {
            let tempKey = dataToRemove[j];
            delete pantData[i][tempKey];
          }
        }
      }
      setPantData((prev) =>
        prev.map((el) =>
          el.pantOrderId === orderID
            ? {
              ...el,
              // Amount: 500,
              Amount: costs["pant"]["pantItemsList"]["Basic"],
              pantMeasurementCheck: true,
            }
            : el
        )
      );
    }
    
  };


  const webcamRef = useRef(null);
  const classes = useStyles();

    return(
        <>
        <div style={{ padding: "1%" }}>
          <Card elevation={10} className={classes.sbCardheight} style={{ backgroundColor: pantLightColorCode }}>
            <div>
              {/* Pant Name Header and Close Card */}
              <Card style={{ backgroundColor: pantColorCode }}>
                <div style={{ display: "flex", height: 25 }}>
                  <div style={{ margin: "auto" }}>
                    <Typography className={classes.dressBlockTitleText}>
                      Pant
                    </Typography>
                  </div>
                  <Button
                    className={classes.dressBlockCloseBtn}
                    onClick={() => { OnPantBtnClickClose(pantDataObj["pantOrderId"]) }}
                  >
                    X
                  </Button>
                </div>
              </Card>

              {/* Order Id pant count and Previous textField */}
              <Card elevation={5} style={{ marginLeft: 30, marginRight: 30, marginTop: 10, display: "flex", backgroundColor: pantLightColorCode }}>
                <div style={{ display: "flex", paddingTop: "10px", paddingLeft: "2%", backgroundColor: pantColorCode, paddingRight: "5%", borderTopRightRadius: "50%", borderBottomRightRadius: "50%" }}                          >
                  <div>
                    <Typography className={classes.dressBlockIDText}>
                      ID - {pantDataObj["pantOrderId"]}
                    </Typography>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "right", flex: 1 }}>
                  <TextField
                    InputProps={{ className: classes.topBarText }}
                    disabled={pantDataObj["personNameDisabler"]}
                    value={pantDataObj["personName"]}
                    variant="outlined"
                    size="small"
                    label="Person Name"
                    style={{ minWidth: "235px", margin: "5px 5px", display: pantDataObj["personNameVisibler"] }}
                    onChange={(e) => { onPantMeasurementValueSet(e, "personName", pantDataObj["pantOrderId"], "personName", pantIndex) }}
                  />

                  <FormControl
                    size="small"
                    className={classes.textFieldCD}
                    variant="outlined"
                    disabled={mode === "view" ? textBoxDisabler : pantDataObj["personNameSelectorDisabler"]}
                    style={{ minWidth: "235px", margin: "5px 5px" }}
                  >
                    <InputLabel>Previous Name List</InputLabel>
                    <Select
                      style={{ height: 35 }}
                      onChange={(e) => { onPantMeasurementValueSet(e, "personNameSelected", pantDataObj["pantOrderId"], "personNameSelected", pantIndex) }}
                      value={pantDataObj["personNameSelected"] === undefined ? "" : pantDataObj["personNameSelected"]}
                      label="Previous Name List"
                    >
                      <MenuItem value="None">None</MenuItem>
                      {(pantPrevRegNames === undefined ? []
                        : pantPrevRegNames
                      ).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Card>

              {/* Measurents for Pant */}
              <Card elevation={5} style={{ padding: 15, marginLeft: 30, marginRight: 30, marginTop: 10, display: "flex", flexWrap: "wrap" }} >
                {/* Measurement Textfield */}
                <Box style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}                          >
                  <div style={{ display: "flex", backgroundColor: pantColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}                            >
                    <Typography className={classes.dressBlockSubHeadText}  >
                      Measurements
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: pantColorCode }}>
                    {pantTextFields.map((text, index) => (
                      <div style={{ display: "flex", alignItems: "center", }}>
                        <div>
                          <TextField
                            type="number"
                            onInput={(e) => e.target.value = e.target.value.slice(0, 5)}
                            style={{ margin: 8, width: "250px" }}
                            inputProps={{ readonly: mode ==="view"?"":false }}
                            value={pantDataObj[text] === undefined ? "" : pantDataObj[text]}
                            className={classes.PantTextField}
                            variant="outlined"
                            size="small"
                            onChange={(e) => { onPantMeasurementValueSet(e, text, pantDataObj["pantOrderId"], "pantMeasurements") }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment className={classes.pantAdornment} position="start">
                                  <div style={{ color: "white", fontSize: 16, fontFamily: Fonts.LATO }}>
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
                </Box>

                <Box
                  style={{ marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: (mode === "edit" || mode === "add") ? "none" : "" }} >
                  <div>
                    <div style={{ display: "flex", backgroundColor: pantLightColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
                      <Typography className={classes.dressBlockSubHeadText} >
                        Stiched Dress
                      </Typography>

                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: pantLightColorCode }}>
                      <div style={{ display: "flex", flexDirection: "row", }} >
                        <TextField size="small"
                          disabled={textBoxDisabler}
                          label={"Dress Image"}
                          value={pantDataObj["stichedDressImageName"] || ""}
                          inputProps={{ maxLength: 2 }}
                          style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%" }}
                          variant="outlined"
                        />
                        <img alt="pant dress" className={classes.imagePreview} style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, }} src={pantDataObj["stichedDressImage"] || defaultImage} />
                      </div>
                    </div>
                  </div>
                </Box>

                {/* Extra Charges Card  */}
                <Box
                  style={{ marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: designTeamContentHider, }}
                >
                  <div>
                    <div style={{ display: "flex", backgroundColor: pantColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}                          >
                      <Typography
                        className={classes.dressBlockSubHeadText}
                      >
                        Extra Charges
                      </Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid", borderColor: pantColorCode }}  >
                      <div style={{ display: "flex", flexDirection: "row", }}                            >
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}  >
                          <TextField
                            size="small"
                            type="number"
                            onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
                            className={classes.PantTextField}
                            value={pantDataObj["Customization Charges"] === undefined ? "" : pantDataObj["Customization Charges"]}
                            disabled={textBoxDisabler}
                            onChange={(e) => { onPantMeasurementValueSet(e, "Customization Charges", pantDataObj["pantOrderId"], "extraCharges", pantIndex) }}
                            label="Customization Charges"
                            style={{ margin: "4%" }}
                            InputProps={{ startAdornment: (<InputAdornment position="start" style={{ marginLeft: 10 }}>   ₹  </InputAdornment>), }}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>

                {/* Remarks  Card*/}
                <Box style={{ marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}  >
                  <div>
                    <div style={{ display: "flex", backgroundColor: pantColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}     >
                      <Typography className={classes.dressBlockSubHeadText}  >
                        Remarks
                      </Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid ", borderColor: pantColorCode }} >
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", border: "2px solid white" }}>
                        <TextField
                          size="small"
                          value={pantDataObj["Remarks"]}
                          disabled={textBoxDisabler}
                          onChange={(e) => { onPantMeasurementValueSet(e, "Remarks", pantDataObj["pantOrderId"], "pantmeasurements", pantIndex) }}
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
                <Box style={{ marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}  >
                  <div>
                    <div style={{ display: "flex", backgroundColor: pantColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}  >
                      <Typography
                        className={classes.dressBlockSubHeadText}
                      >
                        Dress
                      </Typography>
                      {/* <Button variant="contained" color="secondary" startIcon={<AutorenewIcon />}>Reset</Button> */}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: pantColorCode }}                          >
                      <div style={{ display: "flex", flexDirection: "row" }} >
                        <TextField size="small" disabled={textBoxDisabler} label={"Dress Image"} value={pantDataObj["dressImageName"] || ""}
                          inputProps={{ maxLength: 2 }}
                          style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%", }}
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <Button style={{ paddingTop: "7px", paddingBottom: "7px", paddingRight: "30px", paddingLeft: "20px", marginRight: "-13px", background: pantColorCode, color: "white", display: mode==="view"?"none":"block" }}
                                onClick={() => { openPantCaptureDialog(pantIndex) }}
                              >
                                CAPTURE
                              </Button>
                            ),
                          }}
                        />
                        <img
                          alt="pant dress"
                          className={classes.imagePreview}
                          style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, }}
                          src={pantDataObj["dressImage"] || defaultImage}
                        />
                      </div>
                    </div>
                    <div>
                      <Dialog open={pantCaptureDialog} onClose={() => { setPantCaptureDialog(false) }}>
                        <DialogTitle style={{ backgroundColor: pantColorCode, color: "white" }} >
                          {"Capture your Pant Image"}
                        </DialogTitle>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column" }} >
                          <Webcam style={{ width: "100%", height: "35%" }} screenshotFormat="image/png" ref={webcamRef} />
                          <Button
                            style={{ backgroundColor: pantColorCode, color: "white", fontWeight: "bold" }}
                            disabled={textBoxDisabler}
                            variant="contained"
                            onClick={() => { storeImage(pantDataObj["pantOrderId"], "pantDressImage", pantIndex) }}
                          >
                            Capture Pant Image
                          </Button>
                        </div>
                      </Dialog>
                    </div>
                  </div>
                </Box>
              </Card>

              {/* cost Estimate Details  */}
              <Card elevation={5} style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10, display: designTeamContentHider, justifyContent: "center", backgroundColor: pantLightColorCode }}>
                <div style={{ flex: 1 }}>
                  <Typography style={{ display: "flex", flexDirection: "row", marginLeft: 30, fontWeight: "bold", color: "black" }} variant="subtitle1"  >
                    Cost Estimate
                  </Typography>
                </div>
                <div style={{ justifyContent: "flex-end", alignItems: "flex-end", marginRight: 30 }} >
                  <Typography style={{ fontWeight: "bold", color: "#FF4C29" }} variant="subtitle1" >
                    {pantDataObj["CostEstimateFinal"]}
                  </Typography>
                </div>
              </Card>

              {/* Amount of Pant  */}
              <Card elevation={5} style={{ display: designTeamContentHider, justifyContent: "center", backgroundColor: pantColorCode }} >
                <div style={{ flex: 1 }}>
                  <Typography style={{ color: "white", display: "flex", flexDirection: "row", marginLeft: 30, fontWeight: "bold" }} variant="h6" >
                    Amount
                  </Typography>
                </div>
                <div style={{ justifyContent: "flex-end", border: "2px solid ", borderColor: pantLightColorCode, alignItems: "flex-end", marginRight: 0, width: "10%", backgroundColor: "white" }} >
                  <Typography style={{ fontWeight: "bold", color: "green", textAlign: "center" }} variant="h5">
                    ₹ {pantDataObj["Amount"]}
                  </Typography>
                </div>
              </Card>

            </div>
          </Card>
        </div>
      </>
    )
}