import { Router } from "express";

import { upload } from "../configs/multer.config";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", commonMiddleware.isValidated("id"), userController.getById);

router.patch(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateById,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    userController.deleteById,
);

router.delete("/", userController.deleteAll);

router.patch(
    "/:id/block",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    userController.blockUser,
);
router.patch(
    "/:id/unblock",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    userController.unBlockUser,
);
router.patch(
    "/upload-avatar/:id",
    authMiddleware.checkAccessToken,
    upload.single("avatar"),
    commonMiddleware.isFileExists(),
    userController.uploadAvatar,
);
export const userRouter = router;
