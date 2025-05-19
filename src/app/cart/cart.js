"use client"; // Add this line at the top of your component file
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL_WECARE, API_KEY_WECARE, FontType, delivery_rate, third_party_delivery_rate, TextColor, NEXT_PUBLIC_GOOGLE_API_KEY } from "../supabase";
import LoadingThreeDotsJumping from "../components/loading";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from "@mui/material/TableFooter";
import Paper from '@mui/material/Paper';
import { Button, Checkbox, Dialog, IconButton, TextField } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import Image from "next/image";
import { Address } from "../supabase";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);

const Cart = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [distance, setDistance] = useState();
    const [checkout, setCheckout] = useState(false);
    const [eft, setEft] = useState(false);
    const [payment, setPayment] = useState(false);
    const [LocationSellected, setLocationSellected] = useState(false);
    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState("31 waterboom avenue, belhar");
    const router = useRouter();

    const handleCheckout = () => { setCheckout(true) }
    const handlePayment = () => { setPayment(true) }
    const handleEFT = () => { setEft(true) }

    const BankingDetails = ({ handleEFT, eft }) => {
        return (
            <Dialog
                onClose={handleEFT}
                open={eft} >
                <div className="grid grid-flow-row gap-1">
                    <div className={`p-2 text-lg text-center font-bold ${FontType}`}>Thank you for ordering</div>
                    <div className={`p-2 text-center text-sm ${FontType}`}>Payment details have been sent to your email. Your order will be placed as soon as we receive payment.</div>
                    <div className={`p-2 text-center text-sm ${FontType}`}>For updates on your order please visit the Order section.</div>
                    <Button
                        onClick={() => { setEft(false); ClearCart(); router.push("/orders") }}
                        className="p-2 mx-auto mb-2"
                        sx={{
                            textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white", maxWidth: "100px",
                            '&:hover': {
                                backgroundColor: "rgba(44, 192, 222,0.8)", maxWidth: "100px",
                                color: 'white',
                            }
                        }}>
                        Done
                    </Button>
                </div>
            </Dialog>)
    }

    const PaymentOption = ({ handlePayment, payment }) => {
        return (
            <Dialog
                onClose={handlePayment}
                open={payment}>
                <div className="grid grid-flow-row gap-1">
                    <div style={{ fontFamily: FontType }} className="p-2 text-cyan-950">Select a payment option</div>
                    <Button
                        onClick={() => { setPayment(false); setEft(true) }}
                        className="p-2 mx-2"
                        sx={{
                            textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white",
                            '&:hover': {
                                backgroundColor: "rgba(44, 192, 222,0.8)",
                                color: 'white',
                            }
                        }}>
                        EFT
                    </Button>
                    <Button
                        className="p-2 mx-2 mb-2"
                        sx={{
                            textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white",
                            '&:hover': {
                                backgroundColor: "rgba(44, 192, 222,0.8)",
                                color: 'white',
                            }
                        }}>
                        Payfast
                    </Button>
                </div>
            </Dialog >
        )
    }

    const PurchaseStatement = ({ handleCheckout, checkout, data, distance }) => {
        const [address_confirmed, setAddressConfirmed] = useState();
        const [cell_confirmed, setCellConfirmed] = useState();

        let TotalDeliveryCost = Math.min(350, Number(distance) * delivery_rate);

        let DeliveryCostReceivedThirdParty = Number(distance) * third_party_delivery_rate;
        let DeliveryCostReceived = TotalDeliveryCost - DeliveryCostReceivedThirdParty
        console.log({ "Distance:": distance, "Our money:": DeliveryCostReceived, "Uber money:": DeliveryCostReceivedThirdParty })

        let TotalPurchaseCost = data.reduce((sum, row) => sum + row.cost_after_vat * row.quantity, 0);
        let TotalPayable = TotalDeliveryCost + TotalPurchaseCost

        const handleOrder = async () => {
            try {
                const user_id = localStorage.getItem("user_id"); // Assuming you store the user's ID in localStorage
                const delivery_address = localStorage.getItem("user_address"); // Assuming the address is stored in localStorage
                const date_created = new Date().toISOString();
                const status = "pending payment"; // Default status for the order
                const now = new Date();
                const pad = (num) => num.toString().padStart(2, '0');
                const day = pad(now.getDate());
                const month = pad(now.getMonth() + 1); // Months are zero-based
                const hours = pad(now.getHours());
                const minutes = pad(now.getMinutes());
                const contact_person = "+27763442747"
                const order_id = `${contact_person.slice(-5)}${day}${month}${hours}${minutes}`;

                // Prepare the rows to insert into the table
                const orderRows = data.map(item => ({
                    order_id: order_id,
                    product_id: item.id,
                    date_created,
                    status,
                    user_id,
                    quantity: item.quantity,
                    delivery_address, // Include the delivery address
                    contact_person: contact_person,
                    delivery_received: DeliveryCostReceived,
                    delivery_received_thirdparty: DeliveryCostReceivedThirdParty,
                    total_cost: item.cost_after_vat,
                }));

                const { error } = await supabase
                    .from('orders')
                    .insert(orderRows);

                if (error) {
                    console.error("Error inserting orders:", error.message);
                    alert("There was an issue placing your order. Please try again.");
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        };

        return (
            <Dialog
                onClose={handleCheckout}
                open={checkout}>
                <div className={`grid grid-flow-row gap-1 p-3 bg-[url(./background4.svg)]`}>
                    <div style={{ fontFamily: FontType }} className={`p-2 text-center mx-auto text-xl font-bold ${FontType} text-cyan-950`}>Order Summary</div>
                    <div className="grid grid-cols-3">
                        <div
                            className={`text-cyan-950 text-center`}
                            style={{ fontWeight: 'bold', fontFamily: FontType }}>Product</div>
                        <div
                            className={`text-cyan-950 text-center`}
                            style={{ fontWeight: 'bold', fontFamily: FontType }}>Quantity</div>
                        <div
                            className={`text-cyan-950 text-center`}
                            style={{ fontWeight: 'bold', fontFamily: FontType }}>Total cost</div>
                    </div>
                    <div className="grid grid-flow-row">{data.map((product, index) =>
                        <div className="grid grid-cols-3" key={index}>
                            <Image style={{ maxHeight: "60px" }} className="mx-auto my-auto" src={`data:image/jpeg;base64,${product.image}`} alt={"product"}>
                            </Image>
                            <div
                                className={`text-cyan-950 text-center my-auto`}
                                style={{ fontWeight: 'bold', fontFamily: FontType }}>{product.quantity}</div>
                            <div
                                className={`text-cyan-950 text-center my-auto`}
                                style={{ fontWeight: 'bold', fontFamily: FontType }}>R {(product.cost_after_vat * product.quantity).toFixed(2)}</div>
                        </div>)}
                    </div>
                    {address.length === 0 && checkout === true ? setLocationSellected(true) && setCheckout(false) : null}
                    <div style={{ fontFamily: FontType }} className={`p-2 text-center mx-auto text-md font-ligh ${FontType} text-cyan-950`}>Purchase total: R {data.reduce((sum, row) => sum + row.cost_after_vat * row.quantity, 0).toFixed(2)}</div>
                    <div style={{ fontFamily: FontType }} className={`p-2 text-center mx-auto text-md font-light ${FontType} text-cyan-950`}>Delivery cost: R {TotalDeliveryCost.toFixed(2)}</div>
                    <div style={{ fontFamily: FontType }} className={`p-2 text-center mx-auto text-lg font-bold ${FontType} text-cyan-950`}>Total Payable: R {TotalPayable.toFixed(2)}</div>
                    <div style={{ fontFamily: FontType }} className={`p-2 text-center mx-auto text-xs font-bold ${FontType} text-cyan-950`}>Delivery Address: {address} <Checkbox required onClick={() => setAddressConfirmed(!address_confirmed)} value={address_confirmed} /></div>
                    <div style={{ fontFamily: FontType }} className={`p-2 text-center mx-auto text-xs font-bold ${FontType} text-cyan-950`}>Cell: +27 86 783 8293 <Checkbox required onClick={() => setCellConfirmed(!cell_confirmed)} value={cell_confirmed} /></div>
                    {address_confirmed && cell_confirmed ?
                        <Button
                            onClick={() => { setCheckout(false); setPayment(true); handleOrder(); }}
                            className="p-2 mx-auto"
                            sx={{
                                textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white", maxWidth: "300px",
                                '&:hover': {
                                    backgroundColor: "rgba(44, 192, 222,0.8)", maxWidth: "300px",
                                    color: 'white',
                                }
                            }}>
                            Proceed to payment
                        </Button> : <Button
                            onClick={() => { setCheckout(false); setPayment(true) }}
                            disabled="true"
                            className="p-2 mx-auto"
                            sx={{
                                textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white", maxWidth: "300px",
                                '&:hover': {
                                    backgroundColor: "rgba(44, 192, 222,0.3)", maxWidth: "300px",
                                    color: 'white',
                                }
                            }}>
                            Proceed to payment
                        </Button>}
                    <IconButton onClick={() => setCheckout(false)} sx={{ position: "absolute", top: 1, right: 1, alignItems: "center", justifyItems: "center", }}>
                        <CloseIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                </div>
            </Dialog>
        )
    }

    const CartTable = ({ data }) => {
        return (
            <TableContainer className={`mx-auto bg-[url(./background4.svg)]`} sx={{ maxWidth: 1000 }} component={Paper}>
                <Table sx={{ maxWidth: 1000 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className={`text-cyan-950`}
                                style={{ fontWeight: 'bold', fontFamily: FontType }}>Product</TableCell>
                            <TableCell
                                className={`text-cyan-950`}
                                style={{ fontWeight: 'bold', fontFamily: FontType }} align="center">Quantity</TableCell>
                            <TableCell
                                className={`text-cyan-950`}
                                style={{ fontWeight: 'bold', fontFamily: FontType }}>Total Cost (inc Vat)</TableCell>
                            <TableCell
                                className={`text-cyan-950`}
                                style={{ fontWeight: 'bold', fontFamily: FontType }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className={`text-cyan-950 text-sm`}
                                    style={{ fontFamily: FontType }}>
                                    <Image style={{ maxHeight: "60px" }} src={`data:image/jpeg;base64,${row.image}`} alt={"product"}></Image>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={`text-cyan-950 text-sm`}
                                    style={{ fontFamily: FontType }}>
                                    <div className={`grid grid-cols-3 gap-2`}>
                                        <IconButton
                                            size="small"
                                            sx={{
                                                textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white",
                                                '&:hover': {
                                                    backgroundColor: "rgba(44, 192, 222,0.8)",
                                                    color: 'white',
                                                }
                                            }}
                                            className="mx-auto"
                                            onClick={() => updateQuantity(row.id, Math.max(row.quantity - 1, 1))}>
                                            <RemoveCircleOutlinedIcon />
                                        </IconButton>
                                        <div className="text-center my-auto mx-auto">{row.quantity}</div>
                                        <IconButton
                                            size="small"
                                            sx={{
                                                textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white",
                                                '&:hover': {
                                                    backgroundColor: "rgba(44, 192, 222,0.8)",
                                                    color: 'white',
                                                }
                                            }}
                                            className="mx-auto"
                                            onClick={() => updateQuantity(row.id, row.quantity + 1)}>
                                            <AddCircleOutlinedIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                                <TableCell
                                    className={`text-cyan-950 text-sm`}
                                    style={{ fontFamily: FontType }}>R {(row.cost_after_vat * row.quantity).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button
                                        className={`text-cyan-950`}
                                        size="small"
                                        onClick={() => deleteCartItem(row.id)}
                                        sx={{
                                            textTransform: "none", bgcolor: "transparent",
                                            '&:hover': {
                                                backgroundColor: "transparent",
                                                color: 'red',
                                            }
                                        }}>
                                        <DeleteOutlineIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2} align="right" style={{ fontWeight: 'bold' }} className="text-cyan-950">
                                Total:
                            </TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} className="text-cyan-950">
                                R {data.reduce((sum, row) => sum + row.cost_after_vat * row.quantity, 0).toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={handleCheckout}
                                    size="small"
                                    sx={{
                                        textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white",
                                        '&:hover': {
                                            backgroundColor: "rgba(44, 192, 222,0.8)",
                                            color: 'white',
                                        }
                                    }}>Checkout
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        )
    }

    // Memoized function to fetch cart data
    const fetchCartData = useCallback(async () => {
        try {
            if (!localStorage.getItem("user_id")) {
                throw new Error("User ID is not found in localStorage");
            }

            // Query the "cart" table where user_id matches
            const { data, error } = await supabase
                .from("cart")
                .select("*")
                .eq("user_id", localStorage.getItem("user_id"));

            if (error) {
                throw error;
            }

            setData(data); // Update state with the fetched data
        } catch (err) {
            setError(err.message);
            console.error("Error fetching cart data:", err);
        }
    }, []);

    const deleteCartItem = useCallback(async (id) => {
        try {
            const { error } = await supabase
                .from("cart")
                .delete()
                .eq("id", id);

            if (error) throw error;

            // Update the data after deletion
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (err) {
            setError(err.message);
            console.error("Error deleting cart item:", err);
        }
    }, []);

    const ClearCart = useCallback(async () => {
        try {
            const { error } = await supabase
                .from("cart")
                .delete()
                .eq("user_id", localStorage.getItem("user_id"));

            if (error) throw error;

            // Update the data after deletion
            fetchCartData()
        } catch (err) {
            setError(err.message);
            console.error("Error deleting cart item:", err);
        }
    }, [fetchCartData]);

    const updateQuantity = useCallback(async (id, newQuantity) => {
        try {
            const { error } = await supabase
                .from("cart")
                .update({ quantity: newQuantity })
                .eq("id", id);

            if (error) throw error;

            // Update local state
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (err) {
            setError(err.message);
            console.error("Error updating quantity:", err);
        }
    }, []);

    const calculateDrivingDistance = useCallback(async () => {
        const API_KEY = "AIzaSyDFqp0PGp-vOy_BLx-ljnGZcUks9VbJgXM";
        const warehouseAddress = Address;
        const userAddress = address

        try {
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
                userAddress
            )}&destinations=${encodeURIComponent(warehouseAddress)}&key=${API_KEY}&mode=driving`;

            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

            const response = await fetch(proxyUrl);

            if (!response.ok) {
                throw new Error("Failed to fetch distance");
            }
            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);

            if (
                data.rows &&
                data.rows[0].elements &&
                data.rows[0].elements[0].distance
            ) {
                const distance = data.rows[0].elements[0].distance.value; // Distance in meters
                const distanceText = data.rows[0].elements[0].distance.text; // Human-readable distance
                setDistance(distance / 1000)
                return { distance, distanceText };
            }
            throw new Error("Invalid response from Distance Matrix API");
        } catch (error) {
            console.error("Error calculating driving distance:", error.message);
        }
    }, [address]);

    const handleSelect = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
                setAddress(place.formatted_address); // Store the selected address
            } else {
                console.error("No address found");
            }
        }
    };

    // Fetch cart data when the component mounts
    useEffect(() => {
        fetchCartData();
        calculateDrivingDistance();
    }, [fetchCartData, calculateDrivingDistance]);

    // Render cart data or an error message
    return (
        <div>
            <div className="z-50 absolute my-auto right-10 top-0">
                <IconButton onClick={() => setLocationSellected(true)} size="medium">
                    <LocationOnIcon className={`text-cyan-50`} />
                </IconButton>
            </div>
            {error &&
                <div className="flex align-center justify-center h-full">
                    <p style={{ color: "whitesmoke" }}>No cart found. Make sure you are logged in.</p>
                </div>}
            {data.length > 0 ? (
                <div className="sticky align-center justify-center rounded-md z-20 max-w-full mx-4 mt-14 pb-14">
                    {/* Location and Cart Buttons */}

                    <CartTable data={data} />
                    <PurchaseStatement
                        distance={distance}
                        handleCheckout={handleCheckout}
                        checkout={checkout} data={data}
                    />
                    <BankingDetails handleEFT={handleEFT} eft={eft} data={data} />
                    <PaymentOption handlePayment={handlePayment} payment={payment} />
                    {/* Dialog for Google Maps Search */}
                    <Dialog
                        onClose={() => setLocationSellected(false)}
                        open={LocationSellected}
                    >
                        <IconButton className="text-cyan-950" onClick={() => setLocationSellected(false)} sx={{ position: "absolute", top: 1, right: 1, alignItems: "center", justifyItems: "center", }}>
                            <CloseIcon sx={{ fontSize: "30px" }} />
                        </IconButton>
                        <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_API_KEY} libraries={["places"]}><div
                            className="bg-[url(./background4.svg)]"
                            style={{ padding: "20px", minWidth: "300px" }}
                        >
                            <style>
                                {`
              .pac-container {
              touch-action: auto !important; /* Allow default touch interactions */
              z-index: 2000 !important;     /* Ensure the dropdown is above other elements */
              }
              `}
                            </style>
                            <Autocomplete
                                onLoad={(auto) => setAutocomplete(auto)}
                                onPlaceChanged={handleSelect}
                            >
                                <TextField
                                    label="Delivery address"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    autoFocus
                                    className="mt-7"
                                    sx={{
                                        "& .MuiInputLabel-root": {
                                            color: "green", // Customize the label color
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "green", // Label color when focused
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "green", // Border color
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "green", // Border color on hover
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "green", // Border color when focused
                                            },
                                        },
                                    }}
                                />
                            </Autocomplete>
                            <div style={{ marginTop: "20px", fontSize: "12px" }}>{address}</div>
                        </div>
                        </LoadScript>
                    </Dialog>
                </div>
            ) : (
                <div style={{ minWidth: "100vw", marginTop: "40vh" }} className="flex">
                    <div
                        className="mx-auto">
                        <LoadingThreeDotsJumping />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
