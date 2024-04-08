import React from 'react';
import SignIn from '../features/users/SignIn';
import SignUp from '../features/users/SignUp';
import bee from '../img/bee.png'
import './HomePage.css';


const HomePage = () => {
    return (
        
        <div className="flexForm">
        <header> <img src={bee} alt="" />
            <h1>To do App</h1>
            </header>
            <SignUp />
            <SignIn />
        </div>
        
    );
};

export default HomePage;