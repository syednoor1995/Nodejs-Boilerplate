/**
 * Response Handler to send response in case of request success
 * Using this handler ensures that system has consistent response pattern
 * @param {object} res express response object
 * @param {object} data response data for request
 * @param {any} token token send in header
 */
module.exports = (res, data, token) => {
  res.header("x-auth", token).json({
    data,
  });
};
