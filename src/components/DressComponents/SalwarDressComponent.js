import Webcam from "react-webcam";
import { Avatar, Tooltip, Button, IconButton, InputLabel, Box, styled, Checkbox, TextField, Card, Typography, Select, MenuItem, FormControl, Dialog, DialogTitle, InputAdornment } from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, React, useMemo, useCallback, memo, useContext } from "react";
import axios from "axios";
import useState from "react-usestateref";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CachedIcon from '@mui/icons-material/Cached';
import { Colors, Fonts, APIClient } from "../../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PrintIcon from '@mui/icons-material/Print';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { faCalendarWeek, faBoxes, faCheck, faSpinner, faShoppingBag, faCheckDouble, faFolder, faUsers, faUser, } from '@fortawesome/free-solid-svg-icons'

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Salwar Color Codes
const salwarColorCode = Colors.SALWAR_COLOR;
const salwarLightColorCode = Colors.SALWAR_LIGHT_COLOR;

function SalwarDressComponent(props) {
  const mode = props.mode
  const salwarDataRef = props.salwarDataRef
  const [salwarDataObj, setSalwarDataObj, salwarDataObjRef] = useState(props.salwarDataObj)

  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const useStyles = useMemo(() => {
    return makeStyles((theme) => ({
      topBarText: {
        fontSize: 14, fontFamily: Fonts.LATO, height: 35,
        [theme.breakpoints.up("lg")]: {
          fontSize: 15,
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
      dressBlockTitleText: {
        fontSize: 14, fontFamily: Fonts.UBUNTU, fontWeight: "BOLD", color: "white",
        [theme.breakpoints.up("lg")]: {
          fontSize: 16,
        },
      },
      dressBlockCloseBtn: {
        backgroundColor: "#FF4848", color: "white", fontSize: 14, fontWeight: "bold", display: mode === "view" ? "none" : "block", padding: 0,
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
      adornment: {
        backgroundColor: salwarColorCode,
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
          borderColor: salwarColorCode,
        },
      },
      textField: {
        "& .MuiFormLabel-root.Mui-focused": {
          color: salwarColorCode
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: salwarColorCode,
        },
        "& .MuiOutlinedInput-root": {
          paddingLeft: 0,
        },
        '& .MuiOutlinedInput-input': {
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
          }

        }
      },


      imagePreview: {
        width: "20%",
        height: "20%",
        "&:hover": {
          transform: "scale(2.0)",
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

      salwarMeasurementHeadText: {
        width: 130, backgroundColor: salwarColorCode, color: "white", alignItems: "center", display: "flex", paddingLeft: "3%", borderRadius: 0, fontSize: 14, fontFamily: Fonts.LATO,
        [theme.breakpoints.up("xl")]: {
          fontSize: 16,
        },
      },
      personNameContainer: {
        display: "flex", justifyContent: "right", flex: 1, flexWrap: "wrap"
      },
    }))
  }, []);

  const bigSalwarMeasurements = useMemo(() => { return ["Arm Length", "Arm Circum", "Ankle", "Pant Length"] }, []);
  // salwar Reqs
  const salwarTextFields = useMemo(() => { return ["Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Neck F", "Neck B", "Full Length", "Side Slit", "Arm Hole", "Arm Length", "Arm Circum", "Ankle", "Pant Length"]; }, []);
  const salwarTuckStyle = useMemo(() => { return ["Tuck Point", "Tuck Side"]; }, []);
  const salwarCheckBoxFields = useMemo(() => { return ["Pocket", "Rope", "Zip", "With Elastic"]; }, []);
  const salwarDesigningStyle = useMemo(() => { return ["Dart", "Neck Type", "Pant Style", "Piping", "Lining"]; }, []);

  const salwarPatternStyle = useMemo(() => { return ["Neck Pattern ID", "Sleeve Pattern ID"]; }, []);
  const salwarLiningDropDownData = useMemo(() => { return ["With Lining", "Without Lining"]; }, []);
  const salwarPipingDropDownData = useMemo(() => { return ["None", "Piping-Only Neck", "Piping-Neck Sleeve", "Side Slit"]; }, []);
  const salwarDartDropDownData = useMemo(() => { return ["None", "Only Front", "Only Back", "Both"]; }, []);

  const salwarNeckTypeDropDownData = useMemo(() => { return ["None", "Lotus", "Square", "V Neck", "Round", "Close Neck", "Boat Neck", "Collar Neck"]; }, []);
  const salwarMeasurementList = useMemo(() => { return ["Shoulder Size", "Shoulder Width", "Breast Circum", "Breast Size", "Hip", "Waist", "Arm Hole", "Arm Length", "Arm Circum", "Neck F", "Neck B", "Full Length", "Ankle", "Pant Length", "Side Slit", "Tuck Point", "Tuck Side"]; }, []);
  const salwarObjectKeysCheckList = useMemo(() => { return ['salwarOrderId', 'infoCompletionStatus', 'Amount', 'salwarMeasurementCheck', 'itemDeliverStatus', 'Shoulder Size', 'Shoulder Width', 'Breast Circum', 'Breast Size', 'Hip', 'Waist', 'Neck F', 'Neck B', 'Full Length', 'Side Slit', 'Arm Hole', 'Arm Length', 'Arm Circum', 'Ankle', 'Pant Length', 'personName', 'Tuck Point', 'CostEstimateFinal', 'Tuck Side', 'Dart', 'Neck Type', 'Pant Style', 'Piping', 'pipingNeckCheck', 'pipingNeckSleeveCheck', 'pipingSideSlitCheck', 'Lining']; }, []);


  const pantStyleDropDownData = useMemo(() => { return ["None", "Normal", "S.Patiyala", "Parallel with Rope", "Parallel with Elastic", "Parallel with Palazzo", "Pencil", "Ankle", "Gathering Pant", "Parallel Elastic|Belt"]; }, []);
  const [costEstimateFinal, setCostEstimateFinal, costEstimateFinalRef] = useState("");
  const [open, setopen] = useState(false);
  const [imageIndex, setImageIndex] = useState();

  const [salwarCaptureDialog, setSalwarCaptureDialog] = useState(false);
  const [salwarDressImageDialogOpener, setSalwarDressImageDialogOpener] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [cameraLoading, setCameraLoading] = useState(true);

  const defaultImage = "https://image.freepik.com/free-vector/cardboard-box-opened-isolated-cartoon-style_1308-49807.jpg"

  const [salwarStichDressImageDialogOpener, setSalwarStichDressImageDialogOpener] = useState(false);

  const [salwarpatternview, setsalwarpatternview] = useState("")
  const [salwarpatterviewname, setsalwarpatterviewname] = useState("")
  const Input = styled("input")({ display: "none", });

  const textBoxDisabler = mode === "view" ? true : false

  // Props
  const mainIndex = props.mainIndex
  const costs = props.costs
  const salwarData = props.salwarData
  const setSalwarData = props.setSalwarData
  const salwarCounter = props.salwarCounter
  const setSalwarCounter = props.setSalwarCounter
  const salwarPrevRegNames = props.salwarPrevRegNames
  const designTeamContentHider = props.designTeamContentHider
  const pricesToShow = props.pricesToShow
  const mobNo = props.mobNo
  const sweetAlertShow = props.sweetAlertShow


  const setSalwarDataObjState = (dataField, value) => {

    if (dataField === "designSelection") {
      setSalwarDataObj((prevState) => {
        let newItem = { ...prevState, Amount: prevState.Amount + value }
        // sync with [parent array]
        props.onSalwarDataChange(mainIndex, newItem);
        return newItem;
      });
    }
    else {
      setSalwarDataObj((prevState) => {
        let newItem = { ...prevState, ...value }
        // sync with [arent array]
        props.onSalwarDataChange(mainIndex, newItem);

        return newItem;
      });
    }


  }

  // const handleTabChange = (event, newValue) => {
  //   console.log(newValue);
  //   setValue(newValue);
  // };

  // On Close Salwar Card
  const onSalwarBtnClickClose = (OrderId) => {
    setSalwarCounter(salwarCounter - 1);
    setSalwarData(salwarData.filter((item) => item.salwarOrderId !== OrderId));
  };

  const onMeasurementValueSet = async (e, text, orderID, dataHeadName, salwarDataindex) => {
    const startTime = new Date().getTime();
    if (dataHeadName === "measurements") {

      if (text !== "Remarks" && /[a-z]/i.test(e.target.value)) {
        return
      }
      setSalwarDataObj((prevState) => {
        let newItem = prevState.salwarMeasurementCheck ? { ...prevState, [text]: e.target.value } : { ...prevState, [text]: e.target.value, Amount: prevState.Amount, salwarMeasurementCheck: true, };

        // sync with [parent array]
        props.onSalwarDataChange(mainIndex, newItem);

        return newItem;
      });

    }
    if (dataHeadName === "deliverSelection") {
      setSalwarDataObj((prevState) => {
        let newItem = { ...prevState, itemDeliverStatus: e.target.textContent }
        // sync with [parent array]
        props.onSalwarDataChange(mainIndex, newItem);

        return newItem;
      });
    }
    if (dataHeadName === "personNameSelected") {
      // New Code
      if (e.target.value === "None") {
        removeData("salwar", orderID, salwarMeasurementList);
        setSalwarDataObj((prevState) => {
          let newItem = {
            ...prevState, [text]: e.target.value,
            personNameDisabler: false,
            personName: "",
            personNameVisibler: "",
          }
          // sync with [parent array]
          props.onSalwarDataChange(mainIndex, newItem);

          return newItem;
        });
      }
      else if(e.target.value=== "sameAsAbove"){
        console.log("SameAsAbove")

      }
      else {
        getSalwarMeasurementDataForPerson(orderID, e.target.value, "salwar", text);
      }
    }
    if (dataHeadName === "personName") {
      if (e.target.value === "") {
        setSalwarDataObj((prevState) => {
          let newItem = {
            ...prevState, [text]: e.target.value,
            personNameSelectorDisabler: false,
          }
          // sync with [arent array]
          props.onSalwarDataChange(mainIndex, newItem);

          return newItem;
        });
      }
      else {
        setSalwarDataObj((prevState) => {
          let newItem = {
            ...prevState, [text]: e.target.value,
            personNameSelectorDisabler: true,
          }
          // sync with [arent array]
          props.onSalwarDataChange(mainIndex, newItem);

          return newItem;
        });
      }
    }
    if (dataHeadName === "designSelection") {

      setSalwarDataObj((prevState) => {
        let newItem = { ...prevState, [text]: e.target.checked, }
        props.onSalwarDataChange(mainIndex, newItem);
        return newItem;
      });

      if (text === "Pocket" && e.target.checked === true) {
        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, Amount: prevState.Amount + costs["salwar"]["salwarItemsUtilitiesList"]["Pocket"] }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });

        // setSalwarData((prev) => prev.map((el) => el.salwarOrderId === orderID ? { ...el, Amount: el.Amount + costs["salwar"]["salwarItemsUtilitiesList"]["Pocket"], } : el));
      } else if (text === "Pocket" && e.target.checked === false) {
        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, Amount: prevState.Amount - costs["salwar"]["salwarItemsUtilitiesList"]["Pocket"] }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });


      }

      if (text === "Rope" && e.target.checked === true) {
        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, Amount: prevState.Amount + costs["salwar"]["salwarItemsUtilitiesList"]["Rope"] }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });

      } else if (text === "Rope" && e.target.checked === false) {
        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, Amount: prevState.Amount - costs["salwar"]["salwarItemsUtilitiesList"]["Rope"] }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });
      }

      if (text === "Zip" && e.target.checked === true) {
        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, Amount: prevState.Amount + costs["salwar"]["salwarItemsUtilitiesList"]["Zip"] }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });
      } else if (text === "Zip" && e.target.checked === false) {
        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, Amount: prevState.Amount - costs["salwar"]["salwarItemsUtilitiesList"]["Zip"] }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });
      }

      if (text === "With Elastic" && e.target.checked === true) {
        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, Amount: prevState.Amount + costs["salwar"]["salwarItemsUtilitiesList"]["With Elastic"] }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });
      }
      else if (text === "With Elastic" && e.target.checked === false) {
        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, Amount: prevState.Amount - costs["salwar"]["salwarItemsUtilitiesList"]["With Elastic"] }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });

      }
    }
    if (dataHeadName === "designStyle") {
      if (text === "Dart") {
        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, [text]: e.target.value }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });
        return
      }


      let tempData = salwarDataObj
      // Pant Start
      if (text === "Pant Style") {
        if (salwarDataObj.parallelElasticBeltCheck) {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              Amount: prevState.Amount - costs["salwar"]["salwarItemsPantList"]["Parallel Elastic|Belt"],
              parallelElasticBeltCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
        else {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              parallelElasticBeltCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }

        if (text === "Pant Style" && e.target.value === "Parallel Elastic|Belt") {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              Amount: prevState.Amount + costs["salwar"]["salwarItemsPantList"]["Parallel Elastic|Belt"],
              parallelElasticBeltCheck: true
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
      }

      // Pant Start

      // Neck Start

      if (text === "Neck Type") {
        if (salwarDataObj.boatNeckCheck) {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              Amount: prevState.Amount - costs["salwar"]["salwarItemsNeckList"]["Boat - Neck"],
              boatNeckCheck: false, collarNeckCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
        else if (salwarDataObj.collarNeckCheck) {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              Amount: prevState.Amount - costs["salwar"]["salwarItemsNeckList"]["Collar - Neck"],
              boatNeckCheck: false, collarNeckCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
        else {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              boatNeckCheck: false, collarNeckCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
      }

      if (text === "Neck Type" && e.target.value === "Boat Neck") {
        setSalwarDataObj((prevState) => {
          let newItem = {
            ...prevState, [text]: e.target.value,
            Amount: prevState.Amount + costs["salwar"]["salwarItemsNeckList"]["Boat - Neck"],
            boatNeckCheck: true, collarNeckCheck: false
          }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });
      }
      else if (text === "Neck Type" && e.target.value === "Collar Neck") {
        setSalwarDataObj((prevState) => {
          let newItem = {
            ...prevState, [text]: e.target.value,
            Amount: prevState.Amount + costs["salwar"]["salwarItemsNeckList"]["Collar - Neck"],
            boatNeckCheck: false, collarNeckCheck: true
          }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });

      }


      // Neck End

      // Lining start
      if (text === "Lining") {

        if (salwarDataObj.liningCheck) {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              Amount: prevState.Amount - costs["salwar"]["salwarItemsLiningList"]["With Lining"], liningCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
        else {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              liningCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }

      }

      if (text === "Lining" && e.target.value === "With Lining") {
        setSalwarDataObj((prevState) => {
          let newItem = {
            ...prevState, [text]: e.target.value,
            Amount: prevState.Amount + costs["salwar"]["salwarItemsLiningList"]["With Lining"],
            liningCheck: true,
          }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });
      }
      // Lining End

      // Piping Start

      if (text === "Piping") {

        if (salwarDataObj.pipingNeckCheck) {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              Amount: prevState.Amount - costs["salwar"]["salwarItemsPipingList"]["Piping-Only Neck"],
              pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingSideSlitCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
        else if (salwarDataObj.pipingNeckSleeveCheck) {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              Amount: prevState.Amount - costs["salwar"]["salwarItemsPipingList"]["Piping-Neck Sleeve"],
              pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingSideSlitCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
        else if (salwarDataObj.pipingSideSlitCheck) {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              Amount: prevState.Amount - costs["salwar"]["salwarItemsPipingList"]["Side Slit"],
              pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingSideSlitCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
        else {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, [text]: e.target.value,
              pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingSideSlitCheck: false
            }
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
        }
      }


      if (text === "Piping" && e.target.value === "Piping-Only Neck") {
        setSalwarDataObj((prevState) => {
          let newItem = {
            ...prevState, [text]: e.target.value,
            Amount:
              prevState.Amount +
              costs["salwar"]["salwarItemsPipingList"]["Piping-Only Neck"],
            pipingNeckCheck: true, pipingNeckSleeveCheck: false, pipingSideSlitCheck: false
          }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });
      }
      else if (text === "Piping" && e.target.value === "Piping-Neck Sleeve") {
        setSalwarDataObj((prevState) => {
          let newItem = {
            ...prevState, Amount: prevState.Amount + costs["salwar"]["salwarItemsPipingList"]["Piping-Neck Sleeve"],
            pipingNeckCheck: false, pipingNeckSleeveCheck: true, pipingSideSlitCheck: false
          }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });
      }
      else if (text === "Piping" && e.target.value === "Side Slit") {
        setSalwarDataObj((prevState) => {
          let newItem = {
            ...prevState, Amount: prevState.Amount + costs["salwar"]["salwarItemsPipingList"]["Side Slit"],
            pipingNeckCheck: false, pipingNeckSleeveCheck: false, pipingSideSlitCheck: true
          }
          props.onSalwarDataChange(mainIndex, newItem);
          return newItem;
        });

      }

      // Piping End
    }
    if (dataHeadName === "extraCharges") {
      let prevCharge = 0;
      if (salwarDataObj["Customization Charges"] !== undefined) {
        prevCharge = parseInt(salwarDataObj["Customization Charges"]);
      }
      if (isNaN(prevCharge)) {
        prevCharge = 0;
      }

      setSalwarDataObj((prevState) => {
        let newItem = {
          ...prevState, [text]: e.target.value,
          Amount: prevState.Amount - prevCharge + (e.target.value === "" ? 0 : parseInt(e.target.value)),
        }
        props.onSalwarDataChange(mainIndex, newItem);
        return newItem;
      });



    }
    if (dataHeadName === "extraSleeveCharges") {
      let prevChargeSleeve = 0;
      if (salwarDataObj["Sleeve Pattern Charge"] !== undefined) {
        prevChargeSleeve = parseInt(salwarDataObj["Sleeve Pattern Charge"]);
      }
      if (isNaN(prevChargeSleeve)) {
        prevChargeSleeve = 0;
      }

      setSalwarDataObj((prevState) => {
        let newItem = {
          ...prevState, [text]: e.target.value,
          Amount: prevState.Amount - prevChargeSleeve + (e.target.value === "" ? 0 : parseInt(e.target.value)),
        }
        props.onSalwarDataChange(mainIndex, newItem);
        return newItem;
      });
    }

    // Salwar Amount Set
    salwarCostEstimateUpdate(orderID)
    salwarValuesChecker(orderID)

    const endTime = new Date().getTime();


    // await grantTotalUpdater()
  };


  const getSalwarMeasurementDataForPerson = (orderID, selectedPersonValue, dress, text) => {
    
    var dataToSend = { user: "admin", username: props.tokenData.userData.emailId, mobNo: mobNo, personName: selectedPersonValue, };
    try {
      axios.post(APIClient.API_BASE_URL + "/orderProcess/getMeasurementDataForPerson", dataToSend ,APIClient.API_HEADERS)
        .then(function (response) {
          setSalwarDataObj((prevState) => {
            let newItem = {
              ...prevState, ...response.data.message.salwarData,
              [text]: selectedPersonValue,
              personName: selectedPersonValue,
              personNameDisabler: true,
              personNameVisibler: "none",
            }
            // sync with [arent array]
            props.onSalwarDataChange(mainIndex, newItem);

            return newItem;
          });
          salwarValuesChecker(orderID)
        });
    } catch (err) {
      alert("server down");
    }
  };

  const removeData = (dress, orderID, dataToRemove) => {
    for (let j in dataToRemove) {
      let tempKey = dataToRemove[j];
      delete salwarDataObj[tempKey];
    }
    setSalwarDataObj((prevState) => {
      let newItem = {
        ...prevState,
        Amount: costs["salwar"]["salwarItemsList"]["Basic"],
        salwarMeasurementCheck: true,
      }
      // sync with [parent array]
      props.onSalwarDataChange(mainIndex, newItem);
      return newItem;
    });
    salwarValuesChecker(orderID)
  };

  const salwarValuesChecker = (orderID) => {
    let tempData = salwarDataObjRef.current
    let tempDataKeys = Object.keys(tempData)


    if (salwarObjectKeysCheckList.every(elem => tempDataKeys.includes(elem))) {
      for (let k in salwarObjectKeysCheckList) {
        if (tempData[salwarObjectKeysCheckList[k]] === "") {
   
          setSalwarDataObj((prevState) => {
            let newItem = prevState.salwarMeasurementCheck ? { ...prevState, infoCompletionStatus: false } : prevState;
            // sync with [parent array]
            props.onSalwarDataChange(mainIndex, newItem);
            return newItem;
          });
          return
        }
      }
   
      setSalwarDataObj((prevState) => {
        let newItem = prevState.salwarMeasurementCheck ? { ...prevState, infoCompletionStatus: true } : prevState;
        // sync with [parent array]
        props.onSalwarDataChange(mainIndex, newItem);

        return newItem;
      });
    }
    else {
 
      setSalwarDataObj((prevState) => {
        let newItem = prevState.salwarMeasurementCheck ? { ...prevState, infoCompletionStatus: false } : prevState;
        // sync with [parent array]
        props.onSalwarDataChange(mainIndex, newItem);

        return newItem;
      });
    }
  }

  const reset = async (e, text, orderID, dress, index) => {
    let removeSalwarData = [...salwarPatternStyle, ...salwarDesigningStyle, "Neck Pattern ID image", "Neck Pattern ID name", "Neck Pattern ID price", "Sleeve Pattern ID image", "Sleeve Pattern ID name", "SleevePatternCheck", "NeckPatternCheck", "Pocket", "Rope", "Zip", "With Elastic", "Dart", "Neck Type", "Pant Style", "Piping", "Lining", "CostEstimateFinal", "NeckPatternPrevPrice", "liningCheck","boatNeckCheck","collarNeckCheck","parallelElasticBeltCheck","pipingNeckCheck","pipingNeckSleeveCheck", "pipingSideSlitCheck","Customization Charges", "Sleeve Pattern Charge"];
    for (let j in removeSalwarData) {
      let tempKey = removeSalwarData[j];
      delete salwarDataObj[tempKey];
    }

  
    setSalwarDataObj((prevState) => {
      let newItem = {
        ...prevState, Amount: costs["salwar"]["salwarItemsList"]["Basic"],
        salwarMeasurementCheck: true,
      };
      // sync with [parent array]
      props.onSalwarDataChange(mainIndex, newItem);

      return newItem;
    });
    salwarValuesChecker(orderID)

  };


  const uploadImage = async (e, text, orderID, dress, index) => {
    try {
      const file = e.target.files[0];
      let fileName = file.name;
      let trimFileName = fileName.substring(0, 2);
      if (trimFileName === "nP" && text === "Neck Pattern ID" && fileName.includes("-") === true) {
        let removeSalwarData = [...salwarDesigningStyle, "Lining", "Piping", "pipingNeckCheck", "pipingNeckSleeveCheck", "Customization Charges", "Sleeve Pattern Charge", "CostEstimateFinal", "boatNeckCheck", "collarNeckCheck", "pipingSideSlitCheck", "parallelElasticBeltCheck", "liningCheck"];
        for (let j in removeSalwarData) {
          let tempKey = removeSalwarData[j];
          for (let k in salwarCheckBoxFields) {
            salwarDataObj[salwarCheckBoxFields[k]] = false;
          }
          delete salwarDataObj[tempKey];
        }

        setSalwarDataObj((prevState) => {
          let newItem = { ...prevState, };
          // sync with [parent array]
          props.onSalwarDataChange(mainIndex, newItem);

          return newItem;
        });

        // setSalwarData(salwarData);
      } else if (
        trimFileName === "sP" &&
        text === "Sleeve Pattern ID" &&
        fileName.includes("-") === true
      ) {
      } else if (
        trimFileName === "nP" &&
        text === "Sleeve Pattern ID" &&
        (fileName.includes("-") === true || fileName.includes("-") === false)
      ) {
        sweetAlertShow("please upload valid Sleeve Pattern image", "warning");
        return;
      } else if (
        trimFileName === "sP" &&
        text === "Neck Pattern ID" &&
        (fileName.includes("-") === true || fileName.includes("-") === false)
      ) {
        sweetAlertShow("please upload valid Neck Pattern image", "warning");
        return;
      } else if (
        (trimFileName === "nP" || trimFileName !== "nP") &&
        text === "Neck Pattern ID"
      ) {
        sweetAlertShow("please upload valid Neck Pattern image", "warning");
        return;
      } else if (
        (trimFileName === "sP" || trimFileName !== "sP") &&
        text === "Sleeve Pattern ID"
      ) {
        sweetAlertShow("please upload valid Sleeve Pattern image", "warning");
        return;
      }


      var base64ImageCode = await base64Convertor(file);
      var fileSize = file.size;
      if (fileSize / 1024 <= 500) {
        var nameSS = file.name;
        var price = nameSS.replace(/\.[^/.]+$/, "").split("-")[1];
        if (text === "Sleeve Pattern ID" && dress === "salwar") {
          let SleevePatternCheck = false;
          try {
            SleevePatternCheck = salwarDataObj["SleevePatternCheck"];
            if (SleevePatternCheck === undefined || !SleevePatternCheck) {
              SleevePatternCheck = false;
            }
          } catch (err) {
            SleevePatternCheck = false;
          }


          if (SleevePatternCheck) {
            setSalwarDataObj((prevState) => {
              let newItem = { ...prevState, [text + " image"]: base64ImageCode, [text + " name"]: nameSS.replace(/\.[^/.]+$/, ""), SleevePatternCheck: true, };
              // sync with [parent array]
              props.onSalwarDataChange(mainIndex, newItem);
              return newItem;
            });
          }
          else {
            setSalwarDataObj((prevState) => {
              let newItem = { ...prevState, [text + " image"]: base64ImageCode, [text + " name"]: nameSS.replace(/\.[^/.]+$/, ""), SleevePatternCheck: true, };
              // sync with [parent array]
              props.onSalwarDataChange(mainIndex, newItem);
              return newItem;
            });
          }
        }

        else if (dress === "salwar" && text === "Neck Pattern ID") {
          let NeckPatternCheck = false;
          try {
            NeckPatternCheck = salwarDataObj["NeckPatternCheck"];
            if (NeckPatternCheck === undefined || !NeckPatternCheck) {
              NeckPatternCheck = false;
            }
          } catch (err) {
            NeckPatternCheck = false;
          }

          if (NeckPatternCheck) {
            setSalwarDataObj((prevState) => {
              let newItem = { ...prevState, [text + " image"]: base64ImageCode, [text + " name"]: nameSS.replace(/\.[^/.]+$/, ""), [text + " price"]: price, Amount: parseInt(price), NeckPatternCheck: true, NeckPatternPrevPrice: parseInt(price) };
              // sync with [parent array]
              props.onSalwarDataChange(mainIndex, newItem);

              return newItem;
            });
          }
          else {
            setSalwarDataObj((prevState) => {
              let newItem = { ...prevState, [text + " image"]: base64ImageCode, [text + " name"]: nameSS.replace(/\.[^/.]+$/, ""), [text + " price"]: price, Amount: parseInt(price), NeckPatternCheck: true, NeckPatternPrevPrice: parseInt(price) };

              // sync with [parent array]
              props.onSalwarDataChange(mainIndex, newItem);

              return newItem;
            });
          }
        }

      } else {
        sweetAlertShow(
          "File size is too large. Support File Size should be below 500KB",
          "warning"
        );
        return;
      }
      salwarValuesChecker(orderID)
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

  const openSalwarCaptureDialog = (mainIndex) => {
    setImageIndex(mainIndex)
    setSalwarCaptureDialog(true);
  };
  const salwarDressImageDialog = (mainIndex) => {
    setImageIndex(mainIndex)
    setSalwarDressImageDialogOpener(true);
  };

  const salwarStichDressImageDialog = (mainIndex) => {
    setImageIndex(mainIndex)
    setSalwarStichDressImageDialogOpener(true);
  };
  const storeSalwarImage = async (orderID, dressImage) => {
    let picBase64 = webcamRef.current.getScreenshot();
    picBase64 = await process_image(picBase64);
    if (picBase64 === null) {
      return
    }

    setSalwarDataObj((prevState) => {
      let newItem = {
        ...prevState, dressImage: picBase64,
        dressImageName: orderID + " Sample_IMG",
      };

      // sync with [parent array]
      props.onSalwarDataChange(mainIndex, newItem);

      return newItem;
    });

    setSalwarCaptureDialog(false);
    salwarValuesChecker(orderID)
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
  const salwarCostEstimateUpdate = (orderID) => {
    // let singleSalwarData = salwarDataRef.current.find(el => el.salwarOrderId === props.salwarDataObj["salwarOrderId"])


    let singleSalwarData = salwarDataObjRef.current
    var trueSalwarValues = Object.keys(singleSalwarData).filter((k) => singleSalwarData[k] === true);
    let select = (trueSalwarValues, pricesToShow) =>
      trueSalwarValues.reduce(
        (r, e) =>
          Object.assign(r, pricesToShow[e] ? { [e]: pricesToShow[e] } : null),
        {}
      );
    let output = select(trueSalwarValues, pricesToShow);
    let aoo = Object.values(output); //[{ Basic: 790}, { Pocket: 30}, {Zip: 40}, {With Elastic: 75}, {Piping-Only Neck: 160}]

    let totalObj = Object.assign({}, ...aoo); //{Basic: 790, Piping-Only Neck: 160,Pocket: 30,With Elastic: 75, Zip: 40}
    if (trueSalwarValues.includes("NeckPatternCheck")) {
      delete totalObj["Basic"];
    }
    if ("Customization Charges" in singleSalwarData) {
      if (singleSalwarData["Customization Charges"] !== "") {
        totalObj["Customization Charges"] = singleSalwarData["Customization Charges"];
      } else {
        delete totalObj["Customization Charges"];
      }
    }
    if ("Sleeve Pattern Charge" in singleSalwarData) {
      if (singleSalwarData["Sleeve Pattern Charge"] !== "") {
        totalObj["Sleeve Pattern Charge"] = singleSalwarData["Sleeve Pattern Charge"];
      } else {
        delete totalObj["Sleeve Pattern Charge"];
      }
    }
    if ("Neck Pattern ID price" in singleSalwarData) {
      if (singleSalwarData["Neck Pattern ID price"] !== "") {
        totalObj["Neck Pattern ID price"] = singleSalwarData["Neck Pattern ID price"];
      } else {
        delete totalObj["Neck Pattern ID price"];
      }
    }

    let costEstimateText = (pricesToShow) =>
      Object.entries(pricesToShow)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
    let tempCostEstimate = costEstimateText(totalObj).replaceAll(",", " | ");




    setSalwarDataObj((prevState) => {
      let newItem = prevState.salwarMeasurementCheck ? { ...prevState, CostEstimateFinal: tempCostEstimate } : prevState;
      // sync with [parent array]
      props.onSalwarDataChange(mainIndex, newItem);
      return newItem;
    });

  }

  // Print Measurements
  const printOrderData = (data) => {
    var doc = new jsPDF();
    doc.setFont(undefined, "bold").setFontSize(15).text("Dress ID - " + data["salwarOrderId"], 85, 10);

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
      head: [["Waist", "Neck F", "Neck B", "Full Length", "Side Slit"]],
      body: [[data["Waist"], data["Neck F"], data["Neck B"], data["Full Length"], data["Side Slit"]]],
    });

    doc.autoTable({
      theme: 'grid',
      startY: 65,
      pageBreak: 'avoid',
      margin: { top: 1 },
      head: [["Arm Hole", "Arm Length", "Arm Circum", "Ankle", "Pant Length"]],
      body: [[data["Arm Hole"], data["Arm Length"], data["Arm Circum"], data["Ankle"], data["Pant Length"]]],
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
      head: [["Pocket", "Rope", "Zip", "With Elastic"]],
      body: [[data["Pocket"] === true ? "Yes" : "No", data["Rope"] === true ? "Yes" : "No", data["Zip"] === true ? "Yes" : "No", data["With Elastic"] === true ? "Yes" : "No"]],
    });

    doc.setFont(undefined, "bold").setFontSize(14).text("Designing Style", 15, 150);
    doc.autoTable({
      theme: 'grid',
      startY: 155,
      pageBreak: 'avoid',
      margin: { top: 1 },
      head: [["Dart", "Neck Type", "Pant Style", "Piping", "Lining"]],
      body: [[data["Dart"], data["Neck Type"], data["Pant Style"], data["Piping"], data["Lining"]]],
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

 
 

  // useEffect(() => {
  //   console.log("useEffect Called")
  //   salwarValuesChecker("orderID")
  // }, [])
 

  const switchCam = () => {
    const newFcMode = facingMode === "user" ? { exact: "environment" } : "user";
    setFacingMode(newFcMode);
  };
  const handleUserMedia = () => setTimeout(() => setCameraLoading(false), 1_000);
  const webcamRef = useRef(null);

  const classes = useStyles();

  return (
    <>
      <div style={{ padding: "1%" }}>
        <Card elevation={10} className={classes.sbCardheight} style={{ backgroundColor: salwarLightColorCode }}  >
          <div>
            <Card style={{ backgroundColor: salwarColorCode }}>
              <div style={{ display: "flex", height: 25 }}>
                <div style={{ margin: "auto" }}>
                  <Typography className={classes.dressBlockTitleText}>
                    SALWAR
                  </Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Print Measurement" arrow>
                    <IconButton onClick={() => { printOrderData(salwarDataObj) }} aria-label="print" >
                      <PrintIcon style={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={salwarDataObj["infoCompletionStatus"] ? salwarDataObj["salwarOrderId"] + " Order Filled" : salwarDataObj["salwarOrderId"] + " Order Not Filled"} aria-label="add" arrow>
                    <Avatar style={{ backgroundColor: salwarDataObj["infoCompletionStatus"] ? "#49FF00" : "yellow", width: 20, height: 15, marginRight: 10 }}>
                      <FiberManualRecordIcon style={{ color: salwarDataObjRef.current["infoCompletionStatus"] ? "#49FF00" : "yellow" }} />
                    </Avatar>
                  </Tooltip>
                  <Button
                    className={classes.dressBlockCloseBtn}
                    onClick={() => { onSalwarBtnClickClose(salwarDataObj["salwarOrderId"]) }}
                  >
                    X
                  </Button>
                </div>

              </div>
            </Card>

            <Card style={{ display: "flex", backgroundColor: salwarLightColorCode, borderRadius: 0 }}  >
              <div style={{ display: "flex", paddingTop: "10px", paddingLeft: "2%", backgroundColor: salwarColorCode, paddingRight: "5%", borderTopRightRadius: "50%", borderBottomRightRadius: "50%" }}>
                <div>
                  <Typography className={classes.dressBlockIDText} >
                    ID - {salwarDataObj["salwarOrderId"]}
                  </Typography>
                </div>
              </div>
              <div className={classes.personNameContainer} >
                <TextField
                  InputProps={{ className: classes.topBarText }}
                  disabled={textBoxDisabler ? textBoxDisabler : salwarDataObj["personNameDisabler"]}
                  value={salwarDataObj["personName"]}
                  variant="outlined"
                  size="small"
                  label="Person Name"
                  style={{ minWidth: "235px", margin: "5px 5px", display: salwarDataObj["personNameVisibler"], }}
                  className={classes.textField}
                  onChange={(e) => { onMeasurementValueSet(e, "personName", salwarDataObj["salwarOrderId"], "personName", mainIndex); }}
                />

                <FormControl
                  size="small"
                  className={classes.textFieldCD}
                  variant="outlined"
                  disabled={mode === "view" ? textBoxDisabler : salwarDataObj["personNameSelectorDisabler"]}
                  style={{ minWidth: "235px", margin: "5px 5px" }}
                  className={classes.textField}
                >
                  <InputLabel>Previous Name List</InputLabel>

                  <Select style={{ height: 35 }}
                    onChange={(e) => { onMeasurementValueSet(e, "personNameSelected", salwarDataObj["salwarOrderId"], "personNameSelected", mainIndex); }}
                    value={salwarDataObj["personNameSelected"] === undefined ? "" : salwarDataObj["personNameSelected"]}
                    label="Previous Name List"
                  >
                    <MenuItem value="None">
                      <Typography className={classes.selectText}>None</Typography>
                    </MenuItem>

                    {(salwarPrevRegNames ===
                      undefined
                      ? []
                      : salwarPrevRegNames
                    ).map((option, index) => (
                      <MenuItem key={option} value={option}>
                        <Typography className={classes.selectText}>
                          {option}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <ToggleButtonGroup size="small" value={salwarDataObj["itemDeliverStatus"]} style={{ height: 35, margin: "5px 5px" }} exclusive onChange={(e) => { onMeasurementValueSet(e, "text", salwarDataObj["salwarOrderId"], "deliverSelection", mainIndex); }} >
                  <ToggleButton size="small" value="Not Delivered" style={{ fontSize: 12, fontFamily: Fonts.UBUNTU }}  >
                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faSpinner} />
                    Not Delivered
                  </ToggleButton>
                  <ToggleButton size="small" value="Delivered" style={{ fontSize: 12, fontFamily: Fonts.UBUNTU, backgroundColor: salwarDataObj["itemDeliverStatus"] === "Delivered" ? Colors.SALWAR_COLOR : "", color: salwarDataObj["itemDeliverStatus"] === "Delivered" ? "white" : "" }}>
                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faCheckDouble} />
                    Delivered
                  </ToggleButton>
                </ToggleButtonGroup>

              </div>
            </Card>




            <Card elevation={5} style={{ padding: 15, marginLeft: 10, marginRight: 10, marginTop: 10, display: "flex", flexWrap: "wrap", }}>
              <Box style={{ marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}  >
                <div>
                  <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "8px", borderTopRightRadius: "8px", }}>
                    <Typography className={classes.dressBlockSubHeadText} >
                      Measurements
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode, }}>
                    {salwarTextFields.map(
                      (text, textFieldIndex) => (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <Box style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: "flex", margin: "10px" }}>
                              <Typography noWrap className={classes.salwarMeasurementHeadText}>
                                {text}
                              </Typography>

                              <TextField
                                className={classes.salwarMeasurementTextField}
                                value={salwarDataObj[text] === undefined ? "" : salwarDataObj[text]}
                                inputProps={{ readonly: mode === "view" ? "" : false }}
                                onChange={(e) => { onMeasurementValueSet(e, text, salwarDataObj["salwarOrderId"], "measurements", mainIndex); }}
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
                              ></TextField>
                            </Box>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Box>

              <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}>
                <div>
                  <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}>
                    <Typography className={classes.dressBlockSubHeadText}>
                      Tuck Style
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode, }}>
                    {salwarTuckStyle.map((text, index) => (
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <div>
                          <TextField
                            type="number"
                            size="small"
                            onInput={(e) => e.target.value = e.target.value.slice(0, 2)}
                            className={classes.textField}
                            value={salwarDataObj[text]}
                            style={{ margin: "3%" }}
                            disabled={textBoxDisabler}
                            onChange={(e) => { onMeasurementValueSet(e, text, salwarDataObj["salwarOrderId"], "measurements") }}
                            label={text}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Box>

              <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}>
                <div>
                  <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}>
                    <Typography className={classes.dressBlockSubHeadText} >
                      Patterns
                    </Typography>
                    <Button size="small" style={{ display: mode === "view" ? "none" : "" }} variant="contained" color="secondary" startIcon={<AutorenewIcon />} onClick={(e) => { reset(e, "text", salwarDataObj["salwarOrderId"], "salwar", mainIndex); }}                                >
                      Reset
                    </Button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode, }}>
                    {salwarPatternStyle.map((text, index) => (
                      <div style={{ display: "flex", alignItems: "center", }} >
                        <TextField
                          disabled={textBoxDisabler}
                          size="small"
                          className={classes.textField}
                          label={text}
                          value={salwarDataObj[text + " name"] || ""}
                          inputProps={{ maxLength: 0 }}
                          style={{ margin: "2%" }}
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
                                  onChange={(e) => { uploadImage(e, text, salwarDataObj["salwarOrderId"], "salwar", mainIndex); }}
                                />
                                <Button
                                  variant="contained"
                                  component="span"
                                  style={{ paddingTop: "7px", paddingBottom: "7px", paddingRight: "20px", paddingLeft: "20px", marginRight: "-13px", background: salwarColorCode, color: "white", display: mode === "view" ? "none" : "block", }}
                                >
                                  Browse
                                </Button>
                              </label>
                            ),
                          }}
                        />
                        <img
                          onClick={() => openPops(salwarDataObj[text + " image"] || defaultImage, salwarDataObj[text + " name"] || '')} src={salwarDataObj[text + " image"] || defaultImage}
                          style={{ width: 60, height: 60, marginRight: 10, }}
                          className={classes.imagePreview}
                          src={salwarDataObj[text + " image"] || defaultImage}
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

              <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}>
                <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}>
                  <Typography className={classes.dressBlockSubHeadText}>
                    Design Selection
                  </Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode, }} >
                  {salwarCheckBoxFields.map((text, index) => (
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                      <div style={{ marginTop: "5%", marginLeft: "5%", marginBottom: "5%", }}>
                        <Checkbox
                          checked={salwarDataObj[text] ? true : false}
                          disabled={textBoxDisabler}
                          onChange={(e) => { onMeasurementValueSet(e, text, salwarDataObj["salwarOrderId"], "designSelection", mainIndex); }}
                          inputProps={{ "aria-label": "secondary checkbox", }}
                          style={{ transform: "scale(1)", color: salwarColorCode, }}
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

              <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} >
                <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}  >
                  <Typography className={classes.dressBlockSubHeadText}  >
                    Designing Style
                  </Typography>
                  {/* <Button variant="contained" color="secondary" startIcon={<AutorenewIcon />}>Reset</Button> */}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode }}   >
                  {salwarDesigningStyle.map(
                    (dropDownText, index) => (

                      <div style={{ margin: 10, }}>
                        <FormControl variant="outlined" size="small" style={{ width: "200px" }} className={classes.textField} >
                          <InputLabel>{dropDownText}</InputLabel>
                          <Select
                            value={salwarDataObj[dropDownText] === undefined ? "" : salwarDataObj[dropDownText]}
                            disabled={textBoxDisabler}
                            label={dropDownText}
                            onChange={(e) => { onMeasurementValueSet(e, dropDownText, salwarDataObj["salwarOrderId"], "designStyle", mainIndex); }}
                            inputProps={{ "aria-label": "secondary checkbox", }}
                            style={{ transform: "scale(1)" }}
                          >
                            {dropDownText === "Dart"
                              ? salwarDartDropDownData.map(
                                (text, index) => (
                                  <MenuItem value={text}>
                                    {text}
                                  </MenuItem>
                                )
                              )
                              : dropDownText === "Neck Type"
                                ? salwarNeckTypeDropDownData.map(
                                  (text, index) => (
                                    <MenuItem value={text}>
                                      {text}
                                    </MenuItem>
                                  )
                                )
                                : dropDownText === "Pant Style"
                                  ? pantStyleDropDownData.map(
                                    (text, index) => (
                                      <MenuItem value={text}>
                                        {text}
                                      </MenuItem>
                                    )
                                  )
                                  : dropDownText === "Piping"
                                    ? salwarPipingDropDownData.map(
                                      (text, index) => (
                                        <MenuItem value={text}>
                                          {text}
                                        </MenuItem>
                                      )
                                    )
                                    : salwarLiningDropDownData.map(
                                      (text, index) => (
                                        <MenuItem value={text}>
                                          {text}
                                        </MenuItem>
                                      )
                                    )}
                          </Select>
                        </FormControl>
                      </div>

                    )
                  )}
                </div>
              </Box>


              <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: designTeamContentHider, }} >
                <div>
                  <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px", }}>
                    <Typography className={classes.dressBlockSubHeadText} >
                      Extra Charges
                    </Typography>
                    {/* <Button variant="contained" color="secondary" startIcon={<AutorenewIcon />}>Reset</Button> */}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode, }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}  >
                      <TextField
                        size="small"
                        type="number"
                        onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
                        className={classes.textField}
                        value={salwarDataObj["Customization Charges"] === undefined ? "" : salwarDataObj["Customization Charges"]}
                        disabled={textBoxDisabler}
                        onChange={(e) => { onMeasurementValueSet(e, "Customization Charges", salwarDataObj["salwarOrderId"], "extraCharges", mainIndex); }}
                        label={"Customization Charges"}
                        style={{ margin: "4.5%" }}
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
                        className={classes.textField}
                        onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
                        value={salwarDataObj["Sleeve Pattern Charge"] === undefined ? "" : salwarDataObj["Sleeve Pattern Charge"]}
                        disabled={textBoxDisabler}
                        onChange={(e) => { onMeasurementValueSet(e, "Sleeve Pattern Charge", salwarDataObj["salwarOrderId"], "extraSleeveCharges", mainIndex) }}
                        label="Sleeve Pattern Charge"
                        style={{ margin: "4.5%" }}
                        InputProps={{ startAdornment: (<InputAdornment position="start" style={{ marginLeft: 10 }}> ₹  </InputAdornment>), }}
                        variant="outlined"
                      />
                    </div>
                  </div>
                </div>
              </Box>


              <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}>
                <div>
                  <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
                    <Typography className={classes.dressBlockSubHeadText}>
                      Remarks
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", border: "2px solid white" }}>
                      <TextField
                        size="small"
                        value={salwarDataObj["Remarks"]}
                        disabled={textBoxDisabler}
                        onChange={(e) => { onMeasurementValueSet(e, "Remarks", salwarDataObj["salwarOrderId"], "measurements", mainIndex) }}
                        label={"Remarks"}
                        style={{ margin: "2.3%", width: "350px" }}
                        className={classes.textField}
                        inputProps={{ maxLength: 150 }}
                        variant="outlined"
                      />
                    </div>
                  </div>
                </div>
              </Box>

              <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} >
                <div>
                  <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
                    <Typography className={classes.dressBlockSubHeadText}>
                      Dress
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode, }} >
                    <div style={{ display: "flex", flexDirection: "row" }} >
                      <TextField
                        size="small"
                        disabled={textBoxDisabler}
                        label={"Dress Image"}
                        value={salwarDataObj["dressImageName"] || ""}
                        inputProps={{ maxLength: 2 }}
                        style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%", }}
                        className={classes.textField}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <Button
                              style={{ paddingTop: "7px", paddingBottom: "7px", paddingRight: "30px", paddingLeft: "20px", marginRight: "-13px", background: salwarColorCode, color: "white", display: mode === "view" ? "none" : "block", }}
                              onClick={() => { openSalwarCaptureDialog(mainIndex) }}
                            >
                              CAPTURE
                            </Button>
                          ),
                        }}
                      />
                      <img
                        onClick={() => { salwarDressImageDialog(mainIndex) }}
                        alt="salwar dress"
                        className={classes.imagePreview}
                        style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, }}
                        src={salwarDataObj["dressImage"] || defaultImage}
                      />
                      <div>
                        <Dialog open={salwarDressImageDialogOpener} onClose={() => { setSalwarDressImageDialogOpener(false) }}>
                          <DialogTitle>{salwarData[imageIndex] === undefined ? 'No Image' : salwarData[imageIndex]["dressImageName"]}</DialogTitle>
                          <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", }} >
                            <img alt="salwar dress" style={{ width: 600, height: 600 }} src={salwarData[imageIndex] === undefined ? defaultImage : salwarData[imageIndex]["dressImage"]} />
                          </div>
                        </Dialog>
                      </div>



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
                            Capture your Salwar Image
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
                          {cameraLoading && <Typography style={{ textAlign: 'center' }} > Camera Loading... </Typography>}
                          <Webcam
                            videoConstraints={{ facingMode: facingMode }}
                            style={{ width: "100%", height: "35%", opacity: cameraLoading ? 0 : 1 }}
                            screenshotFormat="image/png"
                            ref={webcamRef}
                            onUserMedia={handleUserMedia} />

                          <Button
                            style={{ backgroundColor: salwarColorCode, color: "white", fontWeight: "bold", }}
                            disabled={textBoxDisabler}
                            variant="contained"
                            onClick={() => { storeSalwarImage(salwarData[imageIndex]["salwarOrderId"], "salwarDressImage", imageIndex) }}
                          >
                            Capture Salwar Image
                          </Button>
                        </div>
                      </Dialog>
                    </div>
                  </div>
                  <div>

                  </div>
                </div>
              </Box>

              <Box style={{ marginTop: 10, marginRight: 10, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", display: (mode === "edit" || mode === "add") ? "none" : "" }} >
                <div>
                  <div style={{ display: "flex", backgroundColor: salwarColorCode, borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
                    <Typography className={classes.dressBlockSubHeadText}>
                      Stiched Dress
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", border: "2px solid ", borderColor: salwarColorCode, }}>
                    <div style={{ display: "flex", flexDirection: "row", }} >
                      <TextField size="small"
                        disabled={textBoxDisabler}
                        label={"Dress Image"}
                        value={salwarDataObj["stichedDressImageName"] || ""}
                        inputProps={{ maxLength: 2 }}
                        style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%" }}
                        variant="outlined"

                      />
                      <img
                        onClick={() => { salwarStichDressImageDialog(mainIndex) }}
                        alt="salwar dress"
                        className={classes.imagePreview}
                        style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, }}
                        src={salwarDataObj["stichedDressImage"] || defaultImage}
                      />

                      <div>
                        <Dialog open={salwarStichDressImageDialogOpener} onClose={() => { setSalwarStichDressImageDialogOpener(false) }}>
                          <DialogTitle>{salwarData[imageIndex] === undefined ? 'No Image' : salwarData[imageIndex]["stichedDressImageName"]}</DialogTitle>
                          <div style={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", }} >
                            <img alt="salwar dress" style={{ width: 600, height: 600 }} src={salwarData[imageIndex] === undefined ? defaultImage : salwarData[imageIndex]["stichedDressImage"]} />
                          </div>
                        </Dialog>
                      </div>
                    </div>
                  </div>

                </div>
              </Box>

            </Card>
            <Card
              elevation={5}
              style={{ marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10, display: designTeamContentHider, justifyContent: "center", backgroundColor: salwarLightColorCode }}
            >
              <div style={{ flex: 1 }}>
                <Typography
                  style={{ display: "flex", flexDirection: "row", marginLeft: 30, fontWeight: "bold" }}
                  variant="subtitle1"
                >
                  Cost Estimate
                </Typography>
              </div>
              <div style={{ justifyContent: "flex-end", alignItems: "flex-end", marginRight: 30, }}  >
                <Typography
                  style={{ color: Colors.SALWAR_COLOR }}
                  variant="subtitle2"
                >
                  {salwarDataObj["CostEstimateFinal"]}
                </Typography>
              </div>
            </Card>

            <Card elevation={5} style={{ display: designTeamContentHider, backgroundColor: salwarColorCode }}>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ flex: 1 }}>
                  <Typography style={{ fontWeight: "bold", color: "white", paddingLeft: 10 }} variant="h6"  >
                    Amount
                  </Typography>
                </div>
                <div style={{ justifyContent: "flex-end", border: "2px solid ", borderColor: salwarColorCode, alignItems: "flex-end", backgroundColor: "white" }} >
                  <Typography style={{ fontWeight: "bold", color: "green", textAlign: "right", width: 200, marginRight: 10 }} variant="h5" >
                    ₹ {salwarDataObj["Amount"]}
                  </Typography>
                </div>
              </div>

            </Card>
          </div>
        </Card>
      </div>
    </>

  );
}
export default memo(SalwarDressComponent)