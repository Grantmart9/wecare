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
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SUPABASE_URL, API_KEY, FontType } from "../supabase";
import Input from "@mui/material";

const supabase = createClient(SUPABASE_URL, API_KEY);

const AddServiceDialog = ({
    handleImage,
    handleClose,
    handleAddService,
    open,
    image,
    category,
    handleCategory,
    handleCategory2,
    category2 }) => {

    const ClothingDialog = () => {
        return (
            <>{category === "Clothing" ?
                <>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel color="success">Type</InputLabel>
                            <Select
                                color="success"
                                value={category2}
                                onChange={(handleCategory2)}
                                label="Service Category"
                            >
                                <MenuItem value={"Pants"}>Pants</MenuItem>
                                <MenuItem value={"Shirt"}>Shirt</MenuItem>
                                <MenuItem value={"Jacket"}>Jacket</MenuItem>
                                <MenuItem value={"Jersey"}>Jersey</MenuItem>
                            </Select>
                        </FormControl>
                    </div> {category2 === "Pants" ?
                        <div>
                            <FormControl fullWidth>
                                <InputLabel color="success">Size</InputLabel>
                                <Select
                                    color="success"
                                    label="Service Category"
                                >
                                    <MenuItem value={"Clothing"}>XS</MenuItem>
                                    <MenuItem value={"Shoes"}>S</MenuItem>
                                    <MenuItem value={"Accessories"}>M</MenuItem>
                                    <MenuItem value={"Accessories"}>L</MenuItem>
                                    <MenuItem value={"Accessories"}>XL</MenuItem>
                                    <MenuItem value={"Accessories"}>XXL</MenuItem>
                                </Select>
                            </FormControl>
                        </div> : null}
                    {category2 === "Shirt" ?
                        <div>
                            <FormControl fullWidth>
                                <InputLabel color="success">Size</InputLabel>
                                <Select
                                    color="success"
                                    label="Service Category"
                                >
                                    <MenuItem value={"Clothing"}>XS</MenuItem>
                                    <MenuItem value={"Shoes"}>S</MenuItem>
                                    <MenuItem value={"Accessories"}>M</MenuItem>
                                    <MenuItem value={"Accessories"}>L</MenuItem>
                                    <MenuItem value={"Accessories"}>XL</MenuItem>
                                    <MenuItem value={"Accessories"}>XXL</MenuItem>
                                </Select>
                            </FormControl>
                        </div> : null}
                    {category2 === "Jacket" ?
                        <div>
                            <FormControl fullWidth>
                                <InputLabel color="success">Size</InputLabel>
                                <Select
                                    color="success"
                                    label="Service Category"
                                >
                                    <MenuItem value={"Clothing"}>XS</MenuItem>
                                    <MenuItem value={"Shoes"}>S</MenuItem>
                                    <MenuItem value={"Accessories"}>M</MenuItem>
                                    <MenuItem value={"Accessories"}>L</MenuItem>
                                    <MenuItem value={"Accessories"}>XL</MenuItem>
                                    <MenuItem value={"Accessories"}>XXL</MenuItem>
                                </Select>
                            </FormControl>
                        </div> : null}
                    {category2 === "Jersey" ?
                        <div>
                            <FormControl fullWidth>
                                <InputLabel color="success">Size</InputLabel>
                                <Select
                                    color="success"
                                    label="Service Category"
                                >
                                    <MenuItem value={"Clothing"}>XS</MenuItem>
                                    <MenuItem value={"Shoes"}>S</MenuItem>
                                    <MenuItem value={"Accessories"}>M</MenuItem>
                                    <MenuItem value={"Accessories"}>L</MenuItem>
                                    <MenuItem value={"Accessories"}>XL</MenuItem>
                                    <MenuItem value={"Accessories"}>XXL</MenuItem>
                                </Select>
                            </FormControl>
                        </div> : null}
                </>
                : null}</>)
    }

    const ShoeDialog = () => {
        return (
            <>
                {category === "Shoes" ?
                    <div>
                        <FormControl fullWidth>
                            <InputLabel color="success">Size</InputLabel>
                            <Select
                                color="success"
                                label="Service Category"
                            >
                                <MenuItem value={"3.5"}>3.5</MenuItem>
                                <MenuItem value={"4"}>4</MenuItem>
                                <MenuItem value={"4.5"}>4.5</MenuItem>
                                <MenuItem value={"5"}>5</MenuItem>
                                <MenuItem value={"5.5"}>5.5</MenuItem>
                                <MenuItem value={"6"}>6</MenuItem>
                                <MenuItem value={"6.5"}>6.5</MenuItem>
                                <MenuItem value={"7"}>7</MenuItem>
                                <MenuItem value={"8"}>8</MenuItem>
                                <MenuItem value={"9"}>9</MenuItem>
                                <MenuItem value={"10"}>10</MenuItem>
                                <MenuItem value={"11"}>11</MenuItem>
                                <MenuItem value={"12"}>12</MenuItem>
                                <MenuItem value={"13"}>13</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    : null}
            </>)
    }

    const AccessoriesDialog = () => {
        return (<>
            {category === "Accessories" ?
                <div>
                    <FormControl fullWidth>
                        <InputLabel color="success">Type</InputLabel>
                        <Select
                            color="success"
                            label="Service Category"
                        >
                            <MenuItem value={"Scarf"}>Scarf</MenuItem>
                            <MenuItem value={"Winter Gloves"}>Winter Gloves</MenuItem>
                            <MenuItem value={"Belt"}>Belt</MenuItem>
                            <MenuItem value={"Hat"}>Hat</MenuItem>
                            <MenuItem value={"Wallet"}>Wallet</MenuItem>
                            <MenuItem value={"Sunglasses"}>Sunglasses</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                : null}
        </>)
    }

    const GenderDialog = () => {
        return (<div>
            <FormControl fullWidth>
                <InputLabel color="success" >Gender</InputLabel>
                <Select
                    color="success"
                    value={category}
                    label="Service Category"
                >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
            </FormControl>
        </div>)
    }

    return (
        <Dialog
            onClose={handleClose} open={open} >
            <div className="grid grid-flow-row gap-1 p-4 bg-[url(./background2.svg)]">
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
                    <ClothingDialog />
                    <ShoeDialog />
                    <AccessoriesDialog />
                </div>
                <GenderDialog />
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
                </div>
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
const ServiceSearchBar = ({
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
    handleUnit,
    unit,
    category,
    handleCategory,
    category2,
    handleCategory2
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
            <AddServiceDialog
                handleServiceName={handleServiceName}
                handleServiceRate={handleServiceRate}
                handleServiceDescription={handleServiceDescription}
                file={file}
                handleImage={handleImage}
                handleClose={handleClose}
                handleAddService={handleAddService}
                open={open}
                image={image}
                handleUnit={handleUnit}
                unit={unit}
                category={category}
                handleCategory={handleCategory}
                category2={category2}
                handleCategory2={handleCategory2} />
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
    const [unit, setUnit] = React.useState('');
    const [category, setCategory] = useState('');
    const [category2, setCategory2] = useState('');


    /// Event hadnlers ///
    const handleUnit = (event) => {
        setUnit(event.target.value);
    };

    const handleFilter = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }
    const handleCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleCategory2 = (e) => {
        setCategory2(e.target.value)
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
                    rate_unit: unit,
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
                            <ServiceSearchBar
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
                                handleUnit={handleUnit}
                                unit={unit}
                                category={category}
                                handleCategory={handleCategory}
                                category2={category2}
                                handleCategory2={handleCategory2}
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
