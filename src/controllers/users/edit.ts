import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { Profile } from "../../typeorm/entities/profile/Profile";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";
import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { Role } from "../../typeorm/entities/roles/Role";
import { upload_file } from "../../utils/helper";
import { exit } from "process";
// edit by id
export const edit = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  let { id } = req.params;
  let {
    username,
    nik,
    roleName,
    isActive,
    accountNumber,
    basicSalary,
    departmentId,
    profile,
    salaries,
    path = "profile",
  } = req.body;
  let {
    placeOfBirth,
    dateOfBirth,
    gender,
    religion,
    academic,
    title,
    address,
    city,
    country,
    postalCode,
    photo,
  } = profile;
  const userRepository = getRepository(TU_USER);
  const profileRepositoy = getRepository(Profile);
  const salariesRepository = getRepository(Salaries);
  const roleRepository = getRepository(Role);
  try {
    let user = await userRepository.findOne({ where: { id } });
    if (!user) {
      const customError = new CustomError(
        404,
        "General",
        `User with id:${id} not found.`,
        {
          code: 404,
          message: `User doesn't exists.`,
        }
      );
      return next(customError);
    }

    const getRole = await roleRepository.findOne({ where: { name: roleName } });
    if (!getRole || !departmentId) {
      const customError = new CustomError(
        400,
        "General",
        "Role does not exists",
        {
          code: 404,
          message: `Role doesn't exists.`,
        }
      );
      return next(customError);
    }
    // optional;
    const newSalaries = {
      basicSalaries: basicSalary,
      totalSalaries: salaries?.totalSalaries ? salaries.totalSalaries : null,
      ...(salaries.overtime && { overtime: salaries.overtime }),
      professionalAllowance: salaries?.professionalAllowance
        ? salaries?.professionalAllowance
        : null,
      healthAllowance: salaries.healthAllowance
        ? salaries.healthAllowance
        : null,
      mealAllowance: salaries.mealAllowance ? salaries.mealAllowance : null,
      positionalAllowance: salaries.positionalAllowance
        ? salaries.positionalAllowance
        : null,
      transportationAllowance: salaries.transportationAllowance
        ? salaries.transportationAllowance
        : null,
      operatorAllowance: salaries.operatorAllowance
        ? salaries.operatorAllowance
        : null,
      healthSubsidyBpjs: salaries.healthSubsidyBpjs
        ? salaries.healthSubsidyBpjs
        : null,
      taktisAllowance: salaries.taktisAllowance
        ? salaries.taktisAllowance
        : null,
      performanceAllowance: salaries.performanceAllowance
        ? salaries.performanceAllowance
        : null,
      serviceAllowance: salaries.serviceAllowance
        ? salaries.serviceAllowance
        : null,
      pphDeduction: salaries.pphDeduction ? salaries.pphDeduction : null,
      pphAllowance: salaries.pphAllowance ? salaries.pphAllowance : null,
      bpjsAllowance: salaries.bpjsAllowance ? salaries.bpjsAllowance : null,
      loanDeduction: salaries.loanDeduction ? salaries.loanDeduction : null,
      bpjsDeduction: salaries.bpjsDeduction ? salaries.bpjsDeduction : null,
      deductionJkn: salaries.deductionJkn ? salaries.deductionJkn : null,
      deductionJk: salaries.deductionJk ? salaries.deductionJk : null,
      deductionJht: salaries.deductionJht ? salaries.deductionJht : null,
      deductionJht1: salaries.deductionJht1 ? salaries.deductionJht1 : null,
      deductionPension: salaries.deductionPension
        ? salaries.deductionPension
        : null,
      deductionPension1: salaries.deductionPension1
        ? salaries.deductionPension1
        : null,
      updated_by: salaries.updated_by ? salaries.updated_by : "Admin",
    };
    // upload foto
    let response_upload_file = await upload_file(username, path, photo);
    console.log(response_upload_file, "response_upload_file");
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
    let base64: string = response_upload_file?.data;
    const newProfile = {
      placeOfBirth: placeOfBirth ? placeOfBirth : "",
      dateOfBirth: dateOfBirth ? dateOfBirth : "",
      gender: gender ? gender : "",
      religion: religion ? religion : "",
      academic: academic ? academic : "",
      title: title ? title : "",
      address: address ? address : "",
      city: city ? city : "",
      country: country ? country : "",
      postalCode: postalCode ? postalCode : "",
      photo: base64 ? base64 : "",
    };
    try {
      await salariesRepository
        .createQueryBuilder()
        .update(Salaries)
        .set(newSalaries)
        .where("user_id = :user_id", { user_id: id as any })
        .execute();
      await profileRepositoy
        .createQueryBuilder()
        .update(Profile)
        .set(newProfile)
        .where("user_id = :user_id", { user_id: id as any })
        .execute();
      await userRepository.update(id, {
        username: username ? username : "",
        nik: nik ? nik : "",
        isActive: isActive ? isActive : "",
        role_name: roleName ? roleName : "",
        basicSalary: basicSalary ? basicSalary : "",
        role_id: getRole.id,
        account_number: accountNumber ? accountNumber : "",
        department_id: departmentId ? departmentId : "",
      });

      // res.customSuccess(200, 'User successfully saved.');
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
