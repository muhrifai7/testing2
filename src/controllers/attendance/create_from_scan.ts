import { Request,Response,NextFunction } from 'express';
import { getRepository,IsNull, Not,getManager} from 'typeorm';
import moment from 'moment';

import { CustomError } from '../../utils/response/custom-error/CustomError';
import { Attendance } from './../../typeorm/entities/attendance/Attendance';

export const create_from_scan = async(req:Request,res:Response,next:NextFunction) => {
    const attendanceRepository = getRepository(Attendance);
    const { email,id } = req?.query;
    if(!email && !id){
        const customeError = new CustomError(400,'Raw','Error',null,"Undefined Token");
        return next(customeError);
    }
    try {
        const attendance_entry = await attendanceRepository
        .findOne({where : {
            created_by : email,
            created_at : moment(new Date()).format("YYYY-MM-DD")
        }})
        // absent in
        if(!attendance_entry){
            try {
                const newData = new Attendance();
                newData.timeOfEntry = moment(new Date()).format("YYYY-MM-DD hh-mm-ss");
                newData.created_by = email as string;
                newData.user_id = id as string;
                const data_attendance = attendanceRepository.create(newData);
                await attendanceRepository.save(data_attendance);
                return res.status(200).json({status: 200,message :"Attendance is successfully created." });
            } catch (error) {
                const customeError = new CustomError(400,'Raw','Error',null,error);
                return next(customeError);
            }
        }
        const attendance_out = await attendanceRepository
        .findOne({where : {
            created_by : email,
            created_at : moment(new Date()).format("YYYY-MM-DD"),
            timeOfEntry : Not(IsNull())
        }})
        if(attendance_out){
            try {
                attendance_out.updated_by = email as string
                attendance_out.timeOfOut = moment(new Date()).format("YYYY-MM-DD hh-mm-ss");
                await attendanceRepository.save(attendance_out)
                return res.status(200).json({status: 200,message :"Attendance out successfully created." });
            } catch (error) {
                const customeError = new CustomError(400,'Raw','Error',null,error);
                return next(customeError);
            }
        }
        const customeError = new CustomError(400,'Raw','Error',null,"Attendance out unsuccessfully created");
        return next(customeError);
    } catch (error) {
        const customeError = new CustomError(400,'Raw','Error',null,error);
        return next(customeError);
    }
}