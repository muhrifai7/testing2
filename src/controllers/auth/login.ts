import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { RoleType } from "../../typeorm/entities/users/userTypes";
import { TU_USER } from "../../typeorm/entities/users/User";
import { JwtPayload } from "../../types/JwtPayload";
import { createJwtToken } from "../../utils/createJwtToken";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const userRepository = getRepository(TU_USER);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      const customError = new CustomError(404, "General", "Not Found", [
        "Email not found",
      ]);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(404, "General", "Not Found", [
        "Incorrect email or password",
      ]);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role_name as RoleType,
      created_at: user.created_at,
    };

    try {
      const accessToken = createJwtToken(jwtPayload);
      // res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
      return res
        .status(200)
        .json({
          status: 200,
          message: "Token successfully created.",
          responseData: { accessToken },
        });
    } catch (err) {
      console.log(err);
      const customError = new CustomError(
        400,
        "Raw",
        "Token can't be created",
        null,
        err
      );
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
