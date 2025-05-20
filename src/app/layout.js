"use client";
import { ThemeProvider, } from "@mui/material";
import React, { useState } from "react";
import theme from "./themeprovider";
import "./globals.css";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AddIcon from "@mui/icons-material/Add";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL_WECARE,
  API_KEY_CLOUDCRAFT,
  AppName,
  TextColor,
  FontType,
  NavigationTextSize,
  MainMenuList,
  SubMenuList,
  DrawerBackgroundColor,
  TopBarColor,
  DrawerBackgroundHoverColor,
} from "./supabase";

const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_CLOUDCRAFT);

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);

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
      window.location.href = "/login";
    }
  };

  const DrawerList = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        overflow: "auto",
        minHeight: "100vh",
      }}
      className={` bg-[url(./background4.svg)] `}
      role="presentation">
      <Button
        fullWidth={true}
        className="flex align-center justify-center mb-7"
        sx={{ textTransform: "none", padding: 0 }}
        href="/"
      >
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-600 via-emerald-500 w-full">
          <div
            style={{ fontFamily: "cursive", fontWeight: "bolder", fontStyle: "italic", fontSize: "63px", rotate: "-7deg" }}
            className={`text-center justify-center text-cyan-50`}
          >
            {AppName}
          </div>
        </div>
      </Button>
      <div className="ml-1 mr-1 " style={{ backgroundColor: DrawerBackgroundColor }} >
        {MainMenuList.map((list, index) => (
          <Accordion
            key={index}
            elevation={0}
            className="bg-transparent"
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
                '&:hover': {
                  backgroundColor: DrawerBackgroundHoverColor,

                }
              }}
              onClick={() => localStorage.setItem("gender", list.name)}
              expandIcon={<AddIcon style={{ width: "15px", height: "15px" }} className={`${TextColor}`} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography
                style={{ fontFamily: FontType }} className={`${TextColor} text-${NavigationTextSize}`}
                component="span">{list.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <List className="grid grid-flow-row gap-0">
                  {list.menu.map((submenubutton, subIndex) => (
                    <ListItemButton
                      className={`${TextColor} rounded-sm`}

                      sx={{
                        '&:hover': {
                          backgroundColor: DrawerBackgroundHoverColor,

                        }
                      }}
                      key={subIndex}
                      href={submenubutton.path}
                      onClick={() => { toggleDrawer(false); localStorage.setItem("category", submenubutton.name) }} // Close drawer on click
                    >
                      <div style={{ fontFamily: FontType }} className={`text-${NavigationTextSize}`}>{submenubutton.name}</div>
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
        <List className="p-0">
          {SubMenuList.map((menuItem, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                className={`${TextColor}`}
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
            </ListItem>
          ))}
        </List>
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
        </ListItemButton>
      </div>
      <div className="grid grid-cols-3 gap-1 mt-5 w-full" style={{ position: "absolute", bottom: "50px", left: "1.5px", right: "1.5px" }}>
        <IconButton><InstagramIcon className="flex align-center mx-auto text-cyan-950" sx={{ fontSize: "30px" }} /></IconButton>
        <IconButton><FacebookIcon className="flex align-center mx-auto text-cyan-950" sx={{ fontSize: "30px" }} /></IconButton>
        <IconButton><WhatsAppIcon className="flex align-center mx-auto text-cyan-950" sx={{ fontSize: "30px" }} /></IconButton>
      </div>
    </Box>
  );

  return (
    <html lang="en" className="flex h-full items-center justify-center">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <body
        className={`h-full w-full bg-[url(./background4.svg)] bg-repeat bg-cover bg-fixed`}
      >
        <div
          style={{ height: "44px" }}
          className={`fixed bg-gradient-to-r from-emerald-600 to-emerald-600 via-emerald-400 opacity-95 w-full z-30`}
        >
        </div>
        <div className="z-50 fixed my-auto left-1">
          <IconButton
            onClick={toggleDrawer(true)}
            size="medium">
            <MenuRoundedIcon
              className={`text-cyan-50`} />
          </IconButton>
        </div>
        <Drawer
          transitionDuration={{ enter: 600, exit: 600 }}
          disableScrollLock={true}
          open={open}
          onClose={toggleDrawer(false)}
        >
          {DrawerList}
        </Drawer>
        <div className="z-50 fixed my-auto right-1">
          <IconButton
            size="medium"
            href="/cart">
            <ShoppingCartIcon
              className={`text-cyan-50`} />
          </IconButton>
        </div>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
