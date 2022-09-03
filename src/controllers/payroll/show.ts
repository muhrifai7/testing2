import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Payroll } from "../../typeorm/entities/payroll/Payroll";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

// get data by id
export const show = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;

  const payrollRepository = getRepository(Payroll);
  try {
    const payroll = await payrollRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!payroll) {
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
    return next(res.status(200).send(customResult(200, "success", payroll)));
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
