import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

// crud -- create, read, update, delete
router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.isValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
