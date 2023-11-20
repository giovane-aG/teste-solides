const BadRequestError = require("../../../shared/errors/bad-request.errors");

module.exports = class CreateUserService {

  createUserGateway

  constructor(createUserGateway) {
    this.createUserGateway = createUserGateway;
  }

  async createUser(user) {

    const requiredUserinfo = [
      'nome',
      'email',
      'password',
      'administrador',
    ];

    const errorResponse = {};

    requiredUserinfo.forEach(info => {
      if (!user[info]) {
        errorResponse[info] = `O campo ${info} é obrigatório`;
      }
    })

    if (Object.keys(errorResponse).length) {
      throw new BadRequestError(errorResponse)
    }

    const mappedUser = {
      nome: user.nome,
      email: user.email,
      password: user.password,
      administrador: user.administrador,
    }

    return this.createUserGateway.create(mappedUser);
  }
}
