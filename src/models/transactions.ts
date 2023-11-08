import { Model, DataTypes } from "sequelize";
import type { AbstractDataTypeConstructor } from "sequelize/types";
import sequelize from "../config/db";

class Transactions extends Model {
  declare id: AbstractDataTypeConstructor;
  declare from: string;
  declare to: string;
  declare amount: number;
  declare description: string;
  declare balance: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Transactions.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    from: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    to: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.00,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "Transactions",
    sequelize,
    timestamps: true,
  }
);
export default Transactions;