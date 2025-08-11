"use client"
import React, { useState, useEffect } from "react";
import { SUPABASE_URL_WECARE, API_KEY_WECARE, Colors } from "../supabase";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Lottie from 'react-lottie';
import animationData1 from '../animations/goods.json';
import animationData2 from '../animations/service.json';
import animationData3 from '../animations/cash.json';
import * as motion from "motion/react-client";

const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);

const DonationTypes = [
  { name: "Goods", json: animationData1, color: Colors.red },
  { name: "Cash", json: animationData3, color: Colors.blue },
  { name: "Service", json: animationData2, color: Colors.yellow },
];

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

const ImageDialog = ({ handleImage, image }) => {
  return (
    <>
      <Button
        sx={{
          textTransform: "none",
          bgcolor: "white",
          color: "gray.800",
          border: "1px solid #d1d5db",
          fontWeight: "bold",
          borderRadius: "9999px",
          paddingX: 6,
          paddingY: 2,
          '&:hover': {
            backgroundColor: "gray.50",
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
        initial={{ x: -3 }}
        animate={{ x: 0 }}
        transition={{
          delay: 0.1,
          type: "spring",
          stiffness: 400,
          damping: 300,
          mass: 40,
          duration: 0.5,
        }}>
        <div className="flex-inline text-lg text-gray-800 text-left font-bold mt-2">
          <Button
            size="small"
            fullWidth={false}
            className="font-bold"
            disableRipple={true}
            sx={{ backgroundColor: "transparent", textTransform: "none", color: "gray.800" }}
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
        initial={{ x: -3 }}
        animate={{ x: 0 }}
        transition={{
          delay: 0.1,
          type: "spring",
          stiffness: 400,
          damping: 300,
          mass: 20,
          duration: 0.5,
        }} className="mx-auto">
        <div className="flex-inline text-lg text-gray-800 text-left font-bold mt-2">
          <Button
            size="small"
            fullWidth={false}
            className="font-bold"
            disableRipple={true}
            sx={{ backgroundColor: "transparent", textTransform: "none", color: "gray.800" }}
            onClick={() => handleGoods1("none")}>
            <ArrowBackIcon />
          </Button>
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
        sx={{
          bgcolor: "blue.600",
          color: "white",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: "9999px",
          paddingX: 8,
          paddingY: 3,
          fontSize: "lg",
          '&:hover': {
            bgcolor: "blue.700",
          }
        }}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Donate"}
      </Button>
    )
  }

  const NoDonationTypeSelected = () => {
    return (
      <>
        {donationType === "none" ? null : <GoBack className="mx-auto" />}
        <div className="grid grid-rows-3 md:grid-cols-3 gap-8 md:gap-3 mt-2 md:mt-8 md:mx-4 mx:2 pb-20 ">
          {DonationTypes.map((item, index) =>
            <motion.div
              key={index}
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              transition={{
                delay: 0.2 * index,
                type: "spring",
                stiffness: 230,
                damping: 75,
                mass: 15,
                duration: 1,
              }}
            >
              <Button
                onClick={() => handleDonationType(item.name)}
                key={index}
                className="grid grid-flow-row p-2 rounded-full mx-auto border-4 border-gray-200 shadow-lg"
                sx={{
                  bgcolor: "white",
                  textTransform: "none",
                  '&:hover': {
                    bgcolor: "gray.50",
                  }
                }}>
                <Lottie
                  options={defaultOptions1(item.json)}
                  className="mx-auto my-auto"
                  height={160}
                  width={190}
                />
                <div className="text-center justify-center text-gray-800 font-bold">{item.name}</div>
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

    const DeliveryType = () => {
      const [deliveryType, setDeliveryType] = useState("Pick");

      const handleDeliveryType = (type) => { setDeliveryType(type) }

      return (
        <div className="grid grid-flow-row">
          <div className="text-left text-gray-600 pb-3">Delivery Type</div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleDeliveryType("Drop")}
              className="text-gray-800 font-bold"
              variant="contained"
              sx={{
                bgcolor: deliveryType === "Drop" ? "blue.600" : "white",
                color: deliveryType === "Drop" ? "white" : "gray.800",
                textTransform: "none",
                borderRadius: "9999px",
                border: deliveryType === "Drop" ? "none" : "1px solid #d1d5db",
                '&:hover': {
                  bgcolor: deliveryType === "Drop" ? "blue.700" : "gray.50",
                }
              }}>
              I will deliver the goods
            </Button>
            <Button
              onClick={() => handleDeliveryType("Pick")}
              className="text-gray-800 font-bold"
              variant="contained"
              sx={{
                bgcolor: deliveryType === "Pick" ? "blue.600" : "white",
                color: deliveryType === "Pick" ? "white" : "gray.800",
                textTransform: "none",
                borderRadius: "9999px",
                border: deliveryType === "Pick" ? "none" : "1px solid #d1d5db",
                '&:hover': {
                  bgcolor: deliveryType === "Pick" ? "blue.700" : "gray.50",
                }
              }}>
              Request a pickup
            </Button>
          </div>
        </div>
      )
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
          <ImageDialog image={image} />
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
            className="w-full max-w-md p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <input
            type="text"
            name="brand"
            placeholder="Brand and Model"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full max-w-md p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <ImageDialog image={image} handleImage={handleImage} />
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
            className="w-full max-w-md p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full max-w-md p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <ImageDialog image={image} handleImage={handleImage} />
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
          <ImageDialog image={image} handleImage={handleImage} />
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
          <ImageDialog image={image} handleImage={handleImage} />
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
          <ImageDialog image={image} handleImage={handleImage} />
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
          <ImageDialog image={image} handleImage={handleImage} />
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
          <ImageDialog image={image} handleImage={handleImage} />
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
          <ImageDialog image={image} handleImage={handleImage} />
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
          <div className="flex justify-start"><GoBack className="mx-auto" />{" "}{selectedGoods === "none" ? null
            :
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 3 }}
              transition={{
                delay: "0.3",
                type: "spring",
                stiffness: 100,
                damping: 10,
                mass: 30,
                duration: 1,
              }}
              className="flex-inline text-lg text-gray-800 text-left ml-2 font-bold mt-2">
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
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 3 }}
                transition={{
                  delay: index * 0.2, // Add staggered delay based on index
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 20,
                  duration: 0.3,
                }}
                onClick={() => handleGoods(item.name)}
                style={{ textTransform: "none" }}
                className="bg-white text-gray-800 text-lg font-semibold rounded-lg p-3 border-2 border-gray-200 shadow-md hover:bg-gray-50">
                {item.name}
              </motion.button>
            )
            }
          </div> : null}
        {selectedGoods === "Clothing" ?
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 3 }}
            transition={{
              delay: 0.5, // Add staggered delay based on index
              type: "spring",
              stiffness: 300,
              damping: 35,
              mass: 20,
              duration: 0.2,
            }}><DonateClothing />
          </motion.div> : null}
        {selectedGoods === "Non - perishable food" ?
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 3 }}
            transition={{
              delay: 0.5, // Add staggered delay based on index
              type: "spring",
              stiffness: 300,
              damping: 35,
              mass: 20,
              duration: 0.2,
            }}><DonateNonPerishableFoods />
          </motion.div> : null}
        {selectedGoods === "Books & educatutional materials" ?
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 3 }}
            transition={{
              delay: 0.5, // Add staggered delay based on index
              type: "spring",
              stiffness: 300,
              damping: 35,
              mass: 20,
              duration: 0.2,
            }}><DonateBooksAndEducationalMaterials />
          </motion.div> : null}
        {selectedGoods === "Electronics" ? <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 3 }}
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateElectronics /></motion.div> : null}
        {selectedGoods === "Furniture" ? <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 3 }}
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateFurniture /></motion.div> : null}
        {selectedGoods === "Medical supplies" ? <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 3 }}
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateMedicalSupplies /></motion.div> : null}
        {selectedGoods === "Toys & games" ? <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 3 }}
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateToysAndGames /></motion.div> : null}
        {selectedGoods === "Hygiene" ? <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 3 }}
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateHygiene /></motion.div> : null}
        {selectedGoods === "Household" ? <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 3 }}
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateHousehold /></motion.div> : null}
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

    useEffect(() => {
      // getInstruments();
      window.scrollTo(0, 0);
    }, []);

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
                className="flex-inline text-lg text-gray-800 text-left ml-2 font-bold mt-2">
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
          }}
          className="mx-2  text-gray-600 text-center text-xl mt-5">Please select a payment option below
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
                className="rounded-lg text-teal-950"
                sx={{
                  bgcolor: "white",
                  color: "gray.800",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "9999px",
                  border: "1px solid #d1d5db",
                  paddingX: 6,
                  paddingY: 2,
                  maxWidth: "300px",
                  '&:hover': {
                    backgroundColor: "gray.50",
                  }
                }}>
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


    return (
      <>
        <GoBackMain />
        <form className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent">
          <ImageDialog image={image} handleImage={handleImage} />
          <select
            required
            className="w-full max-w-md p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full max-w-md p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>

          {/* Service Location */}
          <div className="flex gap-4">
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "gray.800",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "9999px",
                border: "1px solid #d1d5db",
                '&:hover': {
                  backgroundColor: "gray.50",
                }
              }}>
              I can provide this service remotely
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "gray.800",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "9999px",
                border: "1px solid #d1d5db",
                '&:hover': {
                  backgroundColor: "gray.50",
                }
              }}>
              Requires my presence at a location
            </Button>
          </div>

          {/* Availability */}
          <input
            type="text"
            placeholder="Availability (e.g., weekdays, weekends, specific times)"
            required
            className="w-full max-w-md p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "blue.600",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "9999px",
              paddingX: 8,
              paddingY: 3,
              fontSize: "lg",
              '&:hover': {
                bgcolor: "blue.700",
              }
            }}>
            Donate
          </Button>
        </form></>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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
          <div className="flex-inline text-lg text-gray-800 text-center ml-2 font-bold mt-4">
            Donate
          </div>
        </motion.div> : null}
      {donationType === "none" ? <><NoDonationTypeSelected /></> : null}
      {donationType === "Goods" ? <><DonationTypeGoods handleDonationType={handleDonationType} handleGoods={handleGoods} /></> : null}
      {donationType === "Cash" ? <><DonationTypeCash /></> : null}
      {donationType === "Service" ? <><DonationTypeService /></> : null}
    </div>
  )
}

export default DonatePage;