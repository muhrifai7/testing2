import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Role } from '../../typeorm/entities/roles/Role';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import { customResult } from '../../utils/response/custom-success/customResult';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const roleRepository = getRepository(Role);
  try {
    const roles = await roleRepository.find({
      select: ['id', 'name', 'description'],
    });
    return next(res.status(200).send((customResult(200,"success",roles))));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};
