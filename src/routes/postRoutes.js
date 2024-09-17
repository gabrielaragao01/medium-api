// import { Router } from 'express'
// import postController from '../controllers/PostController'

// const router = new Router()

// router.post('/', postController.create);
// router.get('/', postController.list);
// router.get('/:id', postController.listById);
// router.delete('/', postController.delete);
// router.put('/',  postController.update);

// export default router;

import BaseRoutes from './baseRoutes.js';
import PostController from '../controllers/PostController.js';
// import SchemaValidator from '../utils/SchemaValidator.js';
// import userSchema from '../schema/userSchema.js';

class UserRoutes extends BaseRoutes {
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
export default UserRoutes;