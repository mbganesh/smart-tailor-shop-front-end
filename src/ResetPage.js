import { TextField, Card, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { useState, React } from 'react'
import axios from "axios";
import Helpers from './Helpers';
import swal from "sweetalert2";
import { useNavigate } from 'react-router';
import { OutlinedInput,InputAdornment,IconButton } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default function ResetPage() {
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("");
    const [otpDB, setOtpDB] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [buttonVisblity, setbuttonVisblity] = useState(false)
  

    const [selectDisabler, setSelectDisabler] = useState(false)
    const [sendBtnLoading, setSendBtnLoading] = useState(false)
    const [resetBtnLoading, setResetBtnLoading] = useState(false)
    const [sendOTPText, setsendOTPText] = useState("Send OTP")
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [textfieldDisabler, setTextfieldDisabler] = useState(true)


    const navigate = useNavigate()
    const handleChange = (event) => {
        setUser(event.target.value);
    };


    const sendOTP = () => {
        if (user === "") {
            sweetAlertShow("Please Select User", "info")
            return;
        }
        setSendBtnLoading(true);
        setsendOTPText("Sending OTP...")


        const dataTosend = { "user": "admin" }
        
        axios.post(Helpers().apiURL + "/email", dataTosend).then((response) => {
            if (response.data.success) {
                setbuttonVisblity(true)
                setOtpDB(response.data.message)
                sweetAlertShow("OTP has been sent to your Registered Email", "info")
                setTextfieldDisabler(false)
                setSelectDisabler(true)
                setSendBtnLoading(false);
                setsendOTPText("Send OTP")
            }
            else {
                sweetAlertShow("Server Down!!Please Contact Netcom", "warning")
                setSendBtnLoading(false);
                setsendOTPText("Send OTP")
            }
        })
    }

    const resetPassword = () => {
        setResetBtnLoading(true)
        if (password.length === 0) {
            sweetAlertShow("Please fill all the Details", "info")
            setResetBtnLoading(false)
            return;
        }

        if (password === confirmPassword) {
            if (otp === otpDB) {
                const dataToSend = { "user": "admin", "username": user, "password": password }
                axios.post(Helpers().apiURL + "/resetUserCreational", dataToSend).then((response) => {
                    if (response.data.message.matchedCount === 1) {
                        setResetBtnLoading(false)
                        sweetAlertShow(user + ' Password is Updated', "success")
                        navigate('/');
                        setResetBtnLoading(false)
                    }
                })
            }
            else {
                setResetBtnLoading(false)
                setbuttonVisblity(false)
                setsendOTPText("Resend OTP")
                sweetAlertShow("Please Enter Valid OTP", "warning")
            }
        }
    }


    const sweetAlertShow = (message, mode) => {
        swal.fire({ title: message, text: "", icon: mode, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', }).then((willWarn) => {
            if (willWarn.isConfirmed) {
                return
            }
        });
    }


    return (
        <>
            <div style={{ justifyContent: 'center', display: "flex" }} >
                <Card elevation={10} style={{ marginTop: "5%" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "#F9F3F3" }}>
                        <Typography variant="h6" style={{ backgroundColor: "#333333", padding: "2%", textAlign: "center", width: "100%", color: "white" }}>Reset Password</Typography>

                        <div style={{ display: 'flex', padding: "5%", flexDirection: 'row', justifyContent: 'space-between' }}>
                            <FormControl variant="outlined" size="small" style={{ width: "100%" }} disabled={selectDisabler}   >
                                <InputLabel  >Select User</InputLabel>
                                <Select label="Select User" value={user} onChange={handleChange}   >
                                    <MenuItem value={"admin"}>admin</MenuItem>
                                    <MenuItem value={"user"}>user</MenuItem>
                                </Select>
                            </FormControl>
                            <LoadingButton loading={sendBtnLoading} loadingPosition="end" variant="contained" style={{ width: "50%", marginLeft: "1%", backgroundColor: "#333333", color: "white" }} disabled={buttonVisblity} onClick={() => { sendOTP() }}>{sendOTPText} </LoadingButton>
                        </div>

                        <div style={{ display: "textfieldVisblity" }}>
                            <div style={{ padding: "5%" }}>
                                <TextField size="small" disabled={textfieldDisabler} variant="outlined" label="Enter OTP" style={{ width: '100%' }} onChange={(e) => setOtp(e.target.value)} />
                                <FormControl disabled={textfieldDisabler} size="small" style={{ width: '100%', marginTop: "5%" }}  variant="outlined">
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                     label="Password"
                                        type={showPass ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={()=>{showPass?setShowPass(false):setShowPass(true)}}
                                                    edge="end"
                                                >
                                                    {showPass ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>


                                <FormControl disabled={textfieldDisabler} size="small" style={{ width: '100%', marginTop: "5%" }}  variant="outlined">
                                    <InputLabel>Confirm Password</InputLabel>
                                    <OutlinedInput
                                    label="Confirm Password"
                                        type={showConfirmPass ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={()=>{showConfirmPass?setShowConfirmPass(false):setShowConfirmPass(true)}}
                                                    edge="end"
                                                >
                                                    {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>

                                <div style={{ display: "flex" }}>

                                    <LoadingButton variant="contained" style={{ width: '100%', marginTop: "5%", backgroundColor: "white", color: "grey" }} onClick={() => { navigate("/") }} >Back</LoadingButton>
                                    <LoadingButton loading={resetBtnLoading} loadingPosition="end" disabled={textfieldDisabler} variant="contained" style={{ width: '100%', marginTop: "5%", backgroundColor: "#333333", color: "white", marginLeft: "2%" }} onClick={() => resetPassword()}>Reset</LoadingButton>

                                </div>

                            </div>

                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
