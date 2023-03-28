const { Sequelize, DataTypes } = require('sequelize');

// Khởi tạo Sequelize với pool
const sequelize = new Sequelize(process.env.DATABASE_MYSQL, process.env.USER_MYSQL, process.env.PASSWORD_MYSQL, {
  host: process.env.HOST_MYSQL,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  pool: {
    max: 10,  // Số lượng kết nối tối đa được mở cùng một lúc
    min: 0,   // Số lượng kết nối tối thiểu trong pool
    acquire: 30000, // Thời gian tối đa để pool cố gắng kết nối với database trước khi trả lỗi
    idle: 10000, // Thời gian tối đa một kết nối có thể không được sử dụng trước khi được giải phóng
  },
});

//create model
const db = {}
db.User = require("../api/user/model.js")(sequelize, DataTypes)

module.exports = {
db
}
