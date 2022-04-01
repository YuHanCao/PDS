import React, { useEffect, Component, useState, useCallback, Button } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Axios from "axios";
import styled from "styled-components";
import { Modal } from '../components/Modal';
import { ModalCadastro } from '../components/ModalCadastro'

const Botao = styled.button`
    padding: 20px 34px;
    background: #286958;
    color: #fff;
    border: none;
    font-size: 20px;
    border-radius: 5px;
    position: absolute;
    z-index: 1000;
    left 43%;
`

const Mapa = () => {
    const hoje = new Date();
    const [map, setMap] = useState(null);
    const [cadastroArvore, cadastrarArvore] = useState(false);
    const [pins, setPins] = useState([]);
    const [dadosArvores, setDadosArvores] = useState([]);
    const [dadosArvore, setDadosArvore] = useState();
    const [showModal, setShowModal] = useState(false);
    const [atualizarPoda, setAtualizarPoda] = useState(false);
    const [permissao, updatePermissao] = useState('usuario');
    const [showCreateModal, updateShowCreateModal] = useState(false);
    const [latLongCad, updateConstLatLongCad] = useState({});

    useEffect(()=>{
        let info = window.localStorage.getItem("@user_cargo");
        updatePermissao(info);

        Axios.get('http://localhost:3030/pins').then((res)=>{
            setPins(res.data);
        });
        Axios.get('http://localhost:3030/arvores').then((res)=>{
            setDadosArvores(res.data);
        });
    },[atualizarPoda,permissao]);

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
    
    const center = {
        lat: -23.585240, 
        lng: -46.681491
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

    function decideMarker(pin){
        let anoAtual = hoje.getFullYear();
        let anoPlantio = pin.dataPlantio.split('-')[0];
        let diferenca = anoAtual - anoPlantio;
        if(diferenca > 10)
            return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        else    
            return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    }

    function updateCadastro(){ 
        window.alert("Selecione o local a cadastrar!");           
        cadastrarArvore(true);
    }

    return isLoaded ? ( 
        <>  
        {permissao == 'funcionario' ? (<Botao onClick={updateCadastro}>Cadastrar árvore</Botao>   ):<></>}        
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          onLoad={onLoad}
          onClick={ev => {
              if(cadastroArvore){
                updateConstLatLongCad({lat: ev.latLng.lat(),long: ev.latLng.lng()})
                updateShowCreateModal(true);
              }
          }}
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
                    icon={{
                        url: decideMarker(pin)
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
        <ModalCadastro showModal={showCreateModal} setShowModal={updateShowCreateModal} latLong={latLongCad} cancelarCadastro={cadastrarArvore}/>
        </>
    ) : <></>
  };

export default Mapa;