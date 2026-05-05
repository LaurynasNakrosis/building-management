import { NextRequest, NextResponse } from 'next/server';
import { getProjectBySlug, deleteProject } from '@/lib/actions/project.actions';

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const project = await getProjectBySlug(params.slug);
    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error('GET /api/projects/[slug] error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch project' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await deleteProject(params.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/projects/[slug] error:', error);
    return NextResponse.json(
      { message: 'Failed to delete project' },
      { status: 500 },
    );
  }
}
