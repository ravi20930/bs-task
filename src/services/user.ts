import { Contact } from "../models";

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
