import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./page/home.jsx";
import TestPage from "./page/test_page.jsx";
import Menu from "./components/menu.jsx";
import { HelmetProvider } from 'react-helmet-async';

const Page = () => {
    return (
        <HelmetProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/menu" element={<Menu />} />
                </Routes>
            </Router>
        </HelmetProvider>
    );
};
export default Page;
