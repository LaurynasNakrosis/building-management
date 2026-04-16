'use server';

import { parse } from 'path';
import { ProjectInputSchema } from '../validator';
import { z } from 'zod';

type CreateProjectPayload = z.infer<typeof ProjectInputSchema>;

export async function createProject(payload: CreateProjectPayload) {
  const parsed = ProjectInputSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error();
  }
}
