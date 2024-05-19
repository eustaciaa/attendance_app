import { Response } from "express";

export class CustomError extends Error {
    type: string;
    code: number;
    constructor(msg: string, type: string, code: number) {
        super(msg);
        this.type = type;
        this.code = code;
    }
}

export class BadRequestError extends CustomError {
    constructor(msg: string) {
        super(msg, "BadRequestError", 400);
    }
}

export class InternalServerError extends CustomError {
    constructor(msg: string) {
        super(msg, "InternalServerError", 500);
    }
}

export function constructedErrorResponse(
    error: CustomError | Error | any,
    res: Response
) {
    if (error instanceof CustomError)
        res.status(error.code).json({
            errMsg: `${error.type}: ${error.message}`,
        });
    else if (error instanceof Error)
        constructedErrorResponse(new InternalServerError(error.message), res);
    else
        constructedErrorResponse(new InternalServerError("An unknown error has occured"), res);
}
