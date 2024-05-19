import Ajv, { JSONSchemaType } from "ajv";
import { EmployeeMonthlyAttendanceParsedQs } from "../Model/RawAttendance";

const EmployeeMonthlyAttendanceQSchema: JSONSchemaType<EmployeeMonthlyAttendanceParsedQs> =
{
    type: "object",
    properties: {
        nik: { type: "string" },
        tahun: { type: "string" },
        bulan: { type: "string" },
    },
    required: ["nik", "tahun", "bulan"],
};

export function validateEmployeeMonthlyAttendanceQs(data: EmployeeMonthlyAttendanceParsedQs) {
    const ajv = new Ajv();
    const validate = ajv.compile(EmployeeMonthlyAttendanceQSchema);
    return validate(data);
}
