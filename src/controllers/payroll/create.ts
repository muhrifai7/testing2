import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { getRepository } from "typeorm";

import { Payroll } from "../../typeorm/entities/payroll/Payroll";
import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payrollRepository = getRepository(Payroll);
  const salariesRepository = getRepository(Salaries);
  try {
    // todo salariesId == user_id
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

    if (result) {
      const customError = new CustomError(
        400,
        "General",
        "payroll already exists",
        {
          code: 401,
          message: `Payroll '${result.paidDate}' already paid`,
        }
      );
      return next(customError);
    }
    // jika tidak lolos/jika ada stop
    const salariesResult = await salariesRepository.findOne({
      select: [
        "basicSalaries",
        "totalSalaries",
        "overtime",
        "professionalAllowance",
        "healthAllowance",
        "mealAllowance",
        "positionalAllowance",
        "transportationAllowance",
        "operatorAllowance",
        "healthSubsidyBpjs",
        "taktisAllowance",
        "performanceAllowance",
        "serviceAllowance",
        "pphDeduction",
        "pphAllowance",
        "bpjsAllowance",
        "loanDeduction",
        "bpjsDeduction",
        "deductionJkn",
        "deductionJk",
        "deductionJht",
        "deductionJht1",
        "deductionPension",
        "deductionPension1",
      ],
      where: { user_id: salariesId },
    });
    const newData = {
      salaries_id: salariesId,
      ...salariesResult,
      created_by,
      paidDate,
      totalPay,
      user_id: salariesId,
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
