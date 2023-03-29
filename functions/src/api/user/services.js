const config = require('../../config/config')
const db = require('../../config/dbConfig')

/** 
 * created_by: ben
 * created_at: 29/03/2023
*/
const findAllUser = async (searchObj, isCount) => {
  try {
    //get data
    let sql = `SELECT us.name, us.birth_day as birthDay, us.phone_number as phoneNumber, us.email, us.created_at as createdAt, us.created_by as createdBy, us.updated_at as updatedAt, us.updated_by as updatedBy
    FROM users us 
    WHERE true`

    if (searchObj.name) {
      sql += ` and us.name like "%${searchObj.name}%" `;
    }

    if (searchObj.search) {
      sql += ` and (us.phone_number like "%${searchObj.search}%" or us.email like "%${searchObj.search}%") `;
    }

    if (searchObj.startDate && searchObj.endDate) {
      sql += ` and DATE_FORMAT(us.created_at, '%Y-%m-%d') BETWEEN '${searchObj.startDate}' AND '${searchObj.endDate}'`
    } else {
      if (searchObj.startDate) {
        sql += ` and DATE_FORMAT(us.created_at, '%Y-%m-%d') >= '${searchObj.startDate}' `;
      }

      if (searchObj.endDate) {
        sql += ` and DATE_FORMAT(us.created_at, '%Y-%m-%d') <= '${searchObj.endDate}' `;
      }
    }

    //order by
    if (!isCount) {
      sql += ' order by us.updated_at desc, us.name asc ';
    }

    //count or limit
    if (!isCount) {
      if (!searchObj.getAll) {
        sql += ` limit ${searchObj.size} offset ${searchObj.page * searchObj.size}`;
      }
    } else {
      sql = `select count(*) as count from (${sql}) a`;
    }

    //handle sql
    let dataUser = await db.db.sequelize.query(sql, {
      type: db.db.sequelize.QueryTypes.SELECT
    });

    //return data
    return dataUser
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  findAllUser
}