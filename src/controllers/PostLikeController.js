import BaseController from "./BaseController";
import PostLikeService from "../services/PostlikeService";

export default class PostLikeController extends BaseController {
  constructor() {
    super();

    this.postLikeService = new PostLikeService();

    this.bindActions(["like"]);
  }

  async like(req, res) {
    try {
      const user_id = req.auth.id;
      const postLike = await this.postLikeService.like({
        id: req.params.id,
        user_id: user_id,
      });
      this.successHandler(postLike, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }
}
