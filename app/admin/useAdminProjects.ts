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

export function useAdminProjects(enabled: boolean) {
  const [state, setState] = useState<ProjectsState>({ status: 'idle' });
  const [deletingBySlug, setDeletingBySlug] = useState<Set<string>>(new Set());

  const isDeleting = useMemo(
    () => (slug: string) => deletingBySlug.has(slug),
    [deletingBySlug],
  );

  useEffect(() => {
    if (!enabled) return;
    const fetchProjects = async () => {
      setState({ status: 'loading' });
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setState({ status: 'success', data: data || [] });
        } else {
          const errorData = await response
            .json()
            .catch(() => ({ message: 'Failed to fetch projects' }));
          setState({
            status: 'error',
            error: errorData.message || 'Failed to fetch projects',
          });
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setState({
          status: 'error',
          error:
            'Failed to fetch projects. Please check the console for details.',
        });
      }
    };
    fetchProjects();
  }, [enabled]);

  const deleteProjectBySlug = async (slug: string) => {
    setDeletingBySlug((prev) => {
      const next = new Set(prev);
      next.add(slug);
      return next;
    });
    setState((prev) => {
      if (prev.status !== 'success') return prev;
      return {
        status: 'success',
        data: prev.data.filter((p) => p.slug !== slug),
      };
    });
    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Failed to delete project' }));
        throw new Error(errorData.message || 'Failed to delete project');
      }
    } catch (error) {
      setState({ status: 'loading' });
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setState({ status: 'success', data: data || [] });
        } else {
          const errorData = await response
            .json()
            .catch(() => ({ message: 'Failed to fetch projects' }));
          setState({
            status: 'error',
            error: errorData.message || 'Failed to fetch projects',
          });
        }
      } catch (fetchError) {
        console.error('Error fetching projects:', fetchError);
        setState({
          status: 'error',
          error:
            'Failed to fetch projects. Please check the console for details.',
        });
      }
    } finally {
      setDeletingBySlug((prev) => {
        const next = new Set(prev);
        next.delete(slug);
        return next;
      });
    }
  };
  return { state, deleteProjectBySlug, isDeleting };
}
