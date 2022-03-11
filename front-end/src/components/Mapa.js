import React, { useEffect, Component, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Axios from "axios";

const Mapa = () => {
   
    const [map, setMap] = React.useState(null);
    const [pins, setPins] = React.useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:3030/pins').then((res)=>{
            setPins(res.data);
        });
    },[]);

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
    
    const center = {
        lat: -23.579559, //-23.5062
        lng: -46.680022  //-47.4559
    };
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBa2GqDEpWuVXW2k_AIjHcrXLVQZ1t4Pjk"
    })   
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])


    return isLoaded ? (        
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          onLoad={onLoad}
        >
          {
            pins.map((pin) => (
                    <Marker
                    text={'Árvore'}
                    position={{
                        lat: pin.latitude,
                        lng: pin.longitude
                    }}
                />
            )) 
          }
          <></>
        </GoogleMap>
    ) : <></>
  };

export default Mapa;