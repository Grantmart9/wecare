"use client"
import React, { useState, useEffect, useCallback } from "react";
import { SUPABASE_URL_WECARE, API_KEY_WECARE, Colors } from "./supabase";
import { createClient } from "@supabase/supabase-js";
import LoadingThreeDotsJumping from "./components/loading";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from '@mui/icons-material/Home';
import Image from "next/image";
import * as motion from "motion/react-client"
import { Picture2, Picture4, Picture9 } from "./Image";
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
import { green } from "@mui/material/colors";
const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);


/// Data ///

const Categorries = [
  { "title": "Clothing", "image": Picture4, "color": Colors.green },
  { "title": "Services", "image": Picture4, "color": Colors.green },
  { "title": "Meals", "image": Picture4, "color": Colors.green },
  { "title": "Bedding", "image": Picture4, "color": Colors.yellow },
  { "title": "Homeware", "image": Picture4, "color": Colors.yellow },
  { "title": "Furniture", "image": Picture4, "color": Colors.yellow },
  { "title": "Appliances", "image": Picture4, "color": Colors.orange },
  { "title": "Electronics", "image": Picture4, "color": Colors.orange },
  { "title": "Office", "image": Picture4, "color": Colors.orange },
  { "title": "School", "image": Picture4, "color": Colors.red }
]

const DonationTypes = [
  { name: "Goods", json: animationData1, color: Colors.red },
  { name: "Cash", json: animationData3, color: Colors.blue },
  { name: "Service", json: animationData2, color: Colors.yellow },
];

const SearchBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -3 }}
      transition={{
        delay: 0.2,
        type: "tween",
        stiffness: 200,
        damping: 40,
        mass: 8,
        duration: 0.5,
      }}
      className="flex align-center justify-center mx-4 mt-5">
      <TextField
        size="small"
        fullWidth={true}
        label="Search..."
        className="rounded-2xl"
        sx={{
          maxWidth: "800px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            "& fieldset": {
              borderColor: "teal",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "orange",
            },
            "&.Mui-focused fieldset": {
              borderColor: "teal",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" sx={{ color: "teal" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" sx={{ color: "#F8D760" }}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </motion.div>
  )
}

/////////


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

const Shoppage = () => {
  const [category, setCategory] = useState("none")

  const Categorries2 = [
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.green },
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.green },
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.green },
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.yellow },
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.yellow },
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.yellow },
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.orange },
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.orange },
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.orange },
    { "title": "Nike Air Shoes", "image": Picture4, "color": Colors.red }
  ]

  const handleCategory = (cat) => { setCategory(cat); console.log(cat) }

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
          <Button size="small" fullWidth={false} className="font-bold" disableRipple={true} sx={{ backgroundColor: "transparent", textTransform: "none", color: Colors.red }} onClick={() => setCategory("none")}>Back</Button>Categories | {category}
        </div>
      </motion.div>
    )
  }
  const Stay = () => {
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
        <div className="flex-inline text-lg text-red-400 text-left ml-2 font-bold mt-2">Categories</div>
      </motion.div>
    )
  }

  const CategorySelected = ({ item, index }) => {
    return (
      <motion.div
        key={index} // assuming each Product has a unique id
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: index * 0.13, // Add staggered delay based on index
          type: "spring",
          stiffness: 300,
          damping: 55,
          mass: 10,
          duration: 0.3,
        }}
        className={`rounded-md`} style={{ backgroundColor: item.color }}>
        <Button className={`block`} sx={{ textTransform: "none" }}  >
          <Image className="mx-auto p-2 rounded-md" width={90} height={100} src={`data:image/jpeg;base64,${item.image}`} />
          <div className="text-md text-teal-950 text-center">{item.title}</div>
        </Button>
      </motion.div>
    )
  }
  const CategoryNotSelected = ({ item, index }) => {
    return (
      <motion.div
        key={index} // assuming each Product has a unique id
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: index * 0.13, // Add staggered delay based on index
          type: "spring",
          stiffness: 300,
          damping: 55,
          mass: 10,
          duration: 0.3,
        }}
        className={`rounded-md`} style={{ backgroundColor: item.color }}>
        <Button
          onClick={() => handleCategory(item.title)}
          className={`block`}
          sx={{ textTransform: "none" }}  >
          <Image className="mx-auto p-2 rounded-md" width={90} height={100} src={`data:image/jpeg;base64,${item.image}`} />
          <div className="text-md text-teal-950 text-center">{item.title}</div>
        </Button>
      </motion.div>)
  }

  return (
    <>
      {category !== "none" ?
        <><GoBack /></>
        :
        <><Stay /></>
      }
      <>
        <SearchBar />
      </>
      {
        category === "none" ?
          <div className="grid grid-cols-3 gap-3 mx-2 mt-6">
            {Categorries.map((item, index) =>
              <CategoryNotSelected index={index} item={item} />
            )}
          </div>
          :
          <div className="grid grid-cols-3 gap-3 mx-2 mt-6">
            {Categorries2.map((item, index) =>
              <CategorySelected index={index} item={item} />
            )}
          </div>
      }
    </>
  )
}

