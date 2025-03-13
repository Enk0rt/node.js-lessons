import {Router} from "express";

import {userController} from "../controllers/user.controller";

const router = Router()

router.get("/", userController.getAll)

router.post("/", userController.create)

router.get("/:id", userController.getById)

router.patch('/:id', userController.updateById)

router.delete('/:id', userController.deleteById)

router.delete('/', userController.deleteAll)

export const userRouter = router