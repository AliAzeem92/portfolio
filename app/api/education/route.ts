import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const education = await prisma.education.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(education, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch education data" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await prisma.education.create({
      data: { ...body },
    });
    return NextResponse.json(create, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create education data" },
      { status: 500 },
    );
  }
}
