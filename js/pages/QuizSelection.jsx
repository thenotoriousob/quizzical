import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Select from "../components/Select";
import { category, difficulty, type } from "../data";

export default function QuizSelection() {

    const [isQuizOptionsSelected, setIsQuizOptionsSelected] = useState(false);
    const [formData, setFormData] = useState( 
        {
            quantity: '5',
            category: "any",
            difficulty: "any",
            type: "any"
        }
    );

    function handleChange(e) {

        setFormData(prevData => ({...prevData, [e.target.name]: e.target.value}));

    };

    function handleClick(e) {

        e.preventDefault();

        setIsQuizOptionsSelected(true);
    };

    return (
        isQuizOptionsSelected ? <Navigate to="quiz" state={formData}/>
        :
        <div className="selection-container">
            <form className="selection-form">
                <p className="selection-help">Select the options below to decide how your brain will be tested</p>

                <label className="selection-label" htmlFor="quantity">No of questions</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={5}
                    max={20}
                    onChange={handleChange}
                    value={formData.quantity}
                    required
                />

                <label className="selection-label" htmlFor="category">Category</label>
                <Select
                    name="category"
                    options={category}
                    onChange={handleChange}
                    value={formData.category}
                />

                <label className="selection-label" htmlFor="difficulty">Difficulty</label>
                <Select
                    name="difficulty"
                    options={difficulty}
                    onChange={handleChange}
                    value={formData.difficulty}
                />

                <label className="selection-label" htmlFor="type">Type</label>
                <Select
                    name="type"
                    options={type}
                    onChange={handleChange}
                    value={formData.type}
                />

                <button className="btn start-btn" onClick={handleClick}>Lets get quizzical!</button>
            </form>
        </div>
    );

};