const { HttpStatusCode } = require("axios")


module.exports = class UnauthorizedError extends Error {

  constructor(message) {
    super();
    this.message = message
    this.statusCode = HttpStatusCode.Unauthorized;
  }
}