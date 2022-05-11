import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import moment from "moment";

import { Salaries } from "../../typeorm/entities/salaries/Salaries";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { limit = 10, page = 1, keyword = "" } = req.query;
  const offset = ((limit as number) * ((page as number) - 1)) as number;
  // construct date
  const start_date =
    req.query?.start_date ||
    moment(new Date()).startOf("month").format("YYYY-MM-DD");
  const end_date =
    req.query?.end_date ||
    moment(new Date()).endOf("month").format("YYYY-MM-DD");

  const { role, id } = req.jwtPayload;

  const salariesRepository = getRepository(Salaries);
  try {
    if (role !== "ADMINISTRATOR") {
      const [result, count] = await salariesRepository
        .createQueryBuilder("salaries")
        .offset(offset)
        .limit(limit as number)
        .innerJoinAndSelect("salaries.user", "user")
        .leftJoinAndSelect(
          "salaries.payroll",
          "payroll",
          "payroll.paid_date BETWEEN :after AND :before",
          {
            after: moment(new Date(start_date as string))
              .startOf("month")
              .format("YYYY-MM-DD"),
            before: moment(new Date(end_date as string))
              .endOf("month")
              .format("YYYY-MM-DD"),
          }
        )
        .where("salaries.user_id = :id", { id })
        .orderBy("salaries.created_at", "DESC")
        .getManyAndCount();

      if (!result) {
        const customError = new CustomError(
          404,
          "General",
          `Salaries not found.`,
          ["Data not found."]
        );
        return next(customError);
      }
      const response = {
        total_data: count,
        page,
        keyword,
        data: result,
      };
      // res.customSuccess(200, 'User found', user);
      return next(res.status(200).send(customResult(200, "success", response)));
    }

    const [result, count] = await salariesRepository
      .createQueryBuilder("salaries")
      .offset(offset)
      .limit(limit as number)
      .innerJoinAndSelect("salaries.user", "user")
      .leftJoinAndSelect(
        "salaries.payroll",
        "payroll",
        "payroll.paid_date BETWEEN :after AND :before",
        {
          after: moment(new Date(start_date as string))
            .startOf("month")
            .format("YYYY-MM-DD"),
          before: moment(new Date(end_date as string))
            .endOf("month")
            .format("YYYY-MM-DD"),
        }
      )
      .orderBy("salaries.created_at", "DESC")
      .getManyAndCount();

    if (!result) {
      const customError = new CustomError(
        404,
        "General",
        `Salaries not found.`,
        ["Data not found."]
      );
      return next(customError);
    }
    const response = {
      total_data: count,
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
