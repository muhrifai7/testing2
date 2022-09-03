import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Department } from "../../typeorm/entities/department/Department";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { limit = 10, page = 1, keyword = "" } = req.query;
  const offset = ((limit as number) * ((page as number) - 1)) as number;
  const departmentRepository = getRepository(Department);
  try {
    const [result, count] = await departmentRepository
      .createQueryBuilder("department")
      .offset(offset)
      .limit(limit as number)
      .orderBy("department.name", "ASC")
      .getManyAndCount();
    if (!result) {
      const customError = new CustomError(
        404,
        "General",
        `Attendances not found.`,
        {
          code: 401,
          message: `Data doesn't exists.`,
        }
      );
      return next(customError);
    }
    const response = {
      total_data: count,
      page,
      keyword,
      data: result,
    };
    // res.customSuccess(200, 'User found', user);
    return next(res.status(200).send(customResult(200, "success", response)));
  } catch (err) {
    const customError = new CustomError(
      400,
      "Raw",
      `Can't retrieve list of users.`,
      null,
      err
    );
    return next(customError);
  }
};
