const axios = require('axios');
const BadRequestError = require('../../shared/errors/bad-request.errors');
const BadGatewayError = require('../../shared/errors/bad-gateway.error');

module.exports = class CreateUserGateway {

  gatewayUrl;

  constructor(gatewayUrl) {
    this.gatewayUrl = gatewayUrl;
  }

  async create(user) {
    try {

      const response = await axios.post(`${this.gatewayUrl}/usuarios`, user);

      return {
        message: response.data.message,
        id: response.data._id
      };

    } catch (error) {

      if (error.response.status === axios.HttpStatusCode.BadRequest) {
        throw new BadRequestError(error.message);
      }

      throw new BadGatewayError(error.message);
    }
  }
}
