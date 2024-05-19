import { ModelDB } from "../ModelDB/ModelDB";
import RawAttendanceDataSource from "./RawAttendanceDataSource";

class DataSources {
    rawAttendanceDataSource: RawAttendanceDataSource;

    constructor({ modelDB }: { modelDB: ModelDB }) {
        this.rawAttendanceDataSource = new RawAttendanceDataSource({ modelDB });
    }
}

export default DataSources;
