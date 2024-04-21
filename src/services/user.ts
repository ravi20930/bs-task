import { throwError } from "../utils/handler";
import { Contact } from "../models";

export const addContact = async (id: string) => {
  return Contact.findByPk(id);
};
