const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { isValidToken } = require("../middleware/isValidToken");
const { isAdmin } = require("../middleware/isAdmin");

//=================================
//             User
//=================================

/* 회원 정보 넘겨주기 */
router.get("/auth", isValidToken, auth, (req, res) => {
  // console.log(req.user);
  return res.status(200).json({
    success: true,
    _id: req.user._id,
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    isAdmin: req.user.role === 2 ? true : false,
    isAuth: req.user.role === 1 || req.user.role === 2 ? true : false,
  });
});

/* 회원가입 처리 */
router.post("/register", (req, res) => {
  const user = new User(req.body); // 나중에 수정 (auth를 주입하지 못하도록.)
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

/* 로그인 처리 */
router.post("/login", (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Auth failed, id not found",
      });
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({ loginSuccess: false, message: "Wrong password" });
        } else {
          user.generateToken((err, user) => {
            if (err) return res.json({ loginSuccess: false, err });
            res
              .cookie("accessToken", user.accessToken, { httpOnly: true })
              .cookie("refreshToken", user.refreshToken, { httpOnly: true })
              .status(200)
              .json({ loginSuccess: true, userId: user._id });
          });
        }
      });
    }
  });
});

/* 로그아웃 처리 */
router.get("/logout", (req, res) => {
  User.findOneAndUpdate(
    { token: req.cookies.refreshToken },
    {
      token: "",
    },
    (err, user) => {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      if (err) return res.json({ success: false, err });
      else return res.status(200).send({ success: true });
    }
  );
});

/* 유저 리스트 가져오기 */
router.get("/list", isValidToken, isAdmin, (req, res) => {
  User.find({ $or: [{ role: 0 }, { role: 1 }, { role: 2 }] }, (err, docs) => {
    const userlist = [];
    for (let i = 0; i < docs.length; i++) {
      const user = {
        id: docs[i].id,
        name: docs[i].name,
        email: docs[i].email,
        role: docs[i].role,
      };
      userlist.push(user);
    }
    return res.status(200).json({ success: true, userlist });
  });
});

/* 권한 변경 */
router.post("/changeAuth", isValidToken, isAdmin, (req, res) => {
  User.findOneAndUpdate(
    {
      id: req.body.id,
    },
    {
      role: req.body.role,
    },
    (err, doc) => {
      if (err) {
        return res.json({ success: false, err });
      } else {
        res.redirect("/api/users/list");
      }
    }
  );
});

/* 검색 기능 */
router.get("/search", isValidToken, isAdmin, (req, res) => {
  const keyword = req.query[0];
  const userlist = [];

  if (keyword === undefined) {
    res.redirect("/api/users/list");
  } else {
    User.find(
      { $or: [{ id: { $regex: keyword } }, { name: { $regex: keyword } }] },
      (err, docs) => {
        if (err) {
          return res.status(200).json({ success: false, userlist: [] });
        } else {
          for (let i = 0; i < docs.length; i++) {
            const user = {
              id: docs[i].id,
              name: docs[i].name,
              email: docs[i].email,
              role: docs[i].role,
            };
            userlist.push(user);
          }
          return res.status(200).json({ success: true, userlist });
        }
      }
    );
  }
});

module.exports = router;
