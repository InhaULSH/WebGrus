var fs = require("fs");

console.log("A Code");
Rs = fs.readFileSync("Sample.txt", "utf8")
console.log(Rs);
console.log("C Code"); // 동기

console.log("A Code");
fs.readFile("Sample.txt", "utf8", function(err, Rs) { // function은 Call Back, 작업이 끝난 후 function을 호출
  console.log(Rs);
});
console.log("C Code"); // 비동기
