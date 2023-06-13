// express
// json-server
// multer

const express = require("express");
const path = require("path");
const jsonServer = require("json-server");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "public", "static")));

app.use(jsonServer.bodyParser);

// localhost:PORT/data/* -> db.json
app.use("/data",jsonServer.router(path.resolve(__dirname, "public", "static", "db.json"))); 

// localhost:PORT/data/* 제외 -> index.html
app.get(/^(?!\/data).*$/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// 클라이언트 측에서 이미지 파일을 전송하면 서버 측에서 특정 디렉터리에 저장한다.
app.post('/upload', upload.single('photo'), (req, res) => {
  // 파일 업로드 처리
  // res.json({ message: '파일이 성공적으로 업로드되었습니다.' });
});

app.listen(3003, () => console.log("Server running..."));
