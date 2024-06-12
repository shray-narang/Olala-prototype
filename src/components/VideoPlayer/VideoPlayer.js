import React, { useEffect, useRef, useState } from 'react';
import './VideoPlayer.css';
import MicButton from 'components/MicButton/MicButton';

const VideoPlayer = ({ option, handleBlobReady, forceRefresh }) => {
  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMic, setShowMic] = useState(option !== 0);

  const videoUrls = [
    'https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/0.mp4',
    'https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/1.mp4',
    'https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/2.mp4',
    'https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/3.mp4',
    'https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/4.mp4',
    'https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/5.mp4',
    'https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/6.mp4',
    'https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/7.mp4',
  ];


  useEffect(() => {
    const currentVideo = videoRefs.current[option];
    if (currentVideo) {
      currentVideo.src = videoUrls[option];
      currentVideo.load();
    }
  }, [option, forceRefresh]);


  const handleBegin = () => {
    setShowMic(true);
    if (videoRefs.current[option]) {
      videoRefs.current[option].play();
    }
  };

  const handleMicClick = () => {
    if (videoRefs.current[option]) {
      videoRefs.current[option].pause();
    }
  };

  return (
    <div className="video-container">
      <div className="hidden-videos">
        {videoUrls.map((url, index) => (
          <video
            key={index}
            className={`video-player-${option === index ? '' : 'inactive'}`}
            ref={el => videoRefs.current[index] = el}
            preload="auto"
          >
            <source src={url} type="video/mp4" />
          </video>
        ))}
      </div>
      <div className="video-background">
        <img src="/last_frame.jpg" alt="Background Image" className="background-image" />
      </div>
      <div className="video-wrapper">
        <video
          ref={el => videoRefs.current[option] = el}
          className='video-player'
          preload="auto"
          autoPlay
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={videoUrls[option]} type="video/mp4" />
        </video>
      </div>
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
