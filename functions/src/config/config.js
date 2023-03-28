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