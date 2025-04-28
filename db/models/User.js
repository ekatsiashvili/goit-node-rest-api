import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatarURL: DataTypes.STRING,
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// await User.sync();
// console.log("\x1b[32m%s\x1b[0m", "'User' model was synchronized.");

export default User;