const DonatePage = ({ handlePage }) => {
  const [donationType, setDonationType] = useState("none");
  const [selectedGoods, setSelectedGoods] = useState("none");
  const handleDonationType = (selected) => { setDonationType(selected) }
  const handleGoods = (selected) => { setSelectedGoods(selected) && setDonationType(selected) }
  const handleGoods1 = (selected) => { setDonationType(selected) }

  const PopUpMessage = "Donation submitted successfully ! \nCheck out your dashboard to view your donations"

  const DonationAnimation = () => {
    return (
      <motion.div
        initial={{ scale: 0.65 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 100,
          mass: 10,
          duration: 0.3,
        }}
        className="inline-flex mt-2 ml-2">
        <div style={{ position: "relative" }}>
          {/* Image */}
          <Image
            className="mx-auto"
            width={90} height={100}
            style={{ zIndex: 1, position: "relative" }}
            src={`data:image/jpeg;base64,${Picture2}`}
            alt="Hello"
          />
        </div>
        <div
          className="text-red-400 flex text-lg justify-center font-bold"
          style={{
            alignItems: "flex-end", // Aligns text at the bottom
            height: "100px", // Set container height to visualize alignment
          }}
        >
          Donate
        </div>
      </motion.div>
    )
  }

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
            Back</Button>
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
            Back</Button>
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
                type: "spring",
                stiffness: 300,
                damping: 55,
                mass: 10,
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
        </>)
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
              textTransform: "none", bgcolor: Colors.blue, color: "white",
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
      {donationType === "none" ? <DonationAnimation /> : null}
      {donationType === "none" ? <><NoDonationTypeSelected /></> : null}
      {donationType === "Goods" ? <><DonationTypeGoods handleDonationType={handleDonationType} handleGoods={handleGoods} /></> : null}
      {donationType === "Cash" ? <><DonationTypeCash /></> : null}
      {donationType === "Service" ? <><DonationTypeService /></> : null}
    </>
  )
}

const VolunteerPage = () => {
  return (<>

    <div className="mt-5 text-5xl text-center"> This Page is Under construction !!!</div>
  </>
  )
}

const CommunityPage = () => {
  return (<>

    <div className="mt-5 text-5xl text-center"> This Page is Under construction !!!</div>
  </>)
}

const SupportPage = () => {
  return (<>

    <div className="mt-5 text-5xl text-center"> This Page is Under construction !!!</div>
  </>)
}

const DashboardPage = () => {
  return (
    <>
      <div style={{ backgroundColor: Colors.yellow }} className="text-teal-950 font-bold text-center p-2 w-full">Welcome back to your dashboard.</div>
      <div
        style={{ backgroundColor: Colors.red }}
        className="grid grid-flow-col gap-0 rounded-md p-2 mx-2 mt-2">
        <Image src={`data:image/jpeg;base64,${Picture9}`} width={90} height={100} alt={"No Image found"} />
        <div className="grid grid-flow-row gap-0">
          <div className="text-teal-950 text-sm text-center">Ready, set, COLLECT! Your collection dat is coming up.</div>
          <div className="text-white text-sm font-bold text-center">Wednesday, 16 August 2023, 2PM<div />
          </div>
        </div>
      </div>
    </>)
}

/////

export default function Home() {
  const [Data, setData] = useState([]);
  const [CurrentPage, setCurrentPage] = useState("Home")

  // Memoized getInstruments function
  const getInstruments = useCallback(async () => {
    let query = supabase.from("donations").select();
    const { data } = await query;
    setData(data);
  }, []);

  const handlePage = (Page) => { setCurrentPage(Page) }

  useEffect(() => {
    getInstruments();
  }, [getInstruments]);

  return (
    <React.Fragment>
      <div className="fixed z-40 w-full bottom-0" >
        <div className="grid grid-flow-col gap-0 bg-gradient-to-r from-white to-gray-100 h-14">
          <IconButton onClick={() => setCurrentPage("Home")}><HomeIcon size="large" sx={{ color: "gray" }} /></IconButton>
          <IconButton onClick={() => setCurrentPage("Donate")}><AddBoxOutlinedIcon size="large" sx={{ color: "gray" }} /></IconButton>
          <IconButton onClick={() => setCurrentPage("Community")}><PeopleIcon size="large" sx={{ color: "gray" }} /></IconButton>
          <IconButton onClick={() => setCurrentPage("Dashboard")}><PersonOutlinedIcon size="large" sx={{ color: "gray" }} /></IconButton>
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
              {CurrentPage === "Shop" ? <Shoppage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Donate" ? <DonatePage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Volunteer" ? <VolunteerPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Community" ? <CommunityPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Support" ? <SupportPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Dashboard" ? <DashboardPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
            </>
        }
      </div>
    </React.Fragment >
  );
}
