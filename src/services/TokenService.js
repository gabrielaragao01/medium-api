import User from '../models/User';


export default class TokenService {
    async login({ email, password }) {
        const user = await User.findOne({
            where: {
                email: email,
                is_deleted: false
            },
        });
        if (!user) {
            throw new Error("NOT_FOUND");
        }
        if (user && !(await user.passwordIsValid(password))) {
            throw new Error('INVALID_PASSWORD');
        }
    }
}
