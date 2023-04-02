import React from 'react';
import YellowButton from '../yellowBtn/YellowButton';
import cl from './MyInput.module.scss';

interface Props {
    text: string;
    children: React.ReactNode;
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>
    onClick?: () => void;
}

const MyInput = ({ children, text, value, setValue, onClick }: Props) => {
    return (
        <div className={cl.input}>
            <input className={cl.searchInput} type="text" placeholder={text} value={value} onChange={e => (setValue && setValue(e.target.value))} />
            <YellowButton isCircle={true} onClick={onClick}>
                {children}
            </YellowButton>
        </div>
    )
}

export default MyInput