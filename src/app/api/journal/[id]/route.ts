import { NextResponse } from "next/server";
import { deleteEntry, updateEntry } from "@/lib/db";

const DEMO_USER_ID = 1;

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const updated = await updateEntry(Number(id), body);

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await deleteEntry(Number(id), DEMO_USER_ID);

  return NextResponse.json({
    success: true,
  });
}