import BaseRoutes from "./baseRoutes.js";
import PostController from "../controllers/PostController.js";
import PostLikeController from "../controllers/PostLikeController.js";

class PostRoutes extends BaseRoutes {
  constructor() {
    super();
    this.postController = new PostController();
    this.postlikeController = new PostLikeController();
  }

  setup() {
    this.router.post("/", this.postController.create);
    this.router.put("/:id", this.postController.update);
    this.router.delete("/:id", this.postController.delete);
    this.router.get("/", this.postController.list);
    this.router.get("/:id", this.postController.listById);
    this.router.post("/:id/like", this.postlikeController.like);

    return this.router;
  }
}
export default PostRoutes;
