
const express = require('express');
const { Router } = require('express');
const CreateUserController = require('./modules/user/usecases/create-user/create-user.controller');
const CreateUserService = require('./modules/user/usecases/create-user/create-user.service');
const CreateUserGateway = require('./modules/user/gateways/create-user.gateway');

const LoginController = require('./modules/auth/usecases/login.controller');
const LoginService = require('./modules/auth/usecases/login.service');
const LoginGateway = require('./modules/auth/gateways/login.gateway');

const baseUrl = 'https://serverest.dev/';

const app = express();
const router = Router();

app.use(express.json());

const createUserGateway = new CreateUserGateway(baseUrl);
const createUserService = new CreateUserService(createUserGateway);

const loginGateway = new LoginGateway(baseUrl);
const loginService = new LoginService(loginGateway);


new CreateUserController(
  createUserService,
  router
);

new LoginController(
  loginService,
  router
);

app.use('/api', router)

app.listen(3000, console.log('Running on 3000'));


