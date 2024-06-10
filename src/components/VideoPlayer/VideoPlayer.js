import React, { useEffect, useRef, useState } from 'react';
import './VideoPlayer.css'; // Assuming you have a CSS file for styles
import MicButton from 'components/MicButton/MicButton';

const VideoPlayer = ({ option, handleBlobReady }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMic, setShowMic] = useState(option !== 0);
  const videoUrl = `https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/${option}.mp4`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Automatic playback started!
          console.log('Playback started automatically.');
        })
        .catch((error) => {
          // Auto-play was prevented
          console.log('Auto-play was prevented.', error);
        });
      }
    }
  }, [option]);


  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleBegin = () => {
    setShowMic(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMicClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="video-container">
      <video
        key={option}
        ref={videoRef}
        // width="1358"
        // height="764"
        className='video-player'
        autoPlay
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="play-pause-button">
      {option === 0 && !showMic && (
          <button className="begin-button" onClick={handleBegin}>
            Begin Assistant
          </button>
        )}
        {showMic && (
          <MicButton whenBlobReady={handleBlobReady} onClick={handleMicClick} />
        )}
        </div>
    </div>
  );
};

export default VideoPlayer;
