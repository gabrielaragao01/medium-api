import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: ''
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      console.log(user, 'USER');
      if (user.password) { user.password_hash = await bcryptjs.hash(user.password, 8); }
  });
    return this;
  }
  passwordIsValid(password) {
    console.log(password, this.password_hash);
    return bcryptjs.compareSync(password, this.password_hash);
  }
}
