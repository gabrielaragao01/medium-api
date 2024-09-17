// import { Router } from 'express'
// import homeController from '../controllers/HomeController'

// const router = new Router()

// router.get('/', homeController.index);

// export default router;

import { Router } from 'express';
import SchemaValidator from '../utils/SchemaValidator';

class BaseRoutes {
	constructor() {
		this.router = new Router();
		this.SchemaValidator = SchemaValidator;
	}
}

export default BaseRoutes;
