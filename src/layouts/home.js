// src/layouts/Home.js
import { useState, useEffect } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import deepgram from '../api/deepgram';
import openapi from '../api/openapi';
import './home.css';
import VideoPlayer from '../components/VideoPlayer';

const Home = () => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [optionNumber, setOptionNumber] = useState(0);

  // useEffect(() => {
  //   if (isRecording) {
  //     navigator.mediaDevices.getUserMedia({ audio: true })
  //       .then(stream => {
  //         const recorder = new MediaRecorder(stream);
  //         recorder.ondataavailable = event => {
  //           console.log('Data available:', event.data);
  //           setAudioChunks(prev => [...prev, event.data]);
  //         };
  //         recorder.start();
  //         setMediaRecorder(recorder);
  //       })
  //       .catch(error => console.error('Error accessing media devices.', error));
  //   } else {
  //     if (mediaRecorder) {
  //       mediaRecorder.stop();
  //       mediaRecorder.stream.getTracks().forEach(track => track.stop());
  //     }
  //   }

  //   return () => {
  //     if (mediaRecorder) {
  //       mediaRecorder.stream.getTracks().forEach(track => track.stop());
  //     }
  //   };
  // }, [isRecording, mediaRecorder]);


  useEffect(() => {
    document.title = 'Olala Homes AI Assistant';
    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true
        }
      })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
  
        recorder.ondataavailable = event => {
          if (event.data && event.data.size > 0) {
            console.log('Data available:', event.data);
            setAudioChunks(prev => [...prev, event.data]);
          } else {
            console.warn('Received empty data chunk');
          }
        };
  
        recorder.start(1000); // Collect data every second
        setMediaRecorder(recorder);
      })
      .catch(error => console.error('Error accessing media devices.', error));
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    }
  
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isRecording, mediaRecorder]);
  
  const handleMicClick = async () => {
    if (isRecording) {
      console.log('Recording stopped');
      setIsRecording(false);
      setTimeout(async () => {
        if (audioChunks.length) {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          // if (audioBlob) {
          //   const audio = new Audio();
          //   audio.src = URL.createObjectURL(audioBlob);
          //   audio.play();
          // }
          try {
            const transcript = await deepgram(audioBlob);
            if (transcript && transcript.trim() !== '') {
            setText(transcript);
            const option = await openapi(transcript);
            setOptionNumber(parseInt(option));
            console.log('Option:', option);
          }
        } catch (error) {
            console.error('Error:', error);
          }
          setAudioChunks([]);
        } else {
          console.log('No audio to send');
        }
      }, 500); // Give some time for the last data to be processed
    } else {
      console.log('Recording started');
      setIsRecording(true);
      setAudioChunks([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <VideoPlayer option={optionNumber}/>
        <div className="input-container">
          <button className={`mic-button ${isRecording ? 'active' : 'static'}`} onClick={handleMicClick}>
            <MicIcon />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Home;
