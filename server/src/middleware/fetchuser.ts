import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { merge } from 'lodash';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface UserPayload {
    user: string;
}

const fetchuser = (req: Request, res: Response, next: NextFunction)=>{
    
    const token:any = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Token Validation Error!"})
    }

    try{
    
    const data  = jwt.verify(token, JWT_SECRET) as UserPayload;
    merge(req, {user: data.user});
    
    return next();
    }catch(error){
        res.status(401).send({error: "Token Validation Error!"})
    }
}

export default fetchuser;