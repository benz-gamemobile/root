// const { config } = require('dotenv');
const config = require('../../config/config')
const db = require('../../config/dbConfig')
const userService = require('./services')
const commonHelpers = require('../../helpers/common')
const moment = require("moment");

/** 
 * created_by: ben
 * created_at: 28/03/2023
*/
const createUser = async (req, res) => {
  try {
    const result = await db.db.User.create(req.body)

    if (result) {
      commonHelpers.response(res, result, config.http_status.success, req.__('user.create.success'))
    } else {
      commonHelpers.response(res, null, config.http_status.bad_request, req.__('user.create.failed'))
    }
  } catch (error) {
    console.log(error);
    commonHelpers.response(res, null, config.http_status.bad_request, req.__('system.error'))
  }
}

/**
 * description: format data created at and updated at
 * created_by: ben
 * created_at: 28/03/2023
 */
const handleData = async (dataUser) => {
  try {
    for(let data of dataUser){
      //handle time
      data.createdAt = moment(data.createdAt).subtract(7, 'hours').format(config.date_format.YYYY_MM_DD_HH_mm_ss)
      data.updatedAt = moment(data.updatedAt).subtract(7, 'hours').format(config.date_format.YYYY_MM_DD_HH_mm_ss)
      data.birthDay = moment(data.birthDay).format(config.date_format.dd_mm_yyyy2)
    }

    return dataUser
  } catch (error) {
    console.log(error);
  }
}

/** 
 * created_by: ben
 * created_at: 28/03/2023
*/
const getListUser = async (req, res) => {
  try {
    //get data search
    let searchObj = {
      name: req.body['name'],
      search: req.body['search'], //phone_number or email
      startDate: req.body['startDate'],
      endDate: req.body['endDate'],
      getAll: req.body['getAll'],
      page: req.body['page'] ? req.body['page'] - 1 : 0,
      size: req.body['size'] ? req.body['size'] : 20,
    }

    //get data
    const count = await userService.findAllUser(searchObj, true)
    res.setHeader('X-Total-Count', count[0].count);
    const dataUser = await userService.findAllUser(searchObj, false)

    if (dataUser && dataUser.length) {
      //handle data
      await handleData(dataUser)

      //return data
      commonHelpers.response(res, dataUser, config.http_status.success, req.__('user.find.success'))
    } else {
      commonHelpers.response(res, [], config.http_status.success, req.__('user.find.success'))
    }
  } catch (error) {
    console.log(error);
    commonHelpers.response(res, null, config.http_status.bad_request, req.__('system.error'))
  }
}

/** 
 * created_by: ben
 * created_at: 28/03/2023
*/
const getDetailUser = async (req, res) => {
  try {
    //get id
    const id = req.params["id"]

    //get data
    const dataUser = await db.db.User.findOne({ where: { id: id }, raw: true })

    if (dataUser) {
      //handle data
      await handleData([dataUser])

      commonHelpers.response(res, dataUser, config.http_status.success, req.__('user.find.success'))
    } else {
      commonHelpers.response(res, null, config.http_status.bad_request, req.__('user.find.failed'))
    }
  } catch (error) {
    console.log(error);
    commonHelpers.response(res, null, config.http_status.bad_request, req.__('system.error'))
  }
}

/** 
 * created_by: ben
 * created_at: 28/03/2023
*/
const updateUser = async (req, res) => {
  try {
    //get data
    const id = req.params["id"]
    let body = req.body
    body.id = id

    //get data
    const userExist = await db.db.User.findOne({ where: { id: id }, raw: true })

    if (userExist) {
      //handle data
      const result = await userService.handleUpdateUser(body)

      if (result) {
        commonHelpers.response(res, config.is_result.success, config.http_status.success, req.__('user.update.success'))
      } else {
        commonHelpers.response(res, config.is_result.failed, config.http_status.bad_request, req.__('user.update.failed'))
      }
    } else {
      commonHelpers.response(res, null, config.http_status.bad_request, req.__('user.find.failed'))
    }
  } catch (error) {
    console.log(error);
  }
}

/** 
 * created_by: ben
 * created_at: 28/03/2023
*/
const deleteUser = async (req, res) => {
  try {
    //get data
    const id = req.params["id"]

    //get data
    const userExist = await db.db.User.findOne({ where: { id: id }, raw: true })

    if (userExist) {
      //handle data
      const result = await db.db.User.destroy({where: {id: id}})

      if (result) {
        commonHelpers.response(res, config.is_result.success, config.http_status.success, req.__('user.delete.success'))
      } else {
        commonHelpers.response(res, config.is_result.failed, config.http_status.bad_request, req.__('user.delete.failed'))
      }
    } else {
      commonHelpers.response(res, null, config.http_status.bad_request, req.__('user.find.failed'))
    }
  } catch (error) {
    console.log(error);
    commonHelpers.response(res, null, config.http_status.bad_request, req.__('system.error'))
  }
}

module.exports = {
  createUser,
  getListUser,
  getDetailUser,
  updateUser,
  deleteUser
}