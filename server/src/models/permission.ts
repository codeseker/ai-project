// this file will have the permissions for the roles
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPermission extends Document {
  name: string; // this will store the name of the permission like create, read, update, delete
  module: string; // this will store for which module of app this permission is applicable like user, course, module, lesson, etc.
}

const permissionSchema: Schema<IPermission> = new Schema<IPermission>({
  name: { type: String, required: true },
  module: { type: String, required: true },
});

const permission: Model<IPermission> = mongoose.model<IPermission>(
  "Permission",
  permissionSchema
);

export default permission;
