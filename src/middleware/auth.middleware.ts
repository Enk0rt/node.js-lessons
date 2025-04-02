import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enum";
import { StatusCodesEnum } from "../enums/status-codes.enums";
import { ApiError } from "../errors/api.errors";
import { ITokenPayload } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const accessToken = authorizationHeader.split(" ")[1];

            const tokenPayload = tokenService.verifyToken(
                accessToken,
                "access",
            );

            if (!accessToken) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const isTokenExists = await tokenService.isExists(
                accessToken,
                "accessToken",
            );

            if (!isTokenExists) {
                throw new ApiError(
                    "Invalid token",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const isActive = await userService.isActive(tokenPayload.userId);

            if (!isActive) {
                throw new ApiError(
                    "Account is not active",
                    StatusCodesEnum.FORBIDDEN,
                );
            }

            req.res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                throw new ApiError(
                    "refreshToken is not provided",
                    StatusCodesEnum.FORBIDDEN,
                );
            }

            const tokenPayload = tokenService.verifyToken(
                refreshToken,
                "refresh",
            );

            const isTokenExists = await tokenService.isExists(
                refreshToken,
                "refreshToken",
            );

            if (!isTokenExists) {
                throw new ApiError("Invalid token", StatusCodesEnum.FORBIDDEN);
            }
            req.res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }

    public isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = req.res.locals.tokenPayload as ITokenPayload;

            if (role !== RoleEnum.ADMIN) {
                throw new ApiError("No permission", StatusCodesEnum.FORBIDDEN);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
