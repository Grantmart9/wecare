"use client";
import React from "react";
import GoogleMapsComponent from "../components/googlemaps";

const Account = () => {
    return (
        <React.Fragment>
            <div className="mt-20 m-4 text-center text-white justify-center">
                <div className={`mx-auto w-fit p-0.5 bg-black rounded-xs`} >
                    <GoogleMapsComponent />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Account;
