import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const project = await prisma.project.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(project, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch project data" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await prisma.project.create({
      data: { ...body },
    });
    return NextResponse.json(create, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project data" },
      { status: 500 },
    );
  }
}
