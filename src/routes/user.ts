import express, { Router } from "express";
import { insertContacts } from "../controllers/user";

const router: Router = express.Router();

router.post("/insert-contacts", insertContacts);

export default router;
