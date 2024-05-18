export const DBCred = {
    DatabaseName: "",
    DatabaseUsername: "",
    DatabasePassword: "",
    DatabasePort: 5432,
    DatabaseHost: "",
};

const CONFIGURATION = {
    development: {
        ssl: false,
        port: +process.env.SERVER_PORT!,
        hostname: process.env.SERVER_HOST?.trim() || "localhost",
    },
};

export const SERVER_CONFIG = CONFIGURATION.development;