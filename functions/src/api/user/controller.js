// const { config } = require('dotenv');
const config = require('../../config/config.js')
const db = require('../../config/dbConfig.js')

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