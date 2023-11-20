
module.exports = class LoginController {
  constructor(loginService, router) {
    this.loginService = loginService;

    router.post('/login', async (request, response) => {
      try {
        const body = request.body;
        const result = await this.login(body);

        response.status(200).json(result);
      } catch (error) {
        response.status(error.statusCode).json(error.message);
      }
    });
  }

  async login(credentials) {
    return this.loginService.login(credentials);
  }
}