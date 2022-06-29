import { Button, Typography } from "@mui/material";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import BGImage from "../images/landingPageImages/img.svg";
import { styled } from '@mui/material/styles';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import BasicDetailsModal from "./BasicDetailsModal";


const first = (theme) => ({
  fontWeight: "bold",
  color: Colors.MAIN_THEME_COLOR,
  fontSize: "32px",
  fontFamily: Fonts.MAIN_FONT,
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
});

const second = (theme) => ({
  color: "gray",
  fontSize: "26px",
  fontFamily: Fonts.MAIN_FONT,
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
});

const third = (theme) => ({
  fontWeight: "bold",
  color: Colors.MAIN_THEME_COLOR,
  fontSize: "32px",
  fontFamily: Fonts.MAIN_FONT,
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
});

const BuyNowButton = styled(Button)(({ theme }) => ({
  color: "#ffffff",
  marginTop: 15,
  width: 150, height: 40,
  fontFamily: Fonts.MAIN_FONT,
  backgroundColor: Colors.MAIN_THEME_COLOR,
  "&:hover": { backgroundColor: Colors.MAIN_THEME_COLOR },
  fontWeight: "bold",
  fontSize: 16,

  [theme.breakpoints.down("md")]: {
    width: 110, height: 30, fontSize:10
  },

}));


export default function Home() {
  const navigate = useNavigate()
  const sentence = [
    "Smart Tailor Shop",
    "A Complete Tailor Shop Management Software",
    
  ];


  console.log("reender")
  const [buyModalOpen, setBuyModalOpen] = useState(false)


  const onBuyNowBtnClick = () =>{
    console.log("Buy Btn Clicked")
    // setBuyModalOpen(true)
    navigate("/register")
  }

  useEffect(() => {
   
  }, [buyModalOpen])
  

  return (
    <div
      style={{
        padding: "10% 0 10% 5%",
        backgroundImage: `url(${BGImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {sentence.map((text) => (
        <div>
          <Typography
            sx={
              text === sentence[0]
                ? first
                : text === sentence[1]
                  ? second
                  : third
            }
          >
            {text}
          </Typography>
        </div>
      ))}
      <BuyNowButton onClick={onBuyNowBtnClick}>Get Started</BuyNowButton>

      {/* <BasicDetailsModal open = {buyModalOpen}  setOpen = {setBuyModalOpen}/> */}
    </div>
  );
}

