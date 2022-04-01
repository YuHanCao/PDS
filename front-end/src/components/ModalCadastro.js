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

export const ModalCadastro = ({ showModal, setShowModal, latLong, cancelarCadastro}) => {

    const [permissao, updatePermissao] = useState('usuario');
    const [showAlert, setShowAlert] = useState(false);
    const [endereco, updateEndereco] = useState('');

    const modalRef = useRef();

    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false);
            updateEndereco('');          
            cancelarCadastro(false);  
        }
    }

    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && showModal) {
            setShowModal(false);
            setShowAlert(false);
            cancelarCadastro(false);
            updateEndereco('');
        }
    }, [setShowModal, showModal, endereco])
              
    useEffect(()=> {
        let info = window.localStorage.getItem("@user_cargo");
        updatePermissao(info);
        document.addEventListener('keydown', keyPress);
        return() => document.removeEventListener('keydown', keyPress);
    }, [keyPress,permissao]);

    return (
        <>
        {showModal ? (
            <Background ref={modalRef} onClick={closeModal}>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>
                        <h1>Escreva o endereço:</h1>
                        <input value={endereco} onChange={text => {
                            updateEndereco(text.target.value);
                        }}/>
                        <BotaoPoda onClick={()=>{
                            Axios.post(`http://localhost:3030/cadastroArvore`, {
                                nome: endereco,
                                lat: latLong.lat,
                                long: latLong.long,
                                data: '2022-04-01'
                            }).then((res)=>{
                                setShowAlert(true);
                            });
                        }}>Realizar Cadastro</BotaoPoda>
                    </ModalContent>
                    <CloseModalButton arial-label='Close modal' onClick={() => {setShowModal(prev => !prev); cancelarCadastro(false);}} />
                </ModalWrapper>
            </Background>
        ) : null}
        {showAlert ? (
            <Background ref={modalRef} onClick={closeModal}>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>
                        <h1>Cadastro realizado com sucesso!</h1>
                        <CloseModalButton arial-label='Close modal' onClick={() => {                            
                            setShowAlert(false);
                            updateEndereco('');
                            cancelarCadastro(false);
                            setShowModal(prev => !prev);
                        }} />
                    </ModalContent>
                </ModalWrapper>
            </Background>
        ) : null}
        </>
    );
}