const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const loginRouter = require(path.join(__dirname, "routers/login-router.js"));

// 配置跨域
app.use(cors());
// 处理客户端请求post参数
// 处理客户端请求post参数
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 监听接口
app.listen(9999, () => {
  console.log("running...");
});

// 配置路由模块
app.use("/api", loginRouter);

app.get("/data", (req, res) => {
  res.send("hello");
});
