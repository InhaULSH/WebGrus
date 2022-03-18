var M = {
  Vari1 : "A";
  Vari2 : "B";
  function F() {
    console.log(this.Var1);
  }
};
moudule.exports = M
// 모듈

var part = require(`./MoudulePractcie.js`);
console.log(part);
// 모듈 활용
