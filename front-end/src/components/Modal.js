import React, {useRef, useEffect, useCallback, useState} from "react";
import styled from "styled-components";
import { MdClose } from 'react-icons/md';
import Axios from "axios";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalWrapper = styled.div`
    width: 70%;
    height: 70%;
    box-shadow: 0 5px 16px rbga(0, 0, 0, 0.2);
    background: #eee;
    color: #000;
    display grid;
    postion: fixed;
    z-index: 10;
    border-radius: 10px;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    
    p {
        margin-top: 1em;
        font-size: 15px;
        margin-bottom: 1em;
    }
`

const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    color: #fff;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    passing: 0;
    z-index: 10;
`
const BotaoPoda = styled.button`
    margin-top: 20px;
    padding: 20px 34px;
    background: #afc666;
    color: #fff;
    border: none;
    font-size: 20px;
    border-radius: 5px;
`

const BotaoPodaDesabilitado = styled.button`
    margin-top: 20px;
    padding: 20px 34px;
    background: #666;
    color: #fff;
    border: none;
    font-size: 20px;
    border-radius: 5px;
    font-style: italic;
`

export const Modal = ({ showModal, setShowModal, arvoreBase, setAtualizarPoda, atualizarPoda }) => {
    const [flag, setFlag] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    let arvore = null;
    let data = [];
    if(arvoreBase){
        arvore = JSON.parse(arvoreBase);
        data = arvore?.dataPlantio.split('T')[0];
        data = data.split('-');
    }
    const modalRef = useRef();

    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && showModal) {
            setShowModal(false);
            setShowAlert(false);
            if(flag) {
                setAtualizarPoda(!atualizarPoda);
            }
        }
    }, [setShowModal, showModal])
              
    useEffect(()=> {
        document.addEventListener('keydown', keyPress);
        return() => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);

    return (
        <>
        {showModal ? (
            <Background ref={modalRef} onClick={closeModal}>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>
                        <h1>Localização: {arvore?.localizacaoNome}</h1>
                        <p>Data do plantio: {`${data[2]}/${data[1]}/${data[0]}`}</p>
                        {arvore?.podaSolicitada === 0 
                        ? (<BotaoPoda onClick={()=>{
                            Axios.patch(`http://localhost:3030/solicitarPoda/${arvore?.id}`).then((res)=>{
                                setFlag(true);
                                setShowAlert(true);
                            });
                        }}>Solicite uma Poda</BotaoPoda>)
                        : (<>
                            <BotaoPodaDesabilitado disabled>Poda já solicitada...</BotaoPodaDesabilitado>
                            <BotaoPoda onClick={()=>{
                            Axios.patch(`http://localhost:3030/confirmarPoda/${arvore?.id}`).then((res)=>{
                                setFlag(true);
                                setShowAlert(true);
                                });
                            }}>Confirmar Poda</BotaoPoda>
                            </>)} 
                    </ModalContent>
                    <CloseModalButton arial-label='Close modal' onClick={() => setShowModal(prev => !prev)} />
                </ModalWrapper>
            </Background>
        ) : null}
        {showAlert ? (
            <Background ref={modalRef} onClick={closeModal}>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>
                        <h1>Poda solictada com sucesso</h1>
                        <CloseModalButton arial-label='Close modal' onClick={() => {
                            setShowAlert(false);
                            setShowModal(prev => !prev);
                            setAtualizarPoda(!atualizarPoda);
                        }} />
                    </ModalContent>
                </ModalWrapper>
            </Background>
        ) : null}
        </>
    );
}