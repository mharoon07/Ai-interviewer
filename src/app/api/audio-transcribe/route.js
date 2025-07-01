import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import { getUserIdFromCookies } from "@/helper/getUserId";

// Consider using a configuration file for API endpoints and other settings
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

export async function POST(req) {
    try {
        await connectDb();

        const userId = await getUserIdFromCookies(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { transcript } = body;

        if (!transcript || typeof transcript !== 'string') {
            return NextResponse.json(
                { error: "No valid transcript provided" },
                { status: 400 }
            );
        }

        // Consider adding retry logic or circuit breakers for external API calls
        const geminiRes = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `
                  You are an AI interviewer. The user has just said:
                  "${transcript}"

                  Your job is to:
                  - Guide them step-by-step through a simulated interview.
                  - Ask only one relevant follow-up question at a time based on what the user just said.
                  - If you're at the beginning, start with a general domain-related question.
                  - Keep it short, clear, and natural.
                  Respond with just the next question (no extra instructions or summaries).
                `.trim(),
                            },
                        ],
                    },
                ],
            }),
        });

        if (!geminiRes.ok) {
            throw new Error(`Gemini API request failed with status ${geminiRes.status}`);
        }

        const data = await geminiRes.json();
        console.log("Gemini API response:", JSON.stringify(data));

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, couldn't generate a reply.";

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
