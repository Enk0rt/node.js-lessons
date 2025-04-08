import { StatusCodesEnum } from "../enums/status-codes.enums";
import { ApiError } from "../errors/api.errors";
import { userService } from "../services/user.service";
class UserController {
    async getAll(req, res, next) {
        try {
            const data = await userService.getAll();
            res.json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const data = await userService.updateById(id, updateData);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteAll(req, res, next) {
        try {
            const data = await userService.deleteAll();
            res.status(StatusCodesEnum.NO_CONTENT).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { id } = req.params;
            await userService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).json();
        }
        catch (e) {
            next(e);
        }
    }
    async blockUser(req, res, next) {
        try {
            const { id } = req.params;
            if (id === req.res.locals.tokenPayload) {
                throw new ApiError("Not allowed", StatusCodesEnum.FORBIDDEN);
            }
            const data = await userService.blockUser(id);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
    async unBlockUser(req, res, next) {
        try {
            const { id } = req.params;
            if (id === req.res.locals.tokenPayload) {
                throw new ApiError("Not allowed", StatusCodesEnum.FORBIDDEN);
            }
            const data = await userService.unBlockUser(id);
            res.status(StatusCodesEnum.OK).json(data);
        }
        catch (e) {
            next(e);
        }
    }
}
export const userController = new UserController();
