var a = function() {
  console.log("A");
}
a() // 변수에 함수를 담고, 변수()를 통해 함수를 호출 가능 -> 함수는 기능이자 값이기도 함, 배열과 객체에 담을수 있음

function SlowFunc(callback) {
  callback();
}
SlowFunc(a); // SlowFunc가 끝나고 callback은 함수 a를 실행함
