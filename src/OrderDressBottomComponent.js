import { Badge, IconButton, CircularProgress, Tooltip, Button, InputLabel, Checkbox, TextField, Card, Typography, Select, MenuItem, FormControl, InputAdornment, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, React, useMemo, useCallback, memo, forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Helpers from "./Helpers";
import useState from "react-usestateref";
import swal from "sweetalert2";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SaveIcon from "@material-ui/icons/Save";
import { Colors, Fonts } from "./constants";
import LoopIcon from '@material-ui/icons/Loop';


const colorCode = Colors.ORDER_MAIN_COLOR;
const bgColor = "#f1dbc0"

export const OrderDressBottomComponent = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useImperativeHandle(ref, () => ({
        calculateTotalAmount() {
            // Parent Passing Name
            calculateTotalAmount(); // Child Func Name
        }
    }));

    const [grandTotal, setGrantTotal] = useState(0)
    const navigate = useNavigate();
    const useStyles = useMemo(() => {
        return makeStyles((theme) => ({

            grantTotalView: {
                color: "white",
                fontWeight: "bold", fontFamily: Fonts.LATO,
                marginTop: 5,
                [theme.breakpoints.up("md")]: {
                    fontSize: "24px",
                },
                [theme.breakpoints.down("sm")]: {
                    fontSize: "18px",
                },
            },

            grantTotalViewCost: {
                color: "white", marginTop: 5, fontFamily: Fonts.UBUNTU, fontWeight: "BOLD",
                [theme.breakpoints.up("md")]: {
                    fontSize: "24px",
                },
                [theme.breakpoints.down("sm")]: {
                    fontSize: "18px",
                },
            },

            bottomBarContainer: {
                backgroundColor: colorCode, display: 'flex',
                [theme.breakpoints.down("sm")]: {
                    flexDirection: "column"
                },
            },
        }))
    }, []);

    const calculateTotalAmount = () => {
        let GrantTotal = 0
        var salwarSumAmount = 0
        var blouseSumAmount = 0
        props.blouseDataRef.current.map((text) => {
            blouseSumAmount = blouseSumAmount + text.Amount
        })
        props.salwarDataRef.current.map((text) => {
            salwarSumAmount = salwarSumAmount + text.Amount
        })
        GrantTotal = salwarSumAmount + blouseSumAmount

        if (props.gstChecked) {
            let gstAmount = Math.round((GrantTotal * 18) / 100)
            GrantTotal = GrantTotal + gstAmount;
        }
        if (props.dcValue !== "") {
            GrantTotal = GrantTotal - parseInt(props.dcValue);
        }
        setGrantTotal(GrantTotal)
        props.setGrantTotal(GrantTotal)
    }


    const handleBackBtn = () => {
        if (props.mode === "view" || props.mode === "edit") {
            if(props.userName === "Designing Team"){
                navigate('/orderDetailPage', { state: { userName: "Designing Team", tohide: 'none', prevPage:props.prevPage, prevOrderStatus:props.prevOrderStatus, prevSearchQuery:props.prevSearchQuery } });
            }
            else{
                navigate('/orderDetailPage', { state: { userName: "Shop Owner", tohide: "", prevPage:props.prevPage, prevOrderStatus:props.prevOrderStatus, prevSearchQuery:props.prevSearchQuery } });
            }
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
                    var datatoSend = { user: "admin", orderID: props.orderID }
                    axios.post(Helpers().apiURL + "/removeOrderID", datatoSend).then((res) => {
                        navigate('/orderDetailPage', { state: { userName: "Shop Owner", tohide: "", prevPage:props.prevPage, prevOrderStatus:props.prevOrderStatus, prevSearchQuery:props.prevSearchQuery } });
                    });
                }
            });
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.bottomBarContainer}>

           
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "80%", flex: 1, marginLeft: "13%", marginRight: "5%", marginTop: "auto", marginBottom: "auto" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ fontSize: "16px", width: 150, height: "35px", marginRight: "5%" }}
                        onClick={() => { handleBackBtn() }}
                        startIcon={<KeyboardBackspaceIcon />}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ fontSize: "16px", backgroundColor: "green", width: 150, height: "35px", marginLeft: "5%", display: props.mode === "view" ? "none" : "" }}
                        onClick={() => { props.onSaveBtnClick("save"); }}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </div>


            </div>
            <div style={{ display: "flex", flexDirection: "row", marginRight: 10, justifyContent: "center" }}>
                <Tooltip title="Calculate Grand Total Amount" arrow>
                    <IconButton onClick={() => { calculateTotalAmount() }} aria-label="refresh">
                        <LoopIcon style={{ color: "white" }} />
                    </IconButton>
                </Tooltip>
                <Divider orientation="vertical" flexItem />

                <div style={{ marginRight: 10 }}>
                    <Typography noWrap className={classes.grantTotalView}>
                        Grand Total :
                    </Typography>
                </div>
                <div>
                    <Typography className={classes.grantTotalViewCost}>
                        ₹ {props.grantTotal}
                    </Typography>

                </div>
            </div>
        </div>
    )
});
export default OrderDressBottomComponent