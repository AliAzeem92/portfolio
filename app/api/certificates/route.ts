import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const certificate = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(certificate, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch certificate data" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const create = await prisma.certificate.create({
      data: { ...body },
    });
    return NextResponse.json(create, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create certificate data" },
      { status: 500 },
    );
  }
}
