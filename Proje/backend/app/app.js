"user strict";

const express = require("express");
//const bodyParser = require("body-parser");  현재 body-parser는 express에 포함되어서? express로 사용하면 됨
const path = require("path");
// const routes = require("../app/src/routes");

const app = express();

// 라우팅
const home = require("./src/routes/home");


// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
// URL를 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결 하는 코드
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));


app.use("/", home); // use -> 미들웨어를 등록해주는 메서드


// app.use('/', routes);

// 404 에러 처리
// app.use((req, res, next) => {
//     res.status(404).send('페이지를 찾을 수 없습니다.');
// });

// // 에러 핸들러
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('서버 에러가 발생했습니다.');
// });


module.exports = app;
