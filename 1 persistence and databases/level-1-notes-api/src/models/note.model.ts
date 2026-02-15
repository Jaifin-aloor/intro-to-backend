import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

// Define Attributes
interface NoteAttributes {
    id: number;
    title: string;
    content: string;
}

interface NoteCreationAttributes extends Optional<NoteAttributes,"id" > {}

class Note extends Model<NoteAttributes, NoteCreationAttributes>
    implements NoteAttributes {
        public id!: number;
        public title!: string;
        public content!: string;
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
        }
    }, 
    {
        sequelize,
        tableName: "notes",
        timestamps: true
    }
);

export default Note;