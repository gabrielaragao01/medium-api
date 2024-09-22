import Sequelize, { Model } from "sequelize";

export default class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.TEXT,
          defaultValue: "",
        },
        content: {
          type: Sequelize.TEXT("long"),
          defaultValue: "",
        },
        summary: {
          type: Sequelize.TEXT,
          defaultValue: "",
        },
        total_likes: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        available_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        is_deleted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "Post", // Added modelName for clarity
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" }); // Added alias for clarity
  }
}
