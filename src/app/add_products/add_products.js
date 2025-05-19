"use client";
import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material"
import * as motion from "motion/react-client"
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createClient } from "@supabase/supabase-js";
import Dialog from '@mui/material/Dialog';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SUPABASE_URL, API_KEY, FontType } from "../supabase";
import { ClothingDialog } from "./components/Clothing";
import { ShoeDialog } from "./components/shoes";
import { AccessoriesDialog } from "./components/accessories";

const supabase = createClient(SUPABASE_URL, API_KEY);




const GenderDialog = ({ Gender, handleGender }) => {
    return (<div>
        <FormControl fullWidth>
            <InputLabel color="success" >Gender</InputLabel>
            <Select
                color="success"
                value={Gender}
                onChange={handleGender}
            >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
        </FormControl>
    </div>)
}


const ImageDialog = ({ image, handleImage }) => {
    return (
        <>
            <Button
                sx={{
                    textTransform: "none", bgcolor: "#05e6c0", color: "whitesmoke",
                    '&:hover': {
                        backgroundColor: "#96ffed",
                        color: 'gray',
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
            </div></>)
}

const DonationDialog = ({
    handleImage,
    handleClose,
    handleAddService,
    open,
    image,
    category,
    handleCategory,
    Type,
    handleType,
    Size,
    handleSize,
    Gender,
    handleGender }) => {
    return (
        <Dialog
            onClose={handleClose} open={open}>
            <div className="grid grid-flow-row gap-1 p-4 bg-[url(./background2.svg)]" style={{ minWidth: "340px" }}>
                <TextField placeholder="Product Title" color="success" size="medium" />
                <TextField placeholder="Product description" color="success" size="medium" />
                <div className="grid grid-flow-col mt-5">
                    <div>
                        <FormControl fullWidth>
                            <InputLabel color="success">Category</InputLabel>
                            <Select
                                color="success"
                                value={category}
                                onChange={(handleCategory)}
                                label="Service Category"
                            >
                                <MenuItem value={"Clothing"}>Clothing</MenuItem>
                                <MenuItem value={"Shoes"}>Shoes</MenuItem>
                                <MenuItem value={"Accessories"}>Accessories</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <ClothingDialog Type={Type} handleType={handleType} Size={Size} handleSize={handleSize} category={category} />
                    <ShoeDialog Size={Size} handleSize={handleSize} category={category} />
                    <AccessoriesDialog Type={Type} handleType={handleType} category={category} />
                </div>
                <GenderDialog Gender={Gender} handleGender={handleGender} />
                <ImageDialog image={image} handleImage={handleImage} />
                <div className="flex align-center justify-center pb-4 pt-4">
                    <Button
                        sx={{
                            textTransform: "none", bgcolor: "#05e6c0", color: "whitesmoke",
                            '&:hover': {
                                backgroundColor: "#96ffed",
                                color: 'gray',
                            }
                        }}
                        className={`${FontType}`}
                        onClick={handleAddService}
                        size="large">
                        Donate
                    </Button>
                </div>
            </div>
        </Dialog >
    )
}
const Donate = ({
    handleServiceName,
    handleServiceRate,
    handleServiceDescription,
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
    Gender,
    handleGender
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
                }} className="inline-flex">
                <IconButton
                    size="large"
                    className="bg-transparent"
                    onClick={handleFilter} >
                    <AddCircleOutlineIcon sx={{ fontSize: "50pt", color: "steelblue" }} />
                </IconButton>
            </motion.div>
            <DonationDialog
                handleServiceName={handleServiceName}
                handleServiceRate={handleServiceRate}
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
                Gender={Gender}
                handleGender={handleGender} />
        </div>
    )
}


// const TopRatedServices = () => { <div></div> }

const ServiceMap = ({ Data }) => {
    return (
        <div className="grid lg:grid-cols-5 grid-flow-row gap-4 mt-20 mx-4 pb-2">
            {Data.map((Service, index) => (
                <motion.div
                    key={Service.id} // assuming each service has a unique id
                    initial={{ opacity: 0, height: "0%" }}
                    animate={{ opacity: 1, height: "100%" }}
                    transition={{
                        delay: index * 0.1, // Add staggered delay based on index
                        type: "keyframes",
                        stiffness: 400,
                        damping: 10,
                        mass: 10,
                        duration: 0.3,
                    }}
                >
                    <Stack className="block bg-linear-to-r from-gray-100 to-gray-100 via-gray-300 shadow-md shadow-gray-800 h-full">
                        <img
                            alt="test"
                            style={{ maxHeight: "150pt", width: "100%" }}
                            src={`data:image/jpeg;base64,${Service.person_logo}`}
                        />
                        <div className="flex align-center justify-center my-2">
                            <Rating
                                name="Avg rating"
                                value={Service.rating ? Service.rating : 0}
                                size="medium"
                                sx={{ alignItems: "center", justifyItems: "center" }}
                            />
                        </div>
                        <div className="flex text-gray-700 text-xs font-serif my-auto justify-center">
                            R {Service.price} / {Service.rate_unit}
                        </div>
                        <div className="text-gray-700 text-2xl font-serif text-center justify-center font-bold">
                            <div className="ml-5">{Service.service_title.toUpperCase()}</div>
                            <div className="w-full h-0.5 bg-linear-to-r from-cyan-950 to-cyan-950 via-cyan-600 px-2"></div>
                        </div>
                        <div className="text-gray-700 text-md font-serif text-center justify-center p-4">
                            {Service.service_description}
                        </div>
                        <div className="p-4 flex align-center justify-center">
                            <Button
                                variant="text"
                                sx={{ textTransform: "none", maxHeight: "20pt" }}
                                className="bg-transparent"
                            >
                                <div className="text-cyan-900 font-serif">Read More</div>
                            </Button>
                        </div>
                    </Stack>
                </motion.div>
            ))}
        </div>
    );
};


const Service = () => {
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [Data, setData] = useState([]);
    const [ServiceName, setServiceName] = useState("");
    const [ServiceRate, setServiceRate] = useState("");
    const [ServiceDescription, setServiceDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [Type, setType] = useState('');
    const [Size, setSize] = useState('');
    const [Gender, setGender] = useState('');


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
    const handleGender = (e) => {
        setGender(e.target.value)
    }

    const handleServiceName = (e) => {
        setServiceName(e.target.value)
    }

    const handleServiceRate = (e) => {
        setServiceRate(e.target.value)
    }
    const handleServiceDescription = (e) => {
        setServiceDescription(e.target.value)
    }

    /// supabase search function ///
    async function handleAddService() {
        const user_details = JSON.parse(localStorage.getItem("sb-sdsejsyrecrffnjqevfm-auth-token"));
        const { data } = await
            supabase
                .from("products")
                .insert({
                    service_title: ServiceName,
                    price: ServiceRate,
                    service_description: ServiceDescription,
                    person_logo: file,
                    user_id: user_details.user.id,
                    category: category
                })
        setOpen(false);
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

    /// Run this before mounting the component ////
    useEffect(() => {
        getInstruments();
        async function getInstruments() {
            const user_details = JSON.parse(localStorage.getItem("sb-sdsejsyrecrffnjqevfm-auth-token"));
            const { data } = await
                supabase
                    .from("nextjs_services")
                    .select()
                    .eq("user_id", user_details.user.id)
            setData(data)
        }
    }, []);

    return (
        <React.Fragment>
            <div className="mt-14">
                <div className="block align-center justify-center">
                    <div>
                        <div className="flex align-center justify-center">
                            <Donate
                                handleServiceName={handleServiceName}
                                handleServiceRate={handleServiceRate}
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
                                Gender={Gender}
                                handleGender={handleGender}
                                className="flex align-center justify-center" />
                        </div>
                        <ServiceMap Data={Data} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Service;
