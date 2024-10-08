require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_USERNAME,
  port: process.env.DATABASE_PORT || 5432,
  secretKey: process.env.TOKEN_SECRET,
  define: {
    timestamps: true,
    underscored: true,
    unrderscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    timezone: "America/Sao_Paulo",
  },
  timezone: "America/Sao_Paulo",
};
