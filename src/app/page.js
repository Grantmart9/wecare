"use client"
import React, { useState, useEffect, useCallback } from "react";
import { SUPABASE_URL_WECARE, API_KEY_WECARE, Colors } from "./supabase";
import { createClient } from "@supabase/supabase-js";
import LoadingThreeDotsJumping from "./components/loading";
import { Button, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import * as motion from "motion/react-client"
import PeopleIcon from '@mui/icons-material/People';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HowItWorksAnimation from "./components/HowItWorksAnimation";
import FeaturedCauses from "./components/Featuredcauses";
import Homepage from "./pages/Homepage";
import DonatePage from "./pages/DonatePage";
import CommunityPage from "./pages/CommunityPage";
import SupportPage from "./pages/SupportPage";
import DashboardPage from "./pages/DashboardPage";
const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);


//// Data ////

// const DonationTypes = [
//   { name: "Goods", json: animationData1, color: Colors.red },
//   { name: "Cash", json: animationData3, color: Colors.blue },
//   { name: "Service", json: animationData2, color: Colors.yellow },
// ];

// const community =
//   [
//     { name: "Social media", icon: <InstagramIcon sx={{ color: "black" }} />, description: "Follow us on social media." },
//     { name: "Projects", icon: <FolderCopyIcon sx={{ color: "black" }} />, description: "Find a project you connect with." },
//     { name: "Upcoming events", icon: <EventIcon sx={{ color: "black" }} />, description: "Attend our awesome events." }
//   ]

// const AllGoodsDonations = [
//   { "name": "Clothing", "color": Colors.red },
//   { "name": "Non - perishable food", "color": Colors.red },
//   { "name": "Books & educatutional materials", "color": Colors.green },
//   { "name": "Electronics", "color": Colors.green },
//   { "name": "Furniture", "color": Colors.yellow },
//   { "name": "Medical supplies", "color": Colors.yellow },
//   { "name": "Toys & games", "color": Colors.orange },
//   { "name": "Hygiene", "color": Colors.orange },
//   { "name": "Household", "color": Colors.blue }
// ]

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData4,
//   rendererSettings: {
//     preserveAspectRatio: 'xMidYMid slice',
//   },
// };

const ImageDialog = ({ handleImage, image }) => {
  return (
    <>
      <Button
        sx={{
          textTransform: "none", bgcolor: Colors.orange, color: "gray",
          '&:hover': {
            backgroundColor: Colors.green,
            color: "white",
          }
        }}>
        <label style={{ cursor: 'pointer' }}>
          Upload a picture
          <input
            accept="image/*"
            type="file"
            onChange={handleImage}
            style={{ display: 'none' }}
          />
        </label>
      </Button>
      <div className="flex align-center justify-center">
        <img width={150} alt={image} src={image} />
      </div>
    </>)
}

export default function Home() {
  const [CurrentPage, setCurrentPage] = useState("Home")
  const [Data, setData] = useState("sdfbsakj");

  const handlePage = (Page) => { setCurrentPage(Page) }

  useEffect(() => {
    // Initialization code if needed
  }, []);

  return (
    <React.Fragment>
      <div className="fixed z-40 w-full bottom-0" >
        <div className="grid grid-flow-col gap-0 bg-gradient-to-r from-white to-gray-100 h-14">
          <IconButton onClick={() => setCurrentPage("Home")}><HomeIcon size="large" sx={{ color: "black" }} /></IconButton>
          <IconButton onClick={() => setCurrentPage("Donate")}><AddBoxOutlinedIcon size="large" sx={{ color: "black" }} /></IconButton>
          <IconButton onClick={() => setCurrentPage("Community")}><PeopleIcon size="large" sx={{ color: "black" }} /></IconButton>
          <IconButton onClick={() => setCurrentPage("Dashboard")}><PersonOutlinedIcon size="large" sx={{ color: "black" }} /></IconButton>
        </div>
      </div>

      <div className="block align-center justify-center" >
        {
          Data.length === 0 ?
            <>
              <LoadingThreeDotsJumping className="mx-auto my-auto" />
            </> :
            <>
              {CurrentPage === "Home" ? <Homepage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Donate" ? <DonatePage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Community" ? <CommunityPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Support" ? <SupportPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Dashboard" ? <DashboardPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
            </>
        }
      </div>
    </React.Fragment >
  );
}
