


const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const myKey = process.env.API_KEY;
const fs = require('fs');

// app.을 get으로 불러와서
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, './index.html'));
});

app.use(express.static(__dirname));
// '/api/data'를 비동기로 불러오기
app.get('/api/data', async (req, res) => {
  try {
    const response = await fetch(`https://apis.data.go.kr/B553530/GHG_LIST_040/GHG_LIST_04_03_20220831_VIEW01?serviceKey=${myKey}&apiType=JSON`);
    const data = await response.json();
    fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8', function(err) {
      if (err) {
        res.status(500).send(err.message)
        confirm('Error : ', err)
      } else {
        res.send('save success!')
      }
  });
  }catch (error) {
    res.status(500).send('API Error: ' + error.message);
  }
})

// 파일에서 데이터를 가져오는 라우트
app.get('/api/read-data', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('파일을 읽는 중 오류가 발생했습니다.');
    }
    res.json(JSON.parse(data));
  })
});






// app.을 listnen으로 응답시킨다 => 마지막에 응답하는거라 맨 마지막 줄에 있어야함


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// 필요한 주소와 파라미터
// 엔드포인트 : https://apis.data.go.kr/B553530/GHG_LIST_040/GHG_LIST_04_03_20220831_VIEW01?serviceKey={myKey}&apiType=json
// // pageNo=1
// // &numOfRows=10
// // &q1=2019
// // &q2=5%EC%9D%B8%20~%209%EC%9D%B8
// // &q3=%EB%8C%80%EC%A0%84
// // &q4=27213&q5=%EC%A0%84%EB%A0%A5
// // &q6=%EC%A0%84%EB%A0%A5');



// https://apis.data.go.kr/B553530/GHG_LIST_040/GHG_LIST_04_03_20220831_VIEW01?serviceKey=
// AwGS4QgrZeqwtC3EZwkAYwU096CdBsr1jkK5aW%2BAROVWO1%2BGvmTU7SCIqPxZ7wza6Fg0FKTTTtRIE7Y6veqPIg%3D%3D
// &pageNo=1&numOfRows=10&apiType=json&q1=2019&q2=5%EC%9D%B8%20~%209%EC%9D%B8&q3=%EB%8C%80%EC%A0%84&q4=27213&q5=%EC%A0%84%EB%A0%A5&q6=%EC%A0%84%EB%A0%A5