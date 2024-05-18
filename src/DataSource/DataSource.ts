import { ModelDB } from "../ModelDB/ModelDB";
import RawAttendanceDataSource from "./RawAttendanceDataSource";

class DataSource {
    RawAttendanceDataSource: RawAttendanceDataSource;

    constructor({ modelDB }: { modelDB: ModelDB }) {
        this.RawAttendanceDataSource = new RawAttendanceDataSource({ modelDB });
    }
}

export default DataSource;
