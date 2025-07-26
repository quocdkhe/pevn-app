import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";
import express from "express";
import { protect } from "../middleware/auth.middleware";
import { validateData } from "../middleware/validation.middleware";
import {
  userLoginSchema,
  userRegistrationSchema,
  userUpdateSchema,
} from "../schemas/user.schema";

const router = express.Router();

router.post("/register", validateData(userRegistrationSchema), registerUser);
router.post("/auth", validateData(userLoginSchema), authUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put(
  "/profile",
  protect,
  validateData(userUpdateSchema),
  updateUserProfile
);

export default router;
