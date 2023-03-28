const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config.js')

// Khởi tạo Sequelize với pool
// const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
//   host: config.db.host,
//   dialect: 'mysql',
//   dialectModule: require('mysql2'),
//   pool: {
//     max: 10,  // Số lượng kết nối tối đa được mở cùng một lúc
//     min: 0,   // Số lượng kết nối tối thiểu trong pool
//     acquire: 30000, // Thời gian tối đa để pool cố gắng kết nối với database trước khi trả lỗi
//     idle: 10000, // Thời gian tối đa một kết nối có thể không được sử dụng trước khi được giải phóng
//   },
// });

const sequelize = new Sequelize('bvl82gfnklct0bjdesj3', 'usn7zhnldkyyelwh', 'GejMs9rM4NgIfMCT1X63', {
  host: 'bvl82gfnklct0bjdesj3-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  pool: {
    max: 10,  // Số lượng kết nối tối đa được mở cùng một lúc
    min: 0,   // Số lượng kết nối tối thiểu trong pool
    acquire: 30000, // Thời gian tối đa để pool cố gắng kết nối với database trước khi trả lỗi
    idle: 10000, // Thời gian tối đa một kết nối có thể không được sử dụng trước khi được giải phóng
  },
});

// const sequelize = new Sequelize(config.db);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

//create model
const db = {}
db.User = require("../api/user/model.js")(sequelize, DataTypes)

module.exports = {
db
}
