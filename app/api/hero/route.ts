import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst();
    return NextResponse.json(hero, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch hero data" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const hero = await prisma.hero.findFirst();
    const updated = await prisma.hero.update({
      where: { id: hero?.id },
      data: { ...body },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update hero data" },
      { status: 500 },
    );
  }
}
