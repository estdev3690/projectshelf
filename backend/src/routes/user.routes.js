import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getWatchHistory,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", marCount: 1 },
    { name: "coverImage", marCount: 1 },
  ]),
  registerUser
);

router.route("/login").post( loginUser);
router.route('/refresh-token').post(refreshAccessToken)
//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route('/change-password').post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/channel/:userName").get(verifyJWT, getUserChannelProfile);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/update-avatar").patch(verifyJWT, upload.single('avatar'),updateUserAvatar);
router.route("/cover-image").patch(verifyJWT, upload.single('coverImage'),updateUserCoverImage);
router.route("/watch-history").get(verifyJWT,getWatchHistory);


export default router;
