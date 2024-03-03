import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [urls, setUrls] = useState("");
  const [getResponse, setGetResponse] = useState("");

  const urlHandler = () => {
    axios
      .post("http://localhost:3001/api/create-new-note", { zip: urls })
      .then((res) => {
        console.log("POST response:", res);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  };

  useEffect(() => {
    // Use useEffect to make the GET request when the component mounts
    axios
      .get("http://localhost:3001/api/get-all-notes")
      .then((res) => {
        setGetResponse(res.data.res);
      })
      .catch((error) => {
        console.error("Error getting data from backend:", error);
      });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

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

        <div>{getResponse}</div>
      </div>
    </>
  );
}

export default App;
