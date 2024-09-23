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
      const response = await this.postLikeService.like({
        ...req.filter,
        user_id: req.userId,
      });
      this.successHandler(response, res);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }
}
