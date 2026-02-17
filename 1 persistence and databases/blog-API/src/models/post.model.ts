import { Optional, Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import User from "./user.model";

// Full attributes stored in database
interface PostAttributes {
    id: number;
    title: string;
    content: string;
    userId: number;
}

// Attributes required during creation
// id is auto-generated
interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}

// Model class
class Post extends Model<PostAttributes, PostCreationAttributes> 
    implements PostAttributes {
        public id!: number;
        public title!: string;
        public content!: string;
        public userId!: number;
    }

// Initialize model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            },
            onDelete: "CASCADE"
        }
    },
    {
        sequelize,
        tableName: "posts",
        timestamps: true
    }
);

User.hasMany(Post, {foreignKey: "userId"});
Post.belongsTo(User, {foreignKey: "userId"});

export default Post;