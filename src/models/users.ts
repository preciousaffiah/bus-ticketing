import { Model, DataTypes, } from "sequelize";
import type { AbstractDataTypeConstructor } from "sequelize/types";
import sequelize from "../config/db";

class Users extends Model {
  declare id: AbstractDataTypeConstructor;
  declare fullname: string;
  declare email: string;
  declare mobile: string;
  declare password: string;
  declare readonly createdAt: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
  },
  {
    tableName: "Users",
    sequelize,
    timestamps: true,
  }
);

export default Users;