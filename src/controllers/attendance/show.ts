import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import moment from 'moment';

import { Attendance } from '../../typeorm/entities/attendance/Attendance';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import { customResult } from '../../utils/response/custom-success/customResult';

// sho data by month
export const show = async (req: Request, res: Response|any, next: NextFunction) => {
  const id = req.params.id;
  if(!id){
    const customError = new CustomError(404, 'General', `Attendances not found.`, ['User Id Is Blank']);
    return next(customError);
  }
  // construct date
  const start_date = req.query?.start_date || moment(new Date()).startOf('month').format('YYYY-MM-DD');
  const end_date = req.query?.end_date || moment(new Date()).endOf('month').format('YYYY-MM-DD');
  const attendanceRepository = getRepository(Attendance);
  try {
    const [result]  = await attendanceRepository.createQueryBuilder("user")
    .where('user.created_at >= :after', { after: moment(new Date(start_date as string)).startOf('month').format('YYYY-MM-DD') })
    .andWhere('user.created_at < :before', { before:  moment(new Date(end_date as string)).endOf('month').format('YYYY-MM-DD') })
    .andWhere('user.user_id = :user_id',{user_id : id})
    .getManyAndCount();

    if (!result) {
      const customError = new CustomError(404, 'General', `Attendances not found.`, ['Data not found.']);
      return next(customError);
    }
    // res.customSuccess(200, 'User found', user);
    return next(res.status(200).send((customResult(200,"success",result))));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
