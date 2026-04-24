import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const body = await req.json()
        const project = await prisma.project.update({
            where: { id },
            data: { ...body },
        })
        return NextResponse.json(project, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to update project" },
            { status: 500 },
          );
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await prisma.project.delete({
            where: { id }
        })
        return NextResponse.json({ message: "Project deleted"}, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to delete project" },
            { status: 500 },
          );
    }
}
