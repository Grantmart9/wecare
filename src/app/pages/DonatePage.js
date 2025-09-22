"use client"
import React, { useState, useEffect } from "react";
import { SUPABASE_URL, API_KEY, Colors } from "../supabase";
import { createClient } from "@supabase/supabase-js";
import { Button, TextField, Checkbox, FormControlLabel, Typography, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Lottie from 'react-lottie';
import animationData1 from '../animations/goods.json';
import animationData2 from '../animations/service.json';
import animationData3 from '../animations/cash.json';
import * as motion from "motion/react-client";

const supabase = createClient(SUPABASE_URL, API_KEY);

const DonationTypes = [
  { name: "Goods", json: animationData1, color: Colors.red },
  { name: "Cash", json: animationData3, color: Colors.blue },
  { name: "Service", json: animationData2, color: Colors.yellow },
];

const AllGoodsDonations = [
  { "name": "Clothing", "color": Colors.red, lottie: require('../animations/clothing.json') },
  { "name": "Non - perishable food", "color": Colors.red, lottie: require('../animations/nonperishable.json') },
  { "name": "Books & educatutional materials", "color": Colors.green, lottie: require('../animations/goods.json') },
  { "name": "Electronics", "color": Colors.green, lottie: require('../animations/electronics.json') },
  { "name": "Furniture", "color": Colors.yellow, lottie: require('../animations/furniture.json') },
  { "name": "Medical supplies", "color": Colors.yellow, lottie: require('../animations/goods.json') },
  { "name": "Toys & games", "color": Colors.orange, lottie: require('../animations/toys.json') },
  { "name": "Hygiene", "color": Colors.orange, lottie: require('../animations/hygiene.json') },
  { "name": "Household", "color": Colors.blue, lottie: require('../animations/goods.json') }
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

const DonatePage = ({ handlePage, scrollToTop }) => {
  const [donationType, setDonationType] = useState("none");
  const [selectedGoods, setSelectedGoods] = useState("none");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    if (scrollToTop) {
      scrollToTop();
    }
  }, [scrollToTop]);

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
        <div className="grid grid-rows-3 md:grid-cols-3 gap-4 md:gap-3 mt-2 md:mt-8 md:mx-4 mx:2 pb-20 ">
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
              className="mx-auto"
            >
              <Button
                onClick={() => handleDonationType(item.name)}
                key={index}
                className="p-2 rounded-4xl shadow-lg min-w-80 max-w-80 min-h-80 max-h-80"
                sx={{
                  bgcolor: "white",
                  borderRadius: "8000px",
                  borderWidth: "20px",
                  borderColor: "gray",
                  textTransform: "none",
                  '&:hover': {
                    bgcolor: "gray.50",
                  }
                }}>
                <div className="grid grid-flow-row gap-0 p-3">
                  <div className="text-center text-lg justify-center text-blue-800 font-bold p-0.5">{item.name}</div>
                  <Lottie
                    options={defaultOptions1(item.json)}
                    className="mx-auto my-auto max-w-1 max-h-3.5"
                    height={"200px"}
                    width={"300px"}
                  />

                </div>
              </Button>
            </motion.div>
          )}
        </div>
      </>
    )
  }

  const DonationTypeGoods = ({ handleDonationType, handleGoods }) => {

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
          // You can now use base64String to send it to your database
        };
        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }

    const DeliveryType = ({ value, onChange }) => {
      const [deliveryType, setDeliveryType] = useState(value || "Pick");

      const handleDeliveryType = (type) => {
        console.log('DeliveryType clicked:', type);
        setDeliveryType(type);
        onChange(type);
      }

      // Update local state when prop changes
      React.useEffect(() => {
        if (value !== undefined) {
          setDeliveryType(value);
        }
      }, [value]);

      // Debug logging
      React.useEffect(() => {
        console.log('DeliveryType - value:', value, 'deliveryType:', deliveryType);
      }, [value, deliveryType]);

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
                color: deliveryType === "Drop" ? "white" : "black",
                textTransform: "none",
                borderRadius: "9999px",

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
                color: deliveryType === "Pick" ? "white" : "black",
                textTransform: "none",
                borderRadius: "9999px",

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
        delivery_type: "Pick", // Default to valid value
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
          // Get the current authenticated user
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            alert("Please log in to submit a donation");
            setLoading(false);
            return;
          }

          // Validate required fields
          if (!formData.delivery_type || !['Pick', 'Drop'].includes(formData.delivery_type)) {
            alert("Please select a delivery type (Pick up or Drop off)");
            setLoading(false);
            return;
          }

          if (!formData.description.trim()) {
            alert("Please provide a description");
            setLoading(false);
            return;
          }

          // Debug logging
          console.log('Submitting donation with formData:', formData);

          // First, ensure user exists in public.users table
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            alert("Error setting up user account. Please try logging out and back in.");
            setLoading(false);
            return;
          }

          const { error } = await supabase
            .from("donations")
            .insert([{
              user_id: user.id,
              category: "Electronics",
              ...formData
            }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
            alert(`Error submitting donation: ${error.message}`);
          } else {
            alert(PopUpMessage);
            // Reset form and redirect to dashboard
            setFormData({ delivery_type: "", description: "", brand: "" });
            setTimeout(() => handlePage('Dashboard'), 1500);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} />
          <DeliveryType
            value={formData.delivery_type}
            onChange={(value) => setFormData({ ...formData, delivery_type: value })}
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
        delivery_type: "Pick", // Default to valid value
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
          // Get the current authenticated user
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            alert("Please log in to submit a donation");
            setLoading(false);
            return;
          }

          // Validate required fields
          if (!formData.delivery_type || !['Pick', 'Drop'].includes(formData.delivery_type)) {
            alert("Please select a delivery type (Pick up or Drop off)");
            setLoading(false);
            return;
          }

          if (!formData.description.trim()) {
            alert("Please provide a description");
            setLoading(false);
            return;
          }

          // First, ensure user exists in public.users table
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            alert("Error setting up user account. Please try logging out and back in.");
            setLoading(false);
            return;
          }

          const { error } = await supabase
            .from("donations")
            .insert([{
              user_id: user.id,
              category: "Clothing",
              ...formData
            }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
            alert(`Error submitting donation: ${error.message}`);
          } else {
            alert(PopUpMessage);
            // Reset form and redirect to dashboard
            setFormData({ delivery_type: "", description: "", gender: "" });
            setTimeout(() => handlePage('Dashboard'), 1500);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type}
            onChange={(value) => setFormData({ ...formData, delivery_type: value })}
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
        delivery_type: "Pick", // Default to valid value
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
          // Get the current authenticated user
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            alert("Please log in to submit a donation");
            setLoading(false);
            return;
          }

          // Validate required fields
          if (!formData.delivery_type || !['Pick', 'Drop'].includes(formData.delivery_type)) {
            alert("Please select a delivery type (Pick up or Drop off)");
            setLoading(false);
            return;
          }

          if (!formData.description.trim()) {
            alert("Please provide a description");
            setLoading(false);
            return;
          }

          // First, ensure user exists in public.users table
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            alert("Error setting up user account. Please try logging out and back in.");
            setLoading(false);
            return;
          }

          const { error } = await supabase
            .from("donations")
            .insert([{
              user_id: user.id,
              category: "Books and Educational Materials",
              ...formData
            }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
            alert(`Error submitting donation: ${error.message}`);
          } else {
            alert(PopUpMessage);
            // Reset form and redirect to dashboard
            setFormData({ delivery_type: "", description: "", quantity: "" });
            setTimeout(() => handlePage('Dashboard'), 1500);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type}
            onChange={(value) => setFormData({ ...formData, delivery_type: value })}
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
        delivery_type: "Pick", // Default to valid value
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
          // Get the current authenticated user
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            alert("Please log in to submit a donation");
            setLoading(false);
            return;
          }

          // Validate required fields
          if (!formData.delivery_type || !['Pick', 'Drop'].includes(formData.delivery_type)) {
            alert("Please select a delivery type (Pick up or Drop off)");
            setLoading(false);
            return;
          }

          if (!formData.description.trim()) {
            alert("Please provide a description");
            setLoading(false);
            return;
          }

          // First, ensure user exists in public.users table
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            alert("Error setting up user account. Please try logging out and back in.");
            setLoading(false);
            return;
          }

          const { error } = await supabase
            .from("donations")
            .insert([{
              user_id: user.id,
              category: "Non-Perishable Foods",
              ...formData
            }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
            alert(`Error submitting donation: ${error.message}`);
          } else {
            alert(PopUpMessage);
            // Reset form and redirect to dashboard
            setFormData({ delivery_type: "", description: "", expiration_date: "" });
            setTimeout(() => handlePage('Dashboard'), 1500);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type}
            onChange={(value) => setFormData({ ...formData, delivery_type: value })}
          />
          <textarea
            name="description"
            placeholder="List of items (e.g., canned goods)"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Expiration Date (if applicable)"
              value={formData.expiration_date ? new Date(formData.expiration_date) : null}
              onChange={(newValue) => {
                setFormData({
                  ...formData,
                  expiration_date: newValue ? newValue.toISOString().split('T')[0] : ""
                });
              }}
              slotProps={{ textField: { fullWidth: true, className: "w-full max-w-md" } }}
              className="w-full max-w-md"
            />
          </LocalizationProvider>

          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateFurniture = () => {
      const [formData, setFormData] = useState({
        delivery_type: "Pick", // Default to valid value
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
          // Get the current authenticated user
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            alert("Please log in to submit a donation");
            setLoading(false);
            return;
          }

          // Validate required fields
          if (!formData.delivery_type || !['Pick', 'Drop'].includes(formData.delivery_type)) {
            alert("Please select a delivery type (Pick up or Drop off)");
            setLoading(false);
            return;
          }

          if (!formData.description.trim()) {
            alert("Please provide a description");
            setLoading(false);
            return;
          }

          // First, ensure user exists in public.users table
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            alert("Error setting up user account. Please try logging out and back in.");
            setLoading(false);
            return;
          }

          const { error } = await supabase
            .from("donations")
            .insert([{
              user_id: user.id,
              category: "Furniture",
              ...formData
            }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
            alert(`Error submitting donation: ${error.message}`);
          } else {
            alert(PopUpMessage);
            // Reset form and redirect to dashboard
            setFormData({ delivery_type: "", description: "", quantity: "" });
            setTimeout(() => handlePage('Dashboard'), 1500);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type}
            onChange={(value) => setFormData({ ...formData, delivery_type: value })}
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
        delivery_type: "Pick", // Default to valid value
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
          // Get the current authenticated user
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            alert("Please log in to submit a donation");
            setLoading(false);
            return;
          }

          // Validate required fields
          if (!formData.delivery_type || !['Pick', 'Drop'].includes(formData.delivery_type)) {
            alert("Please select a delivery type (Pick up or Drop off)");
            setLoading(false);
            return;
          }

          if (!formData.description.trim()) {
            alert("Please provide a description");
            setLoading(false);
            return;
          }

          // First, ensure user exists in public.users table
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            alert("Error setting up user account. Please try logging out and back in.");
            setLoading(false);
            return;
          }

          const { error } = await supabase
            .from("donations")
            .insert([{
              user_id: user.id,
              category: "Medical Supplies",
              ...formData
            }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
            alert(`Error submitting donation: ${error.message}`);
          } else {
            alert(PopUpMessage);
            // Reset form and redirect to dashboard
            setFormData({ delivery_type: "", description: "", expiration_date: "" });
            setTimeout(() => handlePage('Dashboard'), 1500);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type}
            onChange={(value) => setFormData({ ...formData, delivery_type: value })}
          />
          <textarea
            name="description"
            placeholder="Description of medical supplies"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Expiration Date (if applicable)"
              value={formData.expiration_date ? new Date(formData.expiration_date) : null}
              onChange={(newValue) => {
                setFormData({
                  ...formData,
                  expiration_date: newValue ? newValue.toISOString().split('T')[0] : ""
                });
              }}
              slotProps={{ textField: { fullWidth: true, className: "w-full max-w-md" } }}
              className="w-full max-w-md"
            />
          </LocalizationProvider>

          <DonateButton loading={loading} />
        </form>
      );
    };

    const DonateHygiene = () => {
      const [formData, setFormData] = useState({
        delivery_type: "Pick", // Default to valid value
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
          // Get the current authenticated user
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            alert("Please log in to submit a donation");
            setLoading(false);
            return;
          }

          // Validate required fields
          if (!formData.delivery_type || !['Pick', 'Drop'].includes(formData.delivery_type)) {
            alert("Please select a delivery type (Pick up or Drop off)");
            setLoading(false);
            return;
          }

          if (!formData.description.trim()) {
            alert("Please provide a description");
            setLoading(false);
            return;
          }

          // First, ensure user exists in public.users table
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            alert("Error setting up user account. Please try logging out and back in.");
            setLoading(false);
            return;
          }

          const { error } = await supabase
            .from("donations")
            .insert([{
              user_id: user.id,
              category: "Hygiene",
              ...formData
            }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
            alert(`Error submitting donation: ${error.message}`);
          } else {
            alert(PopUpMessage);
            // Reset form and redirect to dashboard
            setFormData({ delivery_type: "", description: "" });
            setTimeout(() => handlePage('Dashboard'), 1500);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type}
            onChange={(value) => setFormData({ ...formData, delivery_type: value })}
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
        delivery_type: "Pick", // Default to valid value
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
          // Get the current authenticated user
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            alert("Please log in to submit a donation");
            setLoading(false);
            return;
          }

          // Validate required fields
          if (!formData.delivery_type || !['Pick', 'Drop'].includes(formData.delivery_type)) {
            alert("Please select a delivery type (Pick up or Drop off)");
            setLoading(false);
            return;
          }

          if (!formData.description.trim()) {
            alert("Please provide a description");
            setLoading(false);
            return;
          }

          // First, ensure user exists in public.users table
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            alert("Error setting up user account. Please try logging out and back in.");
            setLoading(false);
            return;
          }

          const { error } = await supabase
            .from("donations")
            .insert([{
              user_id: user.id,
              category: "Household",
              ...formData
            }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
            alert(`Error submitting donation: ${error.message}`);
          } else {
            alert(PopUpMessage);
            // Reset form and redirect to dashboard
            setFormData({ delivery_type: "", description: "" });
            setTimeout(() => handlePage('Dashboard'), 1500);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type}
            onChange={(value) => setFormData({ ...formData, delivery_type: value })}
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
        delivery_type: "Pick", // Default to valid value
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
          // Get the current authenticated user
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            alert("Please log in to submit a donation");
            setLoading(false);
            return;
          }

          // Validate required fields
          if (!formData.delivery_type || !['Pick', 'Drop'].includes(formData.delivery_type)) {
            alert("Please select a delivery type (Pick up or Drop off)");
            setLoading(false);
            return;
          }

          if (!formData.description.trim()) {
            alert("Please provide a description");
            setLoading(false);
            return;
          }

          // First, ensure user exists in public.users table
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            alert("Error setting up user account. Please try logging out and back in.");
            setLoading(false);
            return;
          }

          const { error } = await supabase
            .from("donations")
            .insert([{
              user_id: user.id,
              category: "Toys and Games",
              ...formData
            }]);

          if (error) {
            console.error("Error submitting donation:", error.message);
            alert(`Error submitting donation: ${error.message}`);
          } else {
            alert(PopUpMessage);
            // Reset form and redirect to dashboard
            setFormData({ delivery_type: "", description: "", age_group: "" });
            setTimeout(() => handlePage('Dashboard'), 1500);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type}
            onChange={(value) => setFormData({ ...formData, delivery_type: value })}
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
          <div className="grid grid-flow-row sm:grid-cols-2 xl:grid-cols-3 gap-6 mx-2 pt-5">
            {AllGoodsDonations.map((item, index) =>
              <motion.button
                key={index} // assuming each Product has a unique id
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                whileHover={{ scale: 1.05, backgroundColor: "gray.200" }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  delay: index * 0.15, // Add staggered delay based on index
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 2,
                  duration: 0.3,
                }}
                onClick={() => handleGoods(item.name)}
                className="grid grid-flow-row p-2 rounded-4xl mx-auto border-2 border-gray-200 shadow-lg min-w-80"
                sx={{
                  bgcolor: "white",
                  textTransform: "none",
                  '&:hover': {
                    bgcolor: "gray.50",
                  }
                }}>
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-md p-4 transform rotate-4 transition-transform hover:rotate-0 duration-300 max-w-72 mx-auto mb-6">
                  <div className="w-16 h-16 mx-auto">
                    <Lottie
                      options={{
                        loop: true,
                        autoplay: true,
                        animationData: item.lottie,
                        rendererSettings: {
                          preserveAspectRatio: 'xMidYMid slice'
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  {item.name}
                </div>
              </motion.button>
            )
            }
          </div> : null}
        {selectedGoods === "Clothing" ?
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.8, 0.9, 1], x: 4 }}
            className="mt-50"
            transition={{
              delay: 0.15, // Add staggered delay based on index
              type: "spring",
              stiffness: 300,
              damping: 35,
              mass: 5,
              duration: 0.2,
            }}><DonateClothing />
          </motion.div> : null}
        {selectedGoods === "Non - perishable food" ?
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 3 }}
            className="mt-50"
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
            className="mt-50"
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
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          className="mt-50"
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateElectronics /></motion.div> : null}
        {selectedGoods === "Furniture" ? <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          className="mt-50"
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateFurniture /></motion.div> : null}
        {selectedGoods === "Medical supplies" ? <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          className="mt-50"
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateMedicalSupplies /></motion.div> : null}
        {selectedGoods === "Toys & games" ? <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          className="mt-50"
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateToysAndGames /></motion.div> : null}
        {selectedGoods === "Hygiene" ? <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          className="mt-50"
          transition={{
            delay: 0.5, // Add staggered delay based on index
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 20,
            duration: 0.2,
          }}><DonateHygiene /></motion.div> : null}
        {selectedGoods === "Household" ? <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          className="mt-50"
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
      if (scrollToTop) {
        scrollToTop();
      }
    }, [selectedCash, scrollToTop]);

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
    const [formData, setFormData] = useState({
      service_category: "",
      description: "",
      service_location: "",
      availability: {
        monday: { selected: false, startTime: "", endTime: "" },
        tuesday: { selected: false, startTime: "", endTime: "" },
        wednesday: { selected: false, startTime: "", endTime: "" },
        thursday: { selected: false, startTime: "", endTime: "" },
        friday: { selected: false, startTime: "", endTime: "" },
        saturday: { selected: false, startTime: "", endTime: "" },
        sunday: { selected: false, startTime: "", endTime: "" },
      },
    });
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);

    /// Image handler ///
    function handleImage(e) {
      const file = e.target.files[0]; // Get the selected file
      setImage(URL.createObjectURL(e.target.files[0]));

      if (file) {
        // Create a FileReader to read the file
        const reader = new FileReader();

        // Set up an event listener for when the file is read
        reader.onloadend = () => {
          // You can now use base64String to send it to your database
        };
        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleLocationChange = (location) => {
      setFormData({ ...formData, service_location: location });
    };

    const handleDayToggle = (day) => {
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          [day]: {
            ...formData.availability[day],
            selected: !formData.availability[day].selected,
          },
        },
      });
    };

    const handleTimeChange = (day, field, value) => {
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          [day]: {
            ...formData.availability[day],
            [field]: value,
          },
        },
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        // Get the current authenticated user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          alert("Please log in to submit a donation");
          setLoading(false);
          return;
        }

        // Validate required fields
        if (!formData.service_category) {
          alert("Please select a service category");
          setLoading(false);
          return;
        }

        if (!formData.description.trim()) {
          alert("Please provide a service description");
          setLoading(false);
          return;
        }

        if (!formData.service_location) {
          alert("Please select a service location option");
          setLoading(false);
          return;
        }

        // Validate availability - at least one day must be selected
        const hasSelectedDays = Object.values(formData.availability).some(day => day.selected);
        if (!hasSelectedDays) {
          alert("Please select at least one day for your availability");
          setLoading(false);
          return;
        }

        // Validate time ranges for selected days
        const selectedDaysData = Object.entries(formData.availability).filter(([_, data]) => data.selected);
        for (const [day, data] of selectedDaysData) {
          if (!data.startTime || !data.endTime) {
            alert(`Please provide both start and end times for ${day.charAt(0).toUpperCase() + day.slice(1)}`);
            setLoading(false);
            return;
          }
          if (data.startTime >= data.endTime) {
            alert(`End time must be after start time for ${day.charAt(0).toUpperCase() + day.slice(1)}`);
            setLoading(false);
            return;
          }
        }

        // Debug logging
        console.log('Submitting service donation with formData:', formData);

        // First, ensure user exists in public.users table
        const { error: userError } = await supabase
          .from("users")
          .upsert([{
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email.split('@')[0]
          }], { onConflict: 'id' });

        if (userError) {
          console.error("Error creating user record:", userError);
          alert("Error setting up user account. Please try logging out and back in.");
          setLoading(false);
          return;
        }

        // Format availability data for database
        const selectedDays = Object.entries(formData.availability)
          .filter(([_, data]) => data.selected)
          .map(([day, data]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${data.startTime} - ${data.endTime}`)
          .join(', ');

        const { error } = await supabase
          .from("service_donations")
          .insert([{
            user_id: user.id,
            service_category: formData.service_category,
            description: formData.description,
            location_preference: formData.service_location,
            availability: selectedDays,
          }]);

        if (error) {
          console.error("Error submitting service donation:", error.message);
          alert(`Error submitting service donation: ${error.message}`);
        } else {
          alert(PopUpMessage);
          // Reset form and redirect to dashboard
          setFormData({
            service_category: "",
            description: "",
            service_location: "",
            availability: {
              monday: { selected: false, startTime: "", endTime: "" },
              tuesday: { selected: false, startTime: "", endTime: "" },
              wednesday: { selected: false, startTime: "", endTime: "" },
              thursday: { selected: false, startTime: "", endTime: "" },
              friday: { selected: false, startTime: "", endTime: "" },
              saturday: { selected: false, startTime: "", endTime: "" },
              sunday: { selected: false, startTime: "", endTime: "" },
            },
          });
          setImage(null);
          setTimeout(() => handlePage('Dashboard'), 1500);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        <GoBackMain />
        <form
          className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-transparent"
          onSubmit={handleSubmit}
        >
          <ImageDialog image={image} handleImage={handleImage} />
          <select
            name="service_category"
            value={formData.service_category}
            onChange={handleChange}
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
            name="description"
            placeholder="Describe the service you are offering (e.g., skills, tools, duration, etc.)"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          ></textarea>

          {/* Service Location */}
          <div className="grid grid-flow-row">
            <div className="text-left text-gray-600 pb-3">Service Location</div>
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => handleLocationChange("Remote")}
                className="text-gray-800 font-bold"
                variant="contained"
                sx={{
                  bgcolor: formData.service_location === "Remote" ? "blue.600" : "white",
                  color: formData.service_location === "Remote" ? "white" : "black",
                  textTransform: "none",
                  borderRadius: "9999px",
                  '&:hover': {
                    bgcolor: formData.service_location === "Remote" ? "blue.700" : "gray.50",
                  }
                }}>
                I can provide this service remotely
              </Button>
              <Button
                onClick={() => handleLocationChange("InPerson")}
                className="text-gray-800 font-bold"
                variant="contained"
                sx={{
                  bgcolor: formData.service_location === "InPerson" ? "blue.600" : "white",
                  color: formData.service_location === "InPerson" ? "white" : "black",
                  textTransform: "none",
                  borderRadius: "9999px",
                  '&:hover': {
                    bgcolor: formData.service_location === "InPerson" ? "blue.700" : "gray.50",
                  }
                }}>
                Requires my presence at a location
              </Button>
            </div>
          </div>

          {/* Availability */}
          <div className="w-full max-w-md">
            <Typography variant="h6" className="text-left text-gray-600 pb-3">
              Availability
            </Typography>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(formData.availability).map(([day, data]) => (
                <div key={day} className="flex items-center gap-3 p-2 border border-gray-200 rounded">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.selected}
                        onChange={() => handleDayToggle(day)}
                        sx={{
                          color: "gray.400",
                          '&.Mui-checked': {
                            color: "blue.600",
                          },
                        }}
                      />
                    }
                    label={day.charAt(0).toUpperCase() + day.slice(1)}
                    sx={{ marginRight: 1 }}
                  />
                  {data.selected && (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={data.startTime}
                        onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                        className="p-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={data.endTime}
                        onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                        className="p-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <DonateButton loading={loading} />
        </form></>
    );
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="relative h-[300px] bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-4">Donate</h1>
            </motion.div>
            <motion.p
              className="text-xl max-w-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Make a lasting impact in your community by donating goods, cash, or services to those who need it most.
            </motion.p>
          </div>
        </div>
        <div className="max-w-md mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please log in to your account to submit donations and track your impact.
            </p>
            <Button
              onClick={() => handlePage('Login')}
              variant="contained"
              className="bg-blue-600 hover:bg-blue-700 py-3 px-6"
            >
              Go to Login
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {donationType === "none" ?
        <div className="relative h-[300px] bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-4">Donate</h1>
            </motion.div>
            <motion.p
              className="text-xl max-w-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Make a lasting impact in your community by donating goods, cash, or services to those who need it most.
            </motion.p>
          </div>
        </div> : null}
      {donationType === "none" ? <><NoDonationTypeSelected /></> : null}
      {donationType === "Goods" ? <><DonationTypeGoods handleDonationType={handleDonationType} handleGoods={handleGoods} /></> : null}
      {donationType === "Cash" ? <><DonationTypeCash /></> : null}
      {donationType === "Service" ? <><DonationTypeService /></> : null}
    </div>
  )
}

export default DonatePage;