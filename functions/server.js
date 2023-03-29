require('dotenv').config();
const serverless = require('serverless-http');
let express = require('express');
let cors = require('cors');
var path = require('path');
const {I18n} = require('i18n');

const app = express();

app.use(cors());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

//khởi tạo i18n
const i18n = new I18n({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'vi'
})

app.use(i18n.init);

//connect to routes
require("./src/api/routes.js")(app);

// Middleware để đóng kết nối Sequelize
app.use((req, res, next) => {
  sequelize.close();
  next();
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports.handler = serverless(app);

