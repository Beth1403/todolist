import React from 'react';
import { useSelector } from 'react-redux';

const UserNameDisplay = () => {
  const userDetails = useSelector((state) => state.user.userDetails);

  return (
    <div>
      <h3>
      {userDetails ? `Bonjour, ${userDetails.username}` : 'Non connecté'}
      </h3>
    </div>
  );
};

export default UserNameDisplay;
