import React from "react";
import { styled } from "@mui/system";
import { Typography, Card, CardContent, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

export default function PricingPlan() {
  const CardStyle = (theme) => ({
    width: "350px",
    height: "725px",
    margin: "5px 2.5px",
    [theme.breakpoints.up('md')]: {
      width: "400px",
    }
  });

  const DivStyle1 = styled("div")(({ theme }) => ({
    display: "flex",
    margin: "0 auto",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // width: "90%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
      // width: "67%",
      justifyContent: "space-evenly",
    },
    [theme.breakpoints.up("lg")]: {
      // width: "82%",
      justifyContent: "space-evenly",
    },
    [theme.breakpoints.up("xl")]: {
      // width: "67%",
      justifyContent: "space-evenly",
    },
  }));

  const smartTailor = [
    { title: "Smart Tailor Shop", rate: "FREE PLAN", color: "#96546F" },
    { title: "Smart Tailor Shop Pro", rate: "₹ 999 /month", color: "#7E8BB8" },
    {
      title: "Smart Tailor Shop Ulimate",
      rate: "₹ 1999 /month",
      color: "#C8892A",
    },
  ];

  const smartTailorProDetails = [
    "Customer Management",
    "Interactive Charts",
    "Report Generation",
    "Rates Updater",
    "Smart Billing",
    "Live Support",
    "Free Installation",
    "Fit in all Devices",
    "Stiching Team Login Panel",
    "Stiched Dress Image Updater",
    "Export Customer Details & Order Details as Excel File",
    "Separate App for Customers",
  ];

  const smartTailorOrders = [
    "50 Orders Limit",
    "1000 Orders Limit",
    "Unlimited Orders Placement",
  ];

  const smartTailorCustomers = [
    "50 Customers Limit",
    "1000 Customers Limit",
    "Unlimited Customers",
  ];

  return (
    <Box >
      <Typography
        fontSize={{ lg: 34, md: 34, sm: 30, xs: 30 }}
        fontWeight="bold"
        color={Colors.MAIN_THEME_COLOR}
        textAlign="center"
        fontFamily={Fonts.MAIN_FONT}
        marginTop={10}
        marginBottom={2}
      >
        Pricing Plans
      </Typography>

      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={{ xs: 3, sm: 3, md: 15 }}
        sx={{ flexWrap: "wrap" }}
        marginBottom={15}
      >
        {smartTailor.map((obj, index) => (
          <Card
            key={index}
            elevation={5}
            style={{ border: `2px solid ${obj.color}` }}
          >
            <CardContent>
              <Stack
                backgroundColor={obj.color}
                paddingTop={1}
                paddingBottom={1}
              >
                <Typography
                  fontFamily={Fonts.MAIN_FONT}
                  color={"white"}
                  textAlign={"center"}
                  fontSize={{ lg: 22, md: 20, sm: 20, xs: 20 }}
                >
                  {obj.title}
                </Typography>
                <Typography
                  fontFamily={Fonts.MAIN_FONT}
                  color={"white"}
                  textAlign={"center"}
                  fontSize={{ lg: 34, md: 34, sm: 30, xs: 30 }}
                  fontWeight={"bold"}
                >
                  {obj.rate}
                </Typography>
              </Stack>

              <Stack direction={"row"} mt={3}  >
                <CheckCircleIcon style={{ color: "green" }} />
                <Typography
                  variant="body1"
                  pl={1}
                  fontFamily={Fonts.MAIN_FONT}

                >
                  {smartTailorCustomers[index]}
                </Typography>
              </Stack>

              <Stack direction={"row"} mt={3}  >
                <CheckCircleIcon style={{ color: "green" }} />
                <Typography
                  variant="body1"
                  pl={1}
                  fontFamily={Fonts.MAIN_FONT}

                >
                  {smartTailorOrders[index]}
                </Typography>
              </Stack>

              {smartTailorProDetails.map((text, index) => (
                <Stack
                  mt={3}
                  direction={"row"}
                  key={index}
                >
                  {obj.title === "Smart Tailor Shop" && index > 7 ? (
                    <DangerousRoundedIcon style={{ color: "grey" }} />
                  ) : obj.title === "Smart Tailor Shop Pro" && index > 9 ? (
                    <DangerousRoundedIcon style={{ color: "grey" }} />
                  ) : (
                    <CheckCircleIcon style={{ color: "green" }} />
                  )}

                  <Typography
                    variant="body1"
                    fontFamily={Fonts.MAIN_FONT}
                    pl={1}
                    color={obj.title === "Smart Tailor Shop" && index > 7
                      ? "gray"
                      : obj.title === "Smart Tailor Shop Pro" &&
                        index > 9
                        ? "gray"
                        : "black"}

                  >
                    {text}
                  </Typography>
                </Stack>
              ))}
            </CardContent>
          </Card>
        ))}
      </Stack>

    </Box>
  );
}
