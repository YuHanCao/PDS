import React, { useEffect, Component, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Axios from "axios";

import { Modal } from '../components/Modal'

const Mapa = () => {
   
    const [map, setMap] = useState(null);
    const [pins, setPins] = useState([]);
    const [dadosArvores, setDadosArvores] = useState([]);
    const [dadosArvore, setDadosArvore] = useState();
    const [showModal, setShowModal] = useState(false);
    const [atualizarPoda, setAtualizarPoda] = useState(false);

    useEffect(()=>{
        Axios.get('http://localhost:3030/pins').then((res)=>{
            setPins(res.data);
        });
        Axios.get('http://localhost:3030/arvores').then((res)=>{
            setDadosArvores(res.data);
        });
    },[atualizarPoda]);

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
    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])


    return isLoaded ? ( 
        <>      
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          onLoad={onLoad}
        >
          {
            pins.map((pin) => (
                    <Marker
                    key={pin.id}
                    text={'Árvore'}
                    position={{
                        lat: pin.latitude,
                        lng: pin.longitude
                    }}
                    onClick={(() =>{
                        let index = dadosArvores.findIndex((i) => pin.id === i.id);
                        setDadosArvore(JSON.stringify(dadosArvores[index]));
                        setShowModal(prev => !prev)
                    })}
                />
            )) 
          }
          <></>
        </GoogleMap>
        <Modal showModal={showModal} setShowModal={setShowModal} arvoreBase={dadosArvore} setAtualizarPoda={setAtualizarPoda} atualizarPoda={atualizarPoda}/>
        </>
    ) : <></>
  };

export default Mapa;