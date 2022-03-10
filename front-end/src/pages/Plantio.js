import styles from './Plantio.module.css'
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useCallback } from 'react'; 
// import { formatRelative } from "date-fns";
import '../App.css';
import MyGoogleMap from '../components/MyGoogleMap';

// const libraries = ["places"]
// const mapContainerStyle = { 
//     width: '100%',
//     height: '100%',
// }
// const center = {
//     lat: -23.5062,
//     lng: -47.4559
// }

function Plantio() {
    // const { isLoaded } = useJsApiLoader({
    //     googleMapsApiKey: "AIzaSyBa2GqDEpWuVXW2k_AIjHcrXLVQZ1t4Pjk",
    //     id: "google-map-script",
    //     // libraries,
    // })

    // const [map, setMap] = useState(null)
    // const onLoad = useCallback((map)=>{
    //     const bounds = new window.google.maps.LatLngBounds()
    //     map.fitBounds(bounds)
    //     setMap(map)
    // }, []);
    // const onUnmount = useCallback(()=>{
    //     setMap(null)
    // }, []);
    

    return (
        <>
         <div className={styles.faixa}>
        <p>Plantio - Mapa</p>
    </div>

    <div className="main-wrapper">
      <MyGoogleMap />
    </div>

    {/* <div className={styles.mapa}>
        {isLoaded && (
        <GoogleMap mapContainerStyle={mapContainerStyle}
            center = {center} 
            zoom = {14}
            onLoad = {onLoad}
            onUnmount = {onUnmount}
        ></GoogleMap>
        )}       
    </div> */}
        </>    
    );
}

export default Plantio;