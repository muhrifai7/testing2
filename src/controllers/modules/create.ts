import { TU_USER } from "../../typeorm/entities/users/User";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { CustomError } from "../../utils/response/custom-error/CustomError";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getRepository(TU_USER);
  try {
    const user = await userRepository.create(req.body);
    await userRepository.save(user);
    // return res.customSuccess(200, 'User successfully saved.');
    return res
      .status(200)
      .json({ status: 200, message: "User successfully saved." });
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
