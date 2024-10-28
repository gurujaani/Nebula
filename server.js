const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser to handle JSON requests
const { Configuration, OpenAIApi } = require('openai'); // Import OpenAI classes

const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Set up OpenAI configuration
const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your actual OpenAI API key
});
const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
  res.send('Hello from AI server!');
});

// Define the /message route
app.post('/message', async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Make a request to the OpenAI API
    const gptResponse = await openai.createCompletion({
      model: 'text-davinci-003', // You can use the model of your choice
      prompt: userMessage,
      max_tokens: 100,
    });

    // Send back the AI response
    res.json({ message: gptResponse.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'An error occurred while communicating with the AI.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
