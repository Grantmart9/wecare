
"use client"; // Add this line at the top of your component file
import React, { useState, useEffect, useCallback } from "react";
import { IconButton, ListItem, TextField, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import { SUPABASE_URL_WECARE, API_KEY_WECARE, TextColor, FontType, DrawerBackgroundHoverColor } from "../supabase";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { motion } from "motion/react";
import LoadingThreeDotsJumping from "../components/loading";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);

const SearchBar = ({
    handleFilter,
    handleClose,
    handleChange,
    handleChange1,
    fetchData,
    open,
    value,
    value1,
    searchQuery,
    handleSearchChange,
    handleClearSearch,
    handleClearFilter,
    switchOffFilter

}) => {

    return (
        <div className="mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 5 }}
                transition={{
                    delay: 1,
                    type: "spring",
                    bounce: 0.02,
                    stiffness: 100,
                    damping: 30,
                    mass: 5,
                    duration: 0.5,
                }}
                style={{ maxHeight: "30px" }}
                className="inline-flex ml-14 sm:ml-2 sm:mr-2 mr-20"
            >
                <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    variant="text"
                    className="rounded-r-none shadow-r-none shadow-gray-800 shadow-xs transform-none text-cyan-50 md:w-28"
                    style={{
                        background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                    }}
                    onClick={handleFilter}
                >Filter
                </Button>
                <TextField
                    size="small"
                    fullWidth={true}
                    value={searchQuery}
                    color="info"
                    className="p-1 shadow-gray-800 shadow-xs text-center justify-center my-auto md:w-80"
                    style={{
                        background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                    }}
                    onChange={handleSearchChange}
                    sx={{ input: { color: 'whitesmoke', maxHeight: "5px" }, outline: { color: "transparent" } }}
                />
                <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    variant="text"
                    onClick={handleClearSearch}
                    style={{
                        background: "rgba(128, 128, 128, 0.25)", // Set the background with 15% opacity
                    }}
                    className="rounded-l-none shadow-r-none shadow-gray-800 shadow-xs transform-none text-gray-100">
                    <ClearIcon className={`text-cyan-50`} size="small" />
                </Button>
            </motion.div>
            <Dialog
                onClose={handleClose}
                open={open}
                style={{ backgroundColor: "rgba(128, 128, 128, 0.25)" }}
            >
                <List
                    className="p-10"
                >
                    <ListItem sx={{ minWidth: "200pt" }}>
                        <Typography className="text-lime-600 whitespace-nowrap">Rating </Typography>
                        <Slider
                            className="text-lime-600 ml-4"
                            getAriaLabel={() => 'Rating range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            name="Rating"
                            max={5}
                            step={1}
                            min={1}
                        />
                    </ListItem>
                    <ListItem sx={{ minWidth: "200pt" }}>
                        <Typography className="text-lime-600 whitespace-nowrap">Max Price </Typography>
                        <Slider
                            className="text-lime-600 ml-4"
                            getAriaLabel={() => 'Price range'}
                            value={value1}
                            onChange={handleChange1}
                            valueLabelDisplay="auto"
                            max={3000}
                            step={500}
                            min={0}
                        />
                    </ListItem>
                </List>
                <div className="grid grid-cols-2 gap-2 p-2">
                    <Button onClick={handleClearFilter} sx={{
                        textTransform: "none", bgcolor: DrawerBackgroundHoverColor, color: "white",
                        '&:hover': {
                            backgroundColor: "rgba(128, 128, 128, 0.40)",
                            color: "whitesmoke"
                        }
                    }}>
                        Clear
                    </Button>
                    <Button
                        onClick={() => { fetchData(); switchOffFilter() }}
                        sx={{
                            textTransform: "none", bgcolor: DrawerBackgroundHoverColor, color: "white",
                            '&:hover': {
                                backgroundColor: "rgba(128, 128, 128, 0.40)",
                                color: "whitesmoke"
                            }
                        }}>Apply</Button>
                </div>
            </Dialog>
        </div>
    );
};

const SupDataMap = ({
    Data,
    handleProduct,
    handleCloseProduct,
    product,
    productIndex,
    handleSnackbar }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddQuantity = () => { setQuantity(quantity + 1) }
    const handleSubtractQuantity = () => {
        if (quantity <= 0) { setQuantity(0) }
        else { setQuantity(quantity - 1) }
    }

    // Trancatuate if title is more than 4 words //
    function truncateWords(text, wordLimit) {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-4 pb-5">
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
                        <div style={{ fontFamily: FontType, color: "black", textTransform: "none" }} className="flex text-xs my-auto justify-center p-2">
                            {truncateWords(Product.title, 6)}
                        </div>
                        <div className="grid grid-flow-col">
                            <div className="flex align-center justify-center">
                                <Rating
                                    style={{ color: "gold" }}
                                    name="Avg rating"
                                    value={Data[productIndex].rating}
                                    sx={{ alignItems: "center", justifyItems: "center", fontSize: "14px" }}
                                />
                            </div>
                            <div style={{ fontFamily: FontType, color: "black", textTransform: "none" }} className="flex text-md font-bold my-auto justify-end p-2">
                                {"R "}{Product.cost_after_vat}
                            </div>
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
                            <Rating
                                style={{ color: "gold" }}
                                name="Avg rating"
                                value={Data[productIndex].rating}
                                size="medium"
                                sx={{ position: "absolute", top: 4, left: 5, alignItems: "center", justifyItems: "center" }}
                            />
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
                            <div
                                className="grid grid-flow-col pb-3">
                                <div className="flex text-cyan-950 text-lg font-medium align-center justify-center p-2">
                                    R {Data[productIndex].cost_after_vat}
                                </div>
                                <div
                                    className="grid grid-cols-3 my-auto">
                                    <IconButton onClick={handleSubtractQuantity} className="my-auto mx-auto" size="small"><RemoveCircleOutlineOutlinedIcon className="text-cyan-950" /></IconButton>
                                    <div className="text-center justify-center my-auto">{quantity}</div>
                                    <IconButton onClick={handleAddQuantity} className="my-auto mx-auto" size="small"><AddCircleOutlineOutlinedIcon className="text-cyan-950" /></IconButton>
                                </div>
                                <div
                                    className="mx-auto my-auto">
                                    <Button
                                        onClick={() => handleSnackbar({
                                            "user_id": localStorage.getItem("user_id"),
                                            "product_id": Data[productIndex].product_id,
                                            "title": Data[productIndex].title,
                                            "cost_before_vat": Data[productIndex].cost_before_vat,
                                            "cost_after_vat": Data[productIndex].cost_after_vat,
                                            "quantity": quantity,
                                            "image": Data[productIndex].image,
                                        })}
                                        sx={{
                                            textTransform: "none", bgcolor: "rgba(128, 128, 128, 0.40)", color: "#9af5f5",
                                            '&:hover': {
                                                backgroundColor: DrawerBackgroundHoverColor,
                                            }
                                        }}
                                        className="text-cyan-950 text-sm"
                                        size="small">
                                        add to cart +
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </Dialog>
                </motion.div>
            ))
            }
        </div >
    );
};

