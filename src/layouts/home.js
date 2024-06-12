// src/layouts/Home.js
import { useState, useEffect } from 'react';
import deepgram from "api/deepgram";
import whisper from "api/whisper";
import openapi from "api/openapi";
import './home.css';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';

const Home = () => {
  const [text, setText] = useState('');
  const [optionNumber, setOptionNumber] = useState(0);
  const [promptCount, setPromptCount] = useState(0);

  useEffect(() => {
    document.title = 'Olala Homes AI Assistant';
  }
  , []);

  const handleBlobReady = async (blob) => {
    // const response = await deepgram(blob);
    const response = await whisper(blob);
    setText(response);
    if(response && response.trim()!=''){
      const option = await openapi(response);
      setOptionNumber(option);
      setPromptCount(promptCount + 1);
    }
    else {
      console.log("empty transcription");
    }
  };
  const handleTestClick = () => {
    setOptionNumber(optionNumber + 1);
    console.log(optionNumber);
  }

  return (
    <div className="App">
          {/* <button onClick={handleTestClick}>increment</button> */}
      <header className="App-header">
      <VideoPlayer option={optionNumber} handleBlobReady={handleBlobReady} forceRefresh={promptCount}/>
        <div className="output-container">
        </div>
      </header>


    </div>
  );
};

export default Home;

