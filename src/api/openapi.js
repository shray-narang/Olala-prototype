// Import required modules
import {OpenAI} from "openai";

// Get the API key from environment variables
const apiKey=process.env.REACT_APP_OPENAI_API_KEY;
// Check if the API key is provided
if (!apiKey) {
  throw new Error("OpenAI API key is missing");
}

// Initialize the OpenAI client with the API key
const openai = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});

const openapi = async (prompt) => {
  try {
    // Make a request to the OpenAI API
    const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      "role": "system",
      "content": [
        {
          "text": "\nAnswer the following questions with their corresponding number only, match the prompt to the nearest question. If you receive a completely unexpected question, return '7':\n[1.⁠ ⁠How do I check into my room? \nAns: '1']\n[2.⁠ ⁠⁠How do I open my door lock?\nAns: '2']\n[3.⁠ ⁠⁠When can I checkin and can I checkin early?\nAns: '3']\n[4.⁠ ⁠⁠how do I find my room?\nAns: '4']\n[5.⁠ ⁠⁠how can I connect to WiFi?\nAns: '5]\n[6.⁠ ⁠⁠how can I order extra cleaning?\nAns: '6']\nonly answer with a number and no quotes",
          "type": "text"
        }
      ]
    },
    {
        "role": "user",
        "content": [
            {
            "text": prompt,
            "type": "text"
            }
        ]
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

    // Log the completion response
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    // Handle errors
    console.error("Error fetching completion:", error);
  }
}

// Example prompt
export default openapi;