import { Button, makeStyles, Card } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import date from "date-and-time";
import ReactToPrint from 'react-to-print';
import AppbarHead from './AppbarHead'
import { ComponentToPrint } from './ComponentToPrint';
import { ComponentToPrintIds } from './ComponentToPrintIds';
import useDetectPrint from 'use-detect-print';
import { useLocation } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PrintIcon from '@material-ui/icons/Print';

import ComponentToPrintFun from "./ComponentToPrintFun";
import { SessionChecker } from "./utils/SessionChecker";

const colorCode = "rgba(244, 148, 37, 0.7)";
const styles = makeStyles((theme) => ({
    toolBar: {
        backgroundColor: "#00adb5",
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontSize: "21px",
        fontWeight: "bold",
        "&:hover": {
            cursor: "pointer",
        },
    },
    logBtn: {
        fontSize: "21px",
        textTransform: "none",
        "&:hover": {
            backgroundColor: "red",
        },
    },
    heading: {
        textAlign: "center",
        fontSize: "21px",
        padding: theme.spacing(2),
        fontWeight: "bold",
        color: "#00adb5",
    }
}));

export default function BillPage() {
    const navigate = useNavigate();
    const classes = styles();
    const { state } = useLocation();
    const { billData, userName, prevPage, prevOrderStatus, prevSearchQuery } = state;
    const [currentDataTime, setcurrentDataTime] = useState("")
    const [tokenData, settokenData] = useState({})
    const componentRef = useRef();
    const componentRef1 = useRef();
    const isPrinting = useDetectPrint();
    const getCurrentDataAndTime = () => {
        var currentdate = new Date();
        setcurrentDataTime(date.format(currentdate, "DD/MM/YYYY "))
    };

    useEffect(() => {
        // Session Check
        let decodedTokenData = SessionChecker()
        decodedTokenData.success ? settokenData(decodedTokenData.message) : navigate("/")
        getCurrentDataAndTime()
    }, [])

    return (

        <>
            {
                Object.keys(tokenData).length === 0 ?
                    <div >Loading... Please Wait</div>
                    :
                    <div className="root" style={{ maxHeight: "100%" }}>
                        <div>
                            <AppbarHead dataParent={{ userNameFrom: userName, appBtnColor: colorCode, appBtnText: "Order Details",  userData: tokenData.userData }} />
                        </div>

                        <div style={{ paddingTop: "2%", paddingLeft: "25%", paddingRight: "25%" }}>
                            <Card elevation={10} >
                                <ComponentToPrint dataFromParent={billData} ref={componentRef} />
                                <div style={{ display: "none" }}>
                                    <ComponentToPrintIds dataFromParentIds={billData} ref={componentRef1} />
                                </div>

                            </Card>
                        </div>

                        <div style={{ marginTop: "2%", display: "flex", justifyContent: "center", paddingBottom: '2%' }}>
                            <Button startIcon={<KeyboardBackspaceIcon />} elevation={5} onClick={() => navigate('/orderDetailPage', { state: { userName: "Shop Owner", tohide: "", prevPage: prevPage, prevOrderStatus: prevOrderStatus, prevSearchQuery: prevSearchQuery } })} fullWidth style={{ fontSize: '16px', fontWeight: 'bold', width: '200px', color: "brown", backgroundColor: "white", height: "35px" }} variant="outlined" >Back</Button>
                            <ReactToPrint variant="contained"
                                trigger={() => <Button startIcon={<PrintIcon />} style={{ marginLeft: "2%", fontSize: '16px', backgroundColor: 'brown', color: 'white', fontWeight: 'bold', width: '200px', height: "35px" }}>Print</Button>}
                                content={() => componentRef.current}
                            />

                            <ReactToPrint variant="contained"
                                trigger={() => <Button startIcon={<PrintIcon />} style={{ marginLeft: "2%", fontSize: '16px', backgroundColor: 'brown', color: 'white', fontWeight: 'bold', width: '200px', height: "35px" }}>Print Dress Ids</Button>}
                                content={() => componentRef1.current}
                            />
                        </div>

                    </div>
            }
        </>


    );
}

