import React, { createContext, useState } from 'react';

type ModalState = 'login' | 'register' | 'childLogin'

interface IWrapperApp {
    children: React.ReactNode;
}

export const WrapperContext = createContext<any>(null);

const WrapperApp: React.FC<IWrapperApp> = ({ children }) => {
    const [modalState, setModalState] = useState<ModalState>('login')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    return (
        <WrapperContext.Provider value={
            {
                modalState,
                modalIsOpen,
                currentUser,
                setModalIsOpen,
                setModalState,
                setCurrentUser,
            }
        }>
            {children}
        </WrapperContext.Provider>
    );
};

export default WrapperApp;