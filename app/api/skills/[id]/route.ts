import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const body = await req.json()
        const skill = await prisma.skill.update({
            where: { id },
            data: { ...body },
        })
        return NextResponse.json(skill, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to update skill" },
            { status: 500 },
          );
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await prisma.skill.delete({
            where: { id }
        })
        return NextResponse.json({ message: "skill deleted"}, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to delete skill" },
            { status: 500 },
          );
    }
}
