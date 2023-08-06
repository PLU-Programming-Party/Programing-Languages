const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  // Generate a response with ChatGPT
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        {
            "role": "system",
            "content": "you must only respond in markdown, also this text will be on a website so you dont have to respond to the message, just gimme the content"
        },
        {
            "role": "user",
            "content": prompt
        }
    ]
  });
  res.send(response.data.choices[0].message.content);
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
