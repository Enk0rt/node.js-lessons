import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enums";
import { ApiError } from "../errors/api.errors";
import { IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const updateData = req.body as IUserUpdateDTO;
            const data = await userService.updateById(id, updateData);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.deleteAll();
            res.status(StatusCodesEnum.NO_CONTENT).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).json();
        } catch (e) {
            next(e);
        }
    }

    public async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (id === req.res.locals.tokenPayload) {
                throw new ApiError("Not allowed", StatusCodesEnum.FORBIDDEN);
            }

            const data = await userService.blockUser(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async unBlockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (id === req.res.locals.tokenPayload) {
                throw new ApiError("Not allowed", StatusCodesEnum.FORBIDDEN);
            }

            const data = await userService.unBlockUser(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.getById(id);
            if (!user) {
                throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
            }

            if (!req.file) {
                throw new ApiError(
                    "File is not uploaded",
                    StatusCodesEnum.NOT_FOUND,
                );
            }

            const data = await userService.updateById(id, {
                avatar: req.file.path,
            });
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
