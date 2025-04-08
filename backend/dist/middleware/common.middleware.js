import { isObjectIdOrHexString } from "mongoose";
import { ApiError } from "../errors/api.errors";
class CommonMiddleware {
    isValidated(key) {
        return (req, res, next) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`Invalid id [${key}]`, 400);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    validateBody(validator) {
        return async (req, res, next) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            }
            catch (e) {
                next(new ApiError(e.details[0].message, 400));
            }
        };
    }
}
export const commonMiddleware = new CommonMiddleware();
