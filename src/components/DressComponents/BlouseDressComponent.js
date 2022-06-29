import Webcam from "react-webcam";
import { Badge, Avatar, Tooltip, Button, IconButton, InputLabel, Box, styled, Checkbox, TextField, Card, Typography, Select, MenuItem, FormControl, Dialog, DialogTitle, InputAdornment } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, React, useMemo, useCallback, memo } from "react";
import axios from "axios";
import useState from "react-usestateref";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CachedIcon from '@material-ui/icons/Cached';
import { Colors, Fonts, APIClient } from "../../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PrintIcon from '@material-ui/icons/Print';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { faCalendarWeek, faBoxes, faCheck, faSpinner, faShoppingBag, faCheckDouble, faFolder, faUsers, faUser, } from '@fortawesome/free-solid-svg-icons'


// Blouse Color Codes
const blouseColorCode = Colors.BLOUSE_COLOR;
const blouseLightColorCode = Colors.BLOUSE_LIGHT_COLOR;

function BlouseDressComponent(props) {
//    Props
const [blouseDataObj,setBlouseDataObj,blouseDataObjRef ] = useState(props.blouseDataObj)

    const mode = props.mode
    const blouseDataRef = props.blouseDataRef
    const defaultImage = "https://image.freepik.com/free-vector/cardboard-box-opened-isolated-cartoon-style_1308-49807.jpg"
    const blouseData = props.blouseData
    const setBlouseData = props.setBlouseData
    const blouseCounter = props.blouseCounter
    const setBlouseCounter = props.setBlouseCounter

    const blousePrevRegNames = props.blousePrevRegNames
    const designTeamContentHider = props.designTeamContentHider
    const blousePricesToShow = props.blousePricesToShow
    const mobNo = props.mobNo
    const sweetAlertShow = props.sweetAlertShow
    const costs  = props.costs
    const blousemainIndex = props.blousemainIndex
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

          blouseAdornment: {
            backgroundColor: blouseColorCode,
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
              borderColor: blouseColorCode,
            },
          },


          BlouseTextField: {
            "& .MuiFormLabel-root.Mui-focused": {
              color: blouseColorCode
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: blouseColorCode,
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
          selectText: {
            "&:after": {
                borderBottomColor: "darkred",
            },
            fontSize: 14, fontFamily: Fonts.LATO, fontWeight: 500,
            [theme.breakpoints.up("lg")]: {
                fontSize: 15,
            },
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

          personNameContainer: {
            display: "flex", justifyContent: "right", flex: 1, flexWrap: "wrap"
          },


        }))
    }, []);


  const bigBlouseMeasurements = useMemo(() => { return ["Arm Length", "Arm Circum"] }, []);
  const [blouseDressImageDialogOpener, setBlouseDressImageDialogOpener] = useState(false);
  const [blouseStichDressImageDialogOpener, setBlouseStichDressImageDialogOpener] = useState(false);
  const [blouseCaptureDialog, setBlouseCaptureDialog] = useState(false);
  const [costEstimateFinal, setCostEstimateFinal, costEstimateFinalRef] = useState("");
  const blouseTextFields = useMemo(() => { return ["Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Neck F", "Neck B", "Full Length", "Back Length", "Arm Hole", "Arm Length", "Arm Circum"]; }, []);
  const blouseCheckBoxFields = useMemo(() => { return ["Rope", "Zip", "Saree Falls", "Tazzles"]; }, []);
  const blouseTuckStyle = useMemo(() => { return ["Tuck Point", "Tuck Side"]; }, []);
  const blouseDesigningStyle = useMemo(() => { return ["Cut", "Neck Type", "Lining", "Piping"]; }, []);
  const blousePatternStyle = useMemo(() => { return ["Neck Pattern ID", "Sleeve Pattern ID", "Work Blouse ID",]; }, []);
  const blousecutDropDownData = useMemo(() => { return ["Normal", "Straight Cut", "Cross Cut", "Katori Cut", "Princess Cut"]; }, []);
  const blouseNeckTypeDropDownData = useMemo(() => { return ["None", "Lotus", "Square", "V Neck", "Round", "Close Neck", "Boat Neck", "Collar Neck"]; }, []);
  const blouseLiningDropDownData = useMemo(() => { return ["With Lining", "Without Lining"]; }, []);
  const blousePipingDropDownData = useMemo(() => { return ["None", "Piping-Only Neck", "Piping-Neck Sleeve", "Double Piping-Neck Sleeve", "Triple Piping-Neck Sleeve"]; }, []);
  const blouseMeasurementList = useMemo(() => { return ["Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Arm Hole", "Arm Length", "Arm Circum", "Neck F", "Neck B", "Full Length", "Back Length", "Tuck Point", "Tuck Side",]; }, []);
  const blouseObjectKeysCheckList = useMemo(() => { return ["blouseOrderId", "Amount", "Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Arm Hole", "Arm Length", "Arm Circum", "Neck F", "Neck B", "Full Length", "Back Length", "Tuck Point", "Tuck Side", "Cut", "Neck Type", "Lining", "Piping"]; }, []);
  const [imageIndex, setImageIndex] = useState();
  const [facingMode, setFacingMode] = useState("user");
  const [cameraLoading, setCameraLoading] = useState(true);
  const [open, setopen] = useState(false);
  const [salwarpatternview, setsalwarpatternview] = useState("")
  const [salwarpatterviewname, setsalwarpatterviewname] = useState("")

