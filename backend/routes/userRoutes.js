import express from "express"
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/register").post(registerUser)
router.post("/login", authUser)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)

export default router

