import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="error">
            <h2>Page not found</h2>
            <Link to="/">Return to home</Link>
        </div>
    );
};
