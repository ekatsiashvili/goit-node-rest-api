import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js"; // Імпортуємо підключення

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// await Contact.sync();
// console.log("\x1b[32m%s\x1b[0m", "'Contact' model was synchronized.");

export default Contact;
