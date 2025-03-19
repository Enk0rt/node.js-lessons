import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enums";
import { IUserDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.json(data);
    }

    public async getById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await userService.getById(id);
        res.status(StatusCodesEnum.OK).json(data);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUserDTO;
            const data = await userService.create(user);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response) {
        const { id } = req.params;
        const updateData: IUserDTO = req.body;
        const data = await userService.updateById(id, updateData);
        res.status(StatusCodesEnum.OK).json(data);
    }

    public async deleteAll(req: Request, res: Response) {
        await userService.deleteAll();
        res.status(StatusCodesEnum.NO_CONTENT);
    }

    public async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        await userService.deleteById(id);
        res.status(StatusCodesEnum.NO_CONTENT);
    }
}

export const userController = new UserController();
