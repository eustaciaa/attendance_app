import { Response } from "express";
import DataSources from "../DataSource/DataSources";
import { BadRequestError } from "../Model/Error";
import {
    Attendance,
    EmployeeMonthlyAttendanceParsedQs,
    constructEmployeeMonthlyAttendanceQs,
} from "../Model/RawAttendance";
import { validateEmployeeMonthlyAttendanceQs } from "../Schema/RawAttendanceSchema";
import ExcelJS from "exceljs";
import { getDaysInFebruary } from "../Utils/helpers";
import { DAYS_IN_MONTH } from "../constants";
import moment from "moment";

interface AttendanceLog {
    tanggal: string;
    jamMasuk: string;
    jamKeluar: string;
}
interface EmployeeMonthlyAttendanceSheetData {
    nik: string;
    masuk: string;
    absen: string;
    attendancesLog: AttendanceLog[];
}

export default class AttendanceService {
    private dataSources: DataSources;

    constructor({ dataSources }: { dataSources: DataSources }) {
        this.dataSources = dataSources;
    }

    constructEmployeeMonthlyAttendanceSheetData(
        attendances: Attendance[],
        nik: string,
        year: number,
        month: number
    ): EmployeeMonthlyAttendanceSheetData {
        const presencesCount = attendances.length;
        const daysInMonth =
            month == 2 ? getDaysInFebruary(year) : DAYS_IN_MONTH[month];
        const absencesCount = daysInMonth - presencesCount;

        let attendanceLog: AttendanceLog[] = [];
        for (let day = 0; day < daysInMonth; day++) {
            attendanceLog[day] = {
                tanggal: moment({
                    year,
                    month: month - 1,
                    day: day + 1,
                }).format("DD MMM YY"),
                jamMasuk: "-",
                jamKeluar: "-",
            };
        }
        for (let presenceLog of attendances) {
            attendanceLog[presenceLog.day - 1].jamMasuk = moment(
                presenceLog.earliest_time
            ).format("HH.mm.ss");
            attendanceLog[presenceLog.day - 1].jamKeluar = moment(
                presenceLog.latest_time
            ).format("HH.mm.ss");
        }

        return {
            nik: nik,
            masuk: presencesCount.toString(),
            absen: absencesCount.toString(),
            attendancesLog: attendanceLog,
        };
    }

    async downloadEmployeeMonthlyAttendance(
        parsedQs: EmployeeMonthlyAttendanceParsedQs,
        res: Response
    ) {
        if (!validateEmployeeMonthlyAttendanceQs(parsedQs))
            throw new BadRequestError("Invalid request");

        const queryParams = constructEmployeeMonthlyAttendanceQs(parsedQs);

        const attendances =
            await this.dataSources.rawAttendanceDataSource.getEmployeeMonthlyAttendance(
                queryParams
            );

        const sheetData = this.constructEmployeeMonthlyAttendanceSheetData(
            attendances,
            queryParams.nik,
            queryParams.tahun,
            queryParams.bulan
        );

        // generate excel file
        const book = new ExcelJS.Workbook();
        const sheet = book.addWorksheet("Employee Monthly Attendance");

        // input sheet data
        sheet.addRow(["NIK", sheetData.nik]);
        sheet.addRow(["Masuk", sheetData.masuk]);
        sheet.addRow(["Absen", sheetData.absen]);
        sheet.addRow([]);
        sheet.addRow(["Tanggal", "Jam Masuk", "Jam Keluar"]);
        for (let log of sheetData.attendancesLog) {
            sheet.addRow([log.tanggal, log.jamMasuk, log.jamKeluar]);
        }

        // Set content type and disposition including filename
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        const FILE_NAME = `${queryParams.nik}_${queryParams.bulan}_${queryParams.tahun}_attendance`;
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + `${FILE_NAME}.xlsx`
        );

        // Send the workbook as a buffer
        book.xlsx.write(res).then(function () {
            res.end();
        });
    }
}
