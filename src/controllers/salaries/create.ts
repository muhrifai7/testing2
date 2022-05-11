import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const salariesRepository = getRepository(Salaries);
  try {
    let {
      userId,
      created_by,
      basicSalaries,
      overtime,
      professionalAllowance,
      healthAllowance,
      mealAllowance,
      positionalAllowance,
      transportationAllowance,
      operatorAllowance,
      healthSubsidyBpjs,
      taktisAllowance,
      performanceAllowance,
      serviceAllowance,
      bpjsAllowance,
      pphAllowance,
      pphDeduction,
      loanDeduction,
    } = req.body;
    let totalSalaries =
      basicSalaries +
      overtime +
      professionalAllowance +
      healthAllowance +
      mealAllowance +
      positionalAllowance +
      transportationAllowance +
      operatorAllowance +
      healthSubsidyBpjs +
      taktisAllowance +
      performanceAllowance +
      serviceAllowance +
      bpjsAllowance;
    const newData = {
      user_id: userId,
      created_by: created_by ? created_by.toUpperCase() : "ADMIN",
      basicSalaries,
      overtime,
      professionalAllowance,
      healthAllowance,
      mealAllowance,
      positionalAllowance,
      transportationAllowance,
      operatorAllowance,
      healthSubsidyBpjs,
      taktisAllowance,
      performanceAllowance,
      serviceAllowance,
      bpjsAllowance,
      pphDeduction,
      pphAllowance,
      loanDeduction,
      totalSalaries,
    };
    await salariesRepository.save(newData);
    // return res.customSuccess(200, 'User successfully saved.');
    return res
      .status(200)
      .json({ status: 200, message: "Salaries successfully created." });
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
