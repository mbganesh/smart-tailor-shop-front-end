import { IconButton, Typography } from "@mui/material";
import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import LocationIcon from "@mui/icons-material/FmdGood";
import MailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import {  styled } from "@mui/system";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

export default function FooterLandingPage() {

  const RootContainer  = styled("div")(({theme}) => ({
    backgroundColor: Colors.MAIN_THEME_COLOR,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }))

  const SingleContainer  = styled("div")(({theme}) => ({
    width:'350px', margin: "10px", padding: "10px" 
  }))

  const ConnectWithUs = [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/Netcom-Computers-Pvt-Ltd-112386218128697",
    },
    {
      icon: <LinkedInIcon />,
      link: "https://www.linkedin.com/company/netcom-computers-pvt-ltd/mycompany/",
    },
    {
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/netcomcomputers_official/",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/NetcomTvl",
    },
  ];

  return (
    <RootContainer>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <SingleContainer>
          <Typography
            variant="h5"
            sx={{ fontFamily: Fonts.MAIN_FONT, fontWeight: "bold" }}
          >
            Connect With Us
          </Typography>
          <div>
            {ConnectWithUs.map((obj, index) => (
              <IconButton
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => {
                  window.open(obj.link);
                }}
              >
                {obj.icon}
              </IconButton>
            ))}
          </div>
        </SingleContainer>

        <SingleContainer>
          <Typography
            variant="h5"
            sx={{ fontFamily: Fonts.MAIN_FONT, fontWeight: "bold" }}
          >
            Head Office
          </Typography>
          <div style={{ display: "flex", color: "white", marginTop: 5 }}>
            <LocationIcon style={{ marginRight: 15 }} />
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: Fonts.MAIN_FONT }}
            >
              No. 1/1, Nathan Street,<br/> Adikalapuram, Murugankurichi,
              Palayamkottai, <br/> Tirunelveli - 627 002
            </Typography>
          </div>

          <div style={{ display: "flex", color: "white", marginTop: 5 }}>
            <MailIcon style={{ marginRight: 15 }} />
            <Typography
              variant="subtitle2"
              sx={{ cursor: "pointer", fontFamily: Fonts.MAIN_FONT }}
              onClick={() => {
                window.open("mailto:info@ncpli.com",'_self');
              }}
            >
              info@ncpli.com
            </Typography>
            {/* mailto:xyz@yourapplicationdomain.com?subject=Me&body=Hello! */}
          </div>

          <div style={{ display: "flex", color: "white", marginTop: 5 }}>
            <PhoneIcon style={{ marginRight: 15 }} />
            <Typography
              variant="subtitle2"
              sx={{ cursor: "pointer", fontFamily: Fonts.MAIN_FONT }}
              onClick={() => {
                window.open("tel:7538862862",'_self');
              }}
            >
              {" "}
              +91 753 886 2862{" "}
            </Typography>
          </div>
        </SingleContainer>

        <SingleContainer>
          <Typography
            variant="h5"
            sx={{ fontFamily: Fonts.MAIN_FONT, fontWeight: "bold" }}
          >
            Corporate Office
          </Typography>
          <div style={{ display: "flex", color: "white", marginTop: 5 }}>
            <LocationIcon style={{ marginRight: 15 }} />
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: Fonts.MAIN_FONT }}
            >
              No. 5/3, Second Floor,<br/> Kush Kumar Road, Nungambakkam, <br />
              Chennai - 600 034.
            </Typography>
          </div>

          <div style={{ display: "flex", color: "white", marginTop: 5 }}>
            <MailIcon style={{ marginRight: 15 }} />
            <Typography
              variant="subtitle2"
              sx={{ cursor: "pointer", fontFamily: Fonts.MAIN_FONT }}
              onClick={() => {
                window.open("mailto:info@ncpli.com" , '_self');
              }}
            >
              info@ncpli.com
            </Typography>
          </div>

          <div style={{ display: "flex", color: "white", marginTop: 5 }}>
            <PhoneIcon style={{ marginRight: 15 }} />
            <Typography
              variant="subtitle2"
              sx={{ cursor: "pointer", fontFamily: Fonts.MAIN_FONT }}
              onClick={() => {
                window.open("tel:04442125369",'_self');
              }}
            >
              {" "}
              044 - 421 253 69
            </Typography>
          </div>
        </SingleContainer>
      </div>

      <Typography
        sx={{
          fontFamily: Fonts.MAIN_FONT,
          textAlign: "center",
          whiteSpace:'nowrap',
          padding:'10px 0',
        }}
        variant='body2'
      >
        Designed & Developed by Netcom Computers Pvt. Ltd.
      </Typography>
    </RootContainer>
  );
}