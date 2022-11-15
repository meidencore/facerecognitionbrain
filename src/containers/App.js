import React, { useState }from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Rank from '../components/Rank/Rank';

const App = () => {

  const [ input, setInput ] = useState('');
  const [ IMAGE_URL, setIMAGE_URL ] = useState('')
  const [ faceBoxes , setFaceBoxes ] = useState([]);

  // API Config /////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  // In this section, set the user authentication, app ID and model details.
  /////////////////////////////////////////////////////////////////////////////////////////

  const USER_ID = 'meidencore';
  const PAT = 'a0ceb3de76eb459aa0167df36aade379';
  const APP_ID = 'facerecognitionbrain';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';  

  /////////////////////////////////////////////////////////////////////////////////////////  

  const raw = JSON.stringify({
  "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
  });

  const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id
  ////////////////////////////////////////////////////////////////////////////////////////////

  const onInputChange = (event) => {
    setInput(event.target.value);
    setFaceBoxes([]);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFaceBoxes = data.outputs[0].data.regions.map(item => item.region_info.bounding_box);
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    return(
      clarifaiFaceBoxes.map((item) => {
        return ({ 
          leftCol: item.left_col * width,
          topRow: item.top_row * height,
          rightCol: width - (item.right_col * width),
          bottomRow: height - (item.bottom_row * height)
          } 
        )
      })
    )
  }

  const onButtonSubmit = () => {
    setIMAGE_URL(input);
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => setFaceBoxes(calculateFaceLocation(result)))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <Navigation />
      <Rank />
      <Logo />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition image={input} boxes={faceBoxes}/>
    </div>
  );
}

export default App;

