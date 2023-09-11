import React, { useState } from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {

    // const [ isImageloading, setIsImageLoading ] = useState(false)
    // const [ isImageloaded, setIsImageLoaded ] = useState(false)
    
    
    
    return (
    <div>
        <p className="f3">
            {'This Magic Brain will detect faces in your pictures. Give it a try'}
        </p>
        <div className="center">
            <div className="form center pa4 bn br3 shadow-5">
                <input 
                className="f4 pa2 w-70 center bn br3 br--left" type='text' 
                onChange={onInputChange} 
                placeholder="Insert an image link"
                />
                <button 
                className="f4 w-30 link bn br3 br--right grow ph3 pv2 dib white bg-light-purple"
                onClick={onButtonSubmit}>
                    {'Detect'}
                </button>
            </div>
        </div>
    </div>
    )
}

export default ImageLinkForm


