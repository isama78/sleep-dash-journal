import { getEntries } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: Promise<{ user_id: string }> }) {
  const id = await Number((await params).user_id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const entries = await getEntries(id);
  if (!entries) {
    return NextResponse.json({ error: 'Entries for user not found' }, { status: 404 });
  }
  return NextResponse.json(entries);
}