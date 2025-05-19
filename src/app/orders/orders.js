"use client";
import React, { useEffect, useCallback, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL_WECARE, API_KEY_WECARE, FontType } from "../supabase";
import LoadingThreeDotsJumping from "../components/loading";
import { Button, Card } from "@mui/material";

const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);

const transformDataset = ({ Data }) => {
    const groupedData = {};

    if (!Array.isArray(Data)) {
        throw new Error("Input dataset must be a valid array.");
    }

    Data.forEach(row => {
        const { order_id, product_id, quantity, delivery_address, contact_person, date_created, status, user_id } = row;

        // If the order_id doesn't exist in the groupedData object, initialize it
        if (!groupedData[order_id]) {
            groupedData[order_id] = {
                order_id,
                delivery_address,
                contact_person,
                date_created,
                status,
                user_id,
                order: []
            };
        }
        // Push the product information into the order array
        groupedData[order_id].order.push({ product_id, quantity });
    });

    // Convert the groupedData object to an array
    return Object.values(groupedData)
}

const OrderStatus = ({ order }) => {
    return (
        <div>
            {order.status === "pending payment" ?
                <div className={`mx-auto rounded-b-none w-full rounded-t-md bg-gradient-to-r from-red-600 to-red-800 via-red-950 p-2`}>
                    <div className="text-sm rotate-0 text-white">{order.status}</div>
                </div> : null}
            {order.status === "order processed" ?
                <div className={`mx-auto rounded-b-none w-full rounded-t-md bg-gradient-to-r from-orange-600 to-orange-800 via-orange-950 p-2`}>
                    <div className="text-sm rotate-0 text-white">{order.status}</div>
                </div> : null}
            {order.status === "in transit" ?
                <div className={`mx-auto rounded-b-none w-full rounded-t-md bg-gradient-to-r from-blue-600 to-blue-800 via-blue-950 p-2`}>
                    <div className="text-sm rotate-0 text-white">{order.status}</div>
                </div> : null}
            {order.status === "delivered" ?
                <div className={`mx-auto rounded-b-none w-full rounded-t-md bg-gradient-to-r from-green-600 to-green-800 via-green-950 p-2`}>
                    <div className="text-sm rotate-0 text-white">{order.status}</div>
                </div> : null}
        </div>
    )
}

const Orders = () => {
    const [Data, setData] = useState([])
    const [error, setError] = useState("")

    const fetchCartData = useCallback(async () => {
        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                console.error("No User ID found in localStorage");
                setError("No User ID found in localStorage");
                return;
            }
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .eq("user_id", userId);

            if (error) {
                console.error("Supabase error:", error);
                setError(error.message);
                return;
            }

            if (!Array.isArray(data)) {
                console.log("Supabase data must be a valid array.");
            }

            const transformedData = transformDataset({ Data: data });
            setData(transformedData); // Update state with the fetched data

        } catch (err) {
            console.error("Error fetching cart data:", err);
            setError(err.message);
        }
    }, []);

    // Fetch cart data when the component mounts
    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);

    return (
        <React.Fragment>
            <div className="mt-20 m-4 text-center text-white justify-center">
                {Data.length !== 0 ?
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-4">
                        {Data.map((order, index) =>
                            <div>
                                <OrderStatus order={order} />
                                {console.log(order)}
                                <Card
                                    key={index}
                                    className="grid grid-flow-row text-cyan-950 bg-[url(./background2.svg)] rounded-t-none rounded-b-md p-2"
                                    style={{ fontFamily: FontType }}>
                                    <div
                                        className="text-sm px-2 text-nowrap mx-auto">
                                        Order Id: {order.order_id}
                                    </div>
                                    <div
                                        className="text-sm px-2 text-nowrap mx-auto">
                                        Order Date: {order.date_created}
                                    </div>
                                    <Button
                                        className="mx-auto"
                                        size="small"
                                        sx={{
                                            textTransform: "none", bgcolor: "rgba(45, 194, 69, 0.8)", color: "white",
                                            '&:hover': {
                                                backgroundColor: "rgba(44, 192, 222,0.8)",
                                                color: 'white',
                                            }
                                        }}>Details</Button>
                                </Card>
                            </div>
                        )
                        }
                    </div>
                    : <div style={{ minWidth: "100vw", marginTop: "40vh" }} className="flex">
                        <div
                            className="mx-auto">
                            <LoadingThreeDotsJumping />
                        </div>
                    </div>}
            </div>
        </React.Fragment>
    );
};

export default Orders;
