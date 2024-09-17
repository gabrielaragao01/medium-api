import { AuthUtils } from "@utils";

export default class AuthMiddleware {
	static isAuthorized(req, res, next) {
		try {
			const routesToSkipAuthorization = [
				{ method: "GET", path: "/posts" },
			];
            console.log(routesToSkipAuthorization)
			const errorResponse = {
				status: "error",
				code: 403,
				message:
					"Session expired. Please log back into the system to gain access.",
			};

			const token = AuthUtils.getBearerToken(req);
			const decodedToken = AuthUtils.decodeData(token);

			if (
				(!decodedToken || !decodedToken.id) &&
				!AuthMiddleware.isRouteToSkipAuthorization(req)
			) {
				res.status(403).json(errorResponse);

				return;
			}

			req.auth = {
				id: decodedToken?.id,
			};

			next();
		} catch (error) {
			console.error(error);
			res.status(403).json({
				status: "error",
				code: 403,
				message:
					"Session expired. Please log back into the system to gain access.",
			});
		}
	}

	static isRouteToSkipAuthorization(req) {
		const routesToSkipAuthorization = [{ method: "GET", path: "/posts" }];

		return routesToSkipAuthorization.some((route) => {
			return (
				req.method === route.method && req.baseUrl.includes(route.path)
			);
		});
	}
}
