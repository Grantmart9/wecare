import React, { useState, useEffect } from "react";
import { SUPABASE_URL, API_KEY, Colors } from "../supabase";
import { createClient } from "@supabase/supabase-js";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Lottie from 'react-lottie';
import animationData1 from '../animations/goods.json';
import animationData2 from '../animations/service.json';
import animationData3 from '../animations/cash.json';
import loadingAnimation from '../animations/loading.json';
import Image from 'next/image';
import backButtonImage from '../images/backbutton.png';
import * as motion from "motion/react-client";
import { useAnimate } from "motion/react";

const supabase = createClient(SUPABASE_URL, API_KEY);

interface DonatePageProps {
  handlePage: (page: string) => void;
  scrollToTop?: () => void;
}

interface DonationType {
  name: string;
  json: any;
  color: string;
}

interface GoodsDonation {
  name: string;
  color: string;
  lottie: any;
}

interface PaymentType {
  name: string;
  color: string;
}

interface FormData {
  delivery_type?: string;
  description?: string;
  brand?: string;
  gender?: string;
  quantity?: string;
  expiration_date?: string;
  service_category?: string;
  service_location?: string;
  availability?: {
    monday?: { selected: boolean; startTime: string; endTime: string };
    tuesday?: { selected: boolean; startTime: string; endTime: string };
    wednesday?: { selected: boolean; startTime: string; endTime: string };
    thursday?: { selected: boolean; startTime: string; endTime: string };
    friday?: { selected: boolean; startTime: string; endTime: string };
    saturday?: { selected: boolean; startTime: string; endTime: string };
    sunday?: { selected: boolean; startTime: string; endTime: string };
  };
}

interface CountryCode {
  code: string;
  name: string;
  flag: string;
  placeholder: string;
}

const DonationTypes: DonationType[] = [
  { name: "Goods", json: animationData1, color: Colors.red },
  { name: "Cash", json: animationData3, color: Colors.blue },
  { name: "Service", json: animationData2, color: Colors.yellow },
];

const AllGoodsDonations: GoodsDonation[] = [
  { "name": "Clothing", "color": Colors.red, lottie: require('../animations/clothing.json') },
  { "name": "Non - perishable food", "color": Colors.red, lottie: require('../animations/nonperishable.json') },
  { "name": "Books & educatutional materials", "color": Colors.green, lottie: require('../animations/books.json') },
  { "name": "Electronics", "color": Colors.green, lottie: require('../animations/electronics.json') },
  { "name": "Furniture", "color": Colors.yellow, lottie: require('../animations/furniture.json') },
  { "name": "Medical supplies", "color": Colors.yellow, lottie: require('../animations/medical.json') },
  { "name": "Toys & games", "color": Colors.orange, lottie: require('../animations/toys.json') },
  { "name": "Hygiene", "color": Colors.orange, lottie: require('../animations/hygiene.json') },
  { "name": "Household", "color": Colors.blue, lottie: require('../animations/household.json') }
]

