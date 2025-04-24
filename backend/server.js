const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    const extractedText = data.text;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Analyze this resume and provide a summary of the candidate's skills, strengths, and suitable job roles:\n\n${extractedText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    fs.unlinkSync(req.file.path); // Clean up uploaded file

    res.json({ text: extractedText, analysis });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong analyzing the resume." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
