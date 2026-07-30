import { NextResponse } from "next/server";
import { createEntry, getEntries } from "@/lib/db";

const DEMO_USER_ID = 1;

export async function GET() {
  const entries = await getEntries(DEMO_USER_ID);
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const body = await req.json();

  const entry = await createEntry(DEMO_USER_ID, body);

  return NextResponse.json(entry, {
    status: 201,
  });
}