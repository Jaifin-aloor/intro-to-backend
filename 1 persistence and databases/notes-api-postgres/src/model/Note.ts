import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

    export const NOTE_TABLE_NAME = "note" as string;
    export const NOTE_ID = "id" as string;
    export const NOTE_NAME = "name" as string;
    export const NOTE_DESCRIPTION = "description" as string;

@Table({
    tableName: NOTE_TABLE_NAME
})


export class Note extends Model{

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: NOTE_ID
    })
    declare id: number

    @Column({
        type: DataType.STRING(100),
        field: NOTE_NAME
    })
    name!:string

    @Column({
        type: DataType.STRING(255),
        field: NOTE_DESCRIPTION
    })
    description!:string
}
