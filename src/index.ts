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
import DataSources from "./DataSource/DataSources";
import { SERVER_CONFIG } from "./constants";
import { TypedRequestQuery } from "./Model/TypedRequestQuery";
import { EmployeeMonthlyAttendanceParsedQs } from "./Model/RawAttendance";
import moment from "moment";
import { constructedErrorResponse } from "./Model/Error";
import Services from "./Services/Services";

moment.locale("id");

const startServer = async () => {
    await setUpEnv();

    // init express app
    const app = express();
    app.use(express.json());
    app.use(
        cors<cors.CorsRequest>({
            origin: "*",
            methods: ["GET", "POST"],
        })
    );

    // set up database
    const postgresDB = new PGDB();
    await postgresDB.authenticate();

    // set up middlewares
    const modelDB = new ModelDB(postgresDB);
    const dataSources = new DataSources({ modelDB });
    const services = new Services(dataSources);

    // Routes
    app.get(
        "/download/xls/employeeMonthlyAttendance",
        async (
            req: TypedRequestQuery<EmployeeMonthlyAttendanceParsedQs>,
            res
        ) => {
            try {
                await services.attendanceService.downloadEmployeeMonthlyAttendance(
                    req.query,
                    res
                );
            } catch (error) {
                console.error("Error:", error);
                constructedErrorResponse(error, res);
            }
        }
    );

    // Start the server
    app.listen(SERVER_CONFIG.port, () => {
        console.log(
            `Server is running on http://${SERVER_CONFIG.hostname}:${SERVER_CONFIG.port}`
        );
    });
};

startServer();
