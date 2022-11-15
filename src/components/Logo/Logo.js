import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
    return (
    <div className="ma4 mt2 center">
        <Tilt className="Tilt br2 shadow-2" tiltMaxAngleX={45} tiltMaxAngleY={45} tiltReverse={true}>
            <div className="pa3">
                <img alt="logo" src={brain}/>
                <div></div>
            </div>
        </Tilt>
    </div>
    )
}

export default Logo
