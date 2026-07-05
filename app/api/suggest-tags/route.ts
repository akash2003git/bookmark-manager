import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function GET() {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: "Explain how AI works in a few words",
    });

    console.log(interaction.output_text)

    return Response.json({
      output: interaction.output_text
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to generate AI response", details: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { title?: string; description?: string };
    const { title, description } = body;

    const prompt = `Based on the following bookmarked website, suggest 3 to 5 relevant, short tags.
    Return ONLY a comma-separated list of tags. Do not include markdown, numbers, or bullet points.
    Title: ${title}
    Description: ${description || "No description provided"}`;

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: prompt,
    });

    console.dir(interaction);
    const tags = interaction.output_text?.trim() || "";

    return Response.json({ tags });
  } catch (error) {
    return Response.json(
      { message: "Failed to generate AI response", error },
      { status: 500 }
    )
  }
}
