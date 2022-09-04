import { TU_USER } from "../../typeorm/entities/users/User";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { CustomError } from "../../utils/response/custom-error/CustomError";

export const destroy = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const userRepository = getRepository(TU_USER);
  try {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      const customError = new CustomError(
        409,
        "Raw",
        `User '${id}' not found.`,
        null
      );
      return next(customError);
    }
    userRepository.delete(id);
    // res.customSuccess(200, 'User successfully deleted.', { id: user.id, name: user.name, email: user.email });
    return res.status(200).json({
      status: 200,
      message: "User successfully deleted.",
      responseData: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
