import React, {useRef, useEffect, useCallback} from "react";
import styled from "styled-components";
import { MdClose } from 'react-icons/md';

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
        font-size: 30px;
        margin-bottom: 1em;
    }

    button {
        padding: 10px 24px;
        background: #afc666;
        color: #fff;
        border: none;
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

export const Modal = ({ showModal, setShowModal, arvoreBase }) => {
    let arvore = null;
    if(arvoreBase){
        arvore = JSON.parse(arvoreBase);
    }
    const modalRef = useRef();

    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const keyPress = useCallback(e => {
    if(e.key == 'Escape' && showModal) {
        setShowModal(false);
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
                        <h1>Informações Sobre a árvore</h1>
                        <p>{arvore?.localizacaoNome}</p>
                        <button>Solicite uma Poda</button> 
                    </ModalContent>
                    <CloseModalButton arial-label='Close modal' onClick={() => setShowModal(prev => !prev)} />
                </ModalWrapper>
            </Background>
        ) : null}
        </>
    );
}