// On Close Blouse Card
  const OnBlouseBtnClickClose = (OrderId) => {
    setBlouseCounter(blouseCounter - 1);
    setBlouseData(blouseData.filter((item) => item.blouseOrderId !== OrderId));
  };

  const onBlouseMeasurementValueSet = (e, text, orderID, dataHeadName, blouseDataindex) => {
    if (dataHeadName === "blousemeasurements") {
      if (text !== "Remarks" && /[a-z]/i.test(e.target.value)) {
        return
      }
      setBlouseDataObj((prevState) => {
        let newItem = prevState.blouseMeasurementCheck?{...prevState, [text]: e.target.value}: { ...prevState, [text]: e.target.value,Amount: prevState.Amount,blouseMeasurementCheck: true, };
        // sync with [arent array]
        props.onBlouseDataChange(blousemainIndex, newItem);
        return newItem;
      });
    }

    if (dataHeadName === "deliverSelection") {
      setBlouseDataObj((prevState) => {
        let newItem = {...prevState, itemDeliverStatus: e.target.textContent}
        // sync with [parent array]
        props.onBlouseDataChange(blousemainIndex, newItem);

        return newItem;
      });

    }

    if (dataHeadName === "personNameSelected") {
      if(e.target.value === "None"){
        removeData("blouse", orderID, blouseMeasurementList);
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState, [text]: e.target.value,
            personNameDisabler: false,
            personName: "",
            personNameVisibler: "",}
          // sync with [parent array]
          props.onBlouseDataChange(blousemainIndex, newItem);

          return newItem;
        });
      }
      else{
        getMeasurementDataForPerson(orderID, e.target.value, "blouse", text);
      }

    }
    if (dataHeadName === "personName") {

      if (e.target.value === "") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState, [text]: e.target.value,
            personNameSelectorDisabler: false,}
          // sync with [parent array]
          props.onBlouseDataChange(blousemainIndex, newItem);

          return newItem;
        });
      }
      else{
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,   [text]: e.target.value,
            personNameSelectorDisabler: true,}
          // sync with [arent array]
          props.onBlouseDataChange(blousemainIndex, newItem);

          return newItem;
        });
      }
    }

    else if (dataHeadName === "blousedesignSelection") {
      setBlouseDataObj((prevState) => {
        let newItem = {...prevState,   [text]: e.target.checked,}
        props.onBlouseDataChange(blousemainIndex, newItem);
        return newItem;
      });

      if (text === "Rope" && e.target.checked === true) {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,   Amount: prevState.Amount + costs["blouse"]["blouseItemsUtilitiesList"]["Rope"]}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      } else if (text === "Rope" && e.target.checked === false) {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,   Amount: prevState.Amount - costs["blouse"]["blouseItemsUtilitiesList"]["Rope"]}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });
      }

      if (text === "Zip" && e.target.checked === true) {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,   Amount: prevState.Amount + costs["blouse"]["blouseItemsUtilitiesList"]["Zip"]}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });
      } else if (text === "Zip" && e.target.checked === false) {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,   Amount: prevState.Amount - costs["blouse"]["blouseItemsUtilitiesList"]["Zip"]}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });
      }

      if (text === "Saree Falls" && e.target.checked === true) {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,   Amount: prevState.Amount + costs["blouse"]["blouseItemsUtilitiesList"]["Saree Falls"]}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });
      } else if (text === "Saree Falls" && e.target.checked === false) {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,   Amount: prevState.Amount - costs["blouse"]["blouseItemsUtilitiesList"]["Saree Falls"]}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      }

      if (text === "Tazzles" && e.target.checked === true) {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,   Amount: prevState.Amount + costs["blouse"]["blouseItemsUtilitiesList"]["Tazzles"]}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      } else if (text === "Tazzles" && e.target.checked === false) {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,   Amount: prevState.Amount - costs["blouse"]["blouseItemsUtilitiesList"]["Tazzles"]}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });
      }

    }
    else if (dataHeadName === "blousedesignStyle") {
      setBlouseDataObj((prevState) => {
        let newItem = {...prevState,   [text]: e.target.value}
        props.onBlouseDataChange(blousemainIndex, newItem);
        return newItem;
      });
      let tempData = blouseDataObj



      // Cut Start

      if (text === "Cut") {

        if(blouseDataObj.cutStraight){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,  [text]: e.target.value,
              Amount:
                prevState.Amount -
                costs["blouse"]["blouseItemsCutList"]["Straight Cut"],
              cutStraight: false, cutCross: false, cutKatori: false, cutPrincess: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else if(blouseDataObj.cutCross){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,  [text]: e.target.value,
              Amount: prevState.Amount - costs["blouse"]["blouseItemsCutList"]["Cross Cut"],
              cutStraight: false, cutCross: false, cutKatori: false, cutPrincess: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else if(blouseDataObj.cutKatori){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,  [text]: e.target.value,
              Amount: prevState.Amount - costs["blouse"]["blouseItemsCutList"]["Katori Cut"],
              cutStraight: false, cutCross: false, cutKatori: false, cutPrincess: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else if(blouseDataObj.cutPrincess){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,  [text]: e.target.value,
              Amount: prevState.Amount - costs["blouse"]["blouseItemsCutList"]["Princess Cut"],
              cutStraight: false, cutCross: false, cutKatori: false, cutPrincess: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else{
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,  [text]: e.target.value,
              cutStraight: false, cutCross: false, cutKatori: false, cutPrincess: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
      }



      if (text === "Cut" && e.target.value === "Straight Cut") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,  [text]: e.target.value,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsCutList"]["Straight Cut"],
                cutStraight: true, cutCross: false, cutKatori: false, cutPrincess: false,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });
      }
      else if (text === "Cut" && e.target.value === "Cross Cut") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsCutList"]["Cross Cut"],
            cutStraight: false, cutCross: true, cutKatori: false, cutPrincess: false,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      }
      else if (text === "Cut" && e.target.value === "Katori Cut") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsCutList"]["Katori Cut"],
                cutStraight: false, cutCross: false, cutKatori: true, cutPrincess: false,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      }
      else if (text === "Cut" && e.target.value === "Princess Cut") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsCutList"]["Princess Cut"],
            cutStraight: false, cutCross: false, cutKatori: false, cutPrincess: true,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });
      }



      // Cut End


      // Neck Start
   
      if (text === "Neck Type") {
        if(blouseDataObj.boatNeckCheck){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text]: e.target.value,
              Amount: prevState.Amount - costs["blouse"]["blouseItemsNeckList"]["Boat - Neck"],
              boatNeckCheck: false, collarNeckCheck: false}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else if(blouseDataObj.collarNeckCheck){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text]: e.target.value,
              Amount: prevState.Amount - costs["blouse"]["blouseItemsNeckList"]["Collar - Neck"],
              boatNeckCheck: false, collarNeckCheck: false}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else{
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text]: e.target.value,
              boatNeckCheck: false, collarNeckCheck: false}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
      }



      if (text === "Neck Type" && e.target.value === "Boat Neck") {

        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            [text]: e.target.value,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsNeckList"]["Boat - Neck"],
            boatNeckCheck: true, collarNeckCheck: false}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      }
      else if (text === "Neck Type" && e.target.value === "Collar Neck") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsNeckList"]["Collar - Neck"],
            boatNeckCheck: false, collarNeckCheck: true}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      }

      // Neck End

      // Lining start
      let liningCheck = false;


      try {
        liningCheck =blouseDataObj["liningCheck"];
        if (liningCheck === undefined) {
          liningCheck = false;
        }
      } catch (err) {
        liningCheck = false;
      }


      if (text === "Lining" && e.target.value === "With Lining") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            [text]: e.target.value,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsLiningList"]["With Lining"],
                liningCheck: true,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });


      }
      else if (text === "Lining" && e.target.value === "Without Lining" && liningCheck) {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            [text]: e.target.value,
            Amount: prevState.Amount - costs["blouse"]["blouseItemsLiningList"]["With Lining"],
            liningCheck: false,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      } else if (text === "Without Lining") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            [text]: e.target.value,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsLiningList"]["Without Lining"],
          liningCheck: false,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });


      }

      // Lining End

      // Piping Start

      if (text === "Piping") {

        if(blouseDataObj.pipingNeckCheck){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text]: e.target.value,
              Amount: prevState.Amount - costs["blouse"]["blouseItemsPipingList"]["Piping-Only Neck"],
              pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingDoubleSleeveCheck: false, pipingTripleSleeveCheck: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else if(blouseDataObj.pipingNeckSleeveCheck){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text]: e.target.value,
              Amount: prevState.Amount - costs["blouse"]["blouseItemsPipingList"]["Piping-Neck Sleeve"],
                  pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingDoubleSleeveCheck: false, pipingTripleSleeveCheck: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else if(blouseDataObj.pipingDoubleSleeveCheck){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text]: e.target.value,
              Amount: prevState.Amount - costs["blouse"]["blouseItemsPipingList"]["Double Piping-Neck Sleeve"],
              pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingDoubleSleeveCheck: false, pipingTripleSleeveCheck: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else if(blouseDataObj.pipingTripleSleeveCheck){
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text]: e.target.value,
              Amount: prevState.Amount - costs["blouse"]["blouseItemsPipingList"]["Triple Piping-Neck Sleeve"],
                      pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingDoubleSleeveCheck: false, pipingTripleSleeveCheck: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else{
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text]: e.target.value,
              pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingDoubleSleeveCheck: false, pipingTripleSleeveCheck: false,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }




      }


      if (text === "Piping" && e.target.value === "Piping-Only Neck") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            [text]: e.target.value,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsPipingList"]["Piping-Only Neck"],
            pipingNeckCheck: true, pipingNeckSleeveCheck: false, pipingDoubleSleeveCheck: false, pipingTripleSleeveCheck: false,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });


      }
      else if (text === "Piping" && e.target.value === "Piping-Neck Sleeve") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            [text]: e.target.value,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsPipingList"]["Piping-Neck Sleeve"],
            pipingNeckCheck: false, pipingNeckSleeveCheck: true, pipingDoubleSleeveCheck: false, pipingTripleSleeveCheck: false,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      }
      else if (text === "Piping" && e.target.value === "Double Piping-Neck Sleeve") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsPipingList"]["Double Piping-Neck Sleeve"],
                pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingDoubleSleeveCheck: true, pipingTripleSleeveCheck: false,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });


      }
      else if (text === "Piping" && e.target.value === "Triple Piping-Neck Sleeve") {
        setBlouseDataObj((prevState) => {
          let newItem = {...prevState,
            Amount: prevState.Amount + costs["blouse"]["blouseItemsPipingList"]["Triple Piping-Neck Sleeve"],
            pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingDoubleSleeveCheck: false, pipingTripleSleeveCheck: true,}
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });

      }

      // Piping End

    }
    else if (dataHeadName === "extraCharges") {
      var prevCharge = 0;
          if (blouseDataObj["Customization Charges"] !== undefined) {
            prevCharge = parseInt(blouseDataObj["Customization Charges"]);
          }
          if (isNaN(prevCharge)) {
            prevCharge = 0;
          }
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text]: e.target.value,
            Amount: blouseDataObj.Amount - prevCharge + (e.target.value === "" ? 0 : parseInt(e.target.value)),}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });



    }
    else if (dataHeadName === "extraSleeveCharges") {
      var prevChargeSleeve = 0;
      if (blouseDataObj["Sleeve Pattern Charge"] !== undefined) {
        prevChargeSleeve = parseInt(blouseDataObj["Sleeve Pattern Charge"]);
      }
      if (isNaN(prevChargeSleeve)) {
        prevChargeSleeve = 0;
      }
      setBlouseDataObj((prevState) => {
        let newItem = {...prevState,
          [text]: e.target.value,
            Amount: blouseDataObj.Amount - prevChargeSleeve + (e.target.value === "" ? 0 : parseInt(e.target.value)),}
        props.onBlouseDataChange(blousemainIndex, newItem);
        return newItem;
      });


    }

    // Blouse Amount Set
    blouseCostEstimateUpdate(orderID)
    blouseValuesChecker(orderID)


  };

  const getMeasurementDataForPerson = (orderID, selectedPersonValue, dress, text) => {
    var dataToSend = { user: "admin", username: props.tokenData.userData.emailId, mobNo: mobNo, personName: selectedPersonValue, };
    try {
      axios.post(APIClient.API_BASE_URL + "/orderProcess/getMeasurementDataForPerson", dataToSend,APIClient.API_HEADERS)
        .then(function (response) {
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              ...response.data.message.blouseData,
              [text]: selectedPersonValue,
              personName: selectedPersonValue,
              personNameDisabler: true,
              personNameVisibler: "none",}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
          blouseValuesChecker(orderID)
        });
    } catch (err) {
      blouseValuesChecker(orderID)
      alert("server down");
    }
  };

  const removeData = (dress, orderID, dataToRemove) => {
    for (let j in dataToRemove) {
      let tempKey = dataToRemove[j];
      delete blouseDataObj[tempKey];
    }

    setBlouseDataObj((prevState) => {
      let newItem = {...prevState,
        Amount: costs["blouse"]["blouseItemsList"]["Basic"],
        blouseMeasurementCheck: true,}
      props.onBlouseDataChange(blousemainIndex, newItem);
      return newItem;
    });
    blouseValuesChecker(orderID)
};

const blouseValuesChecker = (orderID) => {
  let tempData = blouseDataObjRef.current
  let tempDataKeys = Object.keys(tempData)
  if (blouseObjectKeysCheckList.every(elem => tempDataKeys.includes(elem))) {
    for (let k in blouseObjectKeysCheckList) {
      if (tempData[blouseObjectKeysCheckList[k]] === "") {
        setBlouseDataObj((prevState) => {
          let newItem = prevState.blouseMeasurementCheck?{...prevState, infoCompletionStatus: false}: prevState;
          props.onBlouseDataChange(blousemainIndex, newItem);
          return newItem;
        });
        return
      }
    }
    setBlouseDataObj((prevState) => {
      let newItem = { ...prevState, infoCompletionStatus: true }
      props.onBlouseDataChange(blousemainIndex, newItem);
      return newItem;
    });

  }
  else {
    setBlouseDataObj((prevState) => {
      let newItem = {...prevState,
        infoCompletionStatus: false}
      props.onBlouseDataChange(blousemainIndex, newItem);
      return newItem;
    });

  }
}

const reset = async (e, text, orderID, dress, index) => {

  let removeBlouseData = [...blousePatternStyle, ...blouseDesigningStyle, "Neck Pattern ID image", "Neck Pattern ID name", "Neck Pattern ID price", "Sleeve Pattern ID image", "Work Blouse ID image", "Work Blouse ID name", "Work Blouse ID price", "WorkBlouseCheck", "Sleeve Pattern ID name", "SleevePatternCheck", "NeckPatternCheck", "Pocket", "Rope", "Zip", "Saree Falls", "Tazzles", "With Elastic", "Dart", "Neck Type", "Pant Style", "Piping", "Lining", "CostEstimateFinal", "NeckPatternPrevPrice", "liningCheck", "boatNeckCheck", "collarNeckCheck","cutCross", "cutKatori","cutPrincess","cutStraight","pipingDoubleSleeveCheck","pipingNeckCheck","pipingNeckSleeveCheck","pipingTripleSleeveCheck","Customization Charges", "Sleeve Pattern Charge","Customization Charges", "Sleeve Pattern Charge"];
  for (let i in blouseData) {
    if (blouseData[i]["blouseOrderId"] === orderID) {
      for (let j in removeBlouseData) {
        let tempKey = removeBlouseData[j];
        delete blouseDataObj[tempKey];
      }
    }
  }
  setBlouseDataObj((prevState) => {
    let newItem = {...prevState,
      Amount: costs["blouse"]["blouseItemsList"]["Basic"], blouseMeasurementCheck: true,}
    props.onBlouseDataChange(blousemainIndex, newItem);
    return newItem;
  });
  blouseValuesChecker(orderID)
};

