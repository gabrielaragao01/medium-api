// class HomeController {
//     index(req, res) {
//         res.json({
//             tudoCerto: true,
//         });
//     }
// }

// export default new HomeController();

import  ExceptionUtils  from '../utils/exception';
import { LoggerUtils } from '../utils/logger';


class BaseController {
	bindActions(actions) {
		actions.forEach(action => this[action] = this[action].bind(this));
	}

	errorHandler(error, req, res) {
		if (process.env.NODE_ENV === 'production') {
			LoggerUtils.log(req, error);
		} else if (process.env.DEBUG) {
			LoggerUtils.error('--- ERROR ---');
			LoggerUtils.error(error.stack);
		}

		if (error instanceof ExceptionUtils) {
			res.status(200).json({
				status: 'error',
				code: error.message,
				data: error.data,
				message: 'Algo de errado ocorreu, por favor, tente novamente.'
			});
			return;
		}

		res.status(500).json({
			status: 'error',
			code: 500,
			message: error.message || 'Algo de errado ocorreu, por favor, tente novamente.'
		});
	}

	successHandler(data, res) {
		if (data && data.error_key) {
			const response = {
				status: 'error',
				message: 'Ops.. algo de errado aconteceu, tente novamente.'
			};

			if (data.error_key === 'NO_RESULTS') {
				response.code = data.error_key;
			}

			return res.status(200).json(response);
		}

		return res.status(200).json({
			status: 'success',
			data: data
		});
	}
}

export default BaseController;
