import mongoose, { Schema, Document, Model } from "mongoose";
import { UserStatus } from "../constants/enums/user";

export interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  status: UserStatus;
  isDeleted: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  refreshToken?: string;
  role?: mongoose.Types.ObjectId;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: UserStatus, default: UserStatus.PENDING },
    isDeleted: { type: Boolean, default: false },
    passwordResetToken: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
    refreshToken: { type: String, default: null }, 
    role: { type: Schema.Types.ObjectId, ref: "Role", default: null },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });

UserSchema.set("toJSON", {
  transform: (_doc, ret: Partial<IUser> & { _id?: any; __v?: any }) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

const user: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default user;
