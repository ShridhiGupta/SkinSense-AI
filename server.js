const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", message: "GlowBot backend is running" });
});

const GROQ_API_KEY = process.env.GROQ_API_KEY || null;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

if (!GROQ_API_KEY) {
  console.log("\n" + "=".repeat(70));
  console.log("⚠️  GROQ API KEY NOT SET - Using Mock Responses");
  console.log("=".repeat(70));
  console.log("To use real AI responses, set your Groq API key:");
  console.log("  Windows CMD: set GROQ_API_KEY=your_api_key");
  console.log("  PowerShell: $env:GROQ_API_KEY='your_api_key'");
  console.log("Get a free key at: https://groq.com");
  console.log("=".repeat(70) + "\n");
}

const BEAUTY_SYSTEM_INSTRUCTION = `You are GlowBot, a friendly and knowledgeable skincare and beauty wellness advisor. Your primary purpose is to help users develop healthy skincare routines, discover home remedies, and receive personalized beauty advice.

## Primary Focus
You specialize in:
- Personalized skincare routines (morning and evening steps)
- Home remedies using natural ingredients for common beauty issues
- Product recommendations based on skin type and concerns
- Skincare tips and wellness guidance
- Self-care and relaxation practices

## Key Responsibilities
1. **Skincare Routines**: Provide clear step-by-step skincare routines (Cleanser → Toner → Moisturizer → Sunscreen)
2. **Home Remedies**: Suggest natural, accessible home-based ingredients first (honey, aloe vera, cucumber, lemon, etc.)
3. **Skin Type Personalization**: Ask about skin type (oily, dry, sensitive, combination) to provide tailored advice
4. **Product Recommendations**: Suggest affordable, natural, and accessible beauty products when relevant
5. **Wellness Integration**: Include daily affirmations, meditation tips, hydration reminders, and sleep guidance
6. **Gentle & Supportive Tone**: Be encouraging, non-judgmental, and promote self-confidence

## Restrictions & Safety
1. **Medical Disclaimers**: For skin diseases, infections, or medical conditions (eczema, psoriasis, etc.), respond with:
   "I can share skincare and wellness tips, but for this concern, it's best to consult a certified dermatologist for proper guidance 💬."
2. **Patch Testing**: Always remind users to do patch tests before trying new products
3. **Professional Consultation**: Include disclaimers like "Everyone's skin reacts differently — it's best to do a patch test or check with a dermatologist before trying new products."
4. **Out of Scope**: Politely decline non-beauty-related medical advice

## Response Style
- Use short, actionable steps (e.g., "Step 1: Cleanse… Step 2: Moisturize…")
- Format routines as numbered steps or cards
- Use relevant emojis moderately (🌸💧✨💆‍♀️🧴🍯)
- Include gentle reminders ("Stay hydrated 💧", "Take 5 minutes to relax 🌿")
- Keep a warm, supportive, spa-like tone

## Example Interactions
User: "Create a morning routine for oily skin."
Response: "Here's a perfect morning routine for oily skin ✨

Step 1: 💦 Gentle Foam Cleanser (removes oil without drying)
Step 2: 🌿 Aloe Vera Toner (balances skin)
Step 3: 💧 Lightweight Moisturizer (oil-free or gel-based)
Step 4: 🌞 SPF 30+ Sunscreen (matte finish preferred)

Tip: Use lukewarm water and avoid overwashing. Everyone's skin reacts differently — do a patch test first! 🌸"

User: "Home remedy for dark circles?"
Response: "Try these natural home remedies for dark circles 🥒✨

1. Chilled Cucumber Slices (10 mins daily)
2. Aloe Vera Gel + Vitamin E Oil (apply before bed)
3. Cold Tea Bags (black or green, refrigerated)
4. Honey + Lemon Mask (mix 1:1, leave 10 mins)

Remember: Everyone's skin reacts differently — patch test first! Consistency is key 💙"`;

let conversationHistory = [];

