function opra(sql) {
  return new Promise(function (resolve, reject) {
    // 加载MySQL模块
    // 创建MySQL连接对象
    var mysql = require("mysql");
    // 连接MySQL服务器
    var cn = mysql.createConnection({
      // 数据库所在电脑的IP地址或域名
      host: "localhost",
      // 数据库端口
      port: 3306,
      // 数据库名称
      database: "sql117",
      user: "root",
      // 数据库密码
      password: "root"
    });
    // 执行连接操作
    cn.connect();
    cn.query(sql, function (err, result) {
      if (err) {
        return reject("数据库操作失败");
      }
      resolve(result);
    });
    // 关闭数据库连接
    cn.end();
  });
}
module.exports = {
  opra: opra
};
