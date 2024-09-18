import User from '../models/User';
import AuthUtils from '../utils/auth';


export default class TokenService {
    async login({ email, password }) {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new Error("NOT_FOUND");
        }
        if (user && !(await user.passwordIsValid(password))) {
            throw new Error('INVALID_PASSWORD');
        }

        const token = AuthUtils.generateToken({ id: user.id })

        return {
            user,
            token
        }
    }
}
