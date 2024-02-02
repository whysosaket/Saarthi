import { Request } from "express";

interface CustomRequest extends Request {
    user: {
        id: string;
    }
}

export default CustomRequest;