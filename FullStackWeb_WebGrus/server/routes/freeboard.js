const express = require("express");
const router = express.Router();
const FreeBoard = require("../models/freeboard"); // freeboard의 스키마 모델

const today = new Date();
router.get("/writes", (req, res) => {
  const page = req.query.page;

  // 자유게시판 목록 보내주기
  FreeBoard.find({}, (err, freeboards) => {
    if (err) {
      console.log("자유게시판 목록 가져오기 error 발생");
      return res.json(err);
    }
    console.log("자유게시판 목록 가져오기 성공");

    const selectPage = [];

    for (let i = 0; i < 5; i++) {
      if (freeboards[i + 5 * (page - 1)] === undefined) {
        break;
      }
      selectPage.push(freeboards[i + 5 * (page - 1)]);
    }

    const response = {
      pages: Math.ceil(freeboards.length / 5),
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
  FreeBoard.find(
    {
      $or: [
        { title: { $regex: keyword } },
        { description: { $regex: keyword } },
        { author: { $regex: keyword } },
      ],
    },

    (err, freeboards) => {
      if (err) {
        console.log("자유게시판 검색결과 가져오기 error 발생");
        return res.json(err);
      }
      console.log("자유게시판 검색결과 가져오기 성공");

      const selectPage = [];

      for (let i = 0; i < 5; i++) {
        if (freeboards[i + 5 * (page - 1)] === undefined) {
          break;
        }
        selectPage.push(freeboards[i + 5 * (page - 1)]);
      }

      const response = {
        pages: Math.ceil(freeboards.length / 5),
        writes: selectPage,
      };
      res.json(response);
    }
  );
});

router.post("/addWrite", (req, res) => {
  console.log("http://localhost:3001/api/freeboard/addWrite");

  // post 형식으로 받아온 데이터를 변수로 저장
  let post = req.body;
  console.log(post);
  let new_freeboard = new FreeBoard();
  new_freeboard.id = "test user id"; // user id
  new_freeboard.title = post.newWrite.title;
  new_freeboard.description = post.newWrite.description;
  new_freeboard.author = "test user name";
  new_freeboard.date = post.newWrite.date;

  new_freeboard
    .save()
    .then((savedFree) => {
      // 데이터를 db에 추가
      console.log("save 성공", savedFree);

      FreeBoard.find({}, (err, freeboards) => {
        // 다시 글 목록을 불러와서 클라이언트로 전달
        if (err) {
          console.log("자유게시판 목록 가져오기 error 발생");
          return res.json(err);
        }
        console.log("자유게시판 목록 가져오기 성공");
        const selectPage = [];

        for (let i = 0; i < 5; i++) {
          if (freeboards[i] === undefined) {
            break;
          }
          selectPage.push(freeboards[i]);
        }

        const response = {
          pages: Math.ceil(freeboards.length / 5),
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
  FreeBoard.deleteOne({ _id: delete_id }, (err) => {
    if (err) console.log("삭제실패", err);
    else console.log("삭제 성공");

    FreeBoard.find({}, (err, freeboards) => {
      if (err) {
        console.log("자유게시판 목록 가져오기 error 발생");
        return res.json(err);
      }
      console.log("자유게시판 목록 가져오기 성공");
      const selectPage = [];

      for (let i = 0; i < 5; i++) {
        if (freeboards[i] === undefined) {
          break;
        }
        selectPage.push(freeboards[i]);
      }

      const response = {
        pages: Math.ceil(freeboards.length / 5),
        writes: selectPage,
      };

      res.json(response);
    });
  });
});

module.exports = router;
