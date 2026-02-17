import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

// Full attributes stored in database
interface UserAttributes {
    id: number;
    name: string;
    email: string;
}

// Attributes required during creation
// id is auto-generated, so optional
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Model class
class User extends Model<UserAttributes, UserCreationAttributes> 
    implements UserAttributes {
        public id!: number;
        public name!: string;
        public email!: string;
    }

// Initialize model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, 
    {
        sequelize,
        tableName: "users",
        timestamps: true
    }
);

export default User;