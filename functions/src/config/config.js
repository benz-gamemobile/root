module.exports = {
  db: {
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL,
    host: process.env.HOST_MYSQL,
  },
  http_status: {
    success: 200,
    created: 201,
    not_found: 404,
    bad_request: 400,
    conflict: 409
  },
  date_format: {
    dd_mm_yyyy: 'DD-MM-YYYY',
    dd_mm_yyyy2: 'DD/MM/YYYY',
    yyyy_mm_dd: "YYYY-MM-DD",
    mm_dd_yyyy: "MM/DD/YYYY",
    YYYY_MM_DD_HH_mm_ss: 'YYYY-MM-DD HH:mm:ss',
    YYYY_MM_DD_HH_mm: 'YYYY-MM-DD HH:mm',
    HH_mm_ss: 'HH:mm:ss',
    HH_mm: 'HH:mm'
  },
  is_result: {
    success: 1,
    failed: 0
  }
}
