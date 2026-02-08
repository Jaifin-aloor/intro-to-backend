import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv"
dotenv.config()

class Database {
    public sequelize: Sequelize | undefined

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;  
    private POSTGRES_PORT = Number(process.env.POSTGRES_PORT); 
    private POSTGRES_USER = process.env.POSTGRES_USER as string;   
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;   

    constructor(){
        this.connectToPostgreSQL();
    }

    private async connectToPostgreSQL(){
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            port: this.POSTGRES_PORT,
            host: this.POSTGRES_HOST,
            dialect: "postgres" 
        });

        await this.sequelize.authenticate().then(() => {
            console.log("postgres connection has been established successfully.")
        }).catch((err) => {
            console.log("unable to connect to postgresql database", err)
        })
    }

    
}

export default Database;