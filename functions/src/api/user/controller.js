// const { config } = require('dotenv');
const config = require('../../config/config.js')
const db = require('../../config/dbConfig.js')
require('dotenv').config();

/** 
 * 
*/
const createUser = async (req, res) => {

  const result = await db.db.User.create(req.body)
  res.json(result)
}

/** 
 * 
*/
const getListUser = async (req, res) => {

  const result = await db.db.User.findAll({raw: true})
  console.log(111111, process.env.USER_MYSQL);
  console.log(222222, 'sai ở đâu à');

  let a = {}
  a.name = process.env.USER_MYSQL
  a.birthDay2 = config.db.host
  a.birthDay3 = config.benz
  a.email = 'conkhicon'

  result.push(a)
  res.json(result)
}

/** 
 * 
*/
const getDetailUser = async (req, res) => {
  const id = req.params["id"]

  const result = await db.db.User.findOne({where: {id: id},raw: true})
  res.json(result)
}

module.exports = {
  createUser,
  getListUser,
  getDetailUser
}