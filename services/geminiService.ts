import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

/**
 * Declare process for TypeScript to satisfy the build compiler in a browser context.
 * The actual value of process.env.API_KEY is injected by Vite during the build process.
 */
declare var process: {
  env: {
    API_KEY: string;
    [key: string]: string;
  };
};

/**
 * Generates a response from the "Shop Foreman" AI based on user input and history.
 */
export const generateTreeResponse = async (
  userMessage: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  // Create a new GoogleGenAI instance right before the call as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are the "Shop Foreman" for Klein Tree Services.
    The owners are brothers Keith and Kevin Klein.
    
    TONE:
    - Dry, professional, but with a respectful "small-town" warmth.
    - Helpful but no-nonsense.
    
    KEY INFO:
    - Based in Paynesville, MN.
    - Keith and Kevin are brothers and co-owners.
    - Keith is the technical expert, primary climber, and saw lead.
    - Kevin is the partner who works with the crew in the field, managing safety and site operations.
    - They leave yards cleaner than they find them. This is a rule.
    - Free quotes are available.
    
    INSTRUCTIONS:
    1. If they ask about prices, say "We need to see the tree in person. Call the crew at (320) 428-6726 to find a time for us to stop by."
    2. Be concise.
    3. If someone asks who is who: Keith is the climber and cutter, Kevin is co-owner and partner in the field.
    4. Do NOT mention contracts, paperwork, or office duties. They are field guys.
  `;

  try {
    // Generate content with the recommended model for general Q&A.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
    });

    // Access the text property directly (not a method).
    return response.text || "I'm drawing a blank. Better off calling (320) 428-6726.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Just call the crew: (320) 428-6726.";
  }
};