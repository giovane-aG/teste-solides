const { spec, expect } = require('pactum');
const { Router } = require('express');
const CreateUserController = require('./create-user.controller');
const CreateUserService = require('./create-user.service');

const app = require('../../../../app');

const router = Router();
app.use('/api', router);
const server = app.listen(3001);

class CreateUserGatewayMock {
  constructor(createUserService) {
    this.createUserService = this.createUserService
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
  }); g

  // it('should return an error when creating a user with an invalid email address', async () => {
  //   await spec()
  //     .post('http://localhost:3000/api/create-user')
  //     .withBody({
  //       name: 'John Doe',
  //       email: 'johndoeemail.com',
  //     })
  //     .expectStatus(400)
  //     .expectJson({ message: 'Invalid email address' });
  // });
});

