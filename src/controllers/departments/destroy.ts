import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Department } from "./../../typeorm/entities/department/Department";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const destroy = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const departmentRepository = getRepository(Department);
  try {
    const department = await departmentRepository.findOne({ where: { id } });
    if (!department) {
      const customError = new CustomError(404, "General", "Not Found", [
        `department with id:${id} doesn't exists.`,
      ]);
      return next(customError);
    }

    try {
      departmentRepository.delete(id);
      return res.status(200).json({
        status: 200,
        message: "Department successfully deleted.",
        responseData: { id: department.id, name: department.name },
      });
    } catch (error) {
      const customeError = new CustomError(400, "Raw", "Error", null, error);
      return next(customeError);
    }
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
