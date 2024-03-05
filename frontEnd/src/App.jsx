import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
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
      setGetResponse(response.data.res);
    } catch (error) {
      console.error("Error getting data from backend:", error);
    }
  };

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
