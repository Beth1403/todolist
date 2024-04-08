import React, { useState } from 'react';
import { useLoginUserMutation } from './userApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './userSlice'; 
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
       
      dispatch(setUserDetails(response.userDetails));
      
      // Redirection
      navigate('/todos');
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isLoading && <p>Connexion en cours...</p>}
      <div className="title">
        <h2>Connexion</h2>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isError && <div className="error-message">Erreur de connexion : {error.data?.error || "Une erreur s'est produite."}</div>}
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default SignIn;
