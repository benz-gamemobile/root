//config response


function response(res, data, status, message) {
  if (status) {
      res.status(status);
  }
  res.json({
      data: data,
      status: status,
      message: message
  });
}

module.exports = {
  benz: 'lại là tôi đây',
  db: {
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL,
    host: process.env.HOST_MYSQL,
    dialect: 'mysql',
    dialectModule: require('mysql2')
  }
}
