"use client";
import React, { useState, useEffect } from "react";
import * as motion from "motion/react-client"
import { Dialog, Box } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL_WECARE, API_KEY_WECARE, FontType } from "../supabase";
import { DonationDialog } from "./components/donation";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation'; // Change this to `next/navigation` for client-side navigation


const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);


const Donate = ({
    handleServiceName,
    ServiceName,
    handleServiceDescription,
    ServiceDescription,
    file,
    handleImage,
    handleClose,
    handleAddService,
    open,
    handleFilter,
    image,
    category,
    handleCategory,
    Type,
    handleType,
    Size,
    handleSize,
    quantity,
    handleQuantity,
    condition,
    handleCondition,
    color,
    handleColor,
    brand,
    handleBrand

}) => {
    return (
        <div>
            <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{
                    type: "spring",
                    bounce: 0.02,
                    stiffness: 200,
                    damping: 20,
                    mass: 20,
                    duration: 0.5,
                }} className="flex align-center justify-center mx-auto">
                <Button
                    size="large"
                    onClick={handleFilter}
                    sx={{
                        textTransform: "none", bgcolor: "#05e6c0", color: "whitesmoke",
                        '&:hover': {
                            backgroundColor: "#96ffed",
                            color: 'gray',
                        }
                    }} >
                    Donate Now
                </Button>
            </motion.div>
            <DonationDialog
                handleServiceName={handleServiceName}
                ServiceName={ServiceName}
                ServiceDescription={ServiceDescription}
                handleServiceDescription={handleServiceDescription}
                file={file}
                handleImage={handleImage}
                handleClose={handleClose}
                handleAddService={handleAddService}
                open={open}
                image={image}
                category={category}
                handleCategory={handleCategory}
                Type={Type}
                handleType={handleType}
                size={Size}
                handleSize={handleSize}
                quantity={quantity}
                handleQuantity={handleQuantity}
                condition={condition}
                handleCondition={handleCondition}
                color={color}
                handleColor={handleColor}
                brand={brand}
                handleBrand={handleBrand}
            />
        </div>
    )
}


// const TopRatedServices = () => { <div></div> }

const SupDataMap = ({
    Data,
    handleProduct,
    handleCloseProduct,
    product,
    productIndex, }) => {


    // Trancatuate if title is more than 4 words //
    function truncateWords(text, wordLimit) {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    }

    const handleDateConversion = ({ timestamp }) => {
        try {
            console.log("Input timestamp:", timestamp);

            // Preprocess the timestamp to replace the space with a 'T' and trim fractional seconds
            const sanitizedTimestamp = timestamp.replace(' ', 'T').replace(/\.\d+/, '');

            // Parse the sanitized timestamp
            const date = new Date(sanitizedTimestamp);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid timestamp provided.");
            }

            // Extract and format date components
            const year = String(date.getFullYear()).slice(2); // Last two digits of the year
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            const formattedDatetime = `${day}-${month}-${year} ${hours}:${minutes}`;

            console.log("Formatted DateTime:", formattedDatetime);
            return formattedDatetime; // Return in DDMMYYHHMM format
        } catch (error) {
            console.error("Error in handleDateConversion:", error.message);
            return null; // Return null if something goes wrong
        }
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-4 pb-5 mt-10">
            {Data.map((Product, index) => (
                <motion.div
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
                >
                    <Button sx={{ padding: 0 }} onClick={(event) => handleProduct(event, index)}
                        className={`block rounded-none bg-[url(./background2.svg)] bg-repeat bg-cover bg-fixed shadow-sm shadow-gray-600 h-full w-full`}>
                        <Image
                            alt="test"
                            style={{ maxHeight: "200px", width: "100%", top: 0 }}
                            src={`data:image/jpeg;base64,${Product.image}`}
                        />
                        <div className="flex text-cyan-950 text-sm font-medium align-center justify-center p-2">
                            Donated On: {handleDateConversion({ timestamp: Data[productIndex].creation_date })}
                        </div>
                    </Button>
                    <Dialog
                        onClose={handleCloseProduct}
                        open={product}
                        className={` bg-[url(./background4.svg)] `}
                    >
                        <Box style={{ maxWidth: "400px", maxHeight: "1000px" }} className={` bg-[url(./background2.svg)] `}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 75,
                                    mass: 8,
                                    duration: 1,
                                }}>
                                <Image
                                    alt="test"
                                    style={{ maxHeight: "500px", minWidth: "100%" }}
                                    src={`data:image/jpeg;base64,${Data[productIndex].image}`}
                                />
                            </motion.div>
                            <IconButton onClick={handleCloseProduct} sx={{ position: "absolute", top: 1, right: 1, alignItems: "center", justifyItems: "center", }}>
                                <CloseIcon sx={{ fontSize: "30px" }} />
                            </IconButton>
                            <div className="flex transform-none text-cyan-950 font-sans text-md my-auto justify-center p-2">
                                {Data[productIndex].title}
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 20,
                                    damping: 15,
                                    mass: 10,
                                    duration: 1,
                                }}>
                                <div className="flex text-cyan-950 text-sm font-light my-auto justify-center p-4">{truncateWords(Data[productIndex].description, 50)}</div>
                            </motion.div>
                            <div className="flex text-cyan-950 text-sm font-medium align-center justify-center p-2">
                                Donated On: {handleDateConversion({ timestamp: Data[productIndex].creation_date })}
                            </div>
                        </Box>
                    </Dialog>
                </motion.div>
            ))
            }
        </div >
    );
};


