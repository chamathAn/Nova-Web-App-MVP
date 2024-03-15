const { YoutubeTranscript } = require("youtube-transcript");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

let yt = ""; 

const createNote = async (req, res) => {
  try {
    const ytUrl = req.body.zip.toString();

    // Fetch YouTube transcript
    await YoutubeTranscript.fetchTranscript(ytUrl)
      .then((transcript) => {
        yt = transcript.map((entry) => entry.text).join(" ");
        console.log(yt);
      })
      .catch((error) => {
        console.error("Error fetching YouTube transcript:", error);
        res.status(500).json({ error: "Error fetching YouTube transcript" });
        return;
      });

    

    res.json({ res: "Success" });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Error creating note" });
  }
};

const createSummary = async (req, res) => {
  try {
    // Perform summarization
    console.log("Summarization...");
    const summarizationResult = await query({ inputs: req.body.noteToSummarize });

    console.log("Summarization Result:", summarizationResult[0].summary_text);

    // Send the summarization result as response
    res.json({ summary: summarizationResult[0].summary_text });
  } catch (error) {
    console.error("Error performing summarization:", error);
    res.status(500).json({ error: "Error performing summarization" });
  }
};

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Falconsai/text_summarization",
    {
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();
  return result;
}

const getNote = (req, res) => {
  if (!yt) {
    res.send({ res: "No result yet" });
  } else {
    res.send({ res: yt });
  }
};

module.exports = { createNote, getNote, createSummary };
