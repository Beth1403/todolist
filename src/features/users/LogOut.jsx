import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../app/store';
import { logout } from './userSlice';

const LogoutButton = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {

    dispatch(logout());
    await persistor.purge();
    // vide les données dans le localStorage
    
    navigate('/')
    

  };

  return (
    <button onClick={handleLogout}>Se déconnecter</button>
  );
};

export default LogoutButton;
