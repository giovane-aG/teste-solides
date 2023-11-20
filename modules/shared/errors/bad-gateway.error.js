const { HttpStatusCode } = require("axios")

module.exports = class BadGatewayError extends Error {

  constructor(message) {
    super();
    this.message = message
    this.statusCode = HttpStatusCode.BadGateway;
  }
}