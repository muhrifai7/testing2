import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Department } from './../../typeorm/entities/department/Department';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import { customResult } from '../../utils/response/custom-success/customResult';

export const show = async (req: Request, res: Response|any, next: NextFunction) => {
  const id = req.params.id;

  const departmentRepository = getRepository(Department);
  try {
    const department = await departmentRepository.findOne(id, {
      select: ['id', 'name', 'description'],
    });

    if (!department) {
      const customError = new CustomError(404, 'General', `Department with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }
    // res.customSuccess(200, 'User found', user);
    return next(res.status(200).send((customResult(200,"success",department))));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
