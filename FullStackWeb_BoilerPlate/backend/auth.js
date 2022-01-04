const { UserDB } = require('./mongo/user.js')

let auth = (req, res, next) => {
  let token = req.cookies.authToken;
  UserDB.findByToken(token, (err, user) => {
    if (err) throw err
    if (!user) { return res.json({
      isAuth: false, error: true
    }) }
    req.Token = token;
    req.user = user;
    next()
  })
}

module.exports = { auth }
