import { Document, Model, model, models, Schema, Types } from 'mongoose';

export type ProjectBody = {
  code: string;
};

export type ProjectInput = {
  slug: string;
  title: string;
  description: string;
  date?: Date;
  location?: string;
  picture?: string[];
  published: boolean;
};

export interface IProject extends Document, ProjectInput {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },

    date: { type: Date, require: false },
    location: { type: String, require: false },
    picture: [{ type: String }],
    published: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const Project =
  (models.Project as Model<IProject>) ||
  model<IProject>('Project', projectSchema);

export default Project;
