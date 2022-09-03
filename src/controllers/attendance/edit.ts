import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Attendance } from "../../typeorm/entities/attendance/Attendance";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const edit = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const attendanceRepository = getRepository(Attendance);
  try {
    const attendance = await attendanceRepository.findOne({ where: { id } });
    if (!attendance) {
      const customError = new CustomError(
        404,
        "General",
        `User with id:${id} not found.`,
        {
          code: 401,
          message: `Attendance with id:${id} doesn't exists.`,
        }
      );
      return next(customError);
    }
    const newData = {
      ...attendance,
      ...req.body,
    };
    try {
      await attendanceRepository.update({ id }, newData);
      // res.customSuccess(200, 'User successfully saved.');
      return next(res.status(200).send(customResult(200, "success")));
    } catch (error) {
      const customError = new CustomError(
        409,
        "Raw",
        `attendance '${attendance.created_by}' can't be saved.`,
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
