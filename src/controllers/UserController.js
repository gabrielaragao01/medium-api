import UserService from "../services/UserService";
import BaseController from "./BaseController";

export default class UserController extends BaseController {
  constructor() {
    super();

    this.UserService = new UserService();

    this.bindActions(["create", "update", "delete"]);
  }
  async create(req, res) {
    try {
      const user = await this.UserService.create(req.body);
      this.successHandler(user, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }
  async update(req, res) {
    const authenticatedUser = req.auth.id;

    try {
      const user = await this.UserService.update(req.body, authenticatedUser);
      this.successHandler(user, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }
  async delete(req, res) {
    const authenticatedUser = req.auth.id;

    try {
      const user = await this.UserService.delete(authenticatedUser);
      this.successHandler(user, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }
}
