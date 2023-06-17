import React, { createContext, useState } from 'react';

type ModalState = 'login' | 'register' | 'childLogin'

interface IWrapperApp {
    children: React.ReactNode;
}

export const WrapperContext = createContext<any>(null);

const WrapperApp: React.FC<IWrapperApp> = ({ children }) => {
    const [modalState, setModalState] = useState<ModalState>('login')

    return (
        <WrapperContext.Provider value={{ modalState, setModalState }}>
            {children}
        </WrapperContext.Provider>
    );
};

export default WrapperApp;