import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middleware/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.create),
    userController.create,
);

router.get("/:id", userController.getById);

router.patch("/:id", userController.updateById);

router.delete("/:id", userController.deleteById);

router.delete("/", userController.deleteAll);

export const userRouter = router;
