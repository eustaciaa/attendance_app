import { DBCred } from "../constants";

export const setUpEnv = async () => {
    DBCred.DatabaseName = process.env.DATABASE_NAME as string;
    DBCred.DatabaseUsername = process.env.DATABASE_USERNAME as string;
    DBCred.DatabasePassword = process.env.DATABASE_PASSWORD as string;
    DBCred.DatabasePort = +(process.env.DATABASE_PORT as string);
    DBCred.DatabaseHost = process.env.DATABASE_HOST as string;
}