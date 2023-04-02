import React from 'react';
import cl from "./MyModal.module.scss"

interface Props {
    active: boolean;
    setActive: (b: boolean) => void;
    children: React.ReactNode;
}

const MyModal: React.FC<Props> = ({ active, setActive, children }) => {
    return (
        <div className={active ? [cl.myModal, cl.active].join(' ') : cl.myModal} onClick={() => setActive(false)}>
            <div className={cl.myModalContent} onClick={e => e.stopPropagation()} >
                {children}
            </div>
        </div>
    );
};

export default MyModal;