import React from "react";
import { styled } from "@mui/system";
import { Typography, Box, Stack } from "@mui/material";
import ReactPlayer from "react-player";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

export default function AppDemo() {
 
  const VideoPanel = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  }));

  return (
    <Box >
      <Typography
        fontSize={{ lg: 34, md: 34, sm: 30, xs: 30 }}
        fontWeight="bold"
        color={Colors.MAIN_THEME_COLOR}
        textAlign="center"
        fontFamily={Fonts.MAIN_FONT}
        marginTop={10}
        marginBottom={5}
      >
        App Demo
      </Typography>

      <Stack alignItems={"center"} >
        <VideoPanel>
          <ReactPlayer
            width='100%'
            style={{ width: '100%' }}
            height="100%"
            config={{ file: { attributes: { controlsList: "nodownload" } }, }}
            url={"https://gdurl.com/NAfp"}
            controls
          ></ReactPlayer>
        </VideoPanel>
      </Stack>
    </Box>
  );
}
