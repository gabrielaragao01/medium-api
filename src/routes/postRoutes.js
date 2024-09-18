import BaseRoutes from './baseRoutes.js';
import PostController from '../controllers/PostController.js';

class PostRoutes extends BaseRoutes {
	constructor() {
		super();
		this.postController = new PostController();
	}

	setup() {
		this.router.post('/', this.postController.create);
		this.router.put('/:id', this.postController.update);
		this.router.delete('/:id', this.postController.delete);
		this.router.get('/', this.postController.list);
		this.router.get('/:id', this.postController.listById);

		return this.router;
	}
}
export default PostRoutes;
