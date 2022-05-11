import { Request,Response,NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { UserTax } from '../../typeorm/entities/userTax/UserTax';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const create = async(req:Request,res:Response,next:NextFunction) => {
    const userTaxRepository = getRepository(UserTax);
    const {id} = req.params;
    try {
        const getUserTax = await userTaxRepository.findOne({where : {user_id:id}});
        if(getUserTax){
            const customError = new CustomError(404, 'General', `User Tax with id:${id} not found.`, ['User already has tax']);
            return next(customError);
        }
        const userTax = await userTaxRepository.create({
            ...req.body,
            user_id : id
        });
        await userTaxRepository.save(userTax);
        return res.status(200).json({status: 200,message :"User Tax successfully created." });
    } catch (error) {
        const customeError = new CustomError(400,'Raw','Error',null,error);
        return next(customeError);
    }
}