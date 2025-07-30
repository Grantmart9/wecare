"use client";
import { ThemeProvider, } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import theme from "./themeprovider";
import "./globals.css";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import * as motion from "motion/react-client"
import AddIcon from "@mui/icons-material/Add";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL_WECARE,
  API_KEY_WECARE,
  TextColor,
  FontType,
  NavigationTextSize,
  MainMenuList,
  SubMenuList,
  DrawerBackgroundColor,
  DrawerBackgroundHoverColor,
} from "./supabase";


const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);

const Pages = [{ "name": "Home", "url": "/" },
{ "name": "Projects", "url": "/projects" },
{ "name": "Events", "url": "/events" },
{ "name": "News", "url": "/news" }]

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [Data, setData] = useState("dkjabsj");

  // Memoized getInstruments function
  const getInstruments = useCallback(async () => {
    let query = supabase.from("landing").select();
    const { data } = await query;
    setData(data);
  }, []);

  useEffect(() => {
    //getInstruments();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error during logout:", error.message);
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("gender");
      localStorage.removeItem("category");
    }
  };

  const DrawerList = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0, // Add staggered delay based on index
        type: "spring",
        stiffness: 300,
        damping: 55,
        mass: 10,
        duration: 0.6,
      }} >
      <Box
        sx={{
          width: 280,
          height: "100%",
          overflow: "auto",
          minHeight: "100vh",
        }}
        className={` bg-gradient-to-r from-teal-700 to-teal-400 via-teal-500 `}
        role="presentation">
        <div className="ml-1 mr-1 " style={{ backgroundColor: DrawerBackgroundColor }} >
          {MainMenuList.map((list, index) => (
            <Accordion
              key={index}
              elevation={0}
              className="bg-transparent"
              disableGutters // Removes default margin and padding
              square // Keeps the accordion edges sharp (optional)
              slotProps={{
                transition: {
                  timeout: {
                    enter: 400, // milliseconds for entering
                    exit: 500,   // milliseconds for exiting
                  },
                },
              }}
            >
              <AccordionSummary
                sx={{
                  padding: "4px 8px !important", // Ensures small padding
                  minHeight: "36px !important", // Forces a smaller height
                  '&.Mui-expanded': {
                    minHeight: "36px !important", // Prevents height change on expand
                  },
                  '& > .MuiAccordionSummary-content': {
                    margin: "4px 0 !important", // Adjust margin of content
                  },
                  '&:hover': {
                    backgroundColor: DrawerBackgroundHoverColor,
                  },
                }}
                onClick={() => localStorage.setItem("gender", list.name)}
                expandIcon={<AddIcon style={{ width: "15px", height: "15px" }} className={`${TextColor}`} />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  style={{ fontFamily: FontType }}
                  className={`${TextColor} text-${NavigationTextSize}`}
                  component="span"
                >
                  {list.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: "8px !important", // Forces smaller padding
                }}
              >
                <Typography>
                  <List className="grid grid-flow-row gap-0">
                    {list.menu.map((submenubutton, subIndex) => (
                      <ListItemButton
                        className={`${TextColor} rounded-lg`}
                        sx={{
                          '&:hover': {
                            backgroundColor: DrawerBackgroundHoverColor,
                          },
                        }}
                        key={subIndex}
                        href={submenubutton.path}
                        onClick={() => { toggleDrawer(false); localStorage.setItem("category", submenubutton.name) }}
                      >
                        <div style={{ fontFamily: FontType }} className={`text-${NavigationTextSize}`}>
                          {submenubutton.name}
                        </div>
                      </ListItemButton>
                    ))}
                  </List>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <div
          className="ml-1 mr-1"
          style={{
            backgroundColor: DrawerBackgroundColor,
            position: "absolute",
            bottom: "100px",
            left: "1.5px",
            right: "1.5px"
          }}>
          <List className="grid grid-flow-row gap-0">
            {SubMenuList.map((menuItem, index) => (
              <ListItemButton
                key={index}
                className={`${TextColor} rounded-sm`}
                sx={{
                  minWidth: 250,
                  '&:hover': {
                    backgroundColor: DrawerBackgroundHoverColor,
                  }
                }}
                href={menuItem.path}
              >
                <div style={{ fontFamily: FontType }} className={`${TextColor} text-${NavigationTextSize}`}>{menuItem.name}</div>
              </ListItemButton>
            ))}
          </List>
          <List>
            {typeof window !== "undefined" && localStorage.getItem("user_id")?.length > 0 ? <div>
              <ListItemButton
                onClick={handleLogout}
                className={`${TextColor}`}
                sx={{
                  minWidth: 250,
                  '&:hover': {
                    backgroundColor: DrawerBackgroundHoverColor,
                  }
                }}
              >
                <div style={{ fontFamily: FontType }} className={`${TextColor} text-${NavigationTextSize}`}>Logout</div>
              </ListItemButton> </div> : <ListItemButton

                href={"/login"}
                className={`${TextColor}`}
                sx={{
                  minWidth: 250,
                  '&:hover': {
                    backgroundColor: DrawerBackgroundHoverColor,
                  }
                }}
              >
              <div style={{ fontFamily: FontType }} className={`${TextColor} text-${NavigationTextSize}`}>Login/Sign Up </div>
            </ListItemButton>}
          </List>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-5 w-full" style={{ position: "absolute", bottom: "50px", left: "1.5px", right: "1.5px" }}>
          <IconButton><InstagramIcon className="flex align-center mx-auto text-cyan-950" sx={{ fontSize: "30px" }} /></IconButton>
          <IconButton><FacebookIcon className="flex align-center mx-auto text-cyan-950" sx={{ fontSize: "30px" }} /></IconButton>
          <IconButton><WhatsAppIcon className="flex align-center mx-auto text-cyan-950" sx={{ fontSize: "30px" }} /></IconButton>
        </div>
      </Box>
    </motion.div>
  );

  return (
    <html lang="en" className="flex h-full items-center justify-center">
      <body
        className={`h-full w-full bg-gradient-to-br from-gray-50 to-white bg-fixed`}
      >
        <div
          style={{ backgroundColor: "transparent" }}
          className={`fixed  w-full  lg:block h-20 sm:h-20`}
        >
        </div>
        <Drawer
          transitionDuration={{ enter: 600, exit: 600 }}
          disableScrollLock={true}
          open={open}
          onClose={toggleDrawer(false)}
        >
          {DrawerList}
        </Drawer>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
