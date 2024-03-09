import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const API_KEY = "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";
const systemMessage = {
  role: "system",
  content:
    "Structure the note into two sections. The first section is about questions about the note, and the second section is about structuring the note. Give the first section under the 'Questions' topic, make questions from the note, and stick them into the note itself. Give the second section under 'Structured Note' topic and structure note in the most understandable way.",
};

function App() {
  const [structuredTranscript, setStructuredTranscript] = useState("");
  const [urls, setUrls] = useState("");
  const [getResponse, setGetResponse] = useState("");

  const urlHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/create-new-note",
        { zip: urls }
      );
      console.log("POST response:", response);

      // Immediately fetch the result after submitting the text field
      fetchResult();
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const fetchResult = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/get-all-notes"
      );

      // Process the transcript for structuring
      await handleStructringTranscript(response.data.res);
    } catch (error) {
      console.error("Error getting data from backend:", error);
    }
  };

  // LLM executions-----------------------------------------

  // Handle the user message
  const handleStructringTranscript = async (message) => {
    // Process the transcript with ChatGPT
    await processMessage(message);
  };

  // Process the message to send to ChatGPT
  async function processMessage(message) {
    // Set up the request body for the ChatGPT API
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        { role: "user", content: message }, // Adjust this line
      ],
    };

    // Fetch from ChatGPT
    const data = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const jsonData = await data.json();
    console.log(jsonData);

    // Update the structuredTranscript with the response from ChatGPT
    setStructuredTranscript(jsonData.choices[0].message.content);
  }

  useEffect(() => {
    // Update the state to display the output immediately
    setGetResponse(structuredTranscript);
  }, [structuredTranscript]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="paste the url here"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
        <button onClick={urlHandler}>Submit</button>

        {/* Display the output immediately */}
        <div>{getResponse}</div>
      </div>
    </>
  );
}

export default App;
