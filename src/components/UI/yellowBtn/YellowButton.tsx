import React from 'react'
import cl from './YellowButton.module.scss'

interface Props {
    text?: string;
    imgSrc?: string;
    isCircle?: boolean;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    btnStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
}

const YellowButton = ({ text, onClick, imgSrc, children, btnStyle, textStyle, isCircle = false }: Props) => {

    return (
        <>
            {
                isCircle ?
                    <div className={[cl.button, cl.circle].join(' ')}
                        onClick={onClick}
                        style={btnStyle}
                    >
                        {children}
                    </div>
                    :
                    <div className={[cl.button, cl.big].join(' ')}
                        onClick={onClick}
                        style={btnStyle}
                    >
                        <span className={cl.text} style={textStyle}>{text}</span>
                        {children}
                    </div>
            }
        </>
    )
}

export default YellowButton