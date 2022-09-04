import { TU_USER } from "../../typeorm/entities/users/User";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const edit = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const { username } = req.body;
  const userRepository = getRepository(TU_USER);
  try {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      const customError = new CustomError(
        404,
        "General",
        `User with id:${id} not found.`,
        null
      );
      return next(customError);
    }
    user.username = username;
    try {
      await userRepository.save(user);
      // res.customSuccess(200, 'User successfully saved.');
      return next(res.status(200).send(customResult(200, "success")));
    } catch (err) {
      const customError = new CustomError(
        409,
        "Raw",
        `User '${user.email}' can't be saved.`,
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
