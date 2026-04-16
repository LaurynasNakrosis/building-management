'use server';

import { parse } from 'path';
import { ProjectInputSchema } from '../validator';
import { z } from 'zod';

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
}
