import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Role } from '../../typeorm/entities/roles/Role';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import { customResult } from '../../utils/response/custom-success/customResult';

export const show = async (req: Request, res: Response|any, next: NextFunction) => {
  const id = req.params.id;

  const roleRepository = getRepository(Role);
  try {
    const role = await roleRepository.findOne(id,{
      select : ["id","name","description"],
      relations : ["permission"]
    });
    if (!role) {
      const customError = new CustomError(404, 'General', `role with id:${id} not found.`, ['role not found.']);
      return next(customError);
    }
    // res.customSuccess(200, 'role found', role);
    return next(res.status(200).send((customResult(200,"success",role))));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
