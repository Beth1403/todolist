import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'; 
import { persistor } from './store';
import HomePage from '../pages/HomePage';
import TodoPage from '../pages/TodoPage';
import './App.css'

const App = () => {
    return (
        // PersistGate permet de stocker l'état global dans le localStorage
        <PersistGate loading={null} persistor={persistor}> 
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/todos" element={<TodoPage />} />
                    </Routes>
                </div>
            </Router>
        </PersistGate>
    );
};

export default App;
