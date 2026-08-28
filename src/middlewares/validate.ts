import { Request, Response, NextFunction} from 'express'
import { ZodSchema } from 'zod'
import AppError from '../utils/appError';

const validate = (schema: ZodSchema) =>{
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if(!result.success){
            const errors = result.error.issues.map((issue) => issue.message)
            throw new AppError('Validation failed',422, errors)
        }

        req.body = result.data

        next()
    }
}

export default validate