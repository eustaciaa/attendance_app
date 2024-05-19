import { BadRequestError } from "./Error";
import moment from "moment";

export type RawAttendance = {
    id: number;
    nik: string;
    date: string;
};

export interface EmployeeMonthlyAttendancedQs {
    nik: string;
    bulan: number;
    tahun: number;
}

export type EmployeeMonthlyAttendanceParsedQs = {
    [K in keyof EmployeeMonthlyAttendancedQs]: string;
};

export function constructEmployeeMonthlyAttendanceQs(
    parsedQs: EmployeeMonthlyAttendanceParsedQs
): EmployeeMonthlyAttendancedQs {
    const bulan = parseInt(parsedQs.bulan);
    const tahun = parseInt(parsedQs.tahun);

    const dateParamMoment = moment(`${tahun}-${bulan}`, "YYYY-M", true);
    if (
        !dateParamMoment.isValid() ||
        dateParamMoment.isAfter(moment(), "month")
    )
        throw new BadRequestError(`Unexpected value of bulan or tahun`);

    const constructedQs: EmployeeMonthlyAttendancedQs = {
        nik: parsedQs.nik,
        bulan: bulan,
        tahun: tahun,
    };

    return constructedQs;
}

export interface Attendance {
    day: number;
    earliest_time: number;
    latest_time: number;
}
