require("dotenv").config();

const mongoose = require("mongoose");

const uri = process.env.DB_URI;

let db = {};
db.connect = () => {
  function connect() {
    mongoose.connect(
      uri,
      {
        dbName: "webgrusdb",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.error("mongodb 연결 실패", err);
        }
        console.log("mongodb 연결 성공");
      }
    );
  }
  connect();
  mongoose.connection.on("disconnected", connect); // 연결이 끊기면 다시 connect 실행
};

module.exports = db;
