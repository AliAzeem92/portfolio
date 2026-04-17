import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    try {
        const body = await req.json()
        const socialLink = await prisma.socialLink.update({
            where: { id },
            data: { ...body },
        })
        return NextResponse.json(socialLink, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to update Social Link" },
            { status: 500 },
          );
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    try {
        await prisma.socialLink.delete({
            where: { id }
        })
        return NextResponse.json({ message: "socialLink deleted"}, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to delete Social Link" },
            { status: 500 },
          );
    }
}
