import express from "express";
import moment from "moment";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

//declaratioin
const app = express();
const PORT = 4000;

//Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//declar folder path
const folderPath = path.join(__dirname, 'file');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).send("Hello welcome");
});

app.get("/create", (req, res) => {
  const now = moment();

  const currentTime = now.format("MMMM-Do-YYYY,h-mm-ss-a");
  const filepath = `file/${currentTime}.txt`;
//console.log(currentTime);
res.status(200).send("file created success fully");
  fs.writeFileSync(filepath, `${currentTime}`, 'utf8',);
});

// API to retrieve all text files in the folder
app.get('/files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading directory', error: err });
    }

    // Filter .txt files
    const textFiles = files.filter(file => path.extname(file) === '.txt');
    res.status(200).json(textFiles);
  });
});
///


//running port
app.listen(PORT, () => {
  console.log(`App is listing on port  :${PORT}`);
});
