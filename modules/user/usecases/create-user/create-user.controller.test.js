const { spec } = require('pactum');
const { beforeEach, afterEach } = require('mocha')
const { Router } = require('express');
const CreateUserController = require('./create-user.controller');
const CreateUserService = require('./create-user.service');

let server;
const router = Router();
const app = require('../../../../app');
app.use('/api', router);


class CreateUserGatewayMock {
  constructor(gatewayUrl) {
    this.gatewayUrl = this.gatewayUrl
  }
  async create() {
    return {
      message: 'Cadastro realizado com sucesso',
      id: 'any_id',
    }
  }
}

new CreateUserController(
  new CreateUserService(new CreateUserGatewayMock),
  router
);

describe('Create User Controller', () => {

  before(() => {
    server = app.listen(3001);

  })

  after(() => {
    server.close()
  })

  it('should create a new user', async () => {
    const response = await spec()
      .post('http://localhost:3001/api/create-user')
      .withBody({
        nome: 'John Doe',
        email: 'johndoe@example.com',
        administrador: 'false',
        password: 'senha',
      })
      .expectJson({
        message: 'Cadastro realizado com sucesso',
        id: 'any_id'
      })
  });

  it('should return an error if there are missing user information', async () => {
    await spec()
      .post('http://localhost:3001/api/create-user')
      .withBody({
        nome: 'John Doe',
        email: 'johndoe@example.com',
        administrador: 'false',
      })
      .expectStatus(400)
      .expectJson({ password: 'O campo password é obrigatório' });
  });
});

