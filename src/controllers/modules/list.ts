import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(TU_USER);
  try {
    const users = await userRepository.find({
      select: [
        "id",
        "username",
        "email",
        "role",
        "language",
        "created_at",
        "updated_at",
      ],
    });
    return next(res.status(200).send(customResult(200, "success", users)));
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
