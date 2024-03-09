const { spawn } = require("child_process");
const { YoutubeTranscript } = require("youtube-transcript");

let ytUrl = "";
let yt = ""; 
let pyResult='';
const createNote = async (req, res) => {
  ytUrl = req.body.zip.toString();

  // python script -----------------------------------------------------

  // const py = spawn("python", [
  //   "py_files/noteStructure.py",
  //   req.body.zip.toString(),
  // ]);

  // let pyOutput = "";

  // // Collect the output from the python script
  // py.stdout.on("data", (data) => {
  //   pyOutput += data.toString();
  // });

  // // Handle errors
  // py.stderr.on("data", (data) => {
  //   console.error("stderr: ", data);
  // });

  // // Wrap the exit handling in a promise
  // const scriptExitPromise = new Promise((resolve) => {
  //   py.on("close", (code) => {
  //     console.log(`child process exited with code ${code}`);
  //     resolve();
  //   });
  // });

  // // Wait for the script to finish before sending the response
  // await scriptExitPromise;

  // // Update the pyResult after the script has finished
  // pyResult = pyOutput.replace(/[\r\n]+/g, "");

  // ------------------------------------------------------------------

  // Fetch YouTube transcript
  await YoutubeTranscript.fetchTranscript(ytUrl)
    .then((transcript) => {
      yt = transcript.map((entry) => entry.text).join(' '); // map the transcript to a string
      console.log(yt);
    })
    .catch(console.error);
    res.json({ res: "Success" });
};

const getNote = (req, res) => {
  if (!yt) { // Check the youtube transcript is acutually there
    res.send({ res: "No result yet" });
  } else {
    res.send({ res: yt });
  }
};

module.exports = { createNote, getNote };
