import React from "react";

export default function Question(props) {

    const { setResponse, question, children } = props;

    return (
        <div className="question-container">
            <h2 className="question">{question}</h2>
            <div className="response-container" onChange={e => setResponse(e)}>
                {children}
            </div>
        </div>
    );

};
