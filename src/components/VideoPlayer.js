import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ option }) => {
  const videoRef = useRef(null);
  const videoUrl = `https://hotel-ai-prototype.s3.eu-north-1.amazonaws.com/${option}.mp4`;

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [option]);

  return (
    <div>
      <video key={option} ref={videoRef} width="640" height="480" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
