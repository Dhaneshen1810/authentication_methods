import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import '../styles/Login.css'

export default function Success(){
    const [size, setSize] = useState({width: 0, height: 0})

    useEffect(() => {
        let width = window.innerWidth
        let height = window.innerHeight
        setSize({
            ...size,
            width: width,
            height: height
        })
    }, [])

    return(
        <div className="success-page">
            <h1>SUCCESS!!!</h1>
            <Confetti
                width={size.width}
                height={size.height}
            />

        </div>
    )
}