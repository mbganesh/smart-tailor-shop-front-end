import {Button, Card, InputAdornment, makeStyles, TextField, Typography, Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slide from '@material-ui/core/Slide';
import AppbarHead from './AppbarHead';
import Helpers from './Helpers'
import { Colors, Fonts } from "./constants";
import store from "store2";
import { useNavigate } from "react-router";


const bgColor = "#df9fa8"
const styles = makeStyles((theme) => ({
  root: {
      backgroundColor: Colors.RATE_LIGHT_COLOR,
      overflow: "hidden",
      minHeight: "100vh",
      maxWidth: "100vw",
      backgroundRepeat: "no-repeat"
  },
  headText: {
    marginLeft: '3%',
    paddingTop: "1%",
    color: Colors.RATE_MAIN_COLOR, fontWeight: "bold", fontSize: 24, fontFamily: Fonts.UBUNTU, 
  },
  appMidTextStyle: {
    marginLeft: '3%',
    paddingTop: "1%",
    color: "#A93847",
    fontWeight: "bold",
  },
  cardTitleStyle: {
    textAlign: "center",
    fontSize: "18px",
    backgroundColor: "#068587",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",

  },
  blousecardTitleStyle: {
    textAlign: "center",
    fontSize: "18px",
    backgroundColor: "#00629E",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  textField: {
    backgroundColor: 'white',
    "& .MuiOutlinedInput-root": {
      paddingLeft: 0,

    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#B5EBB9', // Semi-transparent underline
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#068587', // Solid underline on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#068587', // Solid underline on focus
    },
    '& .MuiInput-input': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
    }
  }
  },
  textFieldBlouse: {
    backgroundColor: 'white',
    "& .MuiOutlinedInput-root": {
      paddingLeft: 0,

    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#619BD0', // Semi-transparent underline
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#00629E', // Solid underline on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00629E', // Solid underline on focus
    },
    '& .MuiInput-input': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
    }
  }

  },

  textFieldShirt: {
    backgroundColor: 'white',
    "& .MuiOutlinedInput-root": {
      paddingLeft: 0,

    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#619BD0', // Semi-transparent underline
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#00629E', // Solid underline on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00629E', // Solid underline on focus
    },
    '& .MuiInput-input': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
    }
  }

  },



  adornment: {
    backgroundColor: "#068587",
    width: "550px",
    paddingTop: "17.5px",
    paddingBottom: "17.5px",
    paddingLeft: "10px",
  },
  blouseadornment: {
    backgroundColor: "#00629E",
    width: "550px",
    paddingTop: "17.5px",
    paddingBottom: "17.5px",
    paddingLeft: "10px",

  },
  shirtadornment: {
    backgroundColor: "#00629E",
    width: "550px",
    paddingTop: "17.5px",
    paddingBottom: "17.5px",
    paddingLeft: "10px",

  }
}));

function RatesUpdater() {
  const classes = styles();
  const navigate = useNavigate();
  const [salwarTextFieldDisabler, setSalwarTextFieldDisabler] = useState('');
  const [blouseTextFieldDisabler, setBlouseTextFieldDisabler] = useState('');
  const [shirtTextFieldDisabler, setshirtTextFieldDisabler] = useState('');
  const [pantTextFieldDisabler, setpantTextFieldDisabler] = useState('');

  const [btnSalwarCancel, setBtnSalwarCancel] = useState("none");
  const [btnBlouseCancel, setBtnBlouseCancel] = useState("none");
  const [btnShirtCancel, setbtnShirtCancel] = useState("none");
  const [btnPantCancel, setbtnPantCancel] = useState("none");

  const [salwarBtnName, setSalwarBtnName] = useState("Edit");
  const [blouseBtnName, setBlouseBtnName] = useState("Edit");
  const [shirtBtnName, setshirtBtnName] = useState("Edit");
  const [pantBtnName, setpantBtnName] = useState("Edit");

  const [blousecostkeys] = useState(['Basic', 'With Lining', 'Without Lining', 'Rope', 'Zip', 'Piping - Neck', 'Piping - Neck Sleeve', 'Double Piping - Neck Sleeve', 'Trible Piping - Neck Sleeve', 'Straight Cut', 'Cross Cut', 'Katori Cut',  'Princess Cut',"Boat - Neck", "Collar - Neck", "Saree Falls", "Tazzles"]);
  const [salwarcostkeys] = useState(['Basic', 'With Lining', 'Without Lining', 'Piping - Neck', 'Piping - Neck Sleeve','Side Slit', 'Pocket', 'Rope', 'Zip', 'With Elastic',"Boat - Neck", "Collar - Neck", "Parallel Elastic|Belt"]);
  const [shirtcostkeys] = useState(['Basic']);
  const [pantcostkeys] = useState(['Basic']);

  const [salwarcostlist, setsalwarcostlist] = useState({});
  const [blousecostlist, setblousecostlist] = useState({});
  const [shirtcostlist, setshirtcostlist] = useState({});
  const [pantcostlist, setpantcostlist] = useState({});

  const salwarItemsList = ["Basic"]
  const salwarItemsUtilitiesList = ["Pocket", "Rope", "Zip", "With Elastic"]
  const salwarItemsLiningList = ["With Lining", "Without Lining"]
  const salwarItemsPipingList = ["Piping - Neck", "Piping - Neck Sleeve", "Side Slit"]
  const salwarItemsNeckList = ["Boat - Neck", "Collar - Neck"]
  const salwarItemsPantList = ["Parallel Elastic|Belt"]

  const blouseItemsList = ["Basic"]
  const blouseItemsLiningList = ["With Lining", "Without Lining"]
  const blouseItemsUtilitiesList = ["Rope", "Zip", "Saree Falls", "Tazzles"]
  const blouseItemsPipingList = ["Piping - Neck", "Piping - Neck Sleeve", "Double Piping - Neck Sleeve", "Trible Piping - Neck Sleeve"]
  const blouseItemsCutList = ["Straight Cut", "Cross Cut", "Katori Cut", "Princess Cut"]
  const blouseItemsNeckList = ["Boat - Neck", "Collar - Neck"]

  const shirtItemList = ["Basic"]

  const pantItemList = ["Basic"]

  const onBtnClick = (buttonName, dress) => {
    if (dress === "blouse" && buttonName === "Edit") {
      setBlouseTextFieldDisabler(true)
      setBlouseBtnName("Update")
      setBtnBlouseCancel("")
      return
    }
    if (dress === "salwar" && buttonName === "Edit") {
      setSalwarTextFieldDisabler(true)
      setSalwarBtnName("Update")
      setBtnSalwarCancel("")
      return
    }

    if (dress === "shirt" && buttonName === "Edit") {
      setshirtTextFieldDisabler(true)
      setshirtBtnName("Update")
      setbtnShirtCancel("")
      return
    }

    if (dress === "pant" && buttonName === "Edit") {
      setpantTextFieldDisabler(true)
      setpantBtnName("Update")
      setbtnPantCancel("")
      return
    }



    if (dress === "pant" && buttonName === "Update") {
      var temppanttypedkeys = Object.keys(pantcostlist);
      if (temppanttypedkeys.length === pantcostkeys.length) {
        let pantupdateJson = {
          user: "admin",
          pantCost: pantcostlist
        };
        axios
          .post(Helpers().apiURL + "/insertPantCost", pantupdateJson)
          .then((response) => {
            setpantTextFieldDisabler('')
            setpantBtnName("Edit")
            setbtnPantCancel("none")
          });
      } else {
        alert("Please fill all the fields");
      }
    }



    if (dress === "shirt" && buttonName === "Update") {
      var tempshirttypedkeys = Object.keys(shirtcostlist);
      if (tempshirttypedkeys.length === shirtcostkeys.length) {
        let shirtupdateJson = {
          user: "admin",
          shirtCost: shirtcostlist
        };

        axios
          .post(Helpers().apiURL + "/insertShirtCost", shirtupdateJson)
          .then((response) => {
            setshirtTextFieldDisabler('')
            setshirtBtnName("Edit")
            setbtnShirtCancel("none")
          });
      } else {
        alert("Please fill all the fields");
      }
    }



    if (dress === "blouse" && buttonName === "Update") {
      var tempblousetypedkeys = Object.keys(blousecostlist);
      if (tempblousetypedkeys.length === blousecostkeys.length) {
        let blouseupdateJson = {
          user: "admin",
          blouseCost: blousecostlist
        };
        axios
          .post(Helpers().apiURL + "/insertBlouseCost", blouseupdateJson)
          .then((response) => {
            setBlouseTextFieldDisabler('')
            setBlouseBtnName("Edit")
            setBtnBlouseCancel("none")
          });
      } else {
        alert("Please fill all the fields");
      }
    }


    if (dress === "salwar" && buttonName === "Update") {
      var tempsalwartypedkeys = Object.keys(salwarcostlist);
      if (tempsalwartypedkeys.length === salwarcostkeys.length) {
        let salwarupdateJson = { user: "admin", salwarCost: salwarcostlist }
        axios
          .post(Helpers().apiURL + "/insertSalwarCost", salwarupdateJson)
          .then((response) => {
            setSalwarTextFieldDisabler('')
            setSalwarBtnName("Edit")
            setBtnSalwarCancel("none")
          });
      } else {
        alert("Please fill all the fields");
        return
      }
    }
  }


  const onCancelBtnClick = (buttonName) => {
    onSalwarBlouseCostRate();
    if (buttonName === "blouse") {
      setBlouseTextFieldDisabler('')
      setBlouseBtnName("Edit")
      setBtnBlouseCancel("none")
    }
    else if(buttonName === "salwar"){
      setSalwarTextFieldDisabler('')
      setSalwarBtnName("Edit")
      setBtnSalwarCancel("none")
    }
    else if(buttonName === "shirt"){
      setshirtTextFieldDisabler('')
      setshirtBtnName("Edit")
      setbtnShirtCancel("none")
    }
    else{
      setpantTextFieldDisabler('')
      setpantBtnName("Edit")
      setbtnPantCancel("none")
    }
  }
  const onSalwarBlouseCostRate =()=>{
    var dataToSend = { user: "admin" };
    try {
      axios
        .post(Helpers().apiURL + "/viewBlouseSalwarLastInsert", dataToSend)
        .then(function (response) {
          if(response.data.message.length!==0){
      
            setsalwarcostlist(response.data.message[0]['salwarCost']);
            setblousecostlist(response.data.message[1]['blouseCost']);
            setshirtcostlist(response.data.message[2]['shirtCost']);
            setpantcostlist(response.data.message[3]['pantCost']);
          }
         
        });
    }
    catch (err) {
      
      alert("server down")
    }
  }

  const onRateUpdaterValueSet = (e, text) => {
    setsalwarcostlist((prevState) => ({
      ...prevState, [text]: parseInt(e.target.value),
    }))
  }
  const onblouseRateUpdaterValueSet = (e, text) => {
    setblousecostlist((prevState) => ({
      ...prevState, [text]: parseInt(e.target.value),
    }))
  }

  const onshirtRateUpdaterValueSet = (e,text) => {
    setshirtcostlist((prevState) => ({
      ...prevState, [text]: parseInt(e.target.value),
    }))
  }

  const onpantRateUpdaterValueSet = (e,text) => {
    setpantcostlist((prevState) => ({
      ...prevState, [text]: parseInt(e.target.value),
    }))
  }
  const sessionCheck = () => {
    let currentDateTime = new Date();
    let sessionDateTime = store.session("date");

    if (sessionDateTime > currentDateTime.toISOString()) {
      console.log(true)
    }
    else {
      navigate("/");
      return
      
    }
  }

  useEffect(() => {
    sessionCheck()
    onSalwarBlouseCostRate();
  
  }, []);
  return (
    <div className={classes.root}>
       <div>
        <AppbarHead dataParent={{appBtnColor:"rgba(220, 59, 81, 0.7)",appBtnText:"Rate Updater"}} />
      </div>
      <Typography  className={classes.headText}>
        Rate Updater
      </Typography>
      <div style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}>
        <Card square='true' elevation="5">
          <div style={{ backgroundColor: '#068587' }}>
            <Typography className={classes.cardTitleStyle} variant="subtitle1" >Salwar</Typography>
          </div>
          <Slide direction="left" in='true'>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#068587' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Basic</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#B5EBB9' }} >
                  {salwarItemsList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField    
                          value={salwarcostlist[text]}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textField}
                          type='number'
                          inputProps={{ readonly: salwarTextFieldDisabler }}
                          onChange={(e) => { onRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.adornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>

                    </div>
                  ))
                  }
                </div>
              </Box>
              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#068587' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Utilities List</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#B5EBB9' }} >
                  {salwarItemsLiningList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>

                        <TextField
                          type='number'
                          value={salwarcostlist[text]}
                          inputProps={{ readonly: salwarTextFieldDisabler }}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textField}
                          onChange={(e) => { onRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.adornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>
                    </div>
                  ))
                  }
                </div>
              </Box>

              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#068587' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Piping List</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#B5EBB9' }} >
                  {salwarItemsPipingList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                        type='number'
                          value={salwarcostlist[text]}
                          inputProps={{ readonly: salwarTextFieldDisabler }}
                          style={{ margin: "10px", width: "300px" }}
                          className={classes.textField}
                          onChange={(e) => { onRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.adornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>
                    </div>
                  ))
                  }
                </div>
              </Box>

              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#068587' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Lining </Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#B5EBB9' }} >
                  {salwarItemsUtilitiesList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                        type='number'
                          value={salwarcostlist[text]}
                          inputProps={{ readonly: salwarTextFieldDisabler }}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textField}
                          onChange={(e) => { onRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.adornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 34, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>
                    </div>
                  ))
                  }
                </div>
              </Box>

              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#068587' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Neck</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#B5EBB9' }} >

                  {salwarItemsNeckList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                        type='number'
                          value={salwarcostlist[text]}
                          inputProps={{ readonly: salwarTextFieldDisabler }}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textField}
                          onChange={(e) => { onRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.adornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 34, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>

                    </div>
                  ))
                  }
                </div>
              </Box>

              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#068587' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Pant</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#B5EBB9' }} >

                  {salwarItemsPantList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                        type='number'
                          value={salwarcostlist[text]}
                          inputProps={{ readonly: salwarTextFieldDisabler }}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textField}
                          onChange={(e) => { onRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.adornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 34, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>

                    </div>
                  ))
                  }
                </div>
              </Box>

            </div>
          </Slide>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
            <Button variant="contained" style={{ backgroundColor: "#068587", color: "white", maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }} onClick={() => { onBtnClick(salwarBtnName, "salwar") }}>
              {salwarBtnName}
            </Button>
            <Button variant="outlined" style={{ color: "#068587", marginLeft: "10%", maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px', display: btnSalwarCancel }} onClick={() => { onCancelBtnClick("salwar") }}>
              Cancel
            </Button>
          </div>
        </Card>

      </div>

      <div style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 20 , paddingBottom: 20 }}>
        <Card square='true' elevation="5">
          <div style={{ backgroundColor: '#00629E' }}>
            <Typography className={classes.blousecardTitleStyle} variant="subtitle1" >Blouse</Typography>
          </div>
          <Slide direction="right" in='true'>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>


              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#00629E' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Basic</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#619BD0' }} >

                  {blouseItemsList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>

                        <TextField
                        type='number'
                        value={blousecostlist[text]}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textFieldBlouse}
                          inputProps={{readonly:blouseTextFieldDisabler}}
                          onChange={(e) => { onblouseRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.blouseadornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>

                    </div>
                  ))
                  }
                </div>
              </Box>
              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#00629E' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Lining </Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#619BD0' }} >
                  {blouseItemsLiningList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                        type='number'
                        value={blousecostlist[text]}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textFieldBlouse}
                          inputProps={{ readonly: blouseTextFieldDisabler }}
                          onChange={(e) => { onblouseRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.blouseadornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>

                    </div>
                  ))
                  }
                </div>
              </Box>
              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#00629E' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Utilities List</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#619BD0' }} >
                  {blouseItemsUtilitiesList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>

                        <TextField
                        type='number'
                        value={blousecostlist[text]}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textFieldBlouse}
                          inputProps={{readonly:blouseTextFieldDisabler}}
                          onChange={(e) => { onblouseRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.blouseadornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>

                    </div>
                  ))
                  }
                </div>
              </Box>
              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#00629E' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Piping List</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#619BD0' }} >
                  {blouseItemsPipingList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                        type='number'
                        value={blousecostlist[text]}
                          style={{ margin: "10px", width: "320px" }}
                          className={classes.textFieldBlouse}
                          inputProps={{readonly:blouseTextFieldDisabler}}
                          onChange={(e) => { onblouseRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.blouseadornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>
                    </div>
                  ))
                  }
                </div>
              </Box>

              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#00629E' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Cut List</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#619BD0' }} >
                  {blouseItemsCutList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                        type='number'
                        value={blousecostlist[text]}
                          style={{ margin: "10px", width: "320px" }}
                          className={classes.textFieldBlouse}
                          inputProps={{readonly:blouseTextFieldDisabler}}
                          onChange={(e) => { onblouseRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.blouseadornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>
                    </div>
                  ))
                  }
                </div>
              </Box>

              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#00629E' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Neck</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#619BD0' }} >
                  {blouseItemsNeckList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                        type='number'
                        value={blousecostlist[text]}
                          style={{ margin: "10px", width: "320px" }}
                          className={classes.textFieldBlouse}
                          inputProps={{readonly:blouseTextFieldDisabler}}
                          onChange={(e) => { onblouseRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.blouseadornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>
                    </div>
                  ))
                  }
                </div>
              </Box>


            </div>
          </Slide>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
            <Button variant="contained" style={{ backgroundColor: "#00629E", color: "white", maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }} onClick={() => { onBtnClick(blouseBtnName, "blouse") }}>
              {blouseBtnName}
            </Button>
            <Button variant="outlined" style={{ color: "#00629E", marginLeft: "10%", maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px', display: btnBlouseCancel }} onClick={() => { onCancelBtnClick("blouse") }}>
              Cancel
            </Button>
          </div>
        </Card>
      </div>





    
      <div style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 20 , paddingBottom: 20, display:"none"  }}>
        <Card square='true' elevation="5">
          <div style={{ backgroundColor: '#00629E' }}>
            <Typography className={classes.blousecardTitleStyle} variant="subtitle1" >Shirt</Typography>
          </div>
          <Slide direction="right" in='true'>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#00629E' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Basic</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#619BD0' }} >

                  {shirtItemList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                          type='number'
                          value={shirtcostlist[text]}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textFieldShirt}
                          inputProps={{readonly:shirtTextFieldDisabler}}
                          onChange={(e) => { onshirtRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.shirtadornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>

                    </div>
                  ))
                  }
                </div>
              </Box>
            </div>
          </Slide>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
            <Button variant="contained" style={{ backgroundColor: "#00629E", color: "white", maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }} onClick={() => { onBtnClick(shirtBtnName, "shirt") }}>
              {shirtBtnName}
            </Button>
            <Button variant="outlined" style={{ color: "#00629E", marginLeft: "10%", maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px', display: btnShirtCancel }} onClick={() => { onCancelBtnClick("shirt") }}>
              Cancel
            </Button>
          </div>
        </Card>
      </div> 




      <div style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 20 , paddingBottom: 20, display:"none" }}>
        <Card square='true' elevation="5">
          <div style={{ backgroundColor: '#00629E' }}>
            <Typography className={classes.blousecardTitleStyle} variant="subtitle1" >Pant</Typography>
          </div>
          <Slide direction="right" in='true'>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                <div style={{ backgroundColor: '#00629E' }}>
                  <Typography style={{ fontWeight: "bold", color: 'white', marginLeft: 10 }} variant="subtitle1" >Basic</Typography>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'space-evenly', backgroundColor: '#619BD0' }} >

                  {pantItemList.map((text, textFieldIndex) => (
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <TextField
                        type='number'
                        value={pantcostlist[text]}
                          style={{ margin: "10px", width: "250px" }}
                          className={classes.textFieldShirt}
                          inputProps={{readonly:pantTextFieldDisabler}}
                          onChange={(e) => { onpantRateUpdaterValueSet(e, text) }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment className={classes.shirtadornment} position="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'white' }} >{text}</div>
                                <div style={{ backgroundColor: 'white', marginLeft: 10, height: 33, border: '1px solid white' }}><p style={{ marginLeft: 10, marginTop: 10 }}>₹</p></div>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>

                    </div>
                  ))
                  }
                </div>
              </Box>
            </div>
          </Slide>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
            <Button variant="contained" style={{ backgroundColor: "#00629E", color: "white", maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px' }} onClick={() => { onBtnClick(pantBtnName, "pant") }}>
              {pantBtnName}
            </Button>
            <Button variant="outlined" style={{ color: "#00629E", marginLeft: "10%", maxWidth: '90px', maxHeight: '40px', minWidth: '90px', minHeight: '40px', display: btnPantCancel }} onClick={() => { onCancelBtnClick("pant") }}>
              Cancel
            </Button>
          </div>
        </Card>
      </div> 



    </div>
  );
}
export default RatesUpdater;
