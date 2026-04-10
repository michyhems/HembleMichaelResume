import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/page-components/blog.jsx";
import Home from "./pages/home.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home></Home>} />
                    <Route path="/blog/:repo" element={<Blog></Blog>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
