import bcrypt from "bcrypt";
import User from "../models/User";

export default class UserService {
    async create(user) {
		const transaction = await User.sequelize.transaction();

		try {
			const userCreated = await User.create(user, { transaction });

			await transaction.commit();

			return userCreated;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

    async update({ changes, filter }) {
		const transaction = await User.sequelize.transaction();

		try {
			if (changes.password) {
				changes.password = await bcrypt.hash(changes.password, 8);
			}

			const userUpdated = await User.update(changes, {
				where: filter,
				transaction,
				returning: true,
			});

			await transaction.commit();

			return userUpdated[1][0];
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

    async delete(filter) {
		const transaction = await User.sequelize.transaction();

		try {
			const userDeleted = await User.destroy({
				where: filter,
				transaction,
			});

			await transaction.commit();

			return userDeleted;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

}

