import { chatWithGemini } from '../services/geminiService.js';

export const chatAboutRecommendations = async (req, res) => {
  try {
    const { userQuery, recommendations, originalQuery } = req.body;

    if (
      !userQuery?.trim() ||
      !originalQuery?.trim() ||
      !Array.isArray(recommendations) ||
      recommendations.length === 0
    ) {
      return res.status(400).json({ error: "Missing or invalid input: 'userQuery', 'originalQuery', or 'recommendations'" });
    }

    const context = recommendations.map((policy, i) =>
      `Policy ${i + 1}:\n- Name: ${policy.name}\n- Description: ${policy.description}\n- Premium: ₹${policy.premium}/year\n- Coverage: ₹${policy.sumAssured}\n- Term: ${policy.term} years`
    ).join("\n\n");

    const prompt = `
You are an intelligent assistant helping users understand insurance policy recommendations from LIC.

The user originally asked:
"${originalQuery}"

Based on that, the following policies were recommended:

${context}

Now the user is asking:
"${userQuery}"

Please provide a clear and helpful response based on the context of both the original query and the recommended policies.
    `;

    const response = await chatWithGemini(prompt.trim());

    res.json({ reply: response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
