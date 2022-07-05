import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { Profile } from "../../typeorm/entities/profile/Profile";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";
import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { Role } from "../../typeorm/entities/roles/Role";
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
        ["User not found."]
      );
      return next(customError);
    }

    const getRole = await roleRepository.findOne({ where: { name: roleName } });
    if (!getRole) {
      const customError = new CustomError(
        400,
        "General",
        "Role does not exists",
        [`not exists`]
      );
      return next(customError);
    }

    // optional;
    const newSalaries = {
      basicSalaries: basicSalary,
      ...(salaries.totalSalaries && { totalSalaries: salaries.totalSalaries }),
      ...(salaries.overtime && { overtime: salaries.overtime }),
      ...(salaries.professionalAllowance && {
        professionalAllowance: salaries.professionalAllowance,
      }),
      ...(salaries.healthAllowance && {
        healthAllowance: salaries.healthAllowance,
      }),
      ...(salaries.mealAllowance && { mealAllowance: salaries.mealAllowance }),
      ...(salaries.positionalAllowance && {
        positionalAllowance: salaries.positionalAllowance,
      }),
      ...(salaries.transportationAllowance && {
        transportationAllowance: salaries.transportationAllowance,
      }),
      ...(salaries.operatorAllowance && {
        operatorAllowance: salaries.operatorAllowance,
      }),
      ...(salaries.healthSubsidyBpjs && {
        healthSubsidyBpjs: salaries.healthSubsidyBpjs,
      }),
      ...(salaries.taktisAllowance && {
        taktisAllowance: salaries.taktisAllowance,
      }),
      ...(salaries.performanceAllowance && {
        performanceAllowance: salaries.performanceAllowance,
      }),
      ...(salaries.serviceAllowance && {
        serviceAllowance: salaries.serviceAllowance,
      }),
      ...(salaries.pphDeduction && { pphDeduction: salaries.pphDeduction }),
      ...(salaries.pphAllowance && { pphAllowance: salaries.pphAllowance }),
      ...(salaries.bpjsAllowance && { bpjsAllowance: salaries.bpjsAllowance }),
      ...(salaries.loanDeduction && { loanDeduction: salaries.loanDeduction }),
      ...(salaries.bpjsDeduction && { bpjsDeduction: salaries.bpjsDeduction }),
      ...(salaries.deductionJkn && { deductionJkn: salaries.deductionJkn }),
      ...(salaries.deductionJk && { deductionJk: salaries.deductionJk }),
      ...(salaries.deductionJht && { deductionJht: salaries.deductionJht }),
      ...(salaries.deductionJht1 && { deductionJht1: salaries.deductionJht1 }),
      ...(salaries.deductionPension && {
        deductionPension: salaries.deductionPension,
      }),
      ...(salaries.deductionPension1 && {
        deductionPension1: salaries.deductionPension1,
      }),
      ...(salaries.updated_by && { updated_by: salaries.updated_by }),
    };
    const newProfile = {
      ...(placeOfBirth && {
        placeOfBirth: placeOfBirth,
      }),
      ...(dateOfBirth && { dateOfBirth: dateOfBirth }),
      ...(gender && { gender: gender }),
      ...(religion && { religion: religion }),
      ...(academic && { academic: academic }),
      ...(title && { title: title }),
      ...(address && { address: address }),
      ...(city && { city: city }),
      ...(country && { country: country }),
      ...(postalCode && {
        postalCode: postalCode,
      }),
      ...(photo && { photo: photo }),
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
        ...(username && { username: username }),
        ...(nik && !user.nik && { nik: nik }),
        ...(isActive && { isActive: isActive }),
        ...(roleName && { role_name: roleName }),
        ...(basicSalary && { basicSalary: basicSalary }),
        ...(getRole && { role_id: getRole.id }),
        ...(accountNumber && { account_number: accountNumber }),
        ...(departmentId && { department_id: departmentId }),
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
