import { NextResponse } from 'next/server';
import { deleteSleepEntry, updateSleepEntry } from '@/lib/journal/service';

const DEMO_USER_ID = 'demo-user-1';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const result = await updateSleepEntry(DEMO_USER_ID, params.id, body);

  if (!result.ok) {
    if (result.code === 400) return NextResponse.json({ errors: result.errors }, { status: 400 });
    return NextResponse.json({ message: result.message }, { status: result.code });
  }

  return NextResponse.json(result.data);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const result = await deleteSleepEntry(DEMO_USER_ID, params.id);

  if (!result.ok) return NextResponse.json({ message: result.message }, { status: result.code });
  return NextResponse.json({ ok: true });
}