import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { Profile } from "../../typeorm/entities/profile/Profile";
import { Role } from "../../typeorm/entities/roles/Role";
import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { CustomError } from "../../utils/response/custom-error/CustomError";

// endpoint digunakan untuk create user oleh admin
/*
req mandatory semua
type number isi null
*/
export const create = async (
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
    username,
    nik,
    basicSalary,
    isActive,
    accountNumber,
    role = "STAFF",
    salaries,
    profile,
    departmentId,
    profesionId,
  } = req.body;
  try {
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      const customError = new CustomError(
        400,
        "General",
        "User already exists",
        [`Email '${user.email}' already exists`]
      );
      return next(customError);
    }

    const getRole = await roleRepository.findOne({ where: { name: role } });
    if (!getRole) {
      const customError = new CustomError(
        400,
        "General",
        "Role does not exists",
        [`not exists`]
      );
      return next(customError);
    }
    try {
      const newUser = new TU_USER();
      newUser.email = email;
      newUser.account_number= accountNumber,
      newUser.username = username;
      newUser.basicSalary = basicSalary;
      newUser.nik = nik;
      newUser.role_id = getRole.id;
      newUser.role_name = role;
      newUser.isActive = isActive;
      newUser.password = password;
      newUser.department_id = departmentId;
      newUser.profesion_id = profesionId;
      newUser.hashPassword();
      const dataUser = await userRepository.save(newUser);
      await profileRepository.save({
        user_id: dataUser.id,
        placeOfBirth: profile.placeOfBirth,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        religion: profile.religion,
        academic: profile.academic,
        title: profile.title,
        address: profile.address,
        city: profile.city,
        country: profile.country,
        postalCode: profile.postalCode,
        photo: profile.photo,
      });

      await salariesRepository.save({
        user_id: dataUser.id,
        overtime: salaries.overtime ? salaries.overtime : null,
        basicSalaries: basicSalary,
        professionalAllowance: salaries.professionalAllowance,
        healthAllowance: salaries.healthAllowance,
        mealAllowance: salaries.mealAllowance,
        positionalAllowance: salaries.positionalAllowance,
        transportationAllowance: salaries.transportationAllowance,
        operatorAllowance: salaries.operatorAllowance,
        healthSubsidyBpjs: salaries.healthSubsidyBpjs,
        taktisAllowance: salaries.taktisAllowance,
        performanceAllowance: salaries.performanceAllowance,
        serviceAllowance: salaries.serviceAllowance,
        pphDeduction: salaries.pphDeduction,
        pphAllowance: salaries.pphAllowance,
        bpjsAllowance: salaries.bpjsAllowance,
        loanDeduction: salaries.loanDeduction,
        created_by: salaries.created_by
          ? salaries.created_by.toUpperCase()
          : "ADMIN",
      });
      return res
        .status(200)
        .json({ status: 200, message: "User successfully saved." });
    } catch (error) {
      const customError = new CustomError(
        400,
        "Raw",
        `User '${email}' can't be created`,
        null,
        error
      );
      return next(customError);
    }
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
