import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const edit = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const salariesRepository = getRepository(Salaries);
  try {
    const salaries = await salariesRepository.findOne({ where: { id } });
    if (!salaries) {
      const customError = new CustomError(
        404,
        "General",
        `User with id:${id} not found.`,
        ["User not found."]
      );
      return next(customError);
    }
    const newDate = {
      ...salaries,
      ...req.body,
    };
    try {
      await salariesRepository.save(newDate);
      // res.customSuccess(200, 'User successfully saved.');
      return next(res.status(200).send(customResult(200, "success")));
    } catch (err) {
      const customError = new CustomError(
        409,
        "Raw",
        `salaries '${salaries.basicSalaries}' can't be saved.`,
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
