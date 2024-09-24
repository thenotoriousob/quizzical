import React from "react";

export default function Select(props) {

    const { options, name, value, onChange } = props;

    const optionElements = options.map(option => 
        <option key={option.value} value={option.value}>{option.description}</option>
    );

    return (
        <select name={name} value={value} onChange={onChange}>
            {optionElements}
        </select>
    );

};
