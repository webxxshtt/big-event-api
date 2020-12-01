/*拆解独立的路由模块*/

const express = require("express");
const path = require("path");
const utility = require("utility");
// 拆分路由模块，可以将路由添加到router对象上
// 在入口文件中通过app.use方法把router中的路由配置到全局
const router = express.Router();
// 导入数据库模块
const db = require(path.join(__dirname, "../common.js"));

// 注册接口
router.post("/reguser", async (req, res) => {
  // 1、获取表单数据
  var params = req.body;
  // 对密码进行加密处理
  params.password = utility.md5(params.password);
  // 插入数据库之前，添加用户名重复性判断
  let csql = "select id from `my-user` where username = ?";
  let flag = await db.opra(csql, params.username);
  if (flag && flag.length > 0) {
    // 用户名已经存在
    res.json({
      status: 1,
      message: "用户名已经存在"
    });
    return;
  }

  // 2、把数据插入数据库
  var sql = "insert into `my-user`set ?";
  let ret = await db.opra(sql, params);
  // 3、返回一个操作状态
  if (ret && ret.affectedRows > 0) {
    // 注册用户成功
    res.json({
      status: 0,
      message: "注册成功"
    });
  } else {
    // 注册失败
    res.json({
      status: 1,
      message: "注册失败"
    });
  }
});

// 测试数据库接口
router.get("/test", async (req, res) => {
  let sql = "select * from `my-user`";
  // let sql = "insert into `my-user`(username,password) values ('jackson','20201128')";
  let ret = await db.opra(sql);
  if (ret && ret.length > 0) {
    res.json({
      status: 0,
      message: "查询数据成功",
      data: ret
    });
  } else {
    res.json({
      status: 1,
      message: "查询数据失败"
    });
  }
});

module.exports = router;
