import React, { useState } from 'react';
import { useSignUpUserMutation } from './userApiSlice';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signUpUser, { isLoading, isSuccess, isError, error }] = useSignUpUserMutation();

  const strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

  const validatePassword = (password) => {
   
    if (!strongPasswordRegex.test(password)) {
     
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return false;
    } else {
     
      setPasswordError("");
      return true;
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      alert('Tous les champs sont requis.');
      return;
    }

    if (!validatePassword(password)) {
      
      return;
    }

    try {
      await signUpUser({ email, password, username }).unwrap();
      
    } catch (err) {
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="title">
        <h2>Inscription</h2>
      </div>
      {isSuccess && <div className="success-message">Inscription réussie. Vous pouvez maintenant vous connecter.</div>}
      {isError && <div className="error-message">{error.data?.error || 'Une erreur est survenue.'}</div>}
      {isLoading && <div>Chargement...</div>}
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
        onChange={handlePasswordChange}
      />
      {passwordError && <div className="error-message2">{passwordError}</div>}
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default SignUp;
