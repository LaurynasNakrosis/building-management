'use client';

import { useEffect, useState, useMemo } from 'react';

export type Project = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  date?: string;
  location?: string;
  picture?: string[];
  url?: string;
  published: boolean;
  body: { code: string };
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Project[] }
  | { status: 'error'; error: string };

export function useAdminProjects() {}
