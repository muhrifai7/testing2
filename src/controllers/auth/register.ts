import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { Profile } from "../../typeorm/entities/profile/Profile";
import { Role } from "../../typeorm/entities/roles/Role";
import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { CustomError } from "../../utils/response/custom-error/CustomError";

// endpoint ini digunakan untuk proses register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getRepository(TU_USER);
  const profileRepository = getRepository(Profile);
  const roleRepository = getRepository(Role);
  const salariesRepository = getRepository(Salaries);

  const {
    email,
    password,
    role_name = "STAFF",
    departmentId,
    name,
    nip,
  } = req.body;
  try {
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      const customError = new CustomError(
        400,
        "General",
        "User already exists",
        {
          code: 401,
          message: `${user.email} already exists`,
        }
      );
      return next(customError);
    }

    const role = await roleRepository.findOne({ where: { name: role_name } });
    if (!role) {
      const customError = new CustomError(
        400,
        "General",
        "Role does not exists",
        {
          code: 404,
          message: `Role does not exists`,
        }
      );
      return next(customError);
    }

    try {
      const newUser = new TU_USER();
      newUser.email = email;
      newUser.role_id = role.id;
      newUser.role_name = role_name;
      newUser.password = password;
      newUser.department_id = departmentId;
      newUser.username = name;
      newUser.nip = nip;
      newUser.hashPassword();
      const dataUser = await userRepository.save(newUser);
      await profileRepository.save({
        user_id: dataUser.id,
      });

      await salariesRepository.save({
        user_id: dataUser.id,
      });

      // res.customSuccess(200, 'User successfully created.');
      return res
        .status(200)
        .json({ status: 200, message: "User successfully created." });
    } catch (err) {
      const customError = new CustomError(
        400,
        "Raw",
        `User '${email}' can't be created`,
        {
          code: 404,
          message: `user can't be created`,
        },
        err
      );
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
