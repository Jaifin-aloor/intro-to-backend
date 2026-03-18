import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";


interface NoteAttributes {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, "id"> {}

class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE"
        }
    },
    {
        sequelize,
        modelName: "Note",
        tableName: "notes",
        timestamps: true
    }
);

Note.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

export default Note;

