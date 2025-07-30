"use client"
import React, { useState, useEffect, useCallback } from "react";
import { SUPABASE_URL_WECARE, API_KEY_WECARE, Colors } from "./supabase";
import { createClient } from "@supabase/supabase-js";
import LoadingThreeDotsJumping from "./components/loading";
import { Button, IconButton, TextField } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import Image from "next/image";
import * as motion from "motion/react-client"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Lottie from 'react-lottie';
import animationData1 from './animations/goods.json';
import animationData2 from './animations/service.json';
import animationData3 from './animations/cash.json';
import animationData4 from './animations/give.json';
import Landing from "./images/Landing.png";
import PeopleIcon from '@mui/icons-material/People';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ScrollLinked3 from "./components/scrollLinked3";
import FeaturedCauses from "./components/Featuredcauses";
import WavyText from "./components/Wavy";
import InstagramIcon from '@mui/icons-material/Instagram';
import EventIcon from '@mui/icons-material/Event';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import avatar from "./images/avatar.jpg"
const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);

const DonationTypes = [
  { name: "Goods", json: animationData1, color: Colors.red },
  { name: "Cash", json: animationData3, color: Colors.blue },
  { name: "Service", json: animationData2, color: Colors.yellow },
];

/// Pages ///
const Homepage = ({ handlePage }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData4,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const community =
    [
      { name: "Social media", icon: <InstagramIcon sx={{ color: "black" }} />, description: "Choose from a variety of causes and donate goods or services." },
      { name: "Projects", icon: <FolderCopyIcon sx={{ color: "black" }} />, description: "Choose from a variety of causes and donate goods or services." },
      { name: "upcoming events", icon: <EventIcon sx={{ color: "black" }} />, description: "Choose from a variety of causes and donate goods or services." }
    ]

  const HowItWorks = () => {

    return (
      <>
        <ScrollLinked3 />
      </>
    )
  }

  return (
    <div>
      <WavyText />
      <Image className="w-full shadow-sm" src={Landing} alt="no image found" />
      <div style={{ top: "61vw" }} className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <Button onClick={() => handlePage("Donate")} className="rounded-3xl" sx={{ bgcolor: "black", color: "white", textTransform: "none", textWrap: "nowrap" }}>
            Donate now
          </Button>
        </motion.div>
      </div>
      <motion.div
        animate={{ y: [0, -20] }}
        transition={{ duration: 0.3, ease: "easeIn" }}>
        <div className="text-black font-bold text-xl text-left mt-14 pb-1 pl-4">How it works</div>
        <HowItWorks />
      </motion.div>
      <motion.div
        animate={{ y: [0, -20] }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeIn" }}>
        <div className="text-black font-bold text-xl text-left pl-4">Our Community</div>
        <div className="grid grid-cols-2 gap-5 mx-3 pb-2 pt-6">{community.map((item, index) =>
          <Button variant="outlined" sx={{ borderColor: "gray", textTransform: "none" }} key={index} className="grid grid-flow-row gap-1 p-2 rounded-lg">
            {item.icon}
            <div className="text-left text-black">{item.name}</div>
            <div className="text-left text-gray-400">{item.description}</div>
          </Button>)}
        </div>
      </motion.div>
      <div className="text-black font-bold text-xl text-left pt-3 pl-4 pb-2">Featured causes</div>
      <FeaturedCauses />
      <div className="text-black font-semibold text-3xl w-full mx-auto pl-3 pt-5">Let's make a difference, together</div>
      <Lottie
        options={defaultOptions}
        className="mx-auto"
      />
    </div>
  )
}

const DonatePage = ({ handlePage }) => {
  const [donationType, setDonationType] = useState("none");
  const [selectedGoods, setSelectedGoods] = useState("none");
  const handleDonationType = (selected) => { setDonationType(selected) }
  const handleGoods = (selected) => { setSelectedGoods(selected) && setDonationType(selected) }
  const handleGoods1 = (selected) => { setDonationType(selected) }

  const PopUpMessage = "Donation submitted successfully ! \nCheck out your dashboard to view your donations"

  const defaultOptions1 = (donation) => {
    return {
      loop: true,
      autoplay: true,
      animationData: donation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  };

  const GoBack = () => {
    return (
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
        <div className="flex-inline text-lg text-red-400 text-left ml-2 font-bold mt-2">
          <Button
            size="small"
            fullWidth={false}
            className="font-bold"
            disableRipple={true}
            sx={{ backgroundColor: "transparent", textTransform: "none", color: Colors.red }}
            onClick={() => handleGoods("none")}>
            <ArrowBackIcon />
          </Button>
          Donate | {donationType}
        </div>
      </motion.div>
    )
  }

  const GoBackMain = () => {
    return (
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
        <div className="flex-inline text-lg text-red-400 text-left ml-2 font-bold mt-2">
          <Button
            size="small"
            fullWidth={false}
            className="font-bold"
            disableRipple={true}
            sx={{ backgroundColor: "transparent", textTransform: "none", color: Colors.red }}
            onClick={() => handleGoods1("none")}>
            <ArrowBackIcon /></Button>
          Donate | {donationType}
        </div>
      </motion.div>
    )
  }

  const DonateButton = ({ loading }) => {
    return (
      <Button
        type="submit"
        variant="contained"
        sx={{ bgcolor: Colors.red }}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Donate"}
      </Button>
    )
  }

  const NoDonationTypeSelected = () => {
    return (
      <>
        {donationType === "none" ? null : <GoBack />}
        <div className="grid grid-cols-3 gap-3 mt-2 mx-2">
          {DonationTypes.map((item, index) =>
            <motion.div
              key={index} // assuming each Product has a unique id
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{
                delay: index * 0.13, // Add staggered delay based on index
                duration: 0.3,
              }} className="mx-auto">
              <Button
                onClick={() => handleDonationType(item.name)}
                key={index}
                className="grid grid-flow-row  p-2 rounded-md"
                sx={{ bgcolor: item.color, textTransform: "none" }}>
                <Lottie
                  options={defaultOptions1(item.json)}
                  className="mx-auto my-auto"
                  height={90}
                  width={115}
                />
                <div className="text-center justify-center text-teal-950">{item.name}</div>
              </Button>
            </motion.div>
          )}
        </div>
      </>
    )
  }

  const DonationTypeGoods = ({ handleDonationType, handleGoods }) => {

    const [file, setFile] = useState();
    const [image, setImage] = useState();

    const AllGoodsDonations = [
      { "name": "Clothing", "color": Colors.red },
      { "name": "Non - perishable food", "color": Colors.red },
      { "name": "Books & educatutional materials", "color": Colors.green },
      { "name": "Electronics", "color": Colors.green },
      { "name": "Furniture", "color": Colors.yellow },
      { "name": "Medical supplies", "color": Colors.yellow },
      { "name": "Toys & games", "color": Colors.orange },
      { "name": "Hygiene", "color": Colors.orange },
      { "name": "Household", "color": Colors.blue }
    ]

    /// Image handler ///
    function handleImage(e) {
      const file = e.target.files[0]; // Get the selected file
      setImage(URL.createObjectURL(e.target.files[0]));

      if (file) {
        // Create a FileReader to read the file
        const reader = new FileReader();

        // Set up an event listener for when the file is read
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1]; // Strip off the data URL prefix
          setFile(base64String)
          // You can now use base64String to send it to your database
        };
        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }

    const ImageDialog = () => {
      return (
        <>
          <Button
            sx={{
              textTransform: "none", bgcolor: Colors.blue, color: "gray",
              '&:hover': {
                backgroundColor: Colors.green,
                color: 'whitesmoke',
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
        </>
      )
    }

    const DeliveryType = () => {
      const [deliveryType, setDeliveryType] = useState("Pick");

      const handleDeliveryType = (type) => { setDeliveryType(type) }

      return (
        <div className="grid grid-flow-row">
          <div className="text-left text-gray-600 pb-3">Delivery Type</div>
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={() => handleDeliveryType("Drop")} className="text-cyan-950" variant="contained" sx={{ bgcolor: deliveryType === "Drop" ? Colors.red : Colors.blue, textTransform: "none" }}>
              I will deliver the goods
            </Button>
            <Button onClick={() => handleDeliveryType("Pick")} className="text-cyan-950" variant="contained" sx={{ bgcolor: deliveryType === "Pick" ? Colors.red : Colors.blue, textTransform: "none" }}>
              Request a pickup
            </Button>
          </div>
        </div>)
    }

    const DonateElectronics = () => {
      const [formData, setFormData] = useState({
        deliveryType: "",
        description: "",
        brand: "",
      });

      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { error } = await supabase
            .from("donations")
            .insert([{ category: "Electronics", ...formData }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
          } else {
            alert(PopUpMessage);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setLoading(false);
          setFormData({ deliveryType: "", description: "", brand: "" });
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog />
          <DeliveryType
            value={formData.deliveryType}
            onChange={(value) => setFormData({ ...formData, deliveryType: value })}
          />
          <textarea
            name="description"
            placeholder="Description of electronics (e.g., laptop, phone)"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <input
            type="text"
            name="brand"
            placeholder="Brand and Model"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          />

          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateClothing = () => {
      const [formData, setFormData] = useState({
        deliveryType: "",
        description: "",
        gender: "",
      });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { error } = await supabase
            .from("donations")
            .insert([{ category: "Clothing", ...formData }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
          } else {
            alert(PopUpMessage);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setLoading(false);
          setFormData({ deliveryType: "", description: "", gender: "" });
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog />
          <DeliveryType
            value={formData.deliveryType}
            onChange={(value) => setFormData({ ...formData, deliveryType: value })}
          />
          <textarea
            name="description"
            placeholder="Description of clothing items"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          >
            <option value="">Type of Clothing</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Children">Children</option>
            <option value="Other">Other</option>
          </select>

          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateBooksAndEducationalMaterials = () => {
      const [formData, setFormData] = useState({
        deliveryType: "",
        description: "",
        quantity: "",
      });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { error } = await supabase
            .from("donations")
            .insert([{ category: "Books and Educational Materials", ...formData }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
          } else {
            alert(PopUpMessage);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setLoading(false);
          setFormData({ deliveryType: "", description: "", quantity: "" });
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog />
          <DeliveryType
            value={formData.deliveryType}
            onChange={(value) => setFormData({ ...formData, deliveryType: value })}
          />
          <textarea
            name="description"
            placeholder="List of books/materials"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <input
            type="number"
            name="quantity"
            placeholder="Total Items"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          />

          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateNonPerishableFoods = () => {
      const [formData, setFormData] = useState({
        deliveryType: "",
        description: "",
        expiration_date: "",
      });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { error } = await supabase
            .from("donations")
            .insert([{ category: "Non-Perishable Foods", ...formData }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
          } else {
            alert(PopUpMessage);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setLoading(false);
          setFormData({ deliveryType: "", description: "", expiration_date: "" });
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog />
          <DeliveryType
            value={formData.deliveryType}
            onChange={(value) => setFormData({ ...formData, deliveryType: value })}
          />
          <textarea
            name="description"
            placeholder="List of items (e.g., canned goods)"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <input
            type="text"
            name="expiration_date"
            placeholder="Expiration Date (if applicable)"
            value={formData.expiration_date}
            onChange={handleChange}
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          />

          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateFurniture = () => {
      const [formData, setFormData] = useState({
        deliveryType: "",
        description: "",
        quantity: "",
      });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { error } = await supabase
            .from("donations")
            .insert([{ category: "Furniture", ...formData }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
          } else {
            alert(PopUpMessage);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setLoading(false);
          setFormData({ deliveryType: "", description: "", quantity: "" });
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog />
          <DeliveryType
            value={formData.deliveryType}
            onChange={(value) => setFormData({ ...formData, deliveryType: value })}
          />
          <textarea
            name="description"
            placeholder="Description of furniture (e.g., sofa, table)"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          />

          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateMedicalSupplies = () => {
      const [formData, setFormData] = useState({
        deliveryType: "",
        description: "",
        expiration_date: "",
      });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { error } = await supabase
            .from("donations")
            .insert([{ category: "Medical Supplies", ...formData }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
          } else {
            alert(PopUpMessage);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setLoading(false);
          setFormData({ deliveryType: "", description: "", expiration_date: "" });
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog />
          <DeliveryType
            value={formData.deliveryType}
            onChange={(value) => setFormData({ ...formData, deliveryType: value })}
          />
          <textarea
            name="description"
            placeholder="Description of medical supplies"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <input
            type="text"
            name="expiration_date"
            placeholder="Expiration Date (if applicable)"
            value={formData.expiration_date}
            onChange={handleChange}
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          />

          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateHygiene = () => {
      const [formData, setFormData] = useState({
        deliveryType: "",
        description: "",
      });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { error } = await supabase
            .from("donations")
            .insert([{ category: "Hygiene", ...formData }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
          } else {
            alert(PopUpMessage);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setLoading(false);
          setFormData({ deliveryType: "", description: "" });
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog />
          <DeliveryType
            value={formData.deliveryType}
            onChange={(value) => setFormData({ ...formData, deliveryType: value })}
          />
          <textarea
            name="description"
            placeholder="List of hygiene products (e.g., soap, toothpaste)"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>

          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateHousehold = () => {
      const [formData, setFormData] = useState({
        deliveryType: "",
        description: "",
      });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { error } = await supabase
            .from("donations")
            .insert([{ category: "Household", ...formData }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
          } else {
            alert(PopUpMessage);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setLoading(false);
          setFormData({ deliveryType: "", description: "" });
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog />
          <DeliveryType
            value={formData.deliveryType}
            onChange={(value) => setFormData({ ...formData, deliveryType: value })}
          />
          <textarea
            name="description"
            placeholder="Description of household items"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateToysAndGames = () => {
      const [formData, setFormData] = useState({
        deliveryType: "",
        description: "",
        age_group: "",
      });
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const { error } = await supabase
            .from("donations")
            .insert([{ category: "Toys and Games", ...formData }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
          } else {
            alert(PopUpMessage);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setLoading(false);
          setFormData({ deliveryType: "", description: "", age_group: "" });
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog />
          <DeliveryType
            value={formData.deliveryType}
            onChange={(value) => setFormData({ ...formData, deliveryType: value })}
          />
          <textarea
            name="description"
            placeholder="Description of toys/games"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <input
            type="text"
            name="age_group"
            placeholder="Age Group (e.g., 3-7 years)"
            value={formData.age_group}
            onChange={handleChange}
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          />

          <DonateButton loading={loading} />
        </form>
      );
    };

    return (
      <div className="text-center">
        {selectedGoods === "none" ? <> <GoBackMain /></> :
          <div className="flex justify-start"><GoBack />{" "}{selectedGoods === "none" ? null
            :
            <motion.div
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{
                delay: "0.3",
                type: "spring",
                stiffness: 300,
                damping: 55,
                mass: 10,
                duration: 0.3,
              }}
              className="flex-inline text-lg text-red-400 text-left ml-2 font-bold mt-2">
              | {selectedGoods}
            </motion.div>
          }
          </div>
        }
        {selectedGoods === "none" ?
          <div className="grid grid-cols-2 gap-3 mx-2 pt-5">
            {AllGoodsDonations.map((item, index) =>
              <motion.button
                key={index} // assuming each Product has a unique id
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.12, // Add staggered delay based on index
                  type: "spring",
                  stiffness: 300,
                  damping: 55,
                  mass: 10,
                  duration: 0.3,
                }}
                onClick={() => handleGoods(item.name)}
                style={{ textTransform: "none", backgroundColor: item.color }}
                className=" text-teal-950 text-lg font-semibold rounded-lg p-3">
                {item.name}
              </motion.button>
            )
            }
          </div> : null}
        {selectedGoods === "Clothing" ? <div><DonateClothing /></div> : null}
        {selectedGoods === "Non - perishable food" ? <div><DonateNonPerishableFoods /></div> : null}
        {selectedGoods === "Books & educatutional materials" ? <div><DonateBooksAndEducationalMaterials /></div> : null}
        {selectedGoods === "Electronics" ? <div><DonateElectronics /></div> : null}
        {selectedGoods === "Furniture" ? <div><DonateFurniture /></div> : null}
        {selectedGoods === "Medical supplies" ? <div><DonateMedicalSupplies /></div> : null}
        {selectedGoods === "Toys & games" ? <div><DonateToysAndGames /></div> : null}
        {selectedGoods === "Hygiene" ? <div><DonateHygiene /></div> : null}
        {selectedGoods === "Household" ? <div><DonateHousehold /></div> : null}
      </div>
    )
  }
  const DonationTypeCash = () => {
    const [selectedCash, setSelectedCash] = useState("none");

    const handleCash = (selected) => { setSelectedCash(selected) }

    const paymentTypes = [
      { "name": "Credit/debit card", "color": Colors.green },
      { "name": "EFT", "color": Colors.green },
      { "name": "Cash", "color": Colors.yellow },
      { "name": "SnapScan", "color": Colors.red },
      { "name": "Zapper", "color": Colors.red },
      { "name": "Payfast", "color": Colors.red },
      { "name": "Apple Pay", "color": Colors.blue },
      { "name": "Google Pay", "color": Colors.blue },
      { "name": "Samsung Pay", "color": Colors.blue },
    ]

    return (
      <div className="text-center">
        {selectedCash === "none" ?
          <> <GoBackMain /></>
          :
          <div className="flex justify-start">
            <GoBack />{" "}{selectedCash === "none" ? null
              :
              <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                transition={{
                  delay: "0.3",
                  type: "spring",
                  stiffness: 300,
                  damping: 55,
                  mass: 10,
                  duration: 0.3,
                }}
                className="flex-inline text-lg text-red-400 text-left ml-2 font-bold mt-2">
                | {selectedCash}
              </motion.div>
            }
          </div>
        }
        <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          transition={{
            delay: "0.2",
            type: "spring",
            stiffness: 300,
            damping: 55,
            mass: 10,
            duration: 0.3,
          }} className="mx-2  text-gray-600 text-center text-xl mt-5">Please sellect a payment option bellow
        </motion.div>
        <div className="grid grid-flow-row gap-3 mt-5">
          {paymentTypes.map((item, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{
                delay: 0.2 * index,
                type: "spring",
                stiffness: 300,
                damping: 55,
                mass: 10,
                duration: 0.3,
              }}>
              <Button key={index}
                fullWidth={true}
                className="rounded-lg text-teal-950 mx-auto"
                sx={{ bgcolor: item.color, textTransform: "none", maxWidth: "300px" }}>
                {item.name}
              </Button>
            </motion.div>
          )}
        </div>
      </div>)
  }
  const DonationTypeService = () => {
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    /// Image handler ///
    function handleImage(e) {
      const file = e.target.files[0]; // Get the selected file
      setImage(URL.createObjectURL(e.target.files[0]));

      if (file) {
        // Create a FileReader to read the file
        const reader = new FileReader();

        // Set up an event listener for when the file is read
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1]; // Strip off the data URL prefix
          setFile(base64String)
          // You can now use base64String to send it to your database
        };
        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }

    const ImageDialog = () => {
      return (
        <>
          <Button
            sx={{
              textTransform: "none", bgcolor: Colors.blue, color: "gray",
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
    return (
      <>
        <GoBackMain />
        <form className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent">
          <ImageDialog />
          <select
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          >
            <option value="">Select a Service Category</option>
            <option value="Automotive">Automotive (e.g., mechanic, driver)</option>
            <option value="Professional">Professional (e.g., accounting, legal)</option>
            <option value="HomeMaintenance">Home Maintenance (e.g., welding, plumbing)</option>
            <option value="Educational">Educational (e.g., tutoring, workshops)</option>
            <option value="Medical">Medical (e.g., counseling, health checks)</option>
            <option value="Other">Other</option>
          </select>

          {/* Custom Service Description */}
          <textarea
            placeholder="Describe the service you are offering (e.g., skills, tools, duration, etc.)"
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>

          {/* Service Location */}
          <div className="flex gap-4">
            <Button variant="contained" sx={{ bgcolor: Colors.yellow, textTransform: "none", color: "darkcyan" }}>
              I can provide this service remotely
            </Button>
            <Button variant="contained" sx={{ bgcolor: Colors.green, textTransform: "none", color: "darkcyan" }}>
              Requires my presence at a location
            </Button>
          </div>

          {/* Availability */}
          <input
            type="text"
            placeholder="Availability (e.g., weekdays, weekends, specific times)"
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          />
          <Button variant="contained" sx={{ bgcolor: Colors.red }}>
            Donate
          </Button>
        </form></>
    );
  };

  return (
    <>
      {donationType === "none" ?
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
          <div className="flex-inline text-lg text-red-400 text-center ml-2 font-bold mt-4">
            Donate
          </div>
        </motion.div> : null}
      {donationType === "none" ? <><NoDonationTypeSelected /></> : null}
      {donationType === "Goods" ? <><DonationTypeGoods handleDonationType={handleDonationType} handleGoods={handleGoods} /></> : null}
      {donationType === "Cash" ? <><DonationTypeCash /></> : null}
      {donationType === "Service" ? <><DonationTypeService /></> : null}
    </>
  )
}

const CommunityPage = () => {
  return (
    <>
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
        <div className="flex-inline text-lg text-red-400 text-center ml-2 font-bold mt-4">
          Our Community
        </div>
      </motion.div>
      <div className="mt-5 text-5xl text-center"> This Page is Under construction !!!</div>
    </>)
}

const SupportPage = () => {
  return (<>

    <div className="mt-5 text-5xl text-center"> This Page is Under construction !!!</div>
  </>)
}

const DashboardPage = () => {

  const [DashPage, setDashPage] = useState("none")

  const AccountDetails = {
    "name": "Olivia Carter",
    "membership_start_date": "2024",
    "personal_information": {
      "email": "olivia.carter@gmail.com",
      "phone": "+2742893721"
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
              type: "tween",
              stiffness: 200,
              damping: 40,
              mass: 8,
              duration: 0.5
            }}>
            <Image src={avatar} alt="no image found" className="mx-auto rounded-full max-h-80 max-w-80" />
          </motion.div>
          <div className="text-black text-2xl font-bold text-center">{AccountDetails.name}</div>
          <div className="text-black text-md font-bold text-center">Member since {AccountDetails.membership_start_date}</div>
          <div className="text-black text-md font-semibold text-left">Name</div>
          <TextField size="small" variant="outlined" sx={{bgcolor:Colors.yellow}} />
          <div className="text-black text-md font-semibold text-left">Email</div>
          <TextField size="small" variant="outlined" sx={{bgcolor:Colors.yellow}} />
          <div className="text-black text-md font-semibold text-left">Phone</div>
          <TextField size="small" variant="outlined" sx={{bgcolor:Colors.yellow}} />
          <div className="text-black text-md font-semibold text-left">Location</div>
          <TextField size="small" variant="outlined" sx={{bgcolor:Colors.yellow}} />
          <Button style={{ backgroundColor: Colors.green }} className="text-black text-md rounded-2xl mx-auto mt-4" sx={{ textTransform: "none" }}>Save</Button>
        </div>
      )
    }
    const ProfileView = () => {
      return (
        <div className="grid grid-flow-row gap-2 mx-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 3 }}
            transition={{
              delay: 0.2,
              type: "tween",
              stiffness: 200,
              damping: 40,
              mass: 8,
              duration: 0.5
            }}>
            <Image src={avatar} alt="no image found" className="mx-auto rounded-full max-h-80 max-w-80" />
          </motion.div>
          <div className="text-black text-2xl font-bold text-center">{AccountDetails.name}</div>
          <div className="text-black text-md font-bold text-center">Member since {AccountDetails.membership_start_date}</div>
          <Button
            onClick={() => handleProfile()}
            style={{ backgroundColor: Colors.blue }}
            className="text-black text-md font-bold rounded-3xl mx-4"
            sx={{ textTransform: "none" }}>
            Edit Profile
          </Button>
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
          <Button style={{ backgroundColor: Colors.red }} className="text-black text-md rounded-2xl mx-auto" sx={{ textTransform: "none" }}>Logout</Button>
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

  return (
    <div className="pb-8">
      {DashPage === "none" ?
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
              <Button onClick={() => setDashPage("none")}><ArrowBackIcon sx={{ color: Colors.red }} /></Button> My Profile | {DashPage}
            </div>
          </motion.div>
        </div>}
      {DashPage === "none" ? <div className="flex flex-col px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}>
          {ProfileSettings.map((section, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-black font-bold mb-2">{section.name}</h3>
              <div className="flex flex-col gap-2">
                {section.buttons.map((item, j) => (
                  <Button
                    key={j}
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
                ))}
              </div>
            </div>
          ))}
          <Button
            onClick={() => handleDashPage("Login")}
            startIcon={<LoginIcon />}
            className="justify-start text-left"
            sx={{ textTransform: "none", color: "black" }}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Login</span>
            </div>
          </Button>
        </motion.div>
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

export default function Home() {
  const [Data, setData] = useState("sdfbsakj");
  const [CurrentPage, setCurrentPage] = useState("Home")

  // Memoized getInstruments function
  const getInstruments = useCallback(async () => {
    let query = supabase.from("donations").select();
    const { data } = await query;
    setData(data);
  }, []);

  const handlePage = (Page) => { setCurrentPage(Page) }

  useEffect(() => {
    // getInstruments();
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
