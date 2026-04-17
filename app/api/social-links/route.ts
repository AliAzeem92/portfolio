import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const socialLink = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(socialLink, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Social Link data" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await prisma.socialLink.create({
      data: { ...body },
    });
    return NextResponse.json(create, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create Social Link data" },
      { status: 500 },
    );
  }
}
