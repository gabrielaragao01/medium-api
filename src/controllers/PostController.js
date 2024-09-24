import PostService from "../services/PostService";
import BaseController from "./BaseController";

export default class PostController extends BaseController {
  constructor() {
    super();

    this.PostService = new PostService();

    this.bindActions(["create", "update", "delete", "list", "listById"]);
  }

  async create(req, res) {
    const user_id = req.auth.id;

    try {
      const post = await this.PostService.create({ ...req.body, user_id });
      this.successHandler(post, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }

  async update(req, res) {
    const authenticatedUser = req.auth.id;

    try {
      const post = await this.PostService.update({
        changes: req.body,
        filter: { id: req.params.id, userId: authenticatedUser },
      });
      this.successHandler(post, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }

  async delete(req, res) {
    const authenticatedUser = req.id;

    try {
      const post = await this.PostService.delete({
        id: req.params.id,
        userId: authenticatedUser,
      });
      this.successHandler(post, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }

  // List all posts
  async list(req, res) {
    const page = req.query.page || 1;
    try {
      const posts = await this.PostService.list({ page });
      this.successHandler(posts, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }

  // List post by ID
  async listById(req, res) {
    try {
        const filter = {
            logged_user_id: req.auth ? req.auth.id : null,
            id: ~~req.params.id
        };
        const post = await this.PostService.listById(filter);
        this.successHandler(post, res);
    } catch (error) {
        this.errorHandler(error, req, res);
    }
}
}
