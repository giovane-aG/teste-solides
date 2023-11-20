const { HttpStatusCode } = require("axios")


module.exports = class BadRequestError extends Error {

  constructor(message) {
    super();
    this.message = message
    this.statusCode = HttpStatusCode.BadRequest;
  }
}