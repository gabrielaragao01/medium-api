import BaseController from './BaseController';
import TokenService from '../services/AuthService'

export default class AuthController extends BaseController {
  constructor() {
    super();

    this.TokenService = new TokenService();

    this.bindActions([
        "login",
    ]);
  }
  async login(req, res) {
    try {
        const userAuthenticated = await this.TokenService.login(req.body);
        this.successHandler(userAuthenticated, res)
    } catch (error) {
        this.errorHandler(error, req, res);
    }
}
}
