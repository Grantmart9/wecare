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
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Add Photos (Optional)</h3>
        <p className="text-gray-600 text-sm">Photos help us better understand the donated items</p>
      </div>
      
      <div className="flex justify-center">
        <Button
          component="label"
          sx={{
            textTransform: "none",
            bgcolor: "white",
            color: "teal.600",
            border: "2px dashed #14b8a6",
            fontWeight: "bold",
            borderRadius: "20px",
            paddingX: 8,
            paddingY: 3,
            '&:hover': {
              bgcolor: "rgba(20, 184, 166, 0.05)",
              borderColor: "#0d9488",
            }
          }}
        >
          <div className="flex flex-col items-center space-y-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <div>
              <div className="font-bold">Upload a picture</div>
              <div className="text-sm text-teal-500">Click to browse files</div>
            </div>
          </div>
          <input
            accept="image/*"
            type="file"
            onChange={handleImage}
            style={{ display: 'none' }}
          />
        </Button>
      </div>
      
      <div className="flex justify-center">
        {image ? (
          <div className="relative">
            <img
              width={200}
              alt="Uploaded image"
              src={image}
              className="rounded-2xl shadow-lg border-2 border-teal-100"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
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
        const { data: { user }, error } = await supabase.auth.getUser();
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

  const handleDonationType = (selected: string) => {
    setDonationType(selected)
  }
  const handleGoods = (selected: string) => {
    setSelectedGoods(selected);
    setDonationType("Goods"); // Always set to Goods for goods donation flow
  }
  const handleGoods1 = (selected: string) => {
    setDonationType(selected)
  }

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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex justify-center"
      >
        <Button
          type="submit"
          disabled={loading}
          className="group relative overflow-hidden px-12 py-4 text-lg font-bold text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          sx={{
            background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
            '&:hover': {
              background: "linear-gradient(135deg, #0d9488, #0891b2)",
              boxShadow: "0 25px 50px -12px rgba(20, 184, 166, 0.4)",
            },
            '&:disabled': {
              background: "linear-gradient(135deg, #6b7280, #9ca3af)",
              boxShadow: "none",
            },
            textTransform: "none",
            borderRadius: "50px",
            border: "2px solid transparent",
            position: "relative",
          }}
        >
          {/* Animated background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative flex items-center space-x-3">
            {loading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span>Donate Now</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </>
            )}
          </div>
        </Button>
      </motion.div>
    )
  }

  const NoDonationTypeSelected = () => {
    return (
      <>
        {donationType === "none" ? null : <GoBack />}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                Choose Your Donation Type
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Select how you'd like to make a lasting impact in your community
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-teal-100 hover:border-teal-300 transform hover:-translate-y-3 hover:scale-105">
                  {/* Gradient background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-cyan-50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Content */}
                  <div className="relative p-10">
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
                      <div className="text-center space-y-8">
                        {/* Icon container with gradient background */}
                        <div className="relative mx-auto w-36 h-36 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-teal-200">
                          <div className="w-28 h-28">
                            <Lottie
                              options={defaultOptions1(item.json)}
                              height={112}
                              width={112}
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-4">
                          <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent group-hover:from-teal-600 group-hover:to-cyan-600 transition-all duration-300">
                            {item.name}
                          </h3>
                          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mx-auto group-hover:w-28 transition-all duration-300"></div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 text-base leading-relaxed font-medium">
                          {item.name === "Goods" && "Donate physical items and essentials"}
                          {item.name === "Cash" && "Make financial contributions"}
                          {item.name === "Service" && "Offer your time and skills"}
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            <span>Get Started</span>
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Button>
                  </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-teal-400 transition-all duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl px-8 py-4 border border-teal-100">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <p className="text-gray-700 font-medium">
                Every contribution makes a difference in someone's life
              </p>
            </div>
          </motion.div>
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
        setDeliveryType(type);
        onChange(type);
      }

      React.useEffect(() => {
        if (value !== undefined) {
          setDeliveryType(value);
        }
      }, [value]);

      return (
        <div className="space-y-4">
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery Preference</h3>
            <p className="text-gray-600 text-sm">How would you like to handle the donation?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => handleDeliveryType("Drop")}
                className={`w-full p-6 h-auto font-semibold transition-all duration-300 ${
                  deliveryType === "Drop"
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xl border-2 border-teal-300'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                }`}
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  '&:hover': {
                    backgroundColor: deliveryType === "Drop" ? "transparent" : "rgba(20, 184, 166, 0.05)",
                  }
                }}
              >
                <div className="text-center space-y-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                    deliveryType === "Drop" ? 'bg-white/20' : 'bg-gradient-to-br from-teal-100 to-cyan-100'
                  }`}>
                    <svg className={`w-6 h-6 ${deliveryType === "Drop" ? 'text-white' : 'text-teal-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">I'll Deliver</div>
                    <div className={`text-sm ${deliveryType === "Drop" ? 'text-teal-100' : 'text-gray-500'}`}>
                      Drop off items yourself
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => handleDeliveryType("Pick")}
                className={`w-full p-6 h-auto font-semibold transition-all duration-300 ${
                  deliveryType === "Pick"
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xl border-2 border-teal-300'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                }`}
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  '&:hover': {
                    backgroundColor: deliveryType === "Pick" ? "transparent" : "rgba(20, 184, 166, 0.05)",
                  }
                }}
              >
                <div className="text-center space-y-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                    deliveryType === "Pick" ? 'bg-white/20' : 'bg-gradient-to-br from-teal-100 to-cyan-100'
                  }`}>
                    <svg className={`w-6 h-6 ${deliveryType === "Pick" ? 'text-white' : 'text-teal-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">Request Pickup</div>
                    <div className={`text-sm ${deliveryType === "Pick" ? 'text-teal-100' : 'text-gray-500'}`}>
                      We'll collect from you
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      )
    }

    const DonateElectronics = ({ category }: { category: string }) => {
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
              category: category,
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
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-teal-100 p-10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-200">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Donate {category}
              </h2>
              <p className="text-gray-600">
                Help others with your {category.toLowerCase()} donation
              </p>
            </div>
  
            <form
              className="space-y-8"
              onSubmit={handleSubmit}
            >
              <ImageDialog image={image || ""} handleImage={handleImage} />
              
              <DeliveryType
                value={formData.delivery_type || ""}
                onChange={(value) => setFormData({ ...formData, delivery_type: value })}
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Description of Items
                </label>
                <textarea
                  name="description"
                  placeholder="List of hygiene products (e.g., soap, toothpaste, shampoo, deodorant, toothbrushes)"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
              </div>
  
              <div className="flex justify-center">
                <DonateButton loading={loading} />
              </div>
            </form>
          </motion.div>
        </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {AllGoodsDonations.map((item, index) =>
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5,
                }}
                onClick={() => handleGoods(item.name)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-teal-100 hover:border-teal-300 p-8"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                <div className="relative text-center space-y-6">
                  {/* Icon */}
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-teal-200">
                    <div className="w-16 h-16">
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
                  
                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-700 transition-colors duration-300 mb-2">
                      {item.name}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mx-auto group-hover:w-16 transition-all duration-300"></div>
                  </div>
                  
                  {/* CTA */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-full text-sm shadow-lg">
                      <span>Donate Now</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </div>
                  </div>
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
            }}><DonateElectronics category="Clothing" />
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
            }}><DonateElectronics category="Non - perishable food" />
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
            }}><DonateElectronics category="Books & educatutional materials" />
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
          }}><DonateElectronics category="Electronics" /></motion.div> : null}
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
          }}><DonateElectronics category="Furniture" /></motion.div> : null}
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
          }}><DonateElectronics category="Medical supplies" /></motion.div> : null}
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
          }}><DonateElectronics category="Toys & games" /></motion.div> : null}
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
          }}><DonateElectronics category="Hygiene" /></motion.div> : null}
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
          }}><DonateElectronics category="Household" /></motion.div> : null}
      </div>
    )
  }
  const DonationTypeCash = () => {
    const [selectedCash, setSelectedCash] = useState<string>("none");

    const handleCash = (selected: string) => { setSelectedCash(selected) }

    const paymentTypes: PaymentType[] = [
      { "name": "Credit/debit card", "color": "teal" },
      { "name": "EFT", "color": "teal" },
      { "name": "Cash", "color": "cyan" },
      { "name": "SnapScan", "color": "teal" },
      { "name": "Zapper", "color": "teal" },
      { "name": "Payfast", "color": "teal" },
      { "name": "Apple Pay", "color": "cyan" },
      { "name": "Google Pay", "color": "cyan" },
      { "name": "Samsung Pay", "color": "cyan" },
    ]

    useEffect(() => {
      // getInstruments();
      if (scrollToTop) {
        scrollToTop();
      }
    }, [selectedCash, scrollToTop]);

    return (
      <div className="container mx-auto px-4 py-8">
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Choose Your Payment Method
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select a secure and convenient way to make your financial contribution
          </p>
        </motion.div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {paymentTypes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
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
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-teal-100 hover:border-teal-300 transform hover:-translate-y-2">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg transition-all duration-300 border border-teal-200">
                    <div className="text-3xl">
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

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mx-auto group-hover:w-16 transition-all duration-300"></div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
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

                  <Button
                    onClick={() => handleCash(item.name)}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      selectedCash === item.name
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xl'
                        : 'bg-gray-50 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 text-gray-700 border border-gray-200 hover:border-teal-200'
                    }`}
                    sx={{
                      textTransform: "none",
                      borderRadius: "16px",
                      '&:hover': {
                        transform: "translateY(-2px)",
                        boxShadow: selectedCash === item.name ? "0 20px 40px -12px rgba(20, 184, 166, 0.4)" : "0 8px 25px -12px rgba(0, 0, 0, 0.15)",
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-10 border border-teal-200 shadow-xl">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Payment Method Selected
                  </h3>
                  <p className="text-gray-600">
                    You've chosen <span className="font-semibold text-teal-600">{selectedCash}</span> as your payment method.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    onClick={() => handleCash("none")}
                    className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-200 transition-all duration-300"
                    sx={{ textTransform: "none" }}
                  >
                    Change Method
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    sx={{
                      textTransform: "none",
                      '&:hover': {
                        transform: "translateY(-2px)",
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
          className="text-center mt-16"
        >
          <div className="inline-flex items-center bg-white rounded-2xl px-8 py-4 shadow-lg border border-teal-100">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <span className="text-gray-700 font-medium">
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
      <div className="max-w-4xl mx-auto">
        <GoBackMain />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl border border-teal-100 p-10 mt-4"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-teal-200">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              Offer Your Services
            </h2>
            <p className="text-gray-600 text-lg">
              Share your skills and time to make a meaningful impact
            </p>
          </div>

          <form
            className="space-y-10"
            onSubmit={handleSubmit}
          >
            <ImageDialog image={image || ""} handleImage={handleImage} />
            
            {/* Service Category */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-800">
                Service Category
              </label>
              <select
                name="service_category"
                value={formData.service_category}
                onChange={handleChange}
                required
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-gray-700 text-lg"
              >
                <option value="">Select a Service Category</option>
                <option value="Automotive">Automotive (e.g., mechanic, driver)</option>
                <option value="Professional">Professional (e.g., accounting, legal)</option>
                <option value="HomeMaintenance">Home Maintenance (e.g., welding, plumbing)</option>
                <option value="Educational">Educational (e.g., tutoring, workshops)</option>
                <option value="Medical">Medical (e.g., counseling, health checks)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Service Description */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-800">
                Service Description
              </label>
              <textarea
                name="description"
                placeholder="Describe the service you are offering (e.g., skills, tools, duration, specializations, etc.)"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-gray-700 placeholder-gray-400 text-lg"
              />
            </div>

            {/* Service Location */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Location</h3>
                <p className="text-gray-600">How would you prefer to provide your service?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleLocationChange("Remote")}
                    className={`w-full p-6 h-auto font-semibold transition-all duration-300 ${
                      formData.service_location === "Remote"
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xl border-2 border-teal-300'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                    }`}
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="text-center space-y-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
                        formData.service_location === "Remote" ? 'bg-white/20' : 'bg-gradient-to-br from-teal-100 to-cyan-100'
                      }`}>
                        <svg className={`w-8 h-8 ${formData.service_location === "Remote" ? 'text-white' : 'text-teal-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-xl mb-2">Remote Service</div>
                        <div className={`text-sm ${formData.service_location === "Remote" ? 'text-teal-100' : 'text-gray-500'}`}>
                          I can provide this service online or over the phone
                        </div>
                      </div>
                    </div>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleLocationChange("InPerson")}
                    className={`w-full p-6 h-auto font-semibold transition-all duration-300 ${
                      formData.service_location === "InPerson"
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xl border-2 border-teal-300'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                    }`}
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="text-center space-y-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
                        formData.service_location === "InPerson" ? 'bg-white/20' : 'bg-gradient-to-br from-teal-100 to-cyan-100'
                      }`}>
                        <svg className={`w-8 h-8 ${formData.service_location === "InPerson" ? 'text-white' : 'text-teal-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-xl mb-2">In-Person Service</div>
                        <div className={`text-sm ${formData.service_location === "InPerson" ? 'text-teal-100' : 'text-gray-500'}`}>
                          I can meet people at their location
                        </div>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Availability</h3>
                <p className="text-gray-600">Select the days and times you're available to help</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(formData.availability || {}).map(([day, data]) => (
                  <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-teal-200 transition-all duration-300">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.selected}
                          onChange={() => handleDayToggle(day)}
                          sx={{
                            color: "gray.400",
                            '&.Mui-checked': {
                              color: "teal.600",
                            },
                          }}
                        />
                      }
                      label={<span className="font-semibold text-gray-800 capitalize">{day}</span>}
                      sx={{ marginRight: 1 }}
                    />
                    {data.selected && (
                      <div className="flex items-center gap-3 ml-auto">
                        <input
                          type="time"
                          value={data.startTime}
                          onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                        />
                        <span className="text-gray-500 font-medium">to</span>
                        <input
                          type="time"
                          value={data.endTime}
                          onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <DonateButton loading={loading} />
            </div>
          </form>
        </motion.div>
      </div>
    );
  };


  // Show Lottie loading animation while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50">
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
            className="bg-white rounded-3xl shadow-xl p-10 text-center border border-teal-100"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-teal-200">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Please log in to your account to submit donations and track your impact.
            </p>
            <Button
              onClick={() => handlePage('Login')}
              variant="contained"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              sx={{
                textTransform: "none",
                '&:hover': {
                  transform: "translateY(-2px)",
                }
              }}
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
      {/* Hero Section - Only show when no donation type is selected */}
      {donationType === "none" && (
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
      )}
      
      {/* Main Content - Conditional Rendering */}
      <div className="container mx-auto px-4 py-8">
        {donationType === "none" && <NoDonationTypeSelected />}
        {donationType === "Goods" && <DonationTypeGoods handleDonationType={handleDonationType} handleGoods={handleGoods} />}
        {donationType === "Cash" && <DonationTypeCash />}
        {donationType === "Service" && <DonationTypeService />}
      </div>
    </div>
  )
}

export default DonatePage;