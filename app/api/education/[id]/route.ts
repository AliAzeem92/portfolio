import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const body = await req.json()
        const education = await prisma.education.update({
            where: { id },
            data: { ...body },
        })
        return NextResponse.json(education, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to update education" },
            { status: 500 },
          );
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await prisma.education.delete({
            where: { id }
        })
        return NextResponse.json({ message: "education deleted"}, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to delete education" },
            { status: 500 },
          );
    }
}
