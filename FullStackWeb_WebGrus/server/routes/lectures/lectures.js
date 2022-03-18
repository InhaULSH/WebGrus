const express = require("express");
const router = express.Router();
const { Lecture } = require("../../models/Lecture");
const path = require("path");
const fs = require("fs");

const { auth } = require("../../middleware/auth");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/public/data/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + path.extname(file.originalname)); //저장될 파일 이름
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(
        res.status(400).end("only jpg, jpeg, png files can be uploaded"),
        false
      );
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");
//=================================
//             Lecture
//=================================

router.post("/uploadThumnail", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path.slice(14),
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadLecture", (req, res) => {
  const lecture = new Lecture(req.body);
  lecture.save((err) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.get("/getLectures", (req, res) => {
  Lecture.find()
    .populate("teacher")
    .exec((err, lectures) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, lectures });
    });
});

router.post("/getLectureDetail", (req, res) => {
  console.log(req.body);
  Lecture.findOne({ _id: req.body.lectureId })
    .populate("teacher")
    .exec((err, lectureDetail) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, lectureDetail });
    });
});

router.post("/deleteLecture", (req, res) => {
  // 강의 썸네일 삭제
  Lecture.findOne({ _id: req.body.lectureId }).then((res) => {
    try {
      fs.unlinkSync("./client/public/" + res.filePath);
    } catch (err) {
      if (err.code == "ENOENT") {
        console.log("파일삭제 error 발생");
      }
      console.log("파일 삭제 성공");
    }
  });

  // 강의 삭제
  Lecture.findOne({ _id: req.body.lectureId })
    .populate("teacher")
    .remove((err) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
});

router.post("/editLecture", (req, res) => {
  const lecture = new Lecture(req.body);
  lecture.save((err) => {
    if (err) return res.status(400).send(err);
  });

  Lecture.findOne({ _id: req.body._id })
    .populate("teacher")
    .remove((err) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
});

router.post("/updateApplicationStatus", (req, res) => {
  Lecture.updateOne(
    { _id: req.body.LectureId },
    { $set: { applicationPeriod: req.body.Boolean } }
  ).exec((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
