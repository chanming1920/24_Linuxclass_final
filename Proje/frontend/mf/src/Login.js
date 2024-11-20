import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();

    const isAdmin = studentNumber === '0000' && password === '0000';
    const payload = { studentNumber, password, isAdmin };

    try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      onLoginSuccess();
    } else {
      setError(data.message || '로그인 실패');
    }
    } catch (err) {
    setError('서버와 연결할 수 없습니다.');
    }

    //  관리자 인증 로직 
    if (studentNumber === '0000' && password === '0000') {
      setMessage('로그인 성공!');
      onLoginSuccess();
    } else {
      setMessage('학번 또는 비밀번호가 잘못되었습니다.');
    }
  };



  // 아래는 박스 디자인
  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="studentNumber"
            placeholder="학번"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          로그인
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;