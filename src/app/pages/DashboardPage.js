"use client"
import React, { useState, useEffect } from "react";
import { Colors } from "../supabase";
import { Button, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from "next/image";
import * as motion from "motion/react-client"
import avatar from "../images/avatar.jpg";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LoginIcon from '@mui/icons-material/Login';

const DashboardPage = ({ handlePage }) => {

  const [DashPage, setDashPage] = useState("none")

  const AccountDetails = {
    "name": "Olivia Carter",
    "membership_start_date": "2024",
    "personal_information": {
      "email": "olivia.carter@gmail.com",
      "phone": "+27 74 289 3721"
    },
    "donation_history": {
      "total_donations": 12,
      "recent_activity": 24
    }
  }

  const handleDashPage = (selected) => { setDashPage(selected) }

  const DetailsPage = () => {
    const [edit, setEdit] = useState("ProfileView")

    const handleProfile = () => { setEdit("ProfileEdit") }

    const ProfileEdit = () => {
      return (
        <div className="grid grid-flow-row gap-2 mx-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 3 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 40,
              mass: 8,
              duration: 0.5
            }}>
            <Image src={avatar} alt="no image found" className="mx-auto rounded-full max-h-60 max-w-60" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 3 }}
            transition={{
              delay: 0.7,
              type: "spring",
              stiffness: 200,
              damping: 40,
              mass: 8,
              duration: 0.5
            }} className="grid grid-flow-row gap-1 mx-4">
            <div className="text-black text-2xl font-bold text-center">{AccountDetails.name}</div>
            <div className="text-black text-md font-bold text-center">Member since {AccountDetails.membership_start_date}</div>
            <div className="text-black text-md font-semibold text-left">Name</div>
            <TextField size="small" variant="outlined" sx={{ bgcolor: Colors.yellow }} />
            <div className="text-black text-md font-semibold text-left">Email</div>
            <TextField size="small" variant="outlined" sx={{ bgcolor: Colors.yellow }} />
            <div className="text-black text-md font-semibold text-left">Phone</div>
            <TextField size="small" variant="outlined" sx={{ bgcolor: Colors.yellow }} />
            <div className="text-black text-md font-semibold text-left">Location</div>
            <TextField size="small" variant="outlined" sx={{ bgcolor: Colors.yellow }} />
            <Button style={{ backgroundColor: Colors.green }} className="text-black text-md rounded-2xl mx-auto mt-4 mb-10" sx={{ textTransform: "none" }}>Save</Button>
          </motion.div>
        </div>
      )
    }
    const ProfileView = () => {
      return (
        <div className="grid grid-flow-row gap-3.5 mx-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 3 }}
            transition={{
              delay: 0.15,
              type: "tween",
              stiffness: 200,
              damping: 40,
              mass: 8,
              duration: 0.5
            }}>
            <Image src={avatar} alt="no image found" className="mx-auto rounded-full max-h-60 max-w-60" />
            <div className="text-black text-2xl font-bold text-center">{AccountDetails.name}</div>
            <div className="text-black text-md font-bold text-center">Member since {AccountDetails.membership_start_date}</div>
            <Button
              onClick={() => handleProfile()}
              style={{ backgroundColor: Colors.blue }}
              className="text-black text-md font-bold rounded-3xl w-full mt-4"
              sx={{ textTransform: "none" }}>
              Edit Profile
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 3 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 40,
              mass: 8,
              duration: 0.5
            }} className="grid grid-flow-row gap-2">
            <div className="text-black text-xl font-bold text-left mt-5">Personal Information</div>
            <div className="text-black text-md font-semibold text-left">Email</div>
            <div className="text-black text-sm font-light text-left">{AccountDetails.personal_information.email}</div>
            <div className="text-black text-md font-semibold text-left">Phone</div>
            <div className="text-black text-sm font-light text-left">{AccountDetails.personal_information.phone}</div>
            <div className="text-black text-xl font-bold text-left mt-5">Donation History</div>
            <div className="text-black text-md font-semibold text-left">Total Donations</div>
            <div className="text-black text-sm font-light text-left">{AccountDetails.donation_history.total_donations} items donated</div>
            <div className="text-black text-md font-semibold text-left">Recent Activity</div>
            <div className="text-black text-sm font-light text-left">{AccountDetails.donation_history.recent_activity} Hours ago</div>
            <Button style={{ backgroundColor: Colors.red }} className="text-black text-sm rounded-2xl mx-auto" sx={{ textTransform: "none" }}>Logout</Button>
          </motion.div>
          <div className="mb-10"></div>
        </div>
      )
    }

    return (
      <>
        {edit === "ProfileView" ?
          <><ProfileView /></> :
          <><ProfileEdit /></>}
      </>
    )
  }

  const PasswordPage = () => { return (<div className="text-center">Password page</div>) }
  const Dashboard = () => { return (<div className="text-center">Dashboard Page</div>) }
  const NotificationsPage = () => { return (<div className="text-center">Notifications Page</div>) }
  const PreferencesPage = () => { return (<div className="text-center">Preferences Page</div>) }
  const TermsPage = () => { return (<div className="text-center">Terms Page</div>) }
  const PolicyPage = () => { return (<div className="text-center">Policy Page</div>) }

  const ProfileSettings = [
    {
      name: "Account",
      buttons: [
        { icon: <PersonIcon fontSize="large" />, name: "Account Details", description: "Manage your personal information", page: "Details" },
        { icon: <LockIcon fontSize="large" />, name: "Password", description: "Change your password", page: "Password" },
        { icon: <DashboardIcon fontSize="large" />, name: "Dashboard", description: "Keep track of your donations", page: "Dashboard" }
      ]
    },
    {
      name: "Notifications",
      buttons: [
        { icon: <NotificationsIcon fontSize="large" />, name: "Notification Settings", description: "Customize your notification preferences", page: "Notifications" }
      ],
      hasToggle: true
    },
    {
      name: "App Settings",
      buttons: [
        { icon: <SettingsIcon fontSize="large" />, name: "App Preferences", description: "Manage your app preferences", page: "Preferences" }
      ]
    },
    {
      name: "Legal",
      buttons: [
        { icon: <DescriptionIcon fontSize="large" />, name: "Terms of Service", description: "View our terms of service", page: "Terms" },
        { icon: <PrivacyTipIcon fontSize="large" />, name: "Privacy Policy", description: "Read our privacy policy", page: "Policy" }
      ]
    }
  ];

  useEffect(() => {
    // getInstruments();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-8">
      {DashPage === "none" ?
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 3 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 200,
            damping: 40,
            mass: 20,
            duration: 0.5,
          }}>
          <div className="flex-inline text-lg text-red-400 text-center ml-2 font-bold mt-4">
            My Profile
          </div>
        </motion.div> :
        <div className="inline-flex">
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 3 }}
            transition={{
              delay: 0.2,
              type: "tween",
              stiffness: 200,
              damping: 40,
              mass: 8,
              duration: 0.5,
            }}>
            <div className="flex-inline text-lg text-red-400 text-left ml-2 font-bold mt-4">
              <Button onClick={() => setDashPage("none")} disableRipple={true}><ArrowBackIcon sx={{ color: Colors.red }} /></Button> My Profile | {DashPage}
            </div>
          </motion.div>
        </div>}
      {DashPage === "none" ? <div className="flex flex-col px-4 py-2">
        {ProfileSettings.map((section, i) => (
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{
              delay: 0.2 * i,
              type: "spring",
              stiffness: 200,
              damping: 40,
              mass: 20,
              duration: 1,
            }}
            key={i}
            className="mb-6">
            <h3 className="text-black font-bold mb-2">{section.name}</h3>
            <div className="flex flex-col gap-2">
              {section.buttons.map((item, j) => (
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 3 }}
                  transition={{
                    delay: 0.4 * j,
                    type: "spring",
                    stiffness: 200,
                    damping: 40,
                    mass: 8,
                    duration: 0.5,
                  }} key={j}>
                  <Button
                    key={j}
                    disableRipple={true}
                    onClick={() => handleDashPage(item.page)}
                    startIcon={item.icon}
                    className="justify-start text-left"
                    sx={{ textTransform: "none", color: "black" }}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 text-sm">{item.description}</span>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

        ))}
        <Button
          onClick={() => handleDashPage("Login")}
          startIcon={<LoginIcon />}
          disableRipple={true}
          className="justify-start text-center"
          sx={{ textTransform: "none", color: "black" }}
        >
          <div className="flex flex-col items-start">
            <span className="font-medium">Login</span>
          </div>
        </Button>
      </div> : null}
      {DashPage === "Details" ? <><DetailsPage /></> : null}
      {DashPage === "Password" ? <><PasswordPage /></> : null}
      {DashPage === "Dashboard" ? <><Dashboard /></> : null}
      {DashPage === "Notifications" ? <><NotificationsPage /></> : null}
      {DashPage === "Preferences" ? <><PreferencesPage /></> : null}
      {DashPage === "Terms" ? <><TermsPage /></> : null}
      {DashPage === "Policy" ? <><PolicyPage /></> : null}
    </div>
  )
}

export default DashboardPage;