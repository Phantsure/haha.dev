import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import PlaygroundIndex from './playground/Index';
import SigninIndex from './sign-in/Index';

const domContainer = document.querySelector("#application")!
const root = createRoot(domContainer)
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<PlaygroundIndex />} />
            <Route path="/sign-in" element={<SigninIndex />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
)
