
// [1] 데이터 콘솔에 먼저 받아오기 확장자는  .mjs로 텍스트
// import fetch from 'node-fetch'
// fetch('https://apis.data.go.kr/B553530/GHG_LIST_040/GHG_LIST_04_03_20220831_VIEW01?serviceKey=AwGS4QgrZeqwtC3EZwkAYwU096CdBsr1jkK5aW%2BAROVWO1%2BGvmTU7SCIqPxZ7wza6Fg0FKTTTtRIE7Y6veqPIg%3D%3D&pageNo=1&numOfRows=10&apiType=json&q1=2019&q2=5%EC%9D%B8%20~%209%EC%9D%B8&q3=%EB%8C%80%EC%A0%84&q4=27213&q5=%EC%A0%84%EB%A0%A5&q6=%EC%A0%84%EB%A0%A5')
//   .then(response => response.text())
//   .then(data => console.log(data))
//   .then(error => console.log(error))
//   




// 서버에서 '/api/data' 가져오기
document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/read-data')
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      console.log(data.response.body.items.item)
      const tableItem = data.response.body.items.item;
      return updateTable(tableItem);
    })
    .catch(error => console.log(error));
})

function updateTable(items) {
  if (items && items.length > 0) {
    document.querySelector("#dataTable thead").innerHTML = 
    '<tr>' +
      Object.keys(items[0]).map(key =>
        `<th>${key}</th>`
        ).join("")
  + '</tr>';
  document.querySelector("#dataTable tbody").innerHTML = 
    items.map(item => {
        return '<tr>' +
        Object.keys(item).map(key =>
          `<td>${item[key]}</td>`
        ).join("")
        + '</tr>';
      }).join("")
    } else {
  clearTable();
  }
}
function clearTable() {
  document.querySelector("#dataTable thead").innerHTML = "";
  document.querySelector("#dataTable tbody").innerHTML = "";
}