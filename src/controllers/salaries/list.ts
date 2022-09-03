import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { limit = 10, page = 1, keyword = "" } = req.query;
  const offset = ((limit as number) * ((page as number) - 1)) as number;
  const entityManager = getManager();
  try {
    const result = await entityManager.query(`SELECT 	a.basic_salaries,
		                                            a.total_salaries,
                                                b.username,
                                                b.id,
                                                COALESCE(a.pph_deduction, 0) +
                                                COALESCE(a.loan_deduction, 0) +
                                                COALESCE(a.bpjs_deduction, 0)  +
                                                COALESCE(a.deduction_jk,0) +
                                                COALESCE(a.deduction_jkn, 0) +
                                                COALESCE(a.deduction_jht, 0) +
                                                COALESCE(a.deduction_jht1, 0) +
                                                COALESCE(a.deduction_pension, 0) +
                                                COALESCE(a.deduction_pension1, 0)
                                                as total_deduction,
                                                COALESCE(a.professional_allowance, 0) +
                                                COALESCE(a.health_allowance, 0) +
                                                COALESCE(a.meal_allowance, 0) +
                                                COALESCE(a.performance_allowance, 0)  +
                                                COALESCE(a.positional_allowance,0) +
                                                COALESCE(a.transportation_allowance, 0) +
                                                COALESCE(a.health_subsidy_bpjs, 0) +
                                                COALESCE(a.taktis_allowance, 0) +
                                                COALESCE(a.service_allowance, 0) +
                                                COALESCE(a.pph_allowance, 0) +
                                                COALESCE(a.bpjs_allowance, 0)
                                                as total_allowance
                                                FROM 	salaries as a
                                                INNER JOIN tu_user as b on a.user_id = b.id
                                                WHERE b.username <> 'Admin'
                                                ORDER BY a.created_at desc
                                                LIMIT ${limit} OFFSET ${offset}`);
    if (!result) {
      const customError = new CustomError(
        404,
        "General",
        `Salaries not found.`,
        {
          code: 401,
          message: `Data not found.`,
        }
      );
      return next(customError);
    }
    const count = await entityManager.query(
      `
      SELECT id FROM tu_user where username <> 'Admin'`
    );
    const response = {
      total_data: count.length,
      page,
      keyword,
      data: result,
    };
    // res.customSuccess(200, 'User found', user);
    return next(res.status(200).send(customResult(200, "success", response)));
  } catch (err) {
    const customError = new CustomError(
      400,
      "Raw",
      `Can't retrieve list of users.`,
      null,
      err
    );
    return next(customError);
  }
};
