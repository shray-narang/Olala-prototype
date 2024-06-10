import React, { useRef, useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import './MicButton.css';

const MicButton = ({ whenBlobReady, onClick }) => {
  const [recordedUrl, setRecordedUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const recordingTimeout = useRef(null);

  const startRecording = async () => {
    setIsRecording(true);
    console.log('Recording started');
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

      // Set a timeout to stop recording automatically after 5 seconds (5000 ms)
      recordingTimeout.current = setTimeout(() => {
        stopRecording();
      }, 3000); // Change this value to your desired recording duration
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log('Recording stopped');
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    // Clear the recording timeout
    if (recordingTimeout.current) {
      clearTimeout(recordingTimeout.current);
      recordingTimeout.current = null;
    }
  };

  const handleMicClick = async () => {
    if(onClick){
      onClick();
    }
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

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
