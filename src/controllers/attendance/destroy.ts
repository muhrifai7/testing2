import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Attendance } from "./../../typeorm/entities/attendance/Attendance";

export const destroy = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const attendanceRepository = getRepository(Attendance);
  try {
    const Attendance = await attendanceRepository.findOne({ where: { id } });
    if (!Attendance) {
      const customError = new CustomError(404, "General", "Not Found", {
        code: 401,
        message: `Attendance with id:${id} doesn't exists.`,
      });
      return next(customError);
    }
    attendanceRepository.delete(id);
    // res.customSuccess(200, 'User successfully deleted.', { id: user.id, name: user.name, email: user.email });
    return res
      .status(200)
      .json({
        status: 200,
        message: "Attendance successfully deleted.",
        responseData: { id: Attendance.id, name: Attendance.created_by },
      });
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
