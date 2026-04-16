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
