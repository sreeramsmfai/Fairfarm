import { OpenAI } from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { question } = req.body;

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "system", content: "You are an agricultural expert helping farmers with crop yields and best practices." },
                       { role: "user", content: question }],
            temperature: 0.7,
        });

        res.status(200).json({ answer: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
}
