"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "users",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          password_hash: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          deleted_at: Sequelize.DATE,
        },
        { transaction: t }
      );
      await queryInterface.createTable(
        "posts",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "users",
              key: "id",
            },
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          content: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          summary: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          total_likes: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          available_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
        },
        { transaction: t }
      );
      await queryInterface.createTable(
        "post_likes",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "posts",
              key: "id",
            },
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "users",
              key: "id",
            },
          },
          is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
        },
        { transaction: t }
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
  down: async (queryInterface) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("post_likes", { transaction: t });
      await queryInterface.dropTable("posts", { transaction: t });
      await queryInterface.dropTable("users", { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
};
