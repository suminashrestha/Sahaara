import express from "express";
import upload from "../middlewares/upload.middleware";
import { authorize } from "../middlewares/auth.middleware";
import {
  createAdoptionPost,
  deleteAdoptionPost,
  getAllAdoptionPosts,
  getSingleAdoptionPost,
  updateAdoptionPost,
  sendEnquiryData,
} from "../controllers";

const router = express.Router();

router
  .route("/")
  .get(getAllAdoptionPosts)
  .post(
    authorize(["individual", "organization"]),
    upload.single("adoptionPostImage"),
    createAdoptionPost
  );

router
  .route("/:postId")
  .delete(deleteAdoptionPost)
  .put(upload.single("adoptionPostImage"), updateAdoptionPost)
  .get(getSingleAdoptionPost);

router.route("/send-enquiry").post(sendEnquiryData);

export { router as adoptionPostRoute };
