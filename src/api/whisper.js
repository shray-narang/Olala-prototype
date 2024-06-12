import axios from 'axios';

const whisper = async (audioBlob) => {
  // Define the API endpoint and your API key
  const url = "https://api.openai.com/v1/audio/transcriptions"; // Replace with the actual Whisper API endpoint
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Ensure this environment variable is set with your Whisper API key

  // Read the audio file as binary data
//   const audioData = await audioBlob.arrayBuffer();
  const form = new FormData();
  const audioFile = new File([audioBlob], "audio-transcribe.webm", { type: "audio/webm" });
  form.append("file", audioFile);
  form.append("model", "whisper-1");
  form.append('language', 'en');
  form.append("response_format", "text");

  // Define request headers
  const requestOptions = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`
    },
    data: form
  };

  // Make the POST request using axios
  try {
    const response = await axios.post(url, form, requestOptions);
    const transcription = response.data;
    console.log("Transcription:", transcription);
    return transcription;
  } catch (error) {
    console.error("Error:", error); // Handle errors
    throw error;
  }
};

export default whisper;

// import {OpenAI} from "openai";
// import fs from "fs";


// const apiKey=process.env.REACT_APP_OPENAI_API_KEY;

// if (!apiKey) {
//   throw new Error("OpenAI API key is missing");
// }


// const openai = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});

// const whisper = async(audioBlob) => {
//     const audioFile = new File([audioBlob], "audio-transcribe.webm", { type: "audio/wav" });
// try{
//     const transcription = await openai.audio.transcriptions.create({
//         file: fs.createReadStream(audioFile),
//         model: "whisper-1",
//       });
    
//       console.log(transcription.text);
// }
// catch (error) {
//     console.error("Error fetching completion:", error);
//   }
// }
// export default whisper;