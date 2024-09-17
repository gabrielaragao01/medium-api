import BaseRoutes from './baseRoutes.js';
import UserController from '../controllers/UserController.js';
// import SchemaValidator from '../utils/SchemaValidator.js';
// import userSchema from '../schema/userSchema.js';

class UserRoutes extends BaseRoutes {
	constructor() {
		super();
		this.userController = new UserController();
	}

	setup() {
		this.router.post('/', this.userController.create);
		this.router.put('/',  this.userController.update);
		this.router.delete('/',  this.userController.delete);

		return this.router;
	}
}
export default UserRoutes;