import { NextResponse } from 'next/server';
import { createSleepEntry, listSleepEntries } from '@/lib/journal/service';

const DEMO_USER_ID = 'demo-user-1';

export async function GET() {
  const entries = await listSleepEntries(DEMO_USER_ID);
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await createSleepEntry(DEMO_USER_ID, body);

  if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 400 });
  return NextResponse.json(result.data, { status: 201 });
}