import axios from "axios";
import { useState } from "react";
import "../styles/Gpt.css"
import ReactMarkdown from 'react-markdown'
import LoadingGraphic from '../Loading_icon.gif'; // Import the loading graphic



export default function GptForm() {
  const [learningObject, setLearningObject] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [frequency, setFrequency] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add a new state for loading status


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const studyPlanString = `I want to learn ${learningObject} in ${timeFrame} by studying ${frequency} times per week. make me a study plan`;
  
    setIsLoading(true); // Set loading to true when the request is made

    axios
      .post("http://localhost:3001", { prompt: studyPlanString })
      .then((res) => {
        setResponse(res.data);
        setIsLoading(false); // Set loading to false when the response is received

      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Set loading to false when the response is received
      });
  };
  

  return (
    <div className="gptFormContainer">
      <h2>Create Your Study Plan</h2>
      <form onSubmit={handleSubmit}>
        <label>
          What do you want to learn?
          <input
            type="text"
            value={learningObject}
            onChange={(e) => setLearningObject(e.target.value)}
          />
        </label>
        <label>
          In how much time?
          <input
            type="text"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          />
        </label>
        <label>
          How many times a week?
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </label>
        <button type="submit" className="gptSubmit">Create Plan</button>
      </form>
      {isLoading && <img src={LoadingGraphic} alt="Loading..." />}
      <h2 style={{color: "black"}}>Your Study Plan</h2>
      <div className="gptFormResponse"><ReactMarkdown>{response}</ReactMarkdown></div>
    </div>
  );
}
