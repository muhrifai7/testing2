import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

// get data by id
export const show = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;

  const salariesRepository = getRepository(Salaries);
  try {
    const salaries = await salariesRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!salaries) {
      const customError = new CustomError(
        404,
        "General",
        `Salaries with id:${id} not found.`,
        {
          code: 401,
          message: `Data doesn't exists.`,
        }
      );
      return next(customError);
    }
    // res.customSuccess(200, 'User found', user);
    return next(res.status(200).send(customResult(200, "success", salaries)));
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
