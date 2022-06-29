import { Badge, Modal, CircularProgress, Tooltip, Button, InputLabel, Checkbox, TextField, Card, Typography, Select, MenuItem, FormControl, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, React, useMemo, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useState from "react-usestateref";
import swal from "sweetalert2";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SaveIcon from "@material-ui/icons/Save";
import salwarSVG from "./images/dressLogos/salwar_nav.svg";
import blouseSVG from "./images/dressLogos/blouse_nav.svg";
import shirtSVG from "./images/dressLogos/shirt.png";
import pantSVG from "./images/dressLogos/pant.png";
import { Colors, Fonts } from "./constants";

import { OrderDressContext } from "./Provider";
const salwarColorCode = Colors.SALWAR_COLOR;



export default function OrderDressButtonComponent(props) {
    const { salwarData, updateSalwarData } = useContext(OrderDressContext);
    const [loadingModal, setLoadingModal] = useState(false)
    const [salwarCounter, setSalwarCounter, salwarCounterRef] = useState(0);
    const mode = props.mode
    var salwarOrderIDNos = []
    const navigate = useNavigate();
    const handleBackBtn = () => {
        if (mode === "view" || mode === "edit") {
          navigate(-1);
          return
        }
        else {
          swal.fire({
            title: `Are you sure to go back ?`,
            text: "Changes you made so far will not be saved",
            icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((willWarn) => {
            if (willWarn.isConfirmed) {
              var datatoSend = { user: "admin", username: tokenData.userData.emailId, orderID: props.orderID }

              axios.post(APIClient.API_BASE_URL +"/orderProcess/removeOrderID", datatoSend,APIClient.API_HEADERS).then((res) => {
                navigate(-2);
              });
            }
          });
        }
      };
    const sweetAlertShow = useCallback((message, mode) => {
        swal.fire({ title: message, text: "", icon: mode, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33" })
          .then((willWarn) => {
            if (willWarn.isConfirmed) {
              if (message === "Please Fill Rates in Rate Updater Page") {
                handleBackBtn();
                return;
              }
              else {
                return;
              }
            }
          });
      }, [])
    
  const newCard = () => {
    // let bothSalwarBlouse = [...salwarData, ...blouseDataRef.current]
    let bothSalwarBlouse = [...salwarData]
    if (bothSalwarBlouse.length >= 10) {
      setLoadingModal(false)
      sweetAlertShow("Maximum 10 Dresses are allowed per Order", "warning")
      return;
    }
    setSalwarCounter(salwarCounter + 1);
    for (let k in salwarData) {
      let temp = salwarData[k]["salwarOrderId"].split("-")[1].replace(/\D/g, "")
      salwarOrderIDNos.push(parseInt(temp))
    }
    salwarOrderIDNos = salwarOrderIDNos.sort()
    let orderIDNo = isNaN(salwarOrderIDNos.slice(-1)[0] + 1) ? 1 : salwarOrderIDNos.slice(-1)[0] + 1
    var salwarOrderId = props.orderID + "-s" + orderIDNo;
    let output = {}
    let temp = {
      salwarOrderId: salwarOrderId,
      infoCompletionStatus: false,
      Amount: props.costs["salwar"]["salwarItemsList"]["Basic"], salwarMeasurementCheck: true, itemDeliverStatus: "Not Delivered"
    };
    Object.assign(temp, output);
    salwarData.push(temp)
    return true
  }

  const OnAddSalwarBtnClick = async () => {
    setLoadingModal(true)
    let delayTime = 1000
    let bothSalwarBlouse = [...salwarData]
    if (bothSalwarBlouse.length >= 5) {
      delayTime = 2000
    }
    setTimeout(function () {
      setLoadingModal(false)
    }, delayTime)

    let res = await newCard()
  }


    return (
        <div style={{ paddingTop: 10, display: "flex", justifyContent: "center", alignItems: "center", display: mode==="view"?"none":"" , backgroundColor: Colors.ORDER_MAIN_COLOR, textAlign: "center", }}            >
            <Badge
                badgeContent={
                    <div style={{ backgroundColor: Colors.SALWAR_LIGHT_COLOR, fontSize: 12, color: Colors.SALWAR_COLOR, padding: 2, paddingBottom: 6, borderRadius: 5, width: 10, height: 10 }}>
                        <Typography style={{ fontSize: 10 }}>
                            {salwarData.length}
                        </Typography>
                    </div>
                }

            >
                <Button
                    onClick={OnAddSalwarBtnClick}
                    disabled={loadingModal ? true : false}
                    variant="contained"
                    startIcon={<img
                        alt="salwarBtn"
                        style={{ width: "18px", filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(162deg) brightness(105%) contrast(102%)", }}
                        src={salwarSVG}
                    />}
                    style={{ color: "white", background: salwarColorCode, fontWeight: "bold", }}
                >
                    Add Salwar
                </Button>
            </Badge>
            {/* <Badge
                badgeContent={
                    <div style={{ backgroundColor: Colors.BLOUSE_LIGHT_COLOR, fontSize: 12, color: Colors.BLOUSE_COLOR, padding: 2, paddingBottom: 6, borderRadius: 5, width: 10, height: 10 }}>
                        <Typography style={{ fontSize: 10 }}>
                            {blouseDataRef.current.length}
                        </Typography>
                    </div>
                }
            >
                <Button
                    onClick={OnAddBlouseBtnClick}
                    variant="contained"
                    startIcon={<img
                        alt="blouseBtn"
                        style={{ width: "18px", filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(162deg) brightness(105%) contrast(102%)", }}
                        src={blouseSVG}
                    />}
                    style={{ color: "white", background: blouseColorCode, fontWeight: "bold", marginLeft: 50 }}
                >
                    Add Blouse
                </Button>
            </Badge> */}

            {/* <Button onClick={OnAddShirtBtnClick} variant="contained" style={{ color: "white", background: shirtColorCode, margin: "0.5%", width: "200px", fontWeight: "bold", fontSize: "14px" }} >
              <img
              alt = "shirtBtn"
                style={{ width: "18px", marginRight: "15px", filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(162deg) brightness(105%) contrast(102%)", }}
                src={shirtSVG}
              />{" "}
              Add Shirt
            </Button>

            <Button onClick={OnAddPantBtnClick} variant="contained" style={{ color: "white", background: pantColorCode, margin: "0.5%", width: "200px", fontWeight: "bold", fontSize: "14px", }} >
              <img
                alt = "pantBtn"
                style={{ width: "18px", marginRight: "15px", filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(162deg) brightness(105%) contrast(102%)", }}
                src={pantSVG}
              />{" "}
              Add Pant
            </Button> */}
        </div>

    )
}
