import { Permission } from '../../typeorm/entities/permission/Permission';
import { Request,Response,NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from '../../utils/response/custom-error/CustomError';

export const create = async(req:Request,res:Response,next:NextFunction) => {
    const permissonRepository = getRepository(Permission);
    try {
        const profile = await permissonRepository.create(req.body);
        await permissonRepository.save(profile);
        // return res.customSuccess(200, 'User successfully saved.');
        return res.status(200).json({status: 200,message :"User successfully saved." });
    } catch (error) {
        const customeError = new CustomError(400,'Raw','Error',null,error);
        return next(customeError);
    }
}