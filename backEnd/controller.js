const { spawn } = require("child_process");

let result;

const createNote = async (req, res) => {
  console.log(req.body);

  const py = spawn("python", [
    "py_files/noteStructure.py",
    req.body.zip.toString(),
  ]);

  let pyOutput = "";

  // Collect the output from the python script
  py.stdout.on("data", (data) => {
    pyOutput += data.toString();
  });

  // Handle errors
  py.stderr.on("data", (data) => {
    console.error("stderr: ", data);
  });

  // Wrap the exit handling in a promise
  const scriptExitPromise = new Promise((resolve) => {
    py.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      resolve();
    });
  });

  // Wait for the script to finish before sending the response
  await scriptExitPromise;

  // Update the result after the script has finished
  result = pyOutput.replace(/[\r\n]+/g, "");

  res.send(req.body);
};

const getNote = (req, res) => {
  // Check if result is available, if not, wait for a short time
  if (!result) {
    res.send({ res: "No result yet" });
  } else {
    res.send({ res: result });
  }
};

module.exports = { createNote, getNote };
