import { Request,Response,NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Role } from '../../typeorm/entities/roles/Role';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import { customResult } from '../../utils/response/custom-success/customResult';

export const edit = async(req:Request,res:Response|any,next:NextFunction) => {
    const {id} = req.params;
    const { username } = req.body;
    const roleRepository = getRepository(Role);
    try {
        const role = await roleRepository.findOne({where : {id}});
        if(!role){
            const customError = new CustomError(404, 'General', `Role with id:${id} not found.`, ['role not found.']);
            return next(customError);
        }
        role.name = username;
        try {
            await roleRepository.save(role);
            // res.customSuccess(200, 'User successfully saved.');
            return next(res.status(200).send((customResult(200,"success"))));
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Role '${role.name}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (error) {
        const customeError = new CustomError(400,'Raw','Error',null,error);
        return next(customeError);
    }
}