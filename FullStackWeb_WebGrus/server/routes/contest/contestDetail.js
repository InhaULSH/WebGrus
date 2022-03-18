const express = require("express");
const contestDetail = require("../../models/contestDetail"); // contest의 스키마 모델
const router = express.Router();

const today = new Date(); // 현재 날짜

// 글 목록 받아오기
router.get("/writes", (req, res) => {
  // const { _id } = req.query._id; // 공모전 아이디
  console.log("req.query._id --------------");
  console.log(req.query._id);
  // 공모전의 아이디를 가지고 DB에서 찾아 꺼내왔다 치고..
  contestDetail.find({ contestid: req.query._id }, (err, result) => {
    if (err) {
      console.log("공모전 상세 가져오기 에러 발생");
      return res.json(err);
    }
    console.log("공모전 상세 가져오기 성공");
    // console.log(result);
    res.json(result);
  });
});

// 글 추가
router.post("/addWrite", (req, res) => {
  console.log("공모전 상세 글 추가 페이지 들어옴");
  let post = req.body;
  // console.log(post);
  let new_content = new contestDetail();
  new_content.contestid = post.detail._id; // 공모전 글 아이디
  new_content.title = post.newWrite.title;
  new_content.description = post.newWrite.description;
  new_content.date = post.newWrite.date;

  new_content
    .save()
    .then((savedContent) => {
      console.log("공모전 상세 추가 성공");

      contestDetail.find({ contestid: post.detail._id }, (err, result) => {
        if (err) {
          console.log("공모전 상세 가져오기 에러 발생");
          return res.json(err);
        }
        console.log("공모전 상세 가져오기 성공");
        res.json(result);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 글 삭제
router.post("/deleteWrite", (req, res) => {
  let post = req.body;
  // console.log(post);
  let writeId = post.writeId;

  // 글 삭제
  contestDetail.deleteOne({ _id: writeId }, (err, result) => {
    if (err) console.log("공모전 상세글 삭제 실패", err);
    else {
      console.log("공모전 상세 글 삭제 성공");
    }

    // 다시 공모전의 상세내용 글 불러오기
    let contestid = post.detail._id;
    contestDetail.find({ contestid: contestid }, (err, result) => {
      if (err) {
        console.log("공모전 상세 가져오기 에러 발생");
        return res.json(err);
      }
      console.log("공모전 상세 가져오기 성공");
      res.json(result);
    });
  });
});

module.exports = router;
