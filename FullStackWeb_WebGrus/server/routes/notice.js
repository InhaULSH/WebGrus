const express = require("express");
const router = express.Router();
const Notion = require("../models/notion"); // notion의 스키마 모델
const mongoose = require("mongoose");

const today = new Date();
router.get("/writes", (req, res) => {
  const page = req.query.page;

  Notion.find({}, (err, notice) => {
    if (err) {
      console.log("공지목록 가져오기 error 발생");
      return res.json(err);
    }
    console.log("공지목록 가져오기 성공");

    // 페이지 관련 부분(현재 notice에만 적용한 상태)
    // 여기는 페이지가 query로 전달되고 delete나 add에서는 무조건 1페이지로 가도록 했습니다.
    const selectPage = [];

    for (let i = 0; i < 5; i++) {
      if (notice[i + 5 * (page - 1)] === undefined) {
        break;
      }
      selectPage.push(notice[i + 5 * (page - 1)]);
    }

    const response = {
      pages: Math.ceil(notice.length / 5),
      writes: selectPage,
    };

    res.json(response);
  });
});

// 검색했을때 검색 결과를 보내주기
router.get("/search", (req, res) => {
  // const page = req.query.page;
  const page = 1;
  const keyword = req.query[0];

  // 제목, 내용 또는 작성자 이름에 검색어가 포함되어있는 글 목록 찾기
  Notion.find(
    {
      $or: [
        { title: { $regex: keyword } },
        { description: { $regex: keyword } },
        { author: { $regex: keyword } },
      ],
    },

    (err, notice) => {
      if (err) {
        console.log("공지목록 검색결과 가져오기 error 발생");
        return res.json(err);
      }
      console.log("공지목록 검색결과 가져오기 성공");

      const selectPage = [];

      for (let i = 0; i < 5; i++) {
        if (notice[i + 5 * (page - 1)] === undefined) {
          break;
        }
        selectPage.push(notice[i + 5 * (page - 1)]);
      }

      const response = {
        pages: Math.ceil(notice.length / 5),
        writes: selectPage,
      };
      res.json(response);
    }
  );
});

router.post("/addWrite", (req, res) => {
  console.log("http://localhost:3001/api/notice/addWrite");

  // post 형식으로 받아온 데이터를 변수로 저장
  let post = req.body;
  console.log(post);
  let new_notion = new Notion();
  new_notion.id = "test user id"; // user id
  new_notion.title = post.newWrite.title;
  new_notion.description = post.newWrite.description;
  new_notion.author = "test user name";
  new_notion.date = post.newWrite.date;

  new_notion
    .save()
    .then((savedNotion) => {
      // 데이터를 db에 추가
      console.log("save 성공", savedNotion);

      Notion.find({}, (err, notice) => {
        // 다시 글 목록을 불러와서 클라이언트로 전달
        if (err) {
          console.log("공지목록 가져오기 error 발생");
          return res.json(err);
        }
        console.log("공지목록 가져오기 성공");
        // 페이지 관련 부분(현재 notice에만 적용한 상태)
        const selectPage = [];

        for (let i = 0; i < 5; i++) {
          if (notice[i] === undefined) {
            break;
          }
          selectPage.push(notice[i]);
        }

        const response = {
          pages: Math.ceil(notice.length / 5),
          writes: selectPage,
        };

        res.json(response);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteWrite", (req, res) => {
  // post 형식으로 받아온 데이터를 변수로 저장
  let post = req.body;
  console.log(post);

  let delete_id = post.writeId; // 삭제할 글의 아이디

  // document 삭제
  Notion.remove({ _id: delete_id }, (err) => {
    if (err) console.log("삭제실패", err);
    else console.log("삭제 성공");
  });

  Notion.find({}, (err, notice) => {
    if (err) {
      console.log("공지목록 가져오기 error 발생");
      return res.json(err);
    }
    console.log("공지목록 가져오기 성공");
    // 페이지 관련 부분(현재 notice에만 적용한 상태)
    const selectPage = [];

    for (let i = 0; i < 5; i++) {
      if (notice[i] === undefined) {
        break;
      }
      selectPage.push(notice[i]);
    }

    const response = {
      pages: Math.ceil(notice.length / 5),
      writes: selectPage,
    };

    res.json(response);
  });
});

module.exports = router;
