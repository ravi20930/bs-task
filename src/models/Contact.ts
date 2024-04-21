import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

interface ContactAttributes {
  id?: string;
  phoneNumber?: string | null;
  email?: string | null;
  linkedId?: string | null;
  linkPrecedence: string | null;
}

class Contact extends Model<ContactAttributes> implements ContactAttributes {
  public id!: string;

  public phoneNumber!: string | null;

  public email!: string;

  public linkedId!: string | null;

  public linkPrecedence!: "primary" | "secondary";
}

Contact.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    linkedId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    linkPrecedence: {
      type: DataTypes.ENUM("primary", "secondary"),
      allowNull: false,
      defaultValue: "primary",
    },
  },
  {
    sequelize,
    modelName: "Contact",
  }
);

export default Contact;
