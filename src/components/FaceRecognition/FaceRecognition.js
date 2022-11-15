import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ image, boxes }) => {
    return (
        <div className="ma center">
            <div className="absolute mt2">
                <img id="inputImage" className="br3 shadow-5" alt="" src={image} />
                {boxes.map((box, i) => {
                    return(
                    <div 
                    className="bounding-box" 
                    key={i} 
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol
                        }}/>
                    )
                })}   
            </div>
        </div>
    )
}

export default FaceRecognition