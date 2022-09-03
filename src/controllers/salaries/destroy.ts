import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const destroy = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const salariesRepository = getRepository(Salaries);
  try {
    const salaries = await salariesRepository.findOne({ where: { id } });
    if (!salaries) {
      const customError = new CustomError(404, "General", "Not Found", {
        code: 401,
        message: `Salaries with id:${id} doesn't exists.`,
      });
      return next(customError);
    }
    salariesRepository.delete(id);
    // res.customSuccess(200, 'User successfully deleted.', { id: user.id, name: user.name, email: user.email });
    return res.status(200).json({
      status: 200,
      message: "Salaries successfully deleted.",
      responseData: { id: salaries.id },
    });
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
