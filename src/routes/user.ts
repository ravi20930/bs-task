import express, { Router } from "express";
import { identifyContact, insertNewContact } from "../controllers/user";

const router: Router = express.Router();

router.post("/identify", identifyContact);
router.post("/new", insertNewContact);

export default router;
