import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { getRepository } from "typeorm";

import { Payroll } from "../../typeorm/entities/payroll/Payroll";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payrollRepository = getRepository(Payroll);
  try {
    let { salariesId, created_by, paidDate, totalPay } = req.body;

    // validasi salaries id dan paid date terdapat pembayaran dibulan yang sama atau tidak
    const result = await payrollRepository
      .createQueryBuilder("payroll")
      .where("payroll.paid_date >= :after", {
        after: moment(new Date(paidDate as string))
          .startOf("month")
          .format("YYYY-MM-DD"),
      })
      .andWhere("payroll.paid_date < :before", {
        before: moment(new Date(paidDate as string))
          .endOf("month")
          .format("YYYY-MM-DD"),
      })
      .andWhere("payroll.salaries_id = :salaries_id", {
        salaries_id: salariesId,
      })
      .getOne();

    //   return next(res.status(200).send((customResult(200,"success",payroll))));
    console.log("result", result);
    if (result) {
      const customError = new CustomError(
        400,
        "General",
        "payroll already exists",
        [`Payroll '${result.paidDate}' already paid`]
      );
      return next(customError);
    }
    // jika tidak lolos/jika ada stop
    const newData = {
      salaries_id: salariesId,
      created_by,
      paidDate,
      totalPay,
    };
    await payrollRepository.save(newData);
    // return res.customSuccess(200, 'User successfully saved.');
    return res
      .status(200)
      .json({ status: 200, message: "Payment successfully created." });
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
