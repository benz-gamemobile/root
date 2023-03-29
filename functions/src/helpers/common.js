/**
 * description: handle response
 * created_by: ben
 * created_at: 28/03/2023
 */
const response = (res, data, status, message) => {
  if (status) {
    res.status(status);
  }
  res.json({
    data: data,
    status: status,
    message: message
  });
}

/**
 * Description: Get username or email for created_by and updated_by
 * Created by: DVBen(29/03/2023)
 * @param {*} req 
 * @returns String 
 */
const getEmailUser = (req) => {
  return req.user.data.email;
}

const audit = (body, req, isUpdate) => {
  if (!isUpdate) {
      body.createdAt = now();
      body.createdBy = getEmailUser(req);
  }
  body.updatedAt = now();
  body.updatedBy = getEmailUser(req);
}

module.exports = {
  response,
  audit
}