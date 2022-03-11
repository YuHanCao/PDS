import styles from './Plantio.module.css'
import React, { useState, useCallback } from 'react'; 
import '../App.css';
import MyGoogleMap from '../components/MyGoogleMap';
import styled from 'styled-components';
import { Modal } from '../components/Modal'
import { GlobalStyles } from '../components/globalStyles';


const Container = styled.div`
    display:flex;
    justify-content: center;
    align-itens: center;
`
const Button = styled.button`
    min-width: 100px;
    padding: 16px 32px;
    broder-radius: 4px;  
    border: none;
    background: #141414;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
`

function Plantio() {
    const[showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    return (
        <>
            <div className={styles.faixa}>
                <p>Plantio - Mapa</p>
            </div>

            <div className="main-wrapper">
                <MyGoogleMap />
            </div>

            <Container>
                <Button onClick={openModal}>Teste</Button>
                <Modal showModal={showModal} setShowModal={setShowModal} />
                <GlobalStyles/>
            </Container>
        </>    
    );
}

export default Plantio;