// src/api/deepgram.js
import axios from 'axios';

const deepgram = async (audioBlob) => {
  // Define the API endpoint and your API key
  const url = "https://api.deepgram.com/v1/listen";
  const apiKey = process.env.REACT_APP_DEEPGRAM_API_KEY;

  // Read the audio file as binary data
  const audioData = await audioBlob.arrayBuffer();

  // Define request headers
  const headers = {
    Authorization: `Token ${apiKey}`,
    "Content-Type": "audio/wav",
  };

  // Make the POST request using axios
  try {
    const response = await axios.post(url, audioData, { headers });
    const transcription = response.data.results.channels[0].alternatives[0].transcript; // Handle response data
    console.log("Transcription:", transcription);
    return transcription;
  } catch (error) {
    console.error("Error:", error); // Handle errors
    throw error;
  }
};

export default deepgram;

// import { createClient } from "@deepgram/sdk";
// import fs from 'fs';
// import path from 'path';


// const model = createClient(process.env.REACT_APP_DEEPGRAM_API_KEY); 
// const deepgram = async (audioBlob) => {
//   try {
//     const response= await deepgram.listen.prerecorded.transcribeFile(
//         read,
//         {
//           model: "nova-2",
//         }
//       );
//     console.log('Deepgram response:', response.data);   
//     const transcription = response.data.results.channels[0].alternatives[0].transcript; // Handle response data
//     console.log("Transcription:", transcription);
//     return transcription;
//   } catch (error) {
//     console.error("Error:", error); // Handle errors
//     throw error;
//   }
// };

// export default deepgram;
