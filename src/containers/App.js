import React, { useEffect, useState } from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Signup from '../components/Signup/Signup';
import BackgroundParticles from 
'../components/BackgroundParticles/BackgroundParticles';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Rank from '../components/Rank/Rank';

const App = () => {

  ////////////////////////////////////////////////////////////////////////////////
  // useState declarations 
  ////////////////////////////////////////////////////////////////////////////////
  const [ input, setInput ] = useState('');
  const [ IMAGE_URL, setIMAGE_URL ] = useState('');
  const [ faceBoxes , setFaceBoxes ] = useState([]);
  const [ route, setRoute ] = useState('signin');
  const [ signStatus, setSignStatus ] = useState(false);
  const [ user, setUser ] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });
  ////////////////////////////////////////////////////////////////////////////////

  // API Config //////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // In this section, set the user authentication, app ID and model details.
  ////////////////////////////////////////////////////////////////////////////////

  const USER_ID = 'meidencore';
  const PAT = 'a0ceb3de76eb459aa0167df36aade379';
  const APP_ID = 'facerecognitionbrain';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';  

  ////////////////////////////////////////////////////////////////////////////////  

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
     }

  ////////////////////////////////////////////////////////////////////////////////
  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the 
  // MODEL_ID only https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs 
  // this will default to the latest version_id
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // image input functions 
  ////////////////////////////////////////////////////////////////////////////////   
  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  useEffect(() => {
    if (faceBoxes.length !== 0) {
      setFaceBoxes([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
   },[input])
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // face recognition functions
  // submit button, API call, face boxes calculations.
  ////////////////////////////////////////////////////////////////////////////////
  const calculateFaceLocation = (data) => {
    const clarifaiFaceBoxes = data.outputs[0].data.regions.map(
      item => item.region_info.bounding_box);
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
    if (IMAGE_URL !== '') {
      fetch("https://api.clarifai.com/v2/models/" 
        + MODEL_ID 
        + "/versions/" 
        + MODEL_VERSION_ID 
        + "/outputs", requestOptions)
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({
                  id: user.id
                  })
          })
          .then(serverres => serverres.json())
          .then(count => {
            setUser(prevUser => ({ ...prevUser, entries: count }))
              
            })
          }
          return response.json()
        }
        )
        .then(result => setFaceBoxes(calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
    }
  }

  useEffect(() => {
    setIMAGE_URL(input)
  },[input])

  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // route functions
  ////////////////////////////////////////////////////////////////////////////////
  function onRouteChange(path, status) {
    if (path === 'signin') {
      setRoute('signin');
      setSignStatus(false);
    } else if (path === 'signup') {
      setRoute('signup');
      setSignStatus(false);
    } else if (path === 'home' && status) {
      setRoute('home');
      setSignStatus(true);
    } else setRoute('guest');
  }

  const signout = () => {
    setInput('');
    setIMAGE_URL('');
    setFaceBoxes([]);
    setRoute('signin');
    setSignStatus(false);
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    })
  }
// after signin or signup the user information is loaded to the estate
  const loadUser = (data) => {  
    setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      })
   }

  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // render return
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      <BackgroundParticles/>
      <Navigation 
        onRouteChange={onRouteChange}
        signStatus={signStatus}
        route={route}
        signout={signout}
      />
      { route === 'signin' ? 
          <Signin 
            loadUser={loadUser}
            onRouteChange={onRouteChange}
          />
        : route === 'signup' ?
          <Signup 
            loadUser={loadUser}
            onRouteChange={onRouteChange}
          />
        : route === 'home' ?
          <>
            <Rank user={user}/>
            <Logo />
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition 
              image={input} 
              boxes={faceBoxes}
            />
          </>
        : <>
            <Logo />
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition 
              image={input} 
              boxes={faceBoxes}
            />
          </>
      }
    </div>
  );
  ////////////////////////////////////////////////////////////////////////////////
}
  
export default App;
  
 