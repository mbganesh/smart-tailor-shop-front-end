import React from 'react'
import { styled } from "@mui/system";
import { Typography, Box } from '@mui/material';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

export default function About() {

  const myData = ' Application is a responsive and easy to use tailor shop management system that could help you manage your tailor shop business very well with customers, their measurements, orders & payments.'

  const TitleHeadDiv = styled("div")(({ theme }) => ({
    display: "flex",
    paddingLeft: "5%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "5%",
    margin: '1% 0'
  }));

  return (
    <div>
      <Box>
        <Typography
          fontSize={{ lg: 34, md: 34, sm: 30, xs: 30 }}
          fontWeight="bold"
          color={Colors.MAIN_THEME_COLOR}
          textAlign="center"
          fontFamily={Fonts.MAIN_FONT}
          marginTop={10}
          marginBottom={2}
        >
          About
        </Typography>


        <Typography
          fontSize={{ lg: 22, md: 20, sm: 20, xs: 20 }}
          textAlign="center"
          paddingLeft={2}
          paddingRight={2}
          color={"gray"}
          fontFamily={Fonts.MAIN_FONT}
        >

          <span style={{ fontWeight: "bold", color: Colors.MAIN_THEME_COLOR, }}>
            Smart Tailor Shop
          </span>
          {myData}
        </Typography>
      </Box>




    </div>
  )
}
