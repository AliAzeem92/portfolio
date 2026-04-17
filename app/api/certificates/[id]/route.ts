import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    try {
        const body = await req.json()
        const certificate = await prisma.certificate.update({
            where: { id },
            data: { ...body },
        })
        return NextResponse.json(certificate, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to update certificate" },
            { status: 500 },
          );
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    try {
        await prisma.certificate.delete({
            where: { id }
        })
        return NextResponse.json({ message: "certificate deleted"}, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Failed to delete certificate" },
            { status: 500 },
          );
    }
}
