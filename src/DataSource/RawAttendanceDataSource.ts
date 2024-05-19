import sequelize from "sequelize";
import { ModelDB } from "../ModelDB/ModelDB";
import { Op } from "sequelize";
import { Attendance, EmployeeMonthlyAttendancedQs } from "../Model/RawAttendance";

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
        /*  raw query
            SELECT
                date(tra."date") as "date",
                MIN("date") AS earliest_time,
                MAX("date") AS latest_time
            FROM
                tmp_raw_attendance tra
            WHERE
                nik = :nik
                AND date_part('year', "date") = :tahun
                AND date_part('month', "date") = :bulan
            GROUP by
                tra.nik, 
                DATE("date");
         */
        const resp = await this.modelDB.RawAttendanceTable.findAll({
            attributes: [
                [
                    sequelize.fn("DATE_PART", "day", sequelize.col("date")),
                    "day",
                ],
                [sequelize.fn("MIN", sequelize.col("date")), "earliest_time"],
                [sequelize.fn("MAX", sequelize.col("date")), "latest_time"],
            ],
            where: {
                [Op.and]: [
                    { nik: qParams.nik },
                    sequelize.where(
                        sequelize.fn(
                            "DATE_PART",
                            "year",
                            sequelize.col("date")
                        ),
                        qParams.tahun
                    ),
                    sequelize.where(
                        sequelize.fn(
                            "DATE_PART",
                            "month",
                            sequelize.col("date")
                        ),
                        qParams.bulan
                    ),
                ],
            },
            group: [
                "nik",
                sequelize.fn("DATE_PART", "day", sequelize.col("date")),
            ],
        });
        return resp.map((resp) => resp.get({ plain: true })) as any[] as Attendance[];
    }
}
