import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { multerUploads, multerAvatarUpload } from "../middlewares/multer";
import * as fileHandlers from "../controllers/files";
import * as userHandlers from "../controllers/users";
import * as educationHandlers from "../controllers/education";
import * as contactHandlers from "../controllers/contactDetail";
import * as personalInfoHandlers from "../controllers/personalInfo";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.get("/all", userHandlers.getAll);
router.get("/:userId", userHandlers.getDetail);
router.get("/:userId/files", userHandlers.getUserFiles);
router.get("/:userId/education", educationHandlers.getAll);
router.get("/:userId/contact", contactHandlers.getDetail);
router.get("/:userId/personal_info", personalInfoHandlers.getDetail);

router.post("/subscribe", userHandlers.subscribe);
router.post("/signup", userHandlers.sign_up);
router.post("/signin", userHandlers.sign_in);
router.post("/forgot_password", userHandlers.forgotPassword);
router.post("/reset_password", userHandlers.resetPassword);
router.post("/:userId/avatar", multerAvatarUpload, fileHandlers.createAvatar);
router.post("/:userId/file", multerUploads, fileHandlers.create);
router.post("/:userId/password", userHandlers.changePassword);
router.post("/:userId", userHandlers.updateDetails);

export default router;
