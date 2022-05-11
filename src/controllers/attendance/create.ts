import { Request,Response,NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from '../../utils/response/custom-error/CustomError';
import { Attendance } from './../../typeorm/entities/attendance/Attendance';

export const create = async(req:Request,res:Response,next:NextFunction) => {
    const attendanceRepository = getRepository(Attendance);
    try {
        const attendance = await attendanceRepository.create(req.body);
        await attendanceRepository.save(attendance);
        // return res.customSuccess(200, 'User successfully saved.');
        return res.status(200).json({status: 200,message :"Attendance successfully created." });
    } catch (error) {
        const customeError = new CustomError(400,'Raw','Error',null,error);
        return next(customeError);
    }
}