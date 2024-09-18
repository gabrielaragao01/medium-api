import AuthController from '../controllers/AuthController'
import BaseRoutes from './baseRoutes';

class AuthRoutes extends BaseRoutes {
	constructor() {
		super();
		this.authController = new AuthController();
	}

	setup() {
		this.router.post('/', this.authController.login);

		return this.router;
	}
}
export default AuthRoutes;

