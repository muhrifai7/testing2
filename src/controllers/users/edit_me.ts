import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { Profile } from "../../typeorm/entities/profile/Profile";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

// edit by token for user
// only can change profile user/me
export const edit_me = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  console.log("dsadasdasd");
  /*
  const { id } = req.jwtPayload;
  const { body } = req;
  const userRepository = getRepository(TU_USER);
  const profileRepositoy = getRepository(Profile);
  try {
    const user = await userRepository
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.profile", "profile")
      .where("user.id = :id", { id })
      .getOne();
    if (!user) {
      const customError = new CustomError(
        404,
        "General",
        `User with id:${id} not found.`,
        {
          code: 404,
          message: "User not found.",
        }
      );
      return next(customError);
    }

    try {
      console.log(body, "bodybody");
      await userRepository.update(id, {
        ...(body.username && { username: body.username }),
        ...(body.nip && !user.nip && { nip: body.nip }),
        ...(body.isActive && { isActive: body.isActive }),
        ...(body.role_name && { role_name: body.roleName }),
        ...(body.basicSalary && { basicSalary: body.basicSalary }),
        ...(body.department && { department_id: body.departmentId }),
      });
      const { dataProfile } = body;
      await profileRepositoy.update(
        { user_id: id },
        {
          ...(dataProfile.placeOfBirth && {
            placeOfBirth: dataProfile?.placeOfBirth,
          }),
          ...(dataProfile.gender && { gender: dataProfile?.gender }),
          ...(dataProfile.religion && { religion: dataProfile?.religion }),
          ...(dataProfile.academic && { academic: dataProfile?.academic }),
          ...(dataProfile.title && { title: dataProfile?.title }),
          ...(dataProfile.address && { address: dataProfile?.address }),
          ...(dataProfile.city && { city: dataProfile?.city }),
          ...(dataProfile.country && { country: dataProfile?.country }),
          ...(dataProfile.postalCode && {
            postalCode: dataProfile?.postalCode,
          }),
          ...(dataProfile.photo && { photo: dataProfile?.photo }),
        }
      );
      return next(
        res.status(200).send(customResult(200, "User successfully updated"))
      );
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
  */
};
