import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState("Solve It");

    useEffect(() => {
        async function fetchTimeStamp() {
            try {
                const response = await axios.get(
                    "https://kids-arithmetic-app.onrender.com/"
                );
                const lastLog = response.data[0].time_stamp;
                console.log(lastLog);
            } catch (error) {
                console.error("Error while using useEffect:", error);
            }
        }
        fetchTimeStamp();
        generateQuestion();
    }, []);

    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);

        setQuestion(`${num1} + ${num2}`);
        setAnswer((num1 + num2).toString());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submittedAnswer = (
            e.currentTarget.querySelector('[name="answer"]') as HTMLInputElement
        ).value;
        if (submittedAnswer === answer) {
            setResult("Correct Answer!");
        } else {
            setResult(`Oops! Correct answer is ${answer}`);
        }
    };

    const handleNext = () => {
        setResult("Solve It");
        generateQuestion();
    };

    return (
        <div className="quiz">
            <span className="result">{result}</span>
            <h1>
                <span className="quest">{question}</span>
                <span> = ?</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="answer"
                    placeholder="your answer here"
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <button className="next" onClick={handleNext}>
                Next question
            </button>
        </div>
    );
}

export default App;
