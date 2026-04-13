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
  picture?: string;
  url?: string;
  repository?: string;
  published: boolean;
  body: ProjectBody;
};