const Products = () => {
    const [Data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([1, 5]); // Rating range
    const [value1, setValue1] = useState([3000]); // Price range
    const [searchQuery, setSearchQuery] = useState("");
    const [product, setProduct] = useState(false);
    const [productIndex, setProductIndex] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleFilter = () => {
        setOpen(true);
    };

    const handleProduct = (e, index) => {
        setProductIndex(index);
        setProduct(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseProduct = () => {
        setProduct(false);

    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
    };


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchQuery("")

    };

    const handleClearFilter = () => {
        setValue([1, 5]);
        setValue1([3000]);
        setOpen(false);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setProduct(false);
    };

    const switchOffFilter = () => { setOpen(false) }

    const handleSnackBar = (sellected) => {
        setOpenSnackbar(true) && setOpen(false);
        addToCart(sellected)
        console.log(sellected)
    };

    async function addToCart(sellected) {

        try {
            // Insert data into the "cart" table
            const { data, error } = await supabase.from('cart').insert([sellected]);

            if (error) {
                console.error("Error inserting into cart:", error.message);
                return;
            }

            console.log("Cart item added successfully:", data);
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    }

    // Memoized getInstruments function
    const getInstruments = useCallback(async () => {
        let query = supabase.from("products").select();

        // Filter by category
        query = query.ilike("category", localStorage.getItem("category"));
        // Filter by category
        query = query.ilike("gender", localStorage.getItem("gender"));

        // Filter by rating
        if (value && value[0] !== undefined && value[1] !== undefined) {
            query = query.gte("rating", value[0]).lte("rating", value[1]);
        }

        // Filter by price
        if (value1 && value1 !== undefined && value1 !== undefined) {
            query = query.lte("cost_after_vat", value1);
        }

        // Add search query filter
        if (searchQuery) {
            query = query.ilike("title", `%${searchQuery}%`);
        }

        const { data } = await query;
        setData(data);
    }, [value, value1, searchQuery]);

    useEffect(() => {
        getInstruments();
    }, [getInstruments]);

    return (
        <React.Fragment>
            <div className="fixed w-full mx-auto flex justify-cente z-40">
                <SearchBar
                    handleFilter={handleFilter}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    handleChange1={handleChange1}
                    fetchData={getInstruments}
                    open={open}
                    value={value}
                    value1={value1}
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleClearFilter={handleClearFilter}
                    handleClearSearch={handleClearSearch}
                    switchOffFilter={switchOffFilter}
                />
            </div>
            <div className="block align-center justify-center mt-14" style={{ width: "100vw" }}>
                {Data.length === 0 ?
                    <div style={{ minWidth: "100vw", marginTop: "40vh" }} className="flex">
                        <div
                            className="mx-auto">
                            <LoadingThreeDotsJumping />
                        </div>
                    </div>
                    :
                    <div
                        className="sticky align-center justify-center rounded-md py-2.5 z-20 min-w-full">
                        <SupDataMap
                            Data={Data}
                            handleProduct={handleProduct}
                            handleCloseProduct={handleCloseProduct}
                            product={product}
                            productIndex={productIndex}
                            handleSnackbar={handleSnackBar}
                        />
                    </div>
                }
            </div>
            <Snackbar
                open={openSnackbar}
                anchorOrigin={{ "vertical": 'bottom', "horizontal": 'right' }}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
            >
                <SnackbarContent
                    className={"flex justify-center align-center mx-auto bg-lime-400"}
                    message={
                        <div style={{ fontFamily: FontType }} className="text-center text-lg text-cyan-950">Added to your cart</div>
                    }
                />
            </Snackbar>
        </React.Fragment >
    );
};

export default Products;
