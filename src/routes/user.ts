import express, { Router } from "express";
import { identifyContact } from "../controllers/user";

const router: Router = express.Router();

router.post("/identify", identifyContact);

export default router;
