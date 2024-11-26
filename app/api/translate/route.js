import { NextResponse } from "next/server";
import axios from "axios";

const translationCache = new Map();

export async function POST(req) {
  const { dish, targetLang } = await req.json();

  if (!dish || !targetLang) {
    return NextResponse.json(
      { error: "Dish and targetLang are required" },
      { status: 400 },
    );
  }

  try {
    const cacheKey = `${dish}_${targetLang}`;

    if (translationCache.has(cacheKey)) {
      return NextResponse.json({ translation: translationCache.get(cacheKey) });
    }

    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      { text: [dish], target_lang: targetLang },
      {
        headers: {
          Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        },
      },
    );

    const translation = response.data.translations[0].text;

    translationCache.set(cacheKey, translation);

    return NextResponse.json({ translation });
  } catch (error) {
    console.error("Translation error:", error);

    return NextResponse.json(
      { error: "Failed to translate dish" },
      { status: 500 },
    );
  }
}
