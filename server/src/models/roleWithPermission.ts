// this file will have the role with the permissions
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRoleWithPermission extends Document {
  roleId: mongoose.Types.ObjectId;
  permissions: mongoose.Types.ObjectId;
}

const roleWithPermissionSchema: Schema<IRoleWithPermission> =
  new Schema<IRoleWithPermission>(
    {
      roleId: { type: mongoose.Types.ObjectId, ref: "Role", required: true },
      permissions: {
        type: mongoose.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const roleWithPermission: Model<IRoleWithPermission> =
  mongoose.model<IRoleWithPermission>(
    "RoleWithPermission",
    roleWithPermissionSchema
  );

export default roleWithPermission;
