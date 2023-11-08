import { Model, DataTypes } from "sequelize";
import type { AbstractDataTypeConstructor } from "sequelize/types";
import sequelize from "../config/db";

class TicketAccounts extends Model {
  declare id: AbstractDataTypeConstructor;
  declare userId: string;
  declare balance: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

TicketAccounts.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: 'Users',
          key: 'id',
      }
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
    tableName: "TicketAccounts",
    sequelize,
    timestamps: true,
  }
);
export default TicketAccounts;