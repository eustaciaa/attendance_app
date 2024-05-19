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

export const DAYS_IN_MONTH = {
    1: 31, // January
    2: 28, // February (common year)
    3: 31, // March
    4: 30, // April
    5: 31, // May
    6: 30, // June
    7: 31, // July
    8: 31, // August
    9: 30, // September
    10: 31, // October
    11: 30, // November
    12: 31, // December
}