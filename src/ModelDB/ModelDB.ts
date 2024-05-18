import PostgresDB from "../Database/PostgresDB";
import { RawAttendanceTable } from "./RawAttendanceTable";

export class ModelDB {
    RawAttendanceTable: ReturnType<typeof RawAttendanceTable>;

    constructor(db: PostgresDB) {
        const seq = db.sequelize;
        this.RawAttendanceTable = RawAttendanceTable(seq);
    }
}
