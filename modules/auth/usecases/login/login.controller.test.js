const { before, after, afterEach } = require('mocha')
const sandbox = require('sinon').createSandbox()
const sinon = require('sinon');
const { Router } = require('express');
const { spec } = require('pactum')
const LoginController = require('./login.controller');
const LoginService = require('./login.service');

let server;
const router = Router();
const app = require('../../../../app');
const UnauthorizedError = require('../../../shared/errors/unauthorized.error');
const BadRequestError = require('../../../shared/errors/bad-request.errors');
app.use('/api', router);

class LoginGatewayMock {
  constructor(gatewayUrl) {
    this.gatewayUrl = this.gatewayUrl
  }
  async login() {
    return {
      message: "Login realizado com sucesso",
      authorization: "any_token"
    }
  }
}

loginGatewayMock = new LoginGatewayMock();

new LoginController(
  new LoginService(loginGatewayMock),
  router
);

describe('Login API Tests', () => {
  before(() => {
    server = app.listen(3001);
  });

  afterEach(() => {
    sandbox.restore()
  })
  after(() => {
    server.close();
  });

  it('should successfully log in a valid user', async () => {
    await spec()
      .post('http://localhost:3001/api/login')
      .withBody({
        email: 'valid@example.com',
        password: 'validpassword'
      })
      .expectStatus(200)
      .expectJson({
        message: 'Login realizado com sucesso',
        authorization: 'any_token'
      });
  });

  it('should fail to log in with invalid credentials', async () => {

    sandbox.stub(loginGatewayMock, 'login')
      .throws(() => {
        throw new UnauthorizedError({ message: "Email e/ou senha inválidos" });
      });

    await spec()
      .post('http://localhost:3001/api/login')
      .withBody({
        email: 'invalid@example.com',
        password: 'invalidpassword'
      })
      .expectStatus(401)
      .expectJson({ "message": "Email e/ou senha inválidos" });
  });

  it('should fail to log in with missing credentials', async () => {

    sandbox.stub(loginGatewayMock, 'login')
      .throws(() => {
        throw new BadRequestError({ message: "Email e/ou senha inválidos" });
      });

    await spec()
      .post('http://localhost:3001/api/login')
      .withBody({
        email: 'valid@example.com'
      })
      .expectStatus(400)
      .expectJson({ "message": "Email e/ou senha inválidos" });
  });
});
