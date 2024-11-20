const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// JSON 파일 경로
const filePath = path.join(__dirname, '../data/users.json');

// 사용자 데이터를 파일에 저장하는 함수
const saveUserDataToFile = (studentNumber, password) => {
  const userData = { studentNumber, password, timestamp: new Date().toISOString() };

  // 기존 데이터 읽기
  let users = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    users = JSON.parse(fileContent || '[]');
  }

  // 새로운 사용자 추가
  users.push(userData);

  // 파일에 저장
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
};

router.post('/login', (req, res) => {
  const { studentNumber, password, isAdmin } = req.body;

  if (isAdmin) {
    return res.status(200).json({ message: '관리자 로그인 성공' });
  }

  try {
    saveUserDataToFile(studentNumber, password); // 파일에 데이터 저장
    res.status(200).json({ message: '일반 사용자 로그인 성공! 정보가 저장되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '데이터 저장 중 오류가 발생했습니다.' });
  }
});

module.exports = router;