import { Request } from "express";
import { ParsedQs } from "qs";

export interface TypedRequestQuery<T extends ParsedQs> extends Request {
    query: T;
}
