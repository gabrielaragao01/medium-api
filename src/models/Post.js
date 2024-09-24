import Sequelize, { Model } from "sequelize";

export default class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
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
        modelName: "Post",
        scopes: {
          withUserLike: (id) => ({
            attributes: [
                [
                  sequelize.literal(
                    `CASE WHEN (
                        SELECT 1
                        FROM post_likes
                        WHERE post_likes.post_id = "Post".id
                        AND post_likes.user_id = :user_id
                        AND post_likes.is_deleted is FALSE
                      ) is not null THEN true ELSE false END`
                  ),
                  "is_liked",
                ],
              ],
            replacements: {
              user_id: id
            },
          }),
        },
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.hasMany(models.PostLike, { foreignKey: "post_id", as: "likes" });
  }
}
