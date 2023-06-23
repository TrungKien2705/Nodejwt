import express from "express";
import { studentController } from "../controller/index.js";

const router = express.Router();

router.get("/", studentController.getAllStudent);

router.get("/:id", studentController.getStudentById);

router.post("/", studentController.postCreateStudent);

router.put("/", studentController.putUpdateStudent);

// router.post("/faker", studentController.genertaFakeStudent);

export default router;
