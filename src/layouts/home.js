// src/layouts/Home.js
import { useState, useEffect } from 'react';
import deepgram from "api/deepgram";
import openapi from "api/openapi";
import './home.css';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import MicButton from 'components/MicButton/MicButton';

const Home = () => {
  const [text, setText] = useState('');
  const [optionNumber, setOptionNumber] = useState(0);

  useEffect(() => {
    document.title = 'Olala Homes AI Assistant';
  }
  , []);

  const handleBlobReady = async (blob) => {
    const response = await deepgram(blob);
    setText(response);
    if(response && response.trim()!=''){
      const option = await openapi(response);
      setOptionNumber(option);
    }
    else {
      console.log("empty transcription");
    }
  };


  return (
    <div className="App">
      <header className="App-header">
      <VideoPlayer option={optionNumber} handleBlobReady={handleBlobReady}/>
        {/* <div className="input-container">
          <MicButton whenBlobReady={handleBlobReady}/>
        </div> */}
        <div className="output-container">
        </div>
      </header>
    </div>
  );
};

export default Home;

