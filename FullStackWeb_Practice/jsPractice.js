console.log(1+1);
console.log(1-1);
console.log(2*5);
console.log(10/2);

console.log("1"+"2");
console.log("안녕하세요 자바스크립트 데이터타입을 배워보고 있는데요. 파이썬 문법을 알고 있으니까 안 어렵네요 ㅋㅋ".length); // 데이터타입 출력

var a = 1;
console.log(a);

var str = `"${a}. 동해물과 백두산이 마르고 닳도록
하느님이 보우하사 우리나라만세"`  // Template Literal
console.log(str);

console.log(true);
console.log(false);

console.log(1==1);
console.log(2>3);
console.log(4<3);
console.log(1===2);

if(true) {
  console.log(true);
}
if(false) {
  console.log(false);
}

const i = 0
wihle(i === 0) {
  console.log("A");
}

var arr = ["A","B","C","D"];
console.log(arr[2]);
console.log(arr[3]);
console.log(arr, length);

function F1() {
  console.log("1");
  console.log("2");
  console.log("3");
};

function F2(Fisrt, Last) {
  console.log(Fisrt + Last);
}

function F3(Fisrt, Last) {
  return Fisrt * Last;
}

var roles = {"A": "LSH", "B":"HKD", "C":"KIH"}
console.log(roles.B); // 객체
for (var name in roles) {
  console.log("object-> ",name ," : " , roles[name]);
} // 키와 밸류의 출력
var Obj = {
  a : "a";
  b : "b";
  F1 : fucntion() {
    console.log(this.a);
    return "A";
  }
  F2 : function() {
    console.log(this.b);
    return "B";
  }
}
Obj.F1(); // 객체를 통해 연관된 데이터와 함수를 저장할 수 있음
