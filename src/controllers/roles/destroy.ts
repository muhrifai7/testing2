import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Role } from "../../typeorm/entities/roles/Role";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const destroy = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const roleRepository = getRepository(Role);
  try {
    const role = await roleRepository.findOne({ where: { id } });
    if (!role) {
      const customError = new CustomError(404, "General", "Not Found", {
        code: 401,
        message: `role with id:${id} doesn't exists.`,
      });
      return next(customError);
    }
    roleRepository.delete(id);
    return res
      .status(200)
      .json({
        status: 200,
        message: "Role successfully deleted.",
        responseData: { id: role.id, name: role.name },
      });
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
