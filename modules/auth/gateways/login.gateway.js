const { default: axios } = require("axios");
const BadRequestError = require("../../shared/errors/bad-request.errors");

module.exports = class LoginGateway {
  constructor(gatewayUrl) {
    this.gatewayUrl = gatewayUrl;
  }

  async login(credentials) {
    try {
      const response = await axios.post(`${this.gatewayUrl}/login`, credentials);
      return {
        message: response.data.message,
        authorization: response.data.authorization,
      };
    } catch (error) {
      if (error.response.status === axios.HttpStatusCode.BadRequest) {
        throw new BadRequestError(error.response.data);
      }
    }
  }
}