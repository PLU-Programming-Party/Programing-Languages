const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.post("/", async (req, res) => {
    try {
        const { prompt } = req.body;

        // Generate a response with ChatGPT
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: prompt
            }]
        });

        res.send(completion.data.choices[0].message.content);
    } catch (error) {
        console.error("Error fetching completion from ChatGPT:", error);
        res.status(500).send("Error fetching completion.");
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