interface ImageDialogProps {
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  image: string;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ handleImage, image }) => {
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

const SvgPathLoader = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      // Calculate total animation duration (longest letter + its delay)
      const totalDuration = 4000; // 4 seconds total

      // W animation - runs for full duration
      animate(
        [
          [".w1", { pathLength: 0.6, pathOffset: 0 }],
          [".w1", { pathLength: 0.01, pathOffset: 0 }],
          [".w2", { pathLength: 0.6, pathOffset: 0.6 }, { at: "<" }]
        ],
        { duration: 2.5, ease: "linear" } as any
      );

      // e animation - runs for full duration
      animate(
        [
          [".e1", { pathLength: 0.6, pathOffset: 0 }],
          [".e1", { pathLength: 0.01, pathOffset: 0 }],
          [".e2", { pathLength: 0.6, pathOffset: 0.6 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", delay: 0.3 } as any
      );

      // C animation - runs for full duration
      animate(
        [
          [".c1", { pathLength: 0.7, pathOffset: 0 }],
          [".c1", { pathLength: 0.01, pathOffset: 0 }]
        ],
        { duration: 2.2, ease: "linear", delay: 0.6 } as any
      );

      // a animation - runs for full duration
      animate(
        [
          [".a1", { pathLength: 0.6, pathOffset: 0 }],
          [".a1", { pathLength: 0.01, pathOffset: 0 }],
          [".a2", { pathLength: 0.6, pathOffset: 0.6 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", delay: 0.9 } as any
      );

      // r animation - runs for full duration
      animate(
        [
          [".r1", { pathLength: 0.6, pathOffset: 0 }],
          [".r1", { pathLength: 0.01, pathOffset: 0 }],
          [".r2", { pathLength: 0.6, pathOffset: 0.6 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", delay: 1.2 } as any
      );

      // e animation (second e) - runs for full duration
      animate(
        [
          [".e3", { pathLength: 0.6, pathOffset: 0 }],
          [".e3", { pathLength: 0.01, pathOffset: 0 }],
          [".e4", { pathLength: 0.6, pathOffset: 0.6 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", delay: 1.5 } as any
      );

      // Set a timeout to end loading after animation completes
      setTimeout(() => {
        // Animation completed, loading state will end naturally
      }, totalDuration);
    };
    animateLoader();
  }, []);

  return (
    <svg
      ref={scope}
      width="120mm"
      height="40mm"
      viewBox="0 0 120 40"
    >
      {/* W */}
      <motion.path
        className="w1"
        initial={{ pathLength: 0.6, pathOffset: 0.6 }}
        d="M 2,35 L 8,8 L 12,25 L 16,8 L 22,35"
        stroke="#3B82F6"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        className="w2"
        initial={{ pathLength: 0, pathOffset: 1 }}
        d="M 2,35 L 8,8 L 12,25 L 16,8 L 22,35"
        stroke="#3B82F6"
        strokeWidth="2"
        fill="none"
      />

      {/* e */}
      <motion.path
        className="e1"
        initial={{ pathLength: 0.6, pathOffset: 0.6 }}
        d="M 28,20 L 35,20 L 33,18 L 30,18 L 30,22 L 33,22 L 35,20"
        stroke="#8B5CF6"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        className="e2"
        initial={{ pathLength: 0, pathOffset: 1 }}
        d="M 28,20 L 35,20 L 33,18 L 30,18 L 30,22 L 33,22 L 35,20"
        stroke="#8B5CF6"
        strokeWidth="2"
        fill="none"
      />

      {/* C */}
      <motion.path
        className="c1"
        initial={{ pathLength: 0.7, pathOffset: 0.7 }}
        d="M 42,15 Q 38,12 38,18 Q 38,24 42,27"
        stroke="#10B981"
        strokeWidth="2"
        fill="none"
      />

      {/* a */}
      <motion.path
        className="a1"
        initial={{ pathLength: 0.6, pathOffset: 0.6 }}
        d="M 48,27 Q 52,25 54,22 L 54,27 L 56,27 L 56,18 L 54,18 L 50,22 Q 48,24 48,27"
        stroke="#F59E0B"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        className="a2"
        initial={{ pathLength: 0, pathOffset: 1 }}
        d="M 48,27 Q 52,25 54,22 L 54,27 L 56,27 L 56,18 L 54,18 L 50,22 Q 48,24 48,27"
        stroke="#F59E0B"
        strokeWidth="2"
        fill="none"
      />

      {/* r */}
      <motion.path
        className="r1"
        initial={{ pathLength: 0.6, pathOffset: 0.6 }}
        d="M 62,27 L 62,18 L 64,18 L 68,20 L 68,22 L 64,20 L 64,27"
        stroke="#EF4444"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        className="r2"
        initial={{ pathLength: 0, pathOffset: 1 }}
        d="M 62,27 L 62,18 L 64,18 L 68,20 L 68,22 L 64,20 L 64,27"
        stroke="#EF4444"
        strokeWidth="2"
        fill="none"
      />

      {/* e (second e) */}
      <motion.path
        className="e3"
        initial={{ pathLength: 0.6, pathOffset: 0.6 }}
        d="M 74,20 L 81,20 L 79,18 L 76,18 L 76,22 L 79,22 L 81,20"
        stroke="#8B5CF6"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        className="e4"
        initial={{ pathLength: 0, pathOffset: 1 }}
        d="M 74,20 L 81,20 L 79,18 L 76,18 L 76,22 L 79,22 L 81,20"
        stroke="#8B5CF6"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

const DonatePage: React.FC<DonatePageProps> = ({ handlePage, scrollToTop }) => {
  const [donationType, setDonationType] = useState<string>("none");
  const [selectedGoods, setSelectedGoods] = useState<string>("none");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleDonationType = (selected: string) => { setDonationType(selected) }
  const handleGoods = (selected: string) => { setSelectedGoods(selected); setDonationType(selected); }
  const handleGoods1 = (selected: string) => { setDonationType(selected) }

  const PopUpMessage = "Donation submitted successfully ! \nCheck out your dashboard to view your donations"

  const defaultOptions1 = (donation: any) => {
    return {
      loop: true,
      autoplay: true,
      animationData: donation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  };

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
            <Image src={backButtonImage} alt="Back" width={24} height={24} />
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
            <Image src={backButtonImage} alt="Back" width={24} height={24} />
          </Button>
          Donate | {donationType}
        </div>
      </motion.div>
    )
  }

  const DonateButton: React.FC<{ loading: boolean }> = ({ loading }) => {
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
        {donationType === "none" ? null : <GoBack />}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Choose Your Donation Type
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select how you'd like to make a difference in your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {DonationTypes.map((item, index) =>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 * index,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.8,
                }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-teal-200 transform hover:-translate-y-2">
                  {/* Gradient background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative p-8">
                    <Button
                      onClick={() => handleDonationType(item.name)}
                      className="w-full h-full bg-transparent hover:bg-transparent p-0 border-0 shadow-none"
                      sx={{
                        textTransform: "none",
                        '&:hover': {
                          backgroundColor: "transparent",
                        },
                        padding: 0,
                        minHeight: "auto",
                      }}
                    >
                      <div className="text-center space-y-6">
                        {/* Icon container with gradient background */}
                        <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-teal-100 to-orange-100 flex items-center justify-center shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                          <div className="w-24 h-24">
                            <Lottie
                              options={defaultOptions1(item.json)}
                              height={96}
                              width={96}
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-teal-700 transition-colors duration-300">
                            {item.name}
                          </h3>
                          <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full mx-auto group-hover:w-24 transition-all duration-300"></div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.name === "Goods" && "Donate physical items and essentials"}
                          {item.name === "Cash" && "Make financial contributions"}
                          {item.name === "Service" && "Offer your time and skills"}
                        </p>
                      </div>
                    </Button>
                  </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-teal-300 transition-colors duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm">
              Every contribution makes a difference in someone's life
            </p>
          </div>
        </div>
      </>
    )
  }

  const DonationTypeGoods = ({ handleDonationType, handleGoods }: { handleDonationType: (selected: string) => void; handleGoods: (selected: string) => void }) => {

    const [image, setImage] = useState<string>();

    /// Image handler ///
    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
        setImage(URL.createObjectURL(file));

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

    interface DeliveryTypeProps {
      value: string;
      onChange: (value: string) => void;
    }

    const DeliveryType: React.FC<DeliveryTypeProps> = ({ value, onChange }) => {
      const [deliveryType, setDeliveryType] = useState<string>(value || "Pick");

      const handleDeliveryType = (type: string) => {
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
      const [formData, setFormData] = useState<FormData>({
        delivery_type: "Pick", // Default to valid value
        description: "",
        brand: "",
      });

      const [loading, setLoading] = useState<boolean>(false);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e: React.FormEvent) => {
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

          if (!formData.description?.trim()) {
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
              name: user.user_metadata?.name || user.email!.split('@')[0]
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
          <ImageDialog image={image || ""} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type || ""}
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
      const [formData, setFormData] = useState<FormData>({
        delivery_type: "Pick", // Default to valid value
        description: "",
      });
      const [loading, setLoading] = useState<boolean>(false);

      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e: React.FormEvent) => {
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

          if (!formData.description?.trim()) {
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
              name: user.user_metadata?.name || user.email!.split('@')[0]
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
          <ImageDialog image={image || ""} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type || ""}
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
      const [formData, setFormData] = useState<FormData>({
        delivery_type: "Pick", // Default to valid value
        description: "",
        // age_group: "",
      });
      const [loading, setLoading] = useState<boolean>(false);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e: React.FormEvent) => {
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

          if (!formData.description?.trim()) {
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
              name: user.user_metadata?.name || user.email!.split('@')[0]
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
          <ImageDialog image={image || ""} handleImage={handleImage} />
          <DeliveryType
            value={formData.delivery_type || ""}
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
            value=""
            onChange={handleChange}
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          />

          <DonateButton loading={loading} />
        </form>
      );
    };

    return (
      <div className="text-center pt-5">
        {selectedGoods === "none" ? <> <GoBackMain /></> :
          <div className="flex justify-start"><GoBack />{" "}{selectedGoods === "none" ? null
            :
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 3 }}
              transition={{
                delay: 0.3,
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
                className="modern-card-interactive grid grid-flow-row p-4 mx-auto min-w-80">
                <div className="gradient-primary rounded-2xl shadow-lg p-4 transform rotate-2 transition-transform hover:rotate-0 duration-300 max-w-72 mx-auto mb-6">
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
                <div className="text-lg font-semibold text-gray-700">
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
            }}><DonateElectronics />
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
            }}><DonateElectronics />
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
            }}><DonateElectronics />
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
          }}><DonateElectronics /></motion.div> : null}
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
          }}><DonateElectronics /></motion.div> : null}
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
          }}><DonateElectronics /></motion.div> : null}
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
          }}><DonateElectronics /></motion.div> : null}
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
          }}><DonateElectronics /></motion.div> : null}
      </div>
    )
  }
  const DonationTypeCash = () => {
    const [selectedCash, setSelectedCash] = useState<string>("none");

    const handleCash = (selected: string) => { setSelectedCash(selected) }

    const paymentTypes: PaymentType[] = [
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Choose Your Payment Method
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a secure and convenient way to make your financial contribution
          </p>
        </div>

        {/* Navigation */}
        {selectedCash === "none" ? (
          <GoBackMain />
        ) : (
          <div className="flex justify-start mb-8">
            <GoBack />
            {selectedCash !== "none" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center text-lg text-gray-800 font-bold ml-4"
              >
                | {selectedCash}
              </motion.div>
            )}
          </div>
        )}

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {paymentTypes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 * index,
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.6,
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-green-200 transform hover:-translate-y-1">
                {/* Payment method icon and name */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                    <div className="text-2xl">
                      {item.name === "Credit/debit card" && "💳"}
                      {item.name === "EFT" && "🏦"}
                      {item.name === "Cash" && "💵"}
                      {item.name === "SnapScan" && "📱"}
                      {item.name === "Zapper" && "⚡"}
                      {item.name === "Payfast" && "💰"}
                      {item.name === "Apple Pay" && "📱"}
                      {item.name === "Google Pay" && "🎯"}
                      {item.name === "Samsung Pay" && "📱"}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {item.name === "Credit/debit card" && "Secure online payment"}
                    {item.name === "EFT" && "Direct bank transfer"}
                    {item.name === "Cash" && "In-person donation"}
                    {item.name === "SnapScan" && "QR code payment"}
                    {item.name === "Zapper" && "Instant payment"}
                    {item.name === "Payfast" && "Online payment gateway"}
                    {item.name === "Apple Pay" && "Apple wallet payment"}
                    {item.name === "Google Pay" && "Google wallet payment"}
                    {item.name === "Samsung Pay" && "Samsung wallet payment"}
                  </p>

                  {/* Select button */}
                  <Button
                    onClick={() => handleCash(item.name)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      selectedCash === item.name
                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-green-500 text-gray-700 hover:text-white'
                    }`}
                    sx={{
                      textTransform: "none",
                      borderRadius: "12px",
                      '&:hover': {
                        transform: "translateY(-1px)",
                        boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
                      }
                    }}
                  >
                    {selectedCash === item.name ? "Selected ✓" : "Select Method"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected payment info */}
        {selectedCash !== "none" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Payment Method Selected
                </h3>
                <p className="text-gray-600 mb-6">
                  You've chosen <span className="font-semibold text-green-600">{selectedCash}</span> as your payment method.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => handleCash("none")}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                    sx={{ textTransform: "none" }}
                  >
                    Change Method
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    sx={{
                      textTransform: "none",
                      '&:hover': {
                        transform: "translateY(-1px)",
                      }
                    }}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md border border-gray-200">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs">🔒</span>
            </div>
            <span className="text-gray-600 text-sm font-medium">
              All payments are secure and encrypted
            </span>
          </div>
        </motion.div>
      </div>
    )
  }
  const DonationTypeService = () => {
    const [formData, setFormData] = useState<FormData>({
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
    const [image, setImage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    /// Image handler ///
    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file) {
        setImage(URL.createObjectURL(file));

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleLocationChange = (location: string) => {
      setFormData({ ...formData, service_location: location });
    };

    const handleDayToggle = (day: string) => {
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          [day]: {
            ...(formData.availability?.[day as keyof typeof formData.availability] || { selected: false, startTime: "", endTime: "" }),
            selected: !(formData.availability?.[day as keyof typeof formData.availability]?.selected || false),
          },
        },
      });
    };

    const handleTimeChange = (day: string, field: string, value: string) => {
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          [day]: {
            ...(formData.availability?.[day as keyof typeof formData.availability] || { selected: false, startTime: "", endTime: "" }),
            [field]: value,
          },
        },
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
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

        if (!formData.description?.trim()) {
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
        const hasSelectedDays = Object.values(formData.availability || {}).some(day => day?.selected);
        if (!hasSelectedDays) {
          alert("Please select at least one day for your availability");
          setLoading(false);
          return;
        }

        // Validate time ranges for selected days
        const selectedDaysData = Object.entries(formData.availability || {}).filter(([_, data]) => data?.selected);
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
            name: user.user_metadata?.name || user.email!.split('@')[0]
          }], { onConflict: 'id' });

        if (userError) {
          console.error("Error creating user record:", userError);
          alert("Error setting up user account. Please try logging out and back in.");
          setLoading(false);
          return;
        }

        // Format availability data for database
        const selectedDays = Object.entries(formData.availability || {})
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
          setImage(undefined);
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
          <ImageDialog image={image || ""} handleImage={handleImage} />
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
              {Object.entries(formData.availability || {}).map(([day, data]) => (
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


  // Show Lottie loading animation while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Lottie
            options={loadingOptions}
            height={200}
            width={200}
          />
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="relative h-[300px] gradient-hero">
          <div className="absolute inset-0 bg-black opacity-20"></div>
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
    <div className="min-h-screen theme-bg-primary">
      {donationType === "none" ?
        <div className="relative h-[300px] gradient-hero">
          <div className="absolute inset-0 bg-black opacity-20"></div>
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