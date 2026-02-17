import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";
import Post from "./post.model";

// Full attributes stored in database
interface CommentAttributes {
    id: number;
    content: string;
    postId: number;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes>
    implements CommentAttributes {
        public id!: number;
        public content!: string;
        public postId!: number;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Post,
                key: "id"
            },
            onDelete: "CASCADE"
        }
    },
    {
        sequelize,
        tableName: "comments",
        timestamps: true
    }
);

// Define relationship
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

export default Comment;