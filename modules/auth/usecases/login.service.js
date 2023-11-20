
module.exports = class LoginService {

  constructor(loginGateway) {
    this.loginGateway = loginGateway;
  }

  async login(credentials) {
    return this.loginGateway.login(credentials);
  }
}