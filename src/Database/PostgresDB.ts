import { Options, Sequelize } from "sequelize";

export default class PostgresDB {    
    sequelize: Sequelize;
    constructor(
        database: string,
        username: string,
        password: string,
        options?: Options
    ) {
        this.sequelize = new Sequelize(database, username, password, {
            ...options,
            logging: false,
            dialect: "postgres",
            dialectOptions: {
                useUTC: false,
                dateStrings: true,
                typeCast: true,
            },
            pool: {
                max: 5,
                min: 0,
                idle: 20000,
                acquire: 20000,
            },
        });
    }
    async authenticate() {
        return this.sequelize.authenticate().then(() => {
            console.log(
                "PostgresDB connection has been established successfully."
            );
        });
        // .catch((err) => {
        //     console.log("Unable to connect to the database:", err);
        // });
    }
}