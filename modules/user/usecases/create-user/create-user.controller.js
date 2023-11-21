
module.exports = class CreateUserController {
  createUserService

  constructor(createUserService, router) {
    this.createUserService = createUserService;

    router.post('/create-user', async (request, response) => {
      try {
        const body = request.body;
        const result = await this.create(body);

        response.status(200).json(result);
      } catch (error) {
        response.status(error.statusCode).json(error.message);
      }
    })

  }

  async create(user) {
    return this.createUserService.createUser(user)
  }
}