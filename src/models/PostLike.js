import Sequelize, { Model } from 'sequelize';

export default class PostLike extends Model {
	static load(sequelize) {
		return super.init({
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			post_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'posts',
					key: 'id'
				}
			},

			is_deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		},
			{
				timestamps: true,
				sequelize,
				modelName: 'post_likes',
				tableName: 'post_likes',
				createdAt: 'created_at',
				updatedAt: 'updated_at',
			});
	}
	
	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
	}
}