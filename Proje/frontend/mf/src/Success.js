import React, { useState } from 'react';
import Login from './Login';
import Uploadss from './Uploadss';

const Success = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleLoginSuccess = () => {
    setIsMessageVisible(true); 
    setTimeout(() => {
      setIsMessageVisible(false); 
      setIsLoggedIn(true); 
    }, 3000); 
  };

  return (
    <div>
      <h1></h1>
      {isMessageVisible && <p style={{ textAlign: 'center', color: 'green' }}>로그인 성공! 곧 이동합니다...</p>}
      {!isLoggedIn && !isMessageVisible && <Login onLoginSuccess={handleLoginSuccess} />}
      {isLoggedIn && <Uploadss />}
    </div>
  );
};

export default Success;