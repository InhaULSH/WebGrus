const express = require("express");
const router = express.Router();
const test = require("./test");
const notice = require("./notice");
const freeBoard = require("./freeboard");
const contest = require("./contest/contest");
const users = require("./users");
const lectures = require("./lectures/lectures");
const lectureApplication = require("./lectures/lectureApplication");
const lectureContents = require("./lectures/lectureContents");
const lectureHomework = require("./lectures/lectureHomework");
const studygroups = require("./studygroup/studygroups");
const studygrouptApplication = require("./studygroup/studygroupApplication");
const studygroupContents = require("./studygroup/studygroupContents");

router.use("/webgrus", test);
router.use("/notice", notice);
router.use("/freeBoard", freeBoard);
router.use("/contest", contest);
router.use("/users", users);
router.use("/lectures", lectures);
router.use("/lectureApplication", lectureApplication);
router.use("/lectureContents", lectureContents);
router.use("/lectureHomework", lectureHomework);
router.use("/studygroups", studygroups);
router.use("/studygroupApplication", studygrouptApplication);
router.use("/studygroupContents", studygroupContents);

module.exports = router;
