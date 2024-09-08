import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

// 默认位置：Waikato University
const defaultPosition = {
  lat: -37.787001,
  lng: 175.318702
};

function MapComponent() {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(defaultPosition);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.log('Error getting location:', error);
        setCurrentLocation(defaultPosition); // 用户未提供位置时使用默认位置
      }
    );
  }, []);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setMap({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
        setSelectedPlace(place);
      } else {
        console.log('No details available for input: ', place.name);
      }
    }
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD1dEr9ilLdQK6pI2liVUN5_4U04nKOwjo"
      libraries={["places"]}
       language="en"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={15}
      >
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search for places..."
            style={{ width: 300, height: 40 }}
          />
        </Autocomplete>

        {/* 显示用户当前位置或选择的地点 */}
        <Marker position={map ? { lat: map.lat, lng: map.lng } : currentLocation} />

      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;