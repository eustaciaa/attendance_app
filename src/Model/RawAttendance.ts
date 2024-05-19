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
    const constructedQs: EmployeeMonthlyAttendancedQs = {
        nik: parsedQs.nik,
        bulan: parseInt(parsedQs.bulan),
        tahun: parseInt(parsedQs.tahun),
    };

    if (constructedQs.bulan < 1 && constructedQs.bulan > 12)
        throw new BadRequestError(`Unexpected value of bulan`);
    if (constructedQs.tahun > moment().year())
        throw new BadRequestError(`Unexpected value of tahun`);

    return constructedQs;
}
