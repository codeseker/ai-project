import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRole extends Document {
  name: string;
  module: string; // this will store for which module of app this role is applicable
}

const roleSchema: Schema<IRole> = new Schema<IRole>(
  {
    name: { type: String, required: true },
    module: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const role: Model<IRole> = mongoose.model<IRole>("Role", roleSchema);

export default role;
