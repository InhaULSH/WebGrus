var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var app = express()

app.use(session({
  secret: 'keyboard cat', // 세션의 필수 옵션, 보안에 신경써야하는 내용
  resave: false, // 세션이 변경에 관계없이 세션 값을 다시 저장할지 정하는 옵션
  saveUninitialized: true, // 세션이 필요할때만 구동할지 정하는 옵션
  store: new FileStore() // 세션 저장공간을 지정하는 옵션, 메모리가 아닌 로컬호스트의 디렉토리에 저장할 수 있게됨
}))

// 세션 미들웨어는 설치했을때 request에 세션 객체를 옵션에 따라 세션 저장소(기본설정은 메모리)에 추가함

app.get('/', function (req, res, next) {
  if (req.session.num == undefined) {
    req.session.num = 1;
  }
  else {
    req.session.num += 1;
  }
  res.send(`Views : ${req.session.num}`)
})
