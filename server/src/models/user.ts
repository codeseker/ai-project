import mongoose, { Schema, Document, Model } from "mongoose";
import { UserStatus } from "../constants/enums/user";

export interface IUser extends Document {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  status: UserStatus;
  isDeleted: boolean;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, enum: UserStatus, default: UserStatus.PENDING },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const user: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default user;
