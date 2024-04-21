import { throwError } from "../utils/handler";
import { Contact } from "../models";
import { Op } from "sequelize";

export const seedContacts = async () => {
  const primaryContacts: Contact[] = [];

  const primaryContactsData = Array.from({ length: 100 }, (_, index) => ({
    email: `user${index}@example.com`,
    phoneNumber: `123456789${index.toString().padStart(2, "0")}`,
    linkPrecedence: "primary",
  }));

  primaryContactsData.forEach((contactData) => {
    const contact = Contact.build(contactData);
    primaryContacts.push(contact);
  });

  await Promise.all(
    primaryContacts.map(async (contact) => {
      await contact.save();
    })
  );

  const secondaryContactsData = Array.from({ length: 50 }, (_, index) => {
    const primaryIndex = Math.floor(Math.random() * 100); // Randomly select a primary contact index
    const primaryContact = primaryContacts[primaryIndex]; // Get the corresponding primary contact

    return {
      email: primaryContact.email,
      phoneNumber: primaryContact.phoneNumber,
      linkPrecedence: "secondary",
      linkedId: primaryContact.id,
    };
  });

  await Promise.all(
    secondaryContactsData.map(async (contactData) => {
      const contact = Contact.build(contactData);
      await contact.save();
    })
  );
  console.log("Contacts seeded successfully");
};

export const identifyContactByEmailOrPhone = async (
  email: string | null,
  phoneNumber: string | null
) => {
  const whereCondition: any = {};

  if (email) {
    whereCondition.email = email;
  } else if (phoneNumber) {
    whereCondition.phoneNumber = phoneNumber;
  } else {
    throwError(400, "Both email and phoneNumber are null or empty");
  }

  const primaryContact = await Contact.findOne({
    where: {
      [Op.and]: [{ linkPrecedence: "primary" }, whereCondition],
    },
  });

  if (!primaryContact) {
    const newPrimaryContact = await Contact.create({
      email,
      phoneNumber,
      linkPrecedence: "primary",
    });

    return {
      primaryContactId: newPrimaryContact.id,
      emails: [email],
      phoneNumbers: [phoneNumber],
      secondaryContactIds: [],
    };
  }

  const secondaryContacts = await Contact.findAll({
    where: {
      linkedId: primaryContact.id,
      linkPrecedence: "secondary",
    },
  });

  let allEmailsSet = new Set<string>();
  if (primaryContact && primaryContact.email) {
    allEmailsSet.add(primaryContact.email);
  }
  secondaryContacts.forEach((contact) => {
    if (contact.email) {
      allEmailsSet.add(contact.email);
    }
  });

  const uniquePhoneNumbers = new Set([
    primaryContact.phoneNumber,
    ...secondaryContacts.map((contact) => contact.phoneNumber),
  ]);

  const responsePayload = {
    primaryContactId: primaryContact.id,
    emails: Array.from(allEmailsSet),
    phoneNumbers: Array.from(uniquePhoneNumbers),
    secondaryContactIds: secondaryContacts.map((contact) => contact.id),
  };

  return responsePayload;
};

export const insertContact = async (
  email: string | null,
  phoneNumber: string | null
) => {
  let whereCondition: any = {};
  if (email && phoneNumber) {
    whereCondition = {
      [Op.or]: [{ email }, { phoneNumber }],
    };
  } else if (email) {
    whereCondition.email = email;
  } else if (phoneNumber) {
    whereCondition.phoneNumber = phoneNumber;
  }

  const existingContact = await Contact.findOne({
    where: whereCondition,
  });

  if (existingContact) {
    const newContact = await Contact.create({
      email,
      phoneNumber,
      linkedId: existingContact.id,
      linkPrecedence: "secondary",
    });

    return newContact;
  }

  const newContact = await Contact.create({
    email,
    phoneNumber,
    linkPrecedence: "primary",
  });

  return newContact;
};
