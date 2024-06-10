//code is temporary

import React, { useState, useEffect } from 'react';

const VideoPlayer = ({option}) => {
    const [videoUrl, setVideoUrl] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY
    console.log(apiKey);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`https://4eihr3aws0.execute-api.eu-north-1.amazonaws.com/Prototyping/videoServe/?video=${option}`, {
                  mode: 'no-cors',
                    headers: {
                        'x-api-key': apiKey
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    const videoBlob = await fetch(`data:video/mp4;base64,${data}`).then(res => res.blob());
                    const videoUrl = URL.createObjectURL(videoBlob);
                    setVideoUrl(videoUrl);
                } else {
                    const errorData = await response.json();
                    console.error('Error fetching video:', errorData.error);
                }
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        if (option) {
            fetchVideo();
        }
    }, [option, apiKey]);

    return (
        <div>
            {videoUrl ? (
                <video id="videoPlayer" controls src={videoUrl}></video>
            ) : (
                <p>Loading video...</p>
            )}
        </div>
    );
};

export default VideoPlayer;

