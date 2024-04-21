import { Request, Response, NextFunction } from "express";
import { log, error } from "../utils/logger";
import { identifyContactByEmailOrPhone, insertContact } from "../services/user";
import { responseHandler, throwError } from "../utils/handler";

export const identifyContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, phoneNumber } = req.body;
    // log(`checking for email/phone:${{ email, phoneNumber }}`);

    const data = await identifyContactByEmailOrPhone(email, phoneNumber);
    const response = responseHandler(
      200,
      "successfully fetched contacts",
      data
    );
    return res.status(response.statusCode).json(response.data);
  } catch (err) {
    next(err);
  }
};

export const insertNewContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, phoneNumber } = req.body;
    // log(`checking for email/phone:${{ email, phoneNumber }}`);

    const data = await insertContact(email, phoneNumber);
    const response = responseHandler(
      200,
      "successfully created/updated contacts"
    );
    return res.status(response.statusCode).json(response);
  } catch (err) {
    next(err);
  }
};
