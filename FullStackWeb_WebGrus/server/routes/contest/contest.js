const express = require("express");
const router = express.Router();
const detail = require("./contestDetail");
const Contest = require("../../models/contest");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const today = new Date(); // 현재 날짜

// 팀원 모집 글 분리
router.use("/detail", detail);

// multer 선언 및 설정
const uploadFolder = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "client/public/posters"); // 파일 저장 위치
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname)); //저장될 파일 이름
    },
  }),
});

// 공모전 글 목록
router.get("/writes", (req, res) => {
  Contest.find({}, (err, contest) => {
    if (err) {
      console.log("공모전 목록 가져오기 error 발생");
      return res.json(err);
    }
    console.log("공모전 목록 가져오기 성공");
    res.json(contest);
  });
});

// 검색했을때 검색 결과를 보내주기
router.get("/search", (req, res) => {
  const keyword = req.query[0];

  // 제목, 내용 또는 작성자 이름에 검색어가 포함되어있는 글 목록 찾기
  Contest.find(
    {
      $or: [
        { title: { $regex: keyword } },
        { description: { $regex: keyword } },
        { author: { $regex: keyword } },
      ],
    },

    (err, contest) => {
      if (err) {
        console.log("공모전목록 검색결과 가져오기 error 발생");
        return res.json(err);
      }
      console.log("공모전목록 검색결과 가져오기 성공");
      res.json(contest);
    }
  );
});

// 공모전 포스터 이미지 저장
router.post("/addPoseter", uploadFolder.single("file"), (req, res) => {
  console.log("/addPoster 로 들어옴");
  console.log(req.file.path.slice(14));
  res.json(req.file.path.slice(14));
});

// 공모전 소개 글 추가
router.post("/addWrite", (req, res) => {
  // post 형식으로 받아온 데이터를 변수로 저장
  let post = req.body;
  let new_contest = new Contest();
  new_contest.id = post.id; // user id
  new_contest.title = post.title;
  new_contest.src = post.src; // 포스터 이미지가 저장된 경로
  new_contest.description = post.description;
  new_contest.author = post.author;
  new_contest.date = post.date;

  new_contest
    .save()
    .then((savedContest) => {
      // 데이터를 db에 추가
      console.log("save 성공");
      res.json(savedContest);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// 공모전 글 삭제
router.post("/deleteWrite", (req, res) => {
  console.log(req.body);
  // const { writeId, imgsrc } = req.body;
  const writeId = req.body.writeId;
  const imgsrc = req.body.imgsrc;
  console.log(writeId);
  console.log(imgsrc);

  // 해당 공모전의 사진을 삭제
  try {
    fs.unlinkSync("./client/public/" + imgsrc);
  } catch (err) {
    if (err.code == "ENOENT") {
      console.log("파일삭제 error 발생");
    }
  }

  // 해당 공모전 삭제
  Contest.deleteOne({ _id: writeId }, (err, result) => {
    if (err) console.log("공모전 삭제 실패", err);
    else {
      console.log("공모전 삭제 성공");
      console.log(result);
    }

    Contest.find({}, (err, contest) => {
      // 다시 글 목록을 불러와서 클라이언트로 전달
      if (err) {
        console.log("공모전 목록 가져오기 error 발생");
        return res.json(err);
      }
      console.log("공모전 목록 가져오기 성공");
      res.json(contest);
    });
  });
});

module.exports = router;
