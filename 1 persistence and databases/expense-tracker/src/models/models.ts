import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
interface ExpenseAttributes {
    id: number;
    amount: number;
    category: string;
    description: string;
    date: Date;
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, "id"> {}

class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> 
    implements ExpenseAttributes {
        public id!: number;
        public amount!: number;
        public category!: string;
        public description!: string;
        public date!: Date;
    }

Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "expense_tracker",
        timestamps: true
    }
)

export default Expense;