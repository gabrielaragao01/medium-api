import BaseController from "./base";
import { PostLikeService } from "../services";

export default class PostLikeController extends BaseController {
  constructor() {
    super();

    this.PostLikeService = new PostLikeService();

    this.bindActions(["like"]);
  }

  async like(req, res) {
    const post_id = req.params.id;
    const user_id = req.auth.id;
    try {
      await this.PostLikeService.like(user_id, post_id);
      this.successHandler(true, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }
}
