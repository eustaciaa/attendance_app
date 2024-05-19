import DataSources from "../DataSource/DataSources";
import AttendanceService from "./AttendanceService";

export default class Services {
    attendanceService: AttendanceService;

    constructor(dataSources: DataSources) {
        this.attendanceService = new AttendanceService({ dataSources });
    }
}
