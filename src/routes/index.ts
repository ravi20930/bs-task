import express, { Router } from "express";
import userRoutes from "./user";

const router: Router = express.Router();

router.use("/", userRoutes);

export default router;
