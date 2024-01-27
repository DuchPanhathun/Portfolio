import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./page/home.jsx";
import TestPage from "./page/test_page.jsx";

const Page = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </Router>
    );
};
export default Page;

