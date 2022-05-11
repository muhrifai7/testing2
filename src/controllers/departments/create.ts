import { Request,Response,NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Department } from './../../typeorm/entities/department/Department';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const create = async(req:Request,res:Response,next:NextFunction) => {
    const departmentRepository = getRepository(Department);
    try {
        const department = await departmentRepository.create(req.body);
        await departmentRepository.save(department);
        // return res.customSuccess(200, 'User successfully saved.');
        return res.status(200).json({status: 200,message :"Department successfully created." });
    } catch (error) {
        const customeError = new CustomError(400,'Raw','Error',null,error);
        return next(customeError);
    }
}