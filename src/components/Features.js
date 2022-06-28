import React from 'react'
import CustomerManagement from '../images/landingPageImages/FeaturesImage/CustomerManagement.svg'
import FitInAllDevice from '../images/landingPageImages/FeaturesImage/FitInAllDevice.svg'
import ReportGeneration from '../images/landingPageImages/FeaturesImage/ReportGeneration.svg'
import QuickOrder from '../images/landingPageImages/FeaturesImage/QuickOrder.svg'
import OneTimeMeasurement from '../images/landingPageImages/FeaturesImage/OneTimeMeasurement.svg'
import MobileApp from '../images/landingPageImages/FeaturesImage/MobileApp.svg'
import InteractiveCharts from '../images/landingPageImages/FeaturesImage/InteractiveCharts.svg'
import GSTBilling from '../images/landingPageImages/FeaturesImage/GSTBilling.svg'
import { Typography, Box, Stack } from '@mui/material'
import { styled } from '@mui/system'
import Fonts from '../constants/Fonts'
import Colors from '../constants/Colors'


export default function Features() {

  const TitleHeadDiv = styled("div")(({ theme }) => ({
    display: "flex",
    paddingLeft: "5%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "5%",
    marginBottom: '1%'
  }));

  const myData = [
    {
      title: 'Customer Management',
      content: 'Keep a Data of Customer’s Names, Address, Phone Numbers and Measurements for future',
      image: CustomerManagement
    },
    {
      title: 'Quick Order Placement',
      content: 'Say Good Bye to Paper Works. Now Store Your Orders in Digital Form',
      image: QuickOrder
    },
    {
      title: 'Interactive Charts',
      content: 'Interactive Charts for Analysing Income & Sales',
      image: InteractiveCharts
    },
    {
      title: 'GST Billing & Discount',
      content: 'Bills will be Generated automatically for the Order. GST & Discount Options Available',
      image: GSTBilling
    },
    {
      title: 'Report Generation',
      content: 'Get a comprehensive report on the overall sales and orders you have received over the past few months and years',
      image: ReportGeneration
    },
    {
      title: 'One Time Measurement',
      content: 'Once Measurement Loaded, Same Measurement can used for All Orders.',
      image: OneTimeMeasurement
    },
    {
      title: 'Mobile App for Customers',
      content: 'Mobile App for Customers for tracking Orders',
      image: MobileApp
    },
    {
      title: 'Fits in All Devices',
      content: 'Can be viewed in all Laptops, Tablets & Mobile Phones',
      image: FitInAllDevice
    },
  ]

  return (
    <div >
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
          Features
        </Typography>
        <Stack
          direction={'row' }
          justifyContent={"center"}
          alignItems={"center"}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ flexWrap: "wrap" }}
          gap={10}
        >
          {
            myData.map((obj, i) => (
              <Stack
                key={i}
                direction={"column"}
                width={300}
                alignItems={"center"}
                gap={2}
              >
                <div >
                  <img src={obj.image} />
                </div>
                <div >
                  <Typography
                    fontSize={{ lg: 22, md: 20, sm: 20, xs: 20 }}
                    sx={{ color: Colors.MAIN_THEME_COLOR, textAlign: 'center', fontWeight: 'bold', fontFamily: Fonts.MAIN_FONT, }}> {obj.title} </Typography>
                </div>
                <div >
                  <Typography
                    fontSize={{ lg: 18, md: 18, sm: 18, xs: 18 }}
                    sx={{ textAlign: 'center', fontFamily: Fonts.MAIN_FONT, }}> {obj.content} </Typography>
                </div>
              </Stack>
            ))
          }
        </Stack>
      </Box>
    </div>
  )
}
