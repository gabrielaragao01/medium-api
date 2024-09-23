import Sequelize, { Model } from "sequelize";

export default class PostLike extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        post_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "posts",
            key: "id",
          },
        },

        is_deleted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: "post_likes",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Post, { foreignKey: "post_id", as: "post" });
  }
}
