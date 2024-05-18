import { DBCred } from "../constants";
import PostgresDB from "./PostgresDB";

class PGDB extends PostgresDB {
    constructor() {
        super(
            DBCred.DatabaseName,
            DBCred.DatabaseUsername,
            DBCred.DatabasePassword,
            {
                host: DBCred.DatabaseHost,
                port: DBCred.DatabasePort,
                dialect: "postgres",
                // schema: "public",
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
                timezone: "+07:00",
            }
        );
    }
}

export default PGDB;
