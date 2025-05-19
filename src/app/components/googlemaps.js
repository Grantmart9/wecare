import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { NEXT_PUBLIC_GOOGLE_API_KEY } from "../supabase";

const GoogleMapsComponent = ({ center, markers }) => {
  const mapContainerStyle = {
    width: "400px",
    height: "400px",
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <LoadScript
      googleMapsApiKey={NEXT_PUBLIC_GOOGLE_API_KEY}
      onError={() => console.error("Failed to load Google Maps script")}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center || { lat: -33.916963, lng: 18.681193 }}
        zoom={14}
        options={mapOptions}
      >
        {markers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsComponent;

// Usage
// <MapComponent center={{ lat: 37.7749, lng: -122.4194 }} markers={[{ lat: 37.7749, lng: -122.4194 }]} />
