import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) { user.password_hash = await bcryptjs.hash(user.password, 8); }
  });
    return this;
  }
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
