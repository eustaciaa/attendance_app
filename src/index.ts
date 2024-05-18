import * as dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
    console.error(result.error);
} else {
    console.log(".env file loaded successfully");
}

import { setUpEnv } from "./Utils/envGenerator";
import express from "express";
import cors from "cors";
import PGDB from "./Database/PGDB";
import { ModelDB } from "./ModelDB/ModelDB";
import DataSource from "./DataSource/DataSource";
import { SERVER_CONFIG } from "./constants";

const startServer = async () => {
    await setUpEnv();

    // Init express app
    const app = express();
    app.use(express.json());
    app.use(
        cors<cors.CorsRequest>({
            origin: "*",
            methods: ["GET", "POST"],
        })
    );

    // Set up database
    const postgresDB = new PGDB();
    await postgresDB.authenticate();
    const modelDB = new ModelDB(postgresDB);
    const dataSource = new DataSource({ modelDB });

    // Routes
    app.get("/getEmployeeMonthlyAttendance", async (req, res) => {
        try {
            const allData = await dataSource.RawAttendanceDataSource.getAll();
            console.log("🚀 ~ app.get ~ allData:", allData);
            res.json(allData);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    // Start the server
    app.listen(SERVER_CONFIG.port, () => {
        console.log(
            `Server is running on http://${SERVER_CONFIG.hostname}:${SERVER_CONFIG.port}`
        );
    });
};

startServer();
