import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '200px' // 更小的地图高度
};

// 默认位置：Waikato University
const defaultPosition = {
  lat: -37.787001,
  lng: 175.318702
};

function NearbyPlaces() {
  const [location, setLocation] = useState(defaultPosition);
  const [places, setPlaces] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD1dEr9ilLdQK6pI2liVUN5_4U04nKOwjo",
    libraries: ["places"]
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        setLocation(defaultPosition); // 使用默认位置
      }
    );
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const map = new window.google.maps.Map(document.createElement("div"), {
        center: location,
        zoom: 15
      });
      const service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch({
        location,
        radius: 500, // 搜索半径500米
        type: ['restaurant', 'cafe', 'museum'] // 可以指定搜索类型
        // rankBy: window.google.maps.places.RankBy.PROMINENCE
      }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        }
      });
    }
  }, [isLoaded, location]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {places.map(place => (
        <div className="card" key={place.place_id} style={{ width: '18rem', marginBottom: '1rem' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
            zoom={15}
            options={{ zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true, draggable: false }}
          >
          </GoogleMap>
          <div className="card-body">
            <h5 className="card-title">{place.name}</h5>
            <p className="card-text">{place.vicinity}</p>
            <p className="card-text"><small>{place.types?.join(', ')}</small></p>
            <p className="card-text">{place.formatted_phone_number}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NearbyPlaces;