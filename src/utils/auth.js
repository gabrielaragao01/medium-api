import { sign, verify } from 'jsonwebtoken';

import ConfigUtils from './config';

export default class AuthUtils {
	static decodeData(token, key) {
		try {
			return verify(token, key);
		} catch (err) {
            console.log(err)
			return null;
		}
	}

	static getBearerToken(req) {
		const authorization = (req.headers.authorization || '');
		const [, token] = authorization.split(' ');

		return token;
	}

	static generateToken(payload,  { secret = ConfigUtils.get('apiTokenSecretKey'), expiresIn = 86400 } = {}) {
		return sign(payload, secret, { expiresIn });
	}

	static getBasicToken(apiKey, secretKey) {
		return Buffer.from(`${apiKey}:${secretKey}`).toString('base64');
	}
}