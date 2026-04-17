import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const skill = await prisma.skill.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(skill, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch skill data" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await prisma.skill.create({
      data: { ...body },
    });
    return NextResponse.json(create, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create skill data" },
      { status: 500 },
    );
  }
}
