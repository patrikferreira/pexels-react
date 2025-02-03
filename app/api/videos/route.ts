import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const apiKey = process.env.PEXELS_API_key;
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query") || "";
    const page = searchParams.get("page") || 1;
    const perPage = searchParams.get("per_page") || 15;

    const baseUrl = query
        ? `https://api.pexels.com/videos/search?query=${query}&page=${page}&per_page=${perPage}`
        : `https://api.pexels.com/videos/popular?page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(baseUrl, {
            headers: {
                Authorization: `${apiKey}`
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