const uploadImage = async (e, text, orderID, dress, index) => {
  try {
    const file = e.target.files[0];
    let fileName = file.name;
    let trimFileName = fileName.substring(0, 2);

    // Image Checker
    if (text === "Sleeve Pattern ID") {
      if (trimFileName === "sP" && text === "Sleeve Pattern ID" && fileName.includes("-") === true) {
      }
      else if (trimFileName === "nP" && text === "Sleeve Pattern ID" && (fileName.includes("-") === true || fileName.includes("-") === false)) {
        sweetAlertShow("please upload valid Sleeve Pattern image", "warning");
        return;
      }
      else if ((trimFileName === "sP" || trimFileName !== "sP") && text === "Sleeve Pattern ID") {
        sweetAlertShow("please upload valid Sleeve Pattern image", "warning");
        return;
      } else {
        sweetAlertShow("please upload valid Sleeve Pattern image", "warning");
        return;
      }
    }

    if (text === "Neck Pattern ID") {
      if (trimFileName === "nP" && text === "Neck Pattern ID" && fileName.includes("-") === true) {
        let removeBlouseData = [...blouseDesigningStyle, "Lining", "Piping", "pipingNeckCheck", "pipingNeckSleeveCheck", "pipingDoubleSleeveCheck", "pipingTripleSleeveCheck", "Customization Charges", "Sleeve Pattern Charge", "CostEstimateFinal", "Work Blouse ID image", "Work Blouse ID name", "Work Blouse ID price", "cutBoat", "cutCross", "cutKatori", "cutPrincess", "cutStraight", "Amount", "liningCheck", "WorkBlouseCheck", "blouseMeasurementCheck", "collarNeckCheck", "boatNeckCheck"];
            for (let j in removeBlouseData) {
              let tempKey = removeBlouseData[j];
              for (let k in blouseCheckBoxFields) {
                blouseDataObj[blouseCheckBoxFields[k]] = false;
              }
              delete blouseDataObj[tempKey];
            }

        setBlouseDataObj(blouseDataObj);
      }
      else if (trimFileName !== "nP" && text === "Neck Pattern ID" && (fileName.includes("-") === true || fileName.includes("-") === false)) {
        sweetAlertShow("please upload valid Neck Pattern image", "warning");
        return;
      }
      else if ((trimFileName === "nP" || trimFileName !== "nP") && text === "Neck Pattern ID") {
        sweetAlertShow("please upload valid Neck Pattern image", "warning");
        return;
      }
      else {
        sweetAlertShow("please upload valid Neck Pattern image", "warning");
        return;
      }
    }
    if (text === "Work Blouse ID") {
      if (trimFileName === "wP" && text === "Work Blouse ID" && fileName.includes("-") === true) {
        let removeBlouseData = [...blouseDesigningStyle, "Lining", "Piping", "pipingNeckCheck", "pipingNeckSleeveCheck", "pipingDoubleSleeveCheck", "pipingTripleSleeveCheck", "Customization Charges", "Sleeve Pattern Charge", "CostEstimateFinal", "Neck Pattern ID image", "Neck Pattern ID name", "Neck Pattern ID price", "NeckPatternCheck", "NeckPatternPrevPrice", "cutBoat", "cutCross", "cutKatori", "cutPrincess", "cutStraight", "Amount", "liningCheck", "WorkBlouseCheck", "blouseMeasurementCheck", "collarNeckCheck", "boatNeckCheck"];

            for (let j in removeBlouseData) {
              let tempKey = removeBlouseData[j];
              for (let k in blouseCheckBoxFields) {
                blouseDataObj[blouseCheckBoxFields[k]] = false;
              }
              delete blouseDataObj[tempKey];
            }

            setBlouseDataObj(blouseDataObj)
      }
      else if (trimFileName !== "wP" && text === "Work Blouse ID" && (fileName.includes("-") === true || fileName.includes("-") === false)) {
        sweetAlertShow("please upload valid work Blouse image", "warning");
        return;
      }
      else if ((trimFileName === "wP" || trimFileName !== "wP") && text === "Work Blouse ID") {
        sweetAlertShow("please upload valid work Blouse image", "warning");
        return;
      }
      else {
        sweetAlertShow("please upload valid work Blouse image", "warning");
        return;
      }
    }


    var base64ImageCode = await base64Convertor(file);

    // base64ImageCode = await process_image(base64ImageCode);
    var fileSize = file.size;
    if (fileSize / 1024 <= 500) {
      var nameSS = file.name;
      var price = nameSS.replace(/\.[^/.]+$/, "").split("-")[1];
      if (text === "Sleeve Pattern ID" && dress === "blouse") {
          setBlouseDataObj((prevState) => {
            let newItem = { ...prevState, [text + " image"]: base64ImageCode, [text + " name"]: nameSS.replace(/\.[^/.]+$/, ""), SleevePatternCheck: true, }
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
    
     if (dress === "blouse" && text === "Work Blouse ID") {
        let WorkBlouseCheck = false;
        try {
          WorkBlouseCheck = blouseDataObj["WorkBlouseCheck"];
          if (WorkBlouseCheck === undefined || !WorkBlouseCheck) {
            WorkBlouseCheck = false;
          }
        } catch (err) {
          WorkBlouseCheck = false;
        }


        if (WorkBlouseCheck) {
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,[text + " image"]: base64ImageCode, [text + " name"]: nameSS.replace(/\.[^/.]+$/, ""), [text + " price"]: price, Amount: parseInt(price), WorkBlouseCheck: true,}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else {
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,[text + " image"]: base64ImageCode, [text + " name"]: nameSS.replace(/\.[^/.]+$/, ""), [text + " price"]: price, Amount: parseInt(price), WorkBlouseCheck: true}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
      }
      else if(text === "Neck Pattern ID" && dress === "blouse"){
        let NeckPatternCheck = false;

        try {
          NeckPatternCheck = blouseDataObj["NeckPatternCheck"];
          if (NeckPatternCheck === undefined || !NeckPatternCheck) {
            NeckPatternCheck = false;
          }
        } catch (err) {
          NeckPatternCheck = false;
        }


        if (NeckPatternCheck) {
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text + " image"]: base64ImageCode,
              [text + " name"]: nameSS.replace(/\.[^/.]+$/, ""),
              [text + " price"]: price,
              Amount: parseInt(price),
              NeckPatternCheck: true,
              NeckPatternPrevPrice: parseInt(price),}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
        else {
          setBlouseDataObj((prevState) => {
            let newItem = {...prevState,
              [text + " image"]: base64ImageCode,
              [text + " name"]: nameSS.replace(/\.[^/.]+$/, ""),
              [text + " price"]: price,
              Amount: parseInt(price),
              NeckPatternCheck: true,
              NeckPatternPrevPrice: parseInt(price),}
            props.onBlouseDataChange(blousemainIndex, newItem);
            return newItem;
          });
        }
      }
    }
    else {
      sweetAlertShow("File size is too large. Support File Size should be below 500KB", "warning");
      return;
    }
    blouseValuesChecker(orderID)
  }
  catch (err) {
    console.log(err)
  }

};

const base64Convertor = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

  const openPops = (item, name) => {
    setopen(true);
    setsalwarpatternview(item);
    setsalwarpatterviewname(name);
  };

  const openBlouseCaptureDialog = (blousemainIndex) => {
    setImageIndex(blousemainIndex)
    setBlouseCaptureDialog(true);
  };

  const blouseDressImageDialog = (blousemainIndex) => {
    setImageIndex(blousemainIndex)
    setBlouseDressImageDialogOpener(true);
  };

  const blouseStichDressImageDialog = (blousemainIndex) => {
    setImageIndex(blousemainIndex)
    setBlouseStichDressImageDialogOpener(true);
  };

  const storeImage = async (orderID, dressImage) => {
    let picBase64 = webcamRef.current.getScreenshot();
    picBase64 = await process_image(picBase64);

    setBlouseDataObj((prevState) => {
      let newItem = {...prevState,
         dressImage: picBase64,
         dressImageName: orderID + " Sample_IMG",}
      props.onBlouseDataChange(blousemainIndex, newItem);
      return newItem;
    });
      setBlouseCaptureDialog(false);
      blouseValuesChecker(orderID)
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

  const blouseCostEstimateUpdate = (orderID) =>{
    let singleBlouseData = blouseDataObjRef.current
    var trueBlouseValues = Object.keys(singleBlouseData).filter((k) => singleBlouseData[k] === true);
    let select = (trueBlouseValues, blousePricesToShow) =>
      trueBlouseValues.reduce(
        (r, e) =>
          Object.assign(r, blousePricesToShow[e] ? { [e]: blousePricesToShow[e] } : null),
        {}
      );
    let output = select(trueBlouseValues, blousePricesToShow);
    let aoo = Object.values(output); //[{ Basic: 790}, { Pocket: 30}, {Zip: 40}, {With Elastic: 75}, {Piping-Only Neck: 160}]

    let totalObj = Object.assign({}, ...aoo); //{Basic: 790, Piping-Only Neck: 160,Pocket: 30,With Elastic: 75, Zip: 40}
    if (trueBlouseValues.includes("NeckPatternCheck") ||trueBlouseValues.includes("WorkBlouseCheck") ) {
      delete totalObj["Basic"];
    }
    if ("Customization Charges" in singleBlouseData) {
      if (singleBlouseData["Customization Charges"] !== "") {
        totalObj["Customization Charges"] =
          singleBlouseData["Customization Charges"];
      } else {
        delete totalObj["Customization Charges"];
      }
    }
    if ("Sleeve Pattern Charge" in singleBlouseData) {
      if (singleBlouseData["Sleeve Pattern Charge"] !== "") {
        totalObj["Sleeve Pattern Charge"] =
          singleBlouseData["Sleeve Pattern Charge"];
      } else {
        delete totalObj["Sleeve Pattern Charge"];
      }
    }
    if ("Neck Pattern ID price" in singleBlouseData) {
      if (singleBlouseData["Neck Pattern ID price"] !== "") {
        totalObj["Neck Pattern ID price"] =
          singleBlouseData["Neck Pattern ID price"];
      } else {
        delete totalObj["Neck Pattern ID price"];
      }
    }
    if ("Work Blouse ID price" in singleBlouseData) {
      if (singleBlouseData["Neck Pattern ID price"] !== "") {
        totalObj["Work Blouse ID price"] =
          singleBlouseData["Work Blouse ID price"];
      } else {
        delete totalObj["Work Blouse ID price"];
      }
    }

    let costEstimateText = (blousePricesToShow) =>
      Object.entries(blousePricesToShow)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
    let tempCostEstimate = costEstimateText(totalObj).replaceAll(",", " | ");

    setCostEstimateFinal(tempCostEstimate);

    setBlouseDataObj((prevState) => {
      let newItem = {...prevState,
         CostEstimateFinal: tempCostEstimate}
      props.onBlouseDataChange(blousemainIndex, newItem);
      return newItem;
    });

  }

  const printOrderData = (data) => {
    var doc = new jsPDF();
    doc.setFont(undefined, "bold").setFontSize(15).text("Dress ID - " + data["blouseOrderId"], 85, 10);
    doc.setFont(undefined, "bold").setFontSize(14).text("Measurements ", 15, 20);
    doc.autoTable({
      theme: 'grid',
      startY: 25,
      pageBreak: 'avoid',
      margin: { top: 1 },
      head: [["Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip"]],
      body: [[data["Shoulder Size"], data["Shoulder Width"], data["Breast Circum"], data["Breast Size"], data["Hip"]]],
    } ,
    );
    doc.autoTable({
      theme: 'grid',
      startY: 45,
      pageBreak: 'avoid',
      margin: { top: 1 },
      head: [["Waist", "Neck F", "Neck B", "Full Length", "Back Length"]],
      body: [[data["Waist"], data["Neck F"], data["Neck B"], data["Full Length"], data["Back Length"]]],
    });
    doc.autoTable({
      theme: 'grid',
      startY: 65,
      pageBreak: 'avoid',
      margin: { top: 1 },
      head: [["Arm Hole", "Arm Length", "Arm Circum"]],
      body: [[data["Arm Hole"], data["Arm Length"], data["Arm Circum"]]],
    });
    doc.setFont(undefined, "bold").setFontSize(14).text("Tuck Style", 15, 90);
    doc.autoTable({
      theme: 'grid',
      startY: 95,
      pageBreak: 'avoid',
      margin: { top: 1 },
      head: [["Tuck Point", "Tuck Side"]],
      body: [[data["Tuck Point"], data["Tuck Side"]]],
    });
    doc.setFont(undefined, "bold").setFontSize(14).text("Design Selection", 15, 120);
    doc.autoTable({
      theme: 'grid',
      startY: 125,
      pageBreak: 'avoid',
      margin: { top: 1 },
      head: [["Rope", "Zip", "Saree Falls", "Tazzles"]],
      body: [[data["Rope"] === true ? "Yes" : "No", data["Zip"] === true ? "Yes" : "No", data["Saree Falls"] === true ? "Yes" : "No", data["Tazzles"] === true ? "Yes" : "No"]],
    });
    doc.setFont(undefined, "bold").setFontSize(14).text("Designing Style", 15, 150);
    doc.autoTable({
      theme: 'grid',
      startY: 155,
      pageBreak: 'avoid',
      margin: { top: 1 },
      head: [["Cut", "Neck Type", "Piping", "Lining"]],
      body: [[data["Cut"], data["Neck Type"], data["Piping"], data["Lining"]]],
    });

    doc.setFont(undefined, "bold").setFontSize(14).text("Remarks", 15, 180);
    doc.autoTable({
      theme: 'grid',
      startY: 185,
      pageBreak: 'avoid',
      margin: { top: 1 },
      head: [["Remarks"]],
      body: [[data["Remarks"]]],
    });

    doc.autoPrint();
    doc.output('dataurlnewwindow');

  };

  const switchCam = () => {
    const newFcMode = facingMode === "user" ? { exact: "environment" } : "user";
    setFacingMode(newFcMode);
  };

  const Input = styled("input")({
    display: "none",
  });

  const handleUserMedia = () => setTimeout(() => setCameraLoading(false), 1_000);
  const webcamRef = useRef(null);
      const classes = useStyles();
    return (
        <>
        <div style={{ padding: "1%" }}>
          <Card elevation={10} className={classes.sbCardheight} style={{ backgroundColor: blouseLightColorCode }}>
            <div>
              <Card style={{ backgroundColor: blouseColorCode }}>
                <div style={{ display: "flex", height: 25 }}>
                  <div style={{ margin: "auto" }}>
                    <Typography className={classes.dressBlockTitleText}>
                      BLOUSE
                    </Typography>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Print Measurement" arrow>
                      <IconButton onClick={() => { printOrderData(blouseDataObj) }} aria-label="print" >
                        <PrintIcon style={{ color: "white" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={blouseDataObj["infoCompletionStatus"] ? blouseDataObj["blouseOrderId"] + " Order Filled" : blouseDataObj["blouseOrderId"] + " Order Not Filled"} aria-label="add" arrow>
                      <Avatar style={{ backgroundColor: blouseDataObj["infoCompletionStatus"] ? "#49FF00" : "yellow", width: 20, height: 15, marginRight: 10 }}>
                        <FiberManualRecordIcon style={{ color: blouseDataObj["infoCompletionStatus"] ? "#49FF00" : "yellow" }} />
                      </Avatar>
                    </Tooltip>
                    <Button className={classes.dressBlockCloseBtn} onClick={() => { OnBlouseBtnClickClose(blouseDataObj["blouseOrderId"]) }} >
                      X
                    </Button>
                  </div>
                </div>
              </Card>

              <Card elevation={5} style={{ marginLeft: 10, marginRight: 10, marginTop: 10, display: "flex", backgroundColor: blouseLightColorCode, }} >
                <div style={{ display: "flex", paddingTop: "10px", paddingLeft: "2%", backgroundColor: blouseColorCode, paddingRight: "5%", borderTopRightRadius: "50%", borderBottomRightRadius: "50%", }}>
                  <div>
                    <Typography className={classes.dressBlockIDText} >
                      ID - {blouseDataObj["blouseOrderId"]}
                    </Typography>
                  </div>
                </div>
                <div className={classes.personNameContainer}>
                  <TextField
                    InputProps={{ className: classes.topBarText }}
                    disabled={textBoxDisabler ? textBoxDisabler : blouseDataObj["personNameDisabler"]}

                    // disabled={blouseDataObj["personNameDisabler"]}
                    value={blouseDataObj["personName"]}
                    variant="outlined"
                    size="small"
                    label="Person Name"
                    style={{ minWidth: "235px", margin: "5px 5px", display: blouseDataObj["personNameVisibler"], }}
                    className={classes.BlouseTextField}
                    onChange={(e) => { onBlouseMeasurementValueSet(e, "personName", blouseDataObj["blouseOrderId"], "personName", blousemainIndex) }}
                  />

                  <FormControl
                    size="small"
                    className={classes.textFieldCD}
                    variant="outlined"
                    disabled={mode === "view" ? textBoxDisabler : blouseDataObj["personNameSelectorDisabler"]}
                    style={{ minWidth: "235px", margin: "5px 5px" }}
                    className={classes.BlouseTextField}
                  >
                    <InputLabel>Previous Name List</InputLabel>

                    <Select style={{ height: 35 }}
                      onChange={(e) => { onBlouseMeasurementValueSet(e, "personNameSelected", blouseDataObj["blouseOrderId"], "personNameSelected", blousemainIndex) }}
                      value={blouseDataObj["personNameSelected"] === undefined ? "" : blouseDataObj["personNameSelected"]}
                      label="Previous Name List"
                    >
                      <MenuItem value="None">
                      <Typography className={classes.selectText}>None</Typography>
                        </MenuItem>
                      {(blousePrevRegNames ===
                        undefined
                        ? []
                        : blousePrevRegNames
                      ).map((option) => (

                        <MenuItem key={option} value={option}>
                          <Typography className={classes.selectText}>
                          {option}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <ToggleButtonGroup size="small" value={blouseDataObj["itemDeliverStatus"]} style={{ height: 35, margin: "5px 5px" }} exclusive onChange={(e) => { onBlouseMeasurementValueSet(e, "text", blouseDataObj["blouseOrderId"], "deliverSelection", blousemainIndex); }} >
                    <ToggleButton size="small" value="Not Delivered" style={{ fontSize: 12, fontFamily: Fonts.UBUNTU }}  >
                      <FontAwesomeIcon style={{ marginRight: 10 }} icon={faSpinner} />
                      Not Delivered
                    </ToggleButton>
                    <ToggleButton size="small" value="Delivered" style={{ fontSize: 12, fontFamily: Fonts.UBUNTU, backgroundColor: blouseDataObj["itemDeliverStatus"] === "Delivered" ? Colors.BLOUSE_COLOR : "", color: blouseDataObj["itemDeliverStatus"] === "Delivered" ? "white" : "" }}>
                      <FontAwesomeIcon style={{ marginRight: 10 }} icon={faCheckDouble} />
                      Delivered
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </Card>

              <Card elevation={5} style={{ padding: 15, marginLeft: 10, marginRight: 10, marginTop: 10, display: "flex", flexWrap: "wrap", }}>
                <Box style={{ marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}>
                  <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }} >
                    <Typography className={classes.dressBlockSubHeadText}  >
                      Measurements
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: blouseColorCode, }}  >
                    {blouseTextFields.map((text, index) => (
                      <div style={{ display: "flex", alignItems: "center", }}>
                        <div>

                          <Box style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: "flex", margin: "10px" }}>
                            <Typography noWrap className={classes.blouseMeasurementHeadText}>
                              {text}
                            </Typography>

                            <TextField
                              className={classes.blouseMeasurementTextField}
                              value={blouseDataObj[text] === undefined ? "" : blouseDataObj[text]}
                              // onInput={(e) => e.target.value = e.target.value.slice(0, 20)}
                              inputProps={{ readonly: mode ==="view"?"":false }}
                              onChange={(e) => { onBlouseMeasurementValueSet(e, text, blouseDataObj["blouseOrderId"], "blousemeasurements", blousemainIndex); }}
                              style={{ width: bigBlouseMeasurements.includes(text) ? 200 : 120 }}
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

                <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}>
                  <div>
                    <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}>
                      <Typography className={classes.dressBlockSubHeadText}                            >
                        Tuck Style
                      </Typography>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: blouseColorCode, }}>
                      {blouseTuckStyle.map((text, index) => (
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                          <div>
                            <TextField
                              type="number"
                              size="small"
                              onInput={(e) => e.target.value = e.target.value.slice(0, 2)}
                              className={classes.BlouseTextField}
                              value={blouseDataObj[text]}
                              style={{ margin: "3%" }}

                              disabled={textBoxDisabler}
                              onChange={(e) => { onBlouseMeasurementValueSet(e, text, blouseDataObj["blouseOrderId"], "blousemeasurements", blousemainIndex); }}
                              label={text}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Box>

                <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                  <div>
                    <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
                      <Typography className={classes.dressBlockSubHeadText} >
                        Patterns
                      </Typography>
                      <Button
                        style={{ display:  mode ==="view"?"none":"" }}
                        size="small"
                        variant="contained"
                        color="secondary"
                        startIcon={<AutorenewIcon />}
                        onClick={(e) => { reset(e, "text", blouseDataObj["blouseOrderId"], "blouse", blousemainIndex); }}
                      >
                        Reset
                      </Button>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: blouseColorCode, }}>
                      {blousePatternStyle.map((text, index) => (
                        <div style={{ display: "flex", alignItems: "center", }}>
                          <TextField
                            size="small"
                            disabled={textBoxDisabler}
                            label={text}
                            value={blouseDataObj[text + " name"] || ""}
                            inputProps={{ maxLength: 0 }}
                            style={{ margin: "2%" }} className={classes.BlouseTextField}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                              endAdornment: (
                                <label>
                                  <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={(e) => { uploadImage(e, text, blouseDataObj["blouseOrderId"], "blouse", blousemainIndex); }}
                                  />
                                  <Button
                                    variant="contained"
                                    component="span"
                                    style={{ paddingTop: "7px", paddingBottom: "7px", paddingRight: "20px", paddingLeft: "20px", marginRight: "-13px", background: blouseColorCode, color: "white", background: blouseColorCode, color: "white", display: mode==="view"?"none":"block", }}
                                  >
                                    Browse
                                  </Button>
                                </label>
                              ),
                            }}
                          />
                          <img
                            onClick={() => openPops(blouseDataObj[text + " image"] || defaultImage, blouseDataObj[text + " name"] || '')} src={blouseDataObj[text + " image"] || defaultImage}
                            style={{ width: 60, height: 60, marginRight: 10, }}
                            className={classes.imagePreview}
                            src={blouseDataObj[text + " image"] || defaultImage}
                            alt="img"
                          ></img>

                          <div>
                            <Dialog open={open} onClose={() => { setopen(false); }} >
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


                <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}  >
                  <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }} >
                    <Typography className={classes.dressBlockSubHeadText} >
                      Design Selection
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: blouseColorCode, }}>
                    {blouseCheckBoxFields.map((text, index) => (
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <div style={{ marginTop: "4%", marginLeft: "8%", marginBottom: "4%", }}>
                          <Checkbox
                            checked={blouseDataObj[text] ? true : false}
                            disabled={textBoxDisabler}
                            onChange={(e) => { onBlouseMeasurementValueSet(e, text, blouseDataObj["blouseOrderId"], "blousedesignSelection", blousemainIndex); }}
                            inputProps={{ "aria-label": "secondary checkbox", }}
                            style={{ transform: "scale(1)", color: blouseColorCode, }}
                          />
                        </div>
                        <div >
                          <Typography style={{ marginRight: 30 }} noWrap={true}>
                            {text}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </Box>

                <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }} >
                  <div>
                    <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}>
                      <Typography className={classes.dressBlockSubHeadText}>
                        Designing Style
                      </Typography>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: blouseColorCode, }}>
                      {blouseDesigningStyle.map(
                        (blousedropDownText, index) => (
                          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                            <div style={{ margin: 8 }}>
                              <FormControl variant="outlined" size="small" style={{ minWidth: "200px" }} className={classes.BlouseTextField}>
                                <InputLabel>
                                  {blousedropDownText}
                                </InputLabel>
                                <Select
                                  disabled={textBoxDisabler}
                                  label={blousedropDownText}
                                  value={blouseDataObj[blousedropDownText] === undefined ? "" : blouseDataObj[blousedropDownText]}
                                  onChange={(e) => { onBlouseMeasurementValueSet(e, blousedropDownText, blouseDataObj["blouseOrderId"], "blousedesignStyle") }}
                                  inputProps={{ "aria-label": "secondary checkbox", }}
                                  style={{ transform: "scale(1)" }}
                                >
                                  {blousedropDownText === "Cut"
                                    ? blousecutDropDownData.map(
                                      (text, index) => (
                                        <MenuItem value={text}>
                                          {text}
                                        </MenuItem>
                                      )
                                    )
                                    : blousedropDownText === "Neck Type"
                                      ? blouseNeckTypeDropDownData.map(
                                        (text, index) => (
                                          <MenuItem value={text}>
                                            {text}
                                          </MenuItem>
                                        )
                                      )
                                      : blousedropDownText === "Lining"
                                        ? blouseLiningDropDownData.map(
                                          (text, index) => (
                                            <MenuItem value={text}>
                                              {text}
                                            </MenuItem>
                                          )
                                        )
                                        : blousePipingDropDownData.map(
                                          (text, index) => (
                                            <MenuItem value={text}>
                                              {text}
                                            </MenuItem>
                                          )
                                        )}
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </Box>


                <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: designTeamContentHider, }}>
                  <div>
                    <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}>
                      <Typography className={classes.dressBlockSubHeadText} >
                        Extra Charges
                      </Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid", borderColor: blouseColorCode, }} >

                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <TextField
                          size="small"
                          type="number"
                          onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
                          className={classes.BlouseTextField}
                          value={blouseDataObj["Customization Charges"] === undefined ? "" : blouseDataObj["Customization Charges"]}
                          disabled={textBoxDisabler}
                          onChange={(e) => { onBlouseMeasurementValueSet(e, "Customization Charges", blouseDataObj["blouseOrderId"], "extraCharges", blousemainIndex); }}
                          label="Customization Charges"
                          style={{ margin: "4%" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" style={{ marginLeft: 10 }}>
                                ₹
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <TextField
                          size="small"
                          type="number"
                          className={classes.BlouseTextField}
                          onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
                          value={blouseDataObj["Sleeve Pattern Charge"] === undefined ? "" : blouseDataObj["Sleeve Pattern Charge"]}
                          disabled={textBoxDisabler}
                          onChange={(e) => { onBlouseMeasurementValueSet(e, "Sleeve Pattern Charge", blouseDataObj["blouseOrderId"], "extraSleeveCharges", blousemainIndex); }}
                          label="Sleeve Pattern Charge"
                          style={{ margin: "4%" }}
                          inputProps={{ maxLength: 4 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" style={{ marginLeft: 10 }}>
                                ₹
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                        />
                      </div>

                    </div>
                  </div>
                </Box>


                <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}  >
                  <div>
                    <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}     >
                      <Typography className={classes.dressBlockSubHeadText}   >
                        Remarks
                      </Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", border: "2px solid ", borderColor: blouseColorCode }}>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", border: "2px solid white" }}>
                        <TextField
                          size="small"
                          value={blouseDataObj["Remarks"]}
                          disabled={textBoxDisabler}
                          onChange={(e) => { onBlouseMeasurementValueSet(e, "Remarks", blouseDataObj["blouseOrderId"], "blousemeasurements", blousemainIndex); }}
                          label={"Remarks"}
                          style={{ margin: "2%", width: "350px" }}
                          className={classes.BlouseTextField}
                          inputProps={{ maxLength: 150 }}
                          variant="outlined"
                        />
                      </div>
                    </div>
                  </div>
                </Box>


                <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}  >
                  <div>
                    <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}  >
                      <Typography className={classes.dressBlockSubHeadText}>
                        Dress
                      </Typography>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: blouseColorCode, }}   >
                      <div style={{ display: "flex", flexDirection: "row" }} >
                        <TextField
                          size="small"
                          disabled={textBoxDisabler}
                          label={"Dress Image"}
                          value={blouseDataObj["dressImageName"] || ""}
                          inputProps={{ maxLength: 2 }}
                          style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%", }}
                          className={classes.BlouseTextField}
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <Button
                                style={{ paddingTop: "7px", paddingBottom: "7px", paddingRight: "30px", paddingLeft: "20px", marginRight: "-13px", background: blouseColorCode, color: "white", display: mode==="view"?"none":"block", }}
                                onClick={() => { openBlouseCaptureDialog(blousemainIndex) }}
                              >
                                CAPTURE
                              </Button>
                            ),
                          }}
                        />
                        <img
                          onClick={() => { blouseDressImageDialog(blousemainIndex) }}
                          alt="blouse dress"
                          className={classes.imagePreview}
                          style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, }}
                          src={blouseDataObj["dressImage"] || defaultImage}
                        />
                        <div>
                          <Dialog open={blouseDressImageDialogOpener} onClose={() => { setBlouseDressImageDialogOpener(false) }}>
                            <DialogTitle>{blouseData[imageIndex] === undefined ? 'No Image' : blouseData[imageIndex]["dressImageName"]}</DialogTitle>
                            <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", }} >
                              <img alt="blouse dress" style={{ width: 600, height: 600 }} src={blouseData[imageIndex] === undefined ? defaultImage : blouseData[imageIndex]["dressImage"]} />
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
                            Capture your Blouse Image
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
                          {cameraLoading && <Typography style={{ textAlign: 'center' }} > Camera Loading... </Typography>}
                          <Webcam
                            videoConstraints={{ facingMode: facingMode }}
                            style={{ width: "100%", height: "35%", opacity: cameraLoading ? 0 : 1 }}
                            screenshotFormat="image/png"
                            ref={webcamRef}
                            onUserMedia={handleUserMedia} />

                          <Button
                            style={{ backgroundColor: blouseColorCode, color: "white", fontWeight: "bold", }}
                            disabled={textBoxDisabler}
                            variant="contained"
                            onClick={() => { storeImage(blouseData[imageIndex]["blouseOrderId"], "blouseDressImage", imageIndex); }}
                          >
                            Capture Blouse Image
                          </Button>
                        </div>
                      </Dialog>
                    </div>
                  </div>
                </Box>

                <Box
                  style={{ marginTop: 10, marginRight: 30, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: (mode === "edit" || mode === "add") ? "none" : "" }} >
                  <div>
                    <div style={{ display: "flex", backgroundColor: blouseColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
                      <Typography className={classes.dressBlockSubHeadText} >
                        Stiched Dress
                      </Typography>

                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: blouseColorCode }}>
                      <div style={{ display: "flex", flexDirection: "row", }} >
                        <TextField size="small"
                          disabled={textBoxDisabler}
                          label={"Dress Image"}
                          value={blouseDataObj["stichedDressImageName"] || ""}
                          inputProps={{ maxLength: 2 }}
                          style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%" }}
                          className={classes.BlouseTextField}
                          variant="outlined"
                        />
                        <img
                        onClick={() => { blouseStichDressImageDialog(blousemainIndex) }}
                        alt="blouse dress"
                        className={classes.imagePreview}
                        style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, }}
                        src={blouseDataObj["stichedDressImage"] || defaultImage} />

                        <div>
                          <Dialog open={blouseStichDressImageDialogOpener} onClose={() => { setBlouseStichDressImageDialogOpener(false) }}>
                            <DialogTitle>{blouseData[imageIndex] === undefined ? 'No Image' : blouseData[imageIndex]["stichedDressImageName"]}</DialogTitle>
                            <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", }} >
                              <img alt="stich blouse dress" style={{ width: 600, height: 600 }} src={blouseData[imageIndex] === undefined ? defaultImage : blouseData[imageIndex]["stichedDressImage"]} />
                            </div>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Card>

              <Card elevation={5} style={{ marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10, display: designTeamContentHider, justifyContent: "center", backgroundColor: blouseLightColorCode, }}                    >
                <div style={{ flex: 1 }}>
                  <Typography style={{ display: "flex", flexDirection: "row", marginLeft: 30, fontWeight: "bold", }} variant="subtitle1"  >
                    Cost Estimate
                  </Typography>
                </div>
                <div style={{ justifyContent: "flex-end", alignItems: "flex-end", marginRight: 30 }} >
                  <Typography style={{ color: Colors.BLOUSE_COLOR }} variant="subtitle2" >
                    {blouseDataObj["CostEstimateFinal"]}
                  </Typography>
                </div>
              </Card>

              <Card elevation={5} style={{ display: designTeamContentHider, backgroundColor: blouseColorCode }}  >
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ flex: 1 }}>
                    <Typography style={{ fontWeight: "bold", color: "white", paddingLeft: 10 }} variant="h6"  >
                      Amount
                    </Typography>
                  </div>
                  <div style={{ justifyContent: "flex-end", border: "2px solid ", borderColor: blouseColorCode, alignItems: "flex-end", backgroundColor: "white" }} >
                    <Typography style={{ fontWeight: "bold", color: "green", textAlign: "right", width: 200, marginRight: 10 }} variant="h5" >
                      ₹ {blouseDataObj["Amount"]}
                    </Typography>
                  </div>
                </div>
              </Card>

            </div>
          </Card>
        </div>
      </>
    )
}
export default memo(BlouseDressComponent)