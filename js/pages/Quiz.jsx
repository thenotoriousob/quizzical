import React, { useState, useEffect, useRef, Suspense } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Question from "../components/Question";
import Response from "../components/Response";
import he from "he";

export default function Quiz() {

    const [questions, setQuestions] = useState({
                                                  id: "",
                                                  question: "",
                                                  answers: [],
                                                  correctAnswer: "",
                                                  response: "",
                                                  gotCorrectAnswer: false
                                              });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const quizFinished = useRef(false);
    const correctAnswersCount = useRef(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        setLoading(true);

        async function getQuestions() {

            const { category, difficulty, quantity, type } = location.state;

            let url = `https://opentdb.com/api.php?amount=${quantity}`;
            
            url += category !== "any" ? `&category=${category}` : '';
            url += difficulty !== "any" ? `&difficulty=${difficulty}` : '';
            url += type !== "any" ? `&type=${type}` : '';

            try {

                const resp = await fetch(url);

                if (!resp.ok) {
                    throw new Error("Sorry, the api has been called too many times in quick succession");
                };
                
                const data = await resp.json();

                setQuestions(() => {

                    const questionArray = data.results.map((currQuestion, index) => {

                        let { question, correct_answer, incorrect_answers} = currQuestion;

                        question = he.decode(question);
                        correct_answer = he.decode(correct_answer);
                        incorrect_answers = incorrect_answers.map(answer => he.decode(answer));

                        return {
                            id: `question-${index}`,
                            question: question,
                            answers: [correct_answer, ...incorrect_answers].sort((a, b) => 0.5 - Math.random()),
                            correctAnswer: correct_answer,
                            response: ""
                        };
                    })

                    return questionArray;

                });

            }

            catch(error) {
                setError(error.message);
            };

            setLoading(false);
          
        };

        // Use debouncing to prevent the StrictMode double load 
        const timeoutId = setTimeout(() => {
            if (location.state?.quantity) {
                getQuestions();
            };
        }, 500);

        return () => clearTimeout(timeoutId);

    }, []);

    function updateResponse(e) {

        if(quizFinished.current) {
            return;
        };

        setQuestions(prevQuestions => prevQuestions.map(question => {

            if(question.id === e.target.name) {
              question.response = e.target.value;
            };
  
            return question;
        }));

    };

    function checkAnswers() {
 
        setQuestions(prevQuestions => prevQuestions.map(question => {

            if(question.correctAnswer === question.response) {
                question.gotCorrectAnswer = true;
            }else {
                question.gotCorrectAnswer = false;
            };

            return question;
        }));

        quizFinished.current = true;

    };

    function resetGame() {

        navigate("/");

    };

    // If the game has finished count the correct answers
    if(quizFinished.current) {
        correctAnswersCount.current = questions.reduce((total, question) => {
            return question.gotCorrectAnswer ? total + 1 : total;
        }, 0);
    };

    if(loading) {
        return (
            <BeatLoader
                cssOverride={{textAlign: "center", padding: "2em"}}
                margin={2}
                size={15}
                speedMultiplier={1}
                loading={true}
            />
        );
    };

    if(error) {
        return (
            <div className="error">
                <h2>There was an error: {error}</h2>
                <Link to="/">Return to home</Link>
            </div>
        );
    };

    return (
        <Suspense fallback={<BeatLoader
            cssOverride={{}}
            margin={2}
            size={15}
            speedMultiplier={1}
            loading={true}
          />}
        >
            <>
                {questions.length > 0 &&
                    questions.map((question, index) =>
                        <Question
                            key={index}
                            id={index}
                            question={question.question}
                            answers={question.answers}
                            setResponse={updateResponse}
                        >
                            {question.answers.length > 0 &&
                                question.answers.map((answer, index) =>
                                    <Response
                                        key={index}
                                        id={`response-${question.id}${index}`}
                                        name={`${question.id}`}
                                        value={answer}
                                        correctAnswer={question.correctAnswer}
                                        quizFinished={quizFinished.current}
                                        response={question.response}
                                    />
                                )
                            }
                        </Question>
                )}
                <div className="button-container">
                    {!quizFinished.current ?
                        <button className="btn check-btn" onClick={checkAnswers}>Check Answers</button>
                        :
                        <>
                            <span className="score">{`You scored ${correctAnswersCount.current}/${questions.length} correct answers`}</span>
                            <button className="btn check-btn" onClick={resetGame}>Play Again</button>
                        </>
                    }
                </div>
            </>
        </Suspense>
    );
};
