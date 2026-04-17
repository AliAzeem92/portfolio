import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contact = await prisma.contact.findFirst();
    return NextResponse.json(contact, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch contact data" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const contact = await prisma.contact.findFirst();
    const updated = await prisma.contact.update({
      where: { id: contact?.id },
      data: { ...body },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update contact data" },
      { status: 500 },
    );
  }
}
