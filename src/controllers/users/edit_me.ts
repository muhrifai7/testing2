import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { Profile } from "../../typeorm/entities/profile/Profile";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";
import { upload_file } from "../../utils/helper";
// edit by token for user
// only can change profile user/me
export const edit_me = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.jwtPayload;
  const {
    username,
    nip,
    nik,
    isActive = true,
    roleName,
    basicSalary,
    departmentId,
    dataProfile,
    path = "profile",
  } = req.body;
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
      let base64 = dataProfile?.photo;
      let validation_photo = base64.split("/")[0];
      if (validation_photo != "images") {
        let response_upload_file = await upload_file(username, path, base64);

        if (response_upload_file?.status != 200) {
          const customError = new CustomError(
            404,
            "Unauthorized",
            "Failed upload",
            {
              code: 403,
              message: "Images failed upload",
            }
          );
          return next(customError);
        }
        base64 = response_upload_file?.data;
      }

      await userRepository.update(id, {
        username: username ? username : "",
        nip: nip ? nip : "",
        nik: nik ? nik : "",
        isActive: isActive ? isActive : "",
        role_name: roleName ? roleName : "",
        basicSalary: basicSalary ? basicSalary : "",
        department_id: departmentId ? departmentId : "",
      });

      await profileRepositoy.update(
        { user_id: id },
        {
          placeOfBirth: dataProfile?.placeOfBirth
            ? dataProfile?.placeOfBirth
            : "",
          gender: dataProfile?.gender ? dataProfile?.gender : "MALE",
          religion: dataProfile?.religion ? dataProfile?.religion : "ISLAM",
          academic: dataProfile?.academic ? dataProfile?.academic : "",
          title: dataProfile?.title ? dataProfile?.title : "",
          address: dataProfile?.address ? dataProfile?.address : "",
          city: dataProfile?.city ? dataProfile?.city : "",
          country: dataProfile?.country ? dataProfile?.country : "Indonesia",
          postalCode: dataProfile?.postalCode ? dataProfile?.postalCode : "",
          photo: base64,
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
};