const mockResponses = {
  "dry_skin": "✨ **Skincare Routine for Dry Skin** ✨\n\n🌅 **Morning (5 mins):**\nStep 1: 💦 Gentle Hydrating Cleanser (avoid hot water)\nStep 2: 🌿 Hydrating Toner or essence\nStep 3: 💧 Rich Moisturizer (ceramide-based)\nStep 4: 🌞 SPF 30+ Sunscreen\n\n🌙 **Evening (5 mins):**\nStep 1: 💦 Gentle Cleanser\nStep 2: 🌿 Hydrating Toner\nStep 3: 💧 Night Cream or Oil\n\n**Home Remedies for Dry Skin:**\n- 🥑 Avocado mask (moisturizing, 15 mins)\n- 🍯 Honey + Oil mask (soothing)\n- 🥛 Milk + Honey (gentle hydration)\n- 🌱 Aloe vera + Coconut oil (nourishing)\n\n⚠️ Everyone's skin reacts differently — patch test first! 🌸",
  
  "oily_skin": "✨ **Skincare Routine for Oily Skin** ✨\n\n🌅 **Morning (5 mins):**\nStep 1: 💦 Gentle Foam Cleanser (removes oil)\nStep 2: 🌿 Lightweight Toner (oil-free)\nStep 3: 💧 Lightweight Gel Moisturizer\nStep 4: 🌞 Matte SPF 30+\n\n🌙 **Evening (5 mins):**\nStep 1: 💦 Foam Cleanser\nStep 2: 🌿 Balancing Toner\nStep 3: 💧 Lightweight Night Serum\n\n**Home Remedies for Oily Skin:**\n- 🍋 Lemon + Honey mask (oil control)\n- 🥒 Cucumber + Aloe (cooling)\n- 🍵 Green tea toner (antioxidant)\n- 🥄 Multani mitti mask (purifying, 10 mins)\n\n⚠️ Always patch test! Stay hydrated 💧",
  
  "sensitive_skin": "✨ **Skincare Routine for Sensitive Skin** ✨\n\n🌅 **Morning (5 mins):**\nStep 1: 💦 Ultra-Gentle Cleanser (fragrance-free)\nStep 2: 🌿 Calming Toner (no alcohol)\nStep 3: 💧 Gentle Moisturizer (hypoallergenic)\nStep 4: 🌞 Mineral SPF 30+\n\n🌙 **Evening (5 mins):**\nStep 1: 💦 Gentle Cleanser\nStep 2: 🌿 Calming Toner\nStep 3: 💧 Soothing Night Cream\n\n**Home Remedies for Sensitive Skin:**\n- 🌱 Aloe vera (pure, cooling)\n- 🥛 Milk compress (soothing)\n- 🍵 Chamomile tea (calming)\n- 🥒 Cucumber (hydrating, cooling)\n\n⚠️ Test on small area first! Avoid fragrance. Consult dermatologist if inflamed. 🌸",
  
  "product_feedback": "💚 Great choices! Moisturizer + SPF 50 is perfect for daily protection. Multani mitti is excellent for cleansing!\n\n**Tips for Your Routine:**\n- Use moisturizer while skin is still damp (better absorption)\n- Apply SPF generously (¼ teaspoon for face)\n- Reapply SPF every 2-3 hours if outdoors\n- Multani mitti: 1-2 times weekly max (can dry skin if overused)\n\n**Suggested Additions:**\n- Gentle cleanser (morning & night)\n- Hydrating toner for better moisture lock\n- Night serum or oil for deep hydration\n\nConsistency is key! See results in 4-6 weeks. 🌸",
  
  "routine": "🌅 **Morning Routine (5 mins):** Cleanse → Tone → Moisturize → SPF\n🌙 **Evening Routine (5 mins):** Cleanse → Tone → Treatment → Night Cream\n\n✨ **Weekly Care:** Add a gentle mask 1-2 times per week for extra nourishment!",
  
  "remedy": "🌿 **Natural Home Remedies** 🌿\n\n1. 🥒 Chilled Cucumber - Great for dark circles and puffiness (10 mins daily)\n2. 🍯 Honey Mask - Moisturizing and soothing (apply for 15 mins)\n3. 🌱 Aloe Vera - Calming for irritation and redness\n4. 🍋 Lemon + Honey - Brightening face mask (mix 1:1)\n\n⚠️ Always patch test first! Everyone's skin reacts differently.",
  
  "default": "💚 Hello! I'm SkinSense AI, your beauty advisor! I can help with:\n- Skincare routines for your skin type\n- Natural home remedies for beauty concerns\n- Product recommendations\n- Self-care and wellness tips\n\nWhat's your skin type or concern today? (oily, dry, sensitive, combination)"
};

function getMockResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Check for product mentions (most specific first)
  if (message.includes("moisturizer") && (message.includes("spf") || message.includes("sunscreen") || message.includes("multani"))) {
    console.log("[DEBUG] Detected product feedback pattern");
    return mockResponses.product_feedback;
  }
  
  if (message.includes("moisturizer") || message.includes("sunscreen") || message.includes("spf50") || message.includes("multani") || message.includes("pa")) {
    console.log("[DEBUG] Detected single product mention");
    return mockResponses.product_feedback;
  }
  
  if (message.includes("dry")) return mockResponses.dry_skin;
  if (message.includes("oily")) return mockResponses.oily_skin;
  if (message.includes("sensitive")) return mockResponses.sensitive_skin;
  if (message.includes("morning") || message.includes("evening") || message.includes("routine")) return mockResponses.routine;
  if (message.includes("remedy") || message.includes("dark circle") || message.includes("acne")) return mockResponses.remedy;
  
  console.log("[DEBUG] No pattern matched, using default");
  return mockResponses.default;
}

async function callGroqAPI(userMessage) {
  conversationHistory.push({
    role: "user",
    content: userMessage,
  });

  try {
    // If no API key, use mock response
    if (!GROQ_API_KEY) {
      console.log("[INFO] Using mock response (no API key set)");
      const mockResponse = getMockResponse(userMessage);
      conversationHistory.push({
        role: "assistant",
        content: mockResponse,
      });
      return mockResponse;
    }

    console.log("\n[DEBUG] Sending request to Groq API...");
    console.log("[DEBUG] API Key:", GROQ_API_KEY.substring(0, 10) + "...");
    console.log("[DEBUG] Message:", userMessage);
    
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: BEAUTY_SYSTEM_INSTRUCTION,
          },
          ...conversationHistory,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    console.log("[DEBUG] Response Status:", response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("[ERROR] API Status:", response.status);
      console.error("[ERROR] API Response:", errorData);
      throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorData}`);
    }

    const data = await response.json();
    console.log("[DEBUG] Response received successfully");
    
    const assistantMessage = data.choices[0].message.content;

    conversationHistory.push({
      role: "assistant",
      content: assistantMessage,
    });

    return assistantMessage;
  } catch (error) {
    console.error("\n[CRITICAL ERROR] Groq API Error:", error.message);
    console.error(error);
    throw error;
  }
}

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  console.log("\n[INFO] Received message:", message);
  
  try {
    const response = await callGroqAPI(message);
    console.log("[INFO] Sending response to client");
    res.json({ text: response });
  } catch (err) {
    console.error("[ERROR] Chat endpoint error:", err.message);
    res.status(500).json({ error: "AI error processing your request. Please check the server logs." });
  }
});

app.post("/api/new-chat", (req, res) => {
  // Reset conversation history for a new chat session
  conversationHistory = [];
  res.json({ status: "New chat session created" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;