import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/actions/project.actions';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch projects' },
      { status: 500 },
    );
  }
}
