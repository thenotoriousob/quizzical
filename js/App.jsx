import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizLayout from "./components/QuizLayout";
import PageNotFound from "./components/PageNotFound";
import QuizSelection from "./pages/QuizSelection";
import Quiz from "./pages/Quiz";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<QuizLayout />}>
                    <Route index element={<QuizSelection />} />
                    <Route path="quiz" element={<Quiz />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

};
