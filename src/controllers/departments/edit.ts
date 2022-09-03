import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Department } from "./../../typeorm/entities/department/Department";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const edit = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const departmentRepository = getRepository(Department);
  try {
    const department = await departmentRepository.findOne({ where: { id } });
    if (!department) {
      const customError = new CustomError(
        404,
        "General",
        `User with id:${id} not found.`,
        {
          code: 401,
          message: `User not found`,
        }
      );
      return next(customError);
    }
    const newDate = {
      ...department,
      ...req.body,
    };
    try {
      await departmentRepository.save(newDate);
      // res.customSuccess(200, 'User successfully saved.');
      return next(res.status(200).send(customResult(200, "success")));
    } catch (err) {
      const customError = new CustomError(
        409,
        "Raw",
        `Department '${department.name}' can't be saved.`,
        null,
        err
      );
      return next(customError);
    }
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
