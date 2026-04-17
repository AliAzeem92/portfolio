import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const about = await prisma.about.findFirst();
    const updated = await prisma.about.update({
      where: { id: about?.id },
      data: { ...body },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update about data" },
      { status: 500 },
    );
  }
}
