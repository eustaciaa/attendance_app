import { ModelDB } from "../ModelDB/ModelDB";

export default class RawAttendanceDataSource{
    modelDB: ModelDB;

    constructor({ modelDB }: { modelDB: ModelDB }) {        
        this.modelDB = modelDB;
    }

    async getAll(){
        const resp = await this.modelDB.RawAttendanceTable.findAll();
        return resp.map((resp) => resp.get({ plain: true }));
    }
}