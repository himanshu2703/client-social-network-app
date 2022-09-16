import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import Header from './HeaderFooter/Header';
import Footer from './HeaderFooter/Footer';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/feed' element={<Feed />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
