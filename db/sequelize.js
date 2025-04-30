import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Дозволяє підключення через SSL
      },
    },
    logging: console.log, // Вмикає логи SQL-запитів у консолі
  }
);

// Перевірка підключення
try {
  await sequelize.authenticate();

  console.log("\x1b[32m%s\x1b[0m", "✅ Database connection successful");
} catch (err) {
  console.error("\x1b[31m%s\x1b[0m", "❌ Database connection error:", err);
  process.exit(1);
}

// sequelize.sync({ force: true });

export default sequelize;
