import sequelize from "sequelize";
import { ModelDB } from "../ModelDB/ModelDB";
import { Op } from "sequelize";
import { EmployeeMonthlyAttendancedQs } from "../Model/RawAttendance";

export default class RawAttendanceDataSource {
    modelDB: ModelDB;

    constructor({ modelDB }: { modelDB: ModelDB }) {
        this.modelDB = modelDB;
    }

    async getAll() {
        const resp = await this.modelDB.RawAttendanceTable.findAll();
        return resp.map((resp) => resp.get({ plain: true }));
    }

    async getEmployeeMonthlyAttendance(qParams: EmployeeMonthlyAttendancedQs) {
        const attendances = await this.modelDB.RawAttendanceTable.findAll({
            attributes: [
                [sequelize.fn("date", sequelize.col("date")), "date"],
                [sequelize.fn("MIN", sequelize.col("date")), "earliest_time"],
                [sequelize.fn("MAX", sequelize.col("date")), "latest_time"],
            ],
            where: {
                [Op.and]: [
                    { nik: qParams.nik },
                    sequelize.where(
                        sequelize.fn("EXTRACT", "YEAR", sequelize.col("date")),
                        qParams.tahun
                    ),
                    sequelize.where(
                        sequelize.fn("EXTRACT", "MONTH", sequelize.col("date")),
                        qParams.bulan
                    ),
                ],
            },
            group: ["nik", sequelize.fn("date", sequelize.col("date"))],
        });
        console.log("🚀 ~ RawAttendanceDataSource ~ attendances:", attendances)
    }
}
