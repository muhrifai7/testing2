import { Permission } from "../../typeorm/entities/permission/Permission";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Role } from "../../typeorm/entities/roles/Role";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roleRepository = getRepository(Role);
  const permissonRepository = getRepository(Permission);
  const { name, description, canCreate, canRead, canUpdate, canDelete } =
    req.body;
  try {
    if (!name && !description) {
      const customError = new CustomError(
        400,
        "Validation",
        "Invalid Parameter",
        {
          code: 401,
          message: `Error validation`,
        }
      );
      return next(customError);
    }
    const newRole = new Role();
    newRole.name = name;
    newRole.description = description;
    const dataRole = await roleRepository.save(newRole);
    await permissonRepository.save({
      role_id: dataRole.id,
      canCreate: canCreate,
      canRead: canRead,
      canUpdate: canUpdate,
      canDelete: canDelete,
    });
    // return res.customSuccess(200, 'User successfully saved.');
    return res
      .status(200)
      .json({ status: 200, message: "Role successfully created." });
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
