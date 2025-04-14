import { useState } from "react";

export default function ChatAssistant() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {
        setLoading(true);
        setAnswer("");

        const res = await fetch("/api/askAI", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        });

        const data = await res.json();
        setAnswer(data.answer);
        setLoading(false);
    };

    return (
        <div className="chat-box">
            <h3>AI Farming Assistant</h3>
            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about crop yields, schedules, or farming techniques..."
            />
            <button onClick={askAI} disabled={loading}>
                {loading ? "Thinking..." : "Ask AI"}
            </button>
            {answer && <p><strong>AI:</strong> {answer}</p>}
        </div>
    );
}
