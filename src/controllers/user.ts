import { Request, Response, NextFunction } from "express";
import { log, error } from "../utils/logger";
import { addContact } from "../services/user";
import { responseHandler, throwError } from "../utils/handler";

export const insertContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const contact = await addContact(id);
    const response = responseHandler(
      200,
      "successfully fetched contact.",
      contact
    );
    return res.status(response.statusCode).json(response);
  } catch (err) {
    error(req, err);
    next(err);
  }
};
