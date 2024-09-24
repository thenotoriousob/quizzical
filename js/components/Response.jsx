import React from "react";
import classnames from "classnames";

export default function Response(props) {

    const { name, value, id, quizFinished, correctAnswer, response } = props;

    const styleProps = {};
    let answerClass = "";

    if(quizFinished) {
        if(value === correctAnswer) {
            // styleProps.backgroundColor = "#94D7A2";
            answerClass = "correct-answer";
            styleProps.disabled = false;
        } else {
            if(value === response) {
                // styleProps.backgroundColor = "#F8BCBC";
                answerClass = "wrong-answer";
                styleProps.disabled = true;
            } else {
                styleProps.disabled = true;
            };
        };
    };

    return (
        <div className="response">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                style={styleProps}
                disabled={styleProps.disabled}
            />
            <label
              className={classnames("response-label",answerClass)}
                htmlFor={id}
                style={styleProps}
                disabled={styleProps.disabled}
            >
                {value}
            </label>
        </div>
    );

};