const Donations = () => {
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [Data, setData] = useState([]);
    const [ServiceName, setServiceName] = useState("");
    const [ServiceDescription, setServiceDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [Type, setType] = useState('');
    const [Size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [product, setProduct] = useState('');
    const [productIndex, setProductIndex] = useState(0);
    const [condition, setCondition] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');

    const router = useRouter();

    const handleFilter = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }
    const handleCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleType = (e) => {
        setType(e.target.value)
    }
    const handleSize = (e) => {
        setSize(e.target.value)
    }
    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }
    const handleCondition = (e) => {
        setCondition(e.target.value)
    }
    const handleColor = (e) => {
        setColor(e.target.value)
    }
    const handleBrand = (e) => {
        setBrand(e.target.value)
    }

    const handleProduct = (e, index) => {
        setProductIndex(index);
        setProduct(true);
    };

    const handleCloseProduct = () => {
        setProduct(false);

    };

    const handleServiceName = (e) => {
        setServiceName(e.target.value)
    }

    const handleServiceDescription = (e) => {
        setServiceDescription(e.target.value)
    }

    /// supabase search function ///
    async function handleAddService() {
        const InsertData = {
            title: ServiceName,
            description: ServiceDescription,
            category: category,
            type: Type,
            doner: localStorage.getItem("user_id"),
            color: color,
            size: Size,
            image: file,
            condition: condition,
            brand: brand
        }
        const { data } = await
            supabase
                .from("donations")
                .insert(InsertData)
        console.log(InsertData)
        setOpen(false);
        getInstruments();
    }


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
    async function getInstruments() {
        const user_details = JSON.parse(localStorage.getItem("sb-sdsejsyrecrffnjqevfm-auth-token"));
        const { data } = await
            supabase
                .from("donations")
                .select()
                .eq("doner", localStorage.getItem("user_id"))
        setData(data)
    }

    /// Run this before mounting the component ////
    useEffect(() => {
        getInstruments();

    }, []);

    return (
        <React.Fragment>
            <div className="mt-14">
                <div className="block align-center justify-center">
                    <Donate
                        className="mt-3"
                        ServiceName={ServiceName}
                        handleServiceName={handleServiceName}
                        ServiceDescription={ServiceDescription}
                        handleServiceDescription={handleServiceDescription}
                        file={file}
                        image={image}
                        handleImage={handleImage}
                        handleClose={handleClose}
                        handleAddService={handleAddService}
                        open={open}
                        handleFilter={handleFilter}
                        category={category}
                        handleCategory={handleCategory}
                        Type={Type}
                        size={Size}
                        handleType={handleType}
                        handleSize={handleSize}
                        condition={condition}
                        handleContion={handleCondition}
                        color={color}
                        handleColor={handleColor}
                        brand={brand}
                        handleBrand={handleBrand}
                        quantity={quantity}
                        handleQuantity={handleQuantity}
                    />
                    <div>
                        <div className="ml-4 text-cyan-950 text-2xl text-left" style={{ fontFamily: FontType }}>My donations</div>
                        <SupDataMap
                            Data={Data}
                            handleProduct={handleProduct}
                            handleCloseProduct={handleCloseProduct}
                            product={product}
                            productIndex={productIndex}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Donations;
