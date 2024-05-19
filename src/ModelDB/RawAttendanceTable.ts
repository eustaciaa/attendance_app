import { DataTypes, Model, Sequelize } from "sequelize";
import { RawAttendance } from "../Model/RawAttendance";

export function RawAttendanceTable(seq: Sequelize) {
    const model = seq.define<Model<RawAttendance, Partial<RawAttendance>>>(
        "RawAttendance",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nik: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: "tmp_raw_attendance",
            timestamps: false,
        }
    );

    return model;
}
