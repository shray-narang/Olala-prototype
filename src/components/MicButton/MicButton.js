import React, { useRef, useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import './MicButton.css';

const MicButton = ({whenBlobReady}) => {
  const [recordedUrl, setRecordedUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        { audio: true }
      );
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(
          chunks.current, { type: 'audio/webm' }
        );
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
        whenBlobReady(recordedBlob);
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };


  const handleMicClick= async ()=>{
      if (isRecording) {
       stopRecording();
       console.log('Recording stopped');
      } else {
        startRecording();
        console.log('Recording started');
      }
  }
  return (
    <div>
      {/* <audio controls src={recordedUrl} /> */}
       <button className={`mic-button ${isRecording ? 'active' : 'static'}`} onClick={handleMicClick}>
            <MicIcon />
       </button>
    </div>
  );
};
export default MicButton;