import axios from "axios";
import {useState} from 'react';
<<<<<<< HEAD
import "../styles/Gpt.css"
import ReactMarkdown from 'react-markdown'
import LoadingGraphic from '../Loading_icon.gif'; // Import the loading graphic


=======
import '../styles/Gpt.css'
>>>>>>> 4bae5816f25ecf24c692bf1f40f061c0b71d8f01

export default function Gpt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add a new state for loading status


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when the request is made

    // Send a request to the server with the prompt
    axios
      .post("http://localhost:3001", { prompt }) // include the actual backend server address
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
        setIsLoading(false); // Set loading to false when the response is received

      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Set loading to false when the response is received

      });
  };

  return (
<<<<<<< HEAD
    <div className="gptContainer">
      <h2>What do you want to learn?</h2>
=======
    <div className="gpt">
>>>>>>> 4bae5816f25ecf24c692bf1f40f061c0b71d8f01
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setPrompt("Make me a lesson in markdwon on the Computer science concept of " + e.target.value)}
        />
        <button type="submit" className="gptSubmit">Submit</button>
      </form>
      {isLoading && <img src={LoadingGraphic} alt="Loading..." />}
      <h2>Output</h2>
      <div className="gptResponse"><ReactMarkdown>{response}</ReactMarkdown></div>
    </div>
  );
}
