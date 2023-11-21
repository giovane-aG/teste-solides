
const express = require('express');
const app = require('./app');
const { Router } = require('express');
const { BASE_URL } = require('./modules/shared/constants')

const CreateUserController = require('./modules/user/usecases/create-user/create-user.controller');
const CreateUserService = require('./modules/user/usecases/create-user/create-user.service');
const CreateUserGateway = require('./modules/user/gateways/create-user.gateway');

const LoginController = require('./modules/auth/usecases/login/login.controller');
const LoginService = require('./modules/auth/usecases/login/login.service');
const LoginGateway = require('./modules/auth/gateways/login.gateway');

const createUserGateway = new CreateUserGateway(BASE_URL);
const createUserService = new CreateUserService(createUserGateway);

const loginGateway = new LoginGateway(BASE_URL);
const loginService = new LoginService(loginGateway);

const router = Router();

new CreateUserController(
  createUserService,
  router
);

new LoginController(
  loginService,
  router
);

app.use(express.json());
app.use('/api', router)

app.listen(3000, console.log('Running on 3000'));


