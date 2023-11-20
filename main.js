
const express = require('express');
const { Router } = require('express');
const CreateUserController = require('./modules/user/usecases/create-user/create-user.controller');
const CreateUserService = require('./modules/user/usecases/create-user/create-user.service');
const CreateUserGateway = require('./modules/user/gateways/create-user.gateway');

const app = express();
app.use(express.json());

const router = Router();

const createUserGateway = new CreateUserGateway('https://serverest.dev/');
const createUserService = new CreateUserService(createUserGateway);

new CreateUserController(
  createUserService,
  router
);

app.use('/api', router)

app.listen(3000, console.log('Running on 3000'));


