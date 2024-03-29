import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addToFavourites,
  removeFromFavourites,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);

//only 1 method - we can write 'post' instead of 'route' and then function in the (, )
router.post("/logout", logoutUser);

router.post("/auth", authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

router.put("/profile/favourites", protect, addToFavourites);

router.delete("/profile/favourites/:productId", protect, removeFromFavourites);

export default router;
