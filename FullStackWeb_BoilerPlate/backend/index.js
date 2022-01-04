const express = require('express') // express 모듈 가져오기
const app = express() // express 앱 만들기
const port = 5000 // express 앱을 실행시킬 포트

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
const cookieParser = require('cookie-parser');
app.use(cookieParser())

const { UserDB } = require('./mongo/user.js') // MongDB 파일 가져오기
const security = require('./mongo/security.js')
const { auth } = require('./auth.js')

const mongoose = require('mongoose')
mongoose.connect(security.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('App is connected to MongoDB'))
  .catch(err => console.log(err))
// MongoDB에 연결

app.get('/api/user', (req, res) => {
  res.send('Hello World!')
}) // 루트 디렉토리

app.post('/api/user/register', (req, res) => {
  const User = new UserDB(req.body)

  User.save((err) => {
    if (err) { return res.json({success: false, err}) }

    return res.status(200).json({success: true})
  })
}) // 회원가입 디렉토리

app.post('/api/user/login', (req, res) => {
  UserDB.findOne({ Email: req.body.Email }, (err, userInfo) => {
    if (!userInfo) { return res.json({ loginSuccess: false, message: "Email Not Found" }) }
    // 몽구스 내장 메소드 이용
    user.comparePassword(req.body.Password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: "Password Not Found" })
      user.generateToken((err, user) => {
        if (err) { return res.status(400).send(err) }

        res.cookie("authToken", user.Token)
           .status(200)
           .json({ loginSuccess: true, userId: user._id })
      })
    }) // 커스텀 메소드 이용
  })
}) // 로그인 디렉토리

app.get('/api/user/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.Authority === 0 ? false : true,
    isAuth: true,
    Name: req.user.Name,
    Email: req.user.Email,
    Authority: req.user.Authority,
    Image: req.user.Image
  })
}) // 사용자 인증 디렉토리

app.get('/api/user/logout', auth, (req, res) => {
  UserDB.findOne({ _id: req.user._id }, { Token: "" }, (err, user) => {
    if (err) { return res.json({ success: false, err}) }
    return res.status(200).send({
      success: true
    })
  })
}) // 로그아웃 디렉토리

app.get('/api/hello', (req, res) => {
  res.send("Hello");
}) // 프론트 엔드와의 통신을 테스트하는 디렉토리

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) // 앱이 포트에서 실행되면 콘솔에 메세지를 출력

// package.json 파일 - scripts - "start": "명령어" 추가 - 콘솔에서 'npm run 명령어'로 명령어 실행
