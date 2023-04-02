import React, { Dispatch, SetStateAction, useState } from 'react'
import cl from './Counter.module.scss'

interface Props {
    counter: number;
    setCounter: Dispatch<SetStateAction<number>>;
    increment?: () => void;
    decrement?: () => void;
}

const Counter: React.FC<Props> = ({ counter, setCounter, increment, decrement }) => {

    const onIncrement = () => {
        if (counter == undefined) return;
        setCounter( (v)=> ++v );
        (increment && increment());
    }
    
    const onDecrement= () => {
        if (counter == undefined) return;
        setCounter((v) => v === 1 ? 1 : --v);
        (decrement && decrement());
    }

    return (
        <div className={cl.counter}>
            <div className={cl.counterButton} onClick={onDecrement}>-</div>
            <span className={cl.counterText}>{counter}</span>
            <div className={cl.counterButton} onClick={onIncrement}>+</div>
        </div>
    )
}

export default Counter