import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import connectDb from '../../../lib/db'
export async function POST(req) {
    try {
        await connectDb();
        console.log("request Received")
        const body = await req.json();
        const { image } = body;

        if (image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}.jpg`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            filename: fileName,
            url: `/uploads/${fileName}`
        });

    } catch (e) {
        console.error("Upload error:", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
