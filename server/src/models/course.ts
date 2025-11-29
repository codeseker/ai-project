import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  isDeleted: boolean;
  tags: string[];
}

const courseSchema: Schema<ICourse> = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const course: Model<ICourse> = mongoose.model<ICourse>("Course", courseSchema);

export default course;
