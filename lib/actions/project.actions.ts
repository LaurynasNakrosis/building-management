'use server';

import { ProjectInputSchema } from '../validator';
import { z } from 'zod';
import { connectToDatabase } from '../db';
import Project from '../db/models/project.model';

type CreateProjectPayload = z.infer<typeof ProjectInputSchema>;

function formatZodError(err: z.ZodError) {
  const flat = z.flattenError(err);
  const fieldMsgs = Object.values(flat.fieldErrors).flat().filter(Boolean);
  return [...flat.formErrors, ...fieldMsgs].join(', ') || 'Invalid input';
}

export async function createProject(payload: CreateProjectPayload) {
  const parsed = ProjectInputSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(formatZodError(parsed.error));
  }
  await connectToDatabase();
  const created = await Project.create(parsed.data);
  return JSON.parse(JSON.stringify(created));
}

export async function getProjects() {
  await connectToDatabase();
  const projects = await Project.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(projects));
}

export async function getProjectBySlug(slug: string) {
  await connectToDatabase();
  const project = await Project.findOne({ slug }).lean();
  if (!project) return null;
  return JSON.parse(JSON.stringify(project));
}

export async function deleteProject(slug: string) {
  await connectToDatabase();
  const deleted = await Project.findOneAndDelete({ slug });
  if (!deleted) throw new Error('Project not found');
  return { success: true };
}
