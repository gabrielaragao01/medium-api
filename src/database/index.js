import Sequelize from "sequelize";
import User from "../models/User";
import Post from "../models/Post";
// import PostLike from "../models/PostLike";

const databaseConfig = require("../config/database");

const models = [User, Post];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
