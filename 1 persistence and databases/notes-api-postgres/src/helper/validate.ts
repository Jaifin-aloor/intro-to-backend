import type { NextFunction, Request, Response } from "express";
import type { ZodType} from "zod";


const validate = (Schema: ZodType) => 
    async (req: Request, res: Response, next: NextFunction) =>
        {
            try{
                await Schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                return next();
            }catch(err: any){
                const error_message = JSON.parse(err.message);
                return res.status(400).json({
                    status: "bad Request!",
                    message: error_message[0].message,
                });
            }
        };

export default validate;