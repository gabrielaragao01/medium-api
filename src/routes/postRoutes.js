import BaseRoutes from "./baseRoutes.js";
import PostController from "../controllers/PostController.js";
import PostLikeController from "../controllers/PostlikeController.js";
import SchemaValidator from "../utils/SchemaValidator.js";
import PostSchema from "../schemas/postSchema.js";
import postlikeSchema from "../schemas/postlikeSchema.js";

class PostRoutes extends BaseRoutes {
  constructor() {
    super();
    this.postController = new PostController();
    this.postlikeController = new PostLikeController();
  }

  setup() {
    this.router.post("/", SchemaValidator.validate(PostSchema.create), this.postController.create);
    this.router.put("/:id", SchemaValidator.validate(PostSchema.update), this.postController.update);
    this.router.delete("/:id", SchemaValidator.validate(PostSchema.delete), this.postController.delete);
    this.router.get("/", SchemaValidator.validate(PostSchema.list), this.postController.list);
    this.router.get("/:id", this.postController.listById);
    this.router.post("/:id/like", SchemaValidator.validate(postlikeSchema.like), this.postlikeController.like);
    this.router.post("/:id/dislike", SchemaValidator.validate(postlikeSchema.dislike), this.postlikeController.dislike);

    return this.router;
  }
}
export default PostRoutes;
