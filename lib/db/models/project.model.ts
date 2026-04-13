import { Document, Model, model, models, Schema, Types } from 'mongoose';
import { required } from 'zod/v4/core/util.cjs';

export type ProjectBody = {
  code: string;
};

export type ProjectInput = {
  slug: string;
  title: string;
  description: string;
  date?: Date;
  location?: string;
  picture?: string;
  url?: string;
  repository?: string;
  published: boolean;
  body: ProjectBody;
};

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },

    date: { type: Date, require: false },
    location: { type: String, require: false },
    picture: { type: String, require: false },
    url: { type: String, require: false },
    repository: { type: String, require: false },

    published: { type: Boolean, required: true, default: false },
    body: {
      code: { type: String, required: true },
    },
  },
  { timestamps: true },
);
