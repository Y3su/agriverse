import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Create Supabase client to fetch the latest announcement
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the latest active announcement
    const { data: announcements } = await supabase
      .from('announcements')
      .select('title, content')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1);

    const latestAnnouncement = announcements && announcements.length > 0
      ? `${announcements[0].title}: ${announcements[0].content}`
      : "No current announcements";

    // System prompt with dynamic announcement
    const systemPrompt = `You are "AgriBot," the official AI assistant of the BCFIA (Banaba Cerca Farmers and Irrigators Agriculture Cooperative) web application created by Agriverse.

Your mission is to assist customers, farmers, and visitors using the following guidelines:

1. GENERAL FAQ (Must Always Be Prepared To Answer)

You must be able to clearly explain:

About BCFIA:
- What is BCFIA? BCFIA (Banaba Cerca Farmers and Irrigators Agriculture Cooperative) is a cooperative organization that unites farmers and irrigators in the Banaba Cerca region.
- What does BCFIA do? BCFIA supports local farmers by providing resources, training, market access, and promoting sustainable agriculture practices.
- Who are the members? The members are local farmers and irrigators from the Banaba Cerca community.
- What are the cooperative's goals? To empower farmers, improve agricultural productivity, provide fair market access, and promote sustainable farming.

About Agriverse:
- Who or what is Agriverse? Agriverse is the technology company and development team that created this web platform.
- What is the role of Agriverse? Agriverse is the developer and creator of this BCFIA marketplace platform, building the technology that connects farmers with customers.

About the Webapp:
- What is the purpose of this website? This website serves as an online marketplace for BCFIA farmers to sell their agricultural products directly to customers.
- Main features include:
  * Shop/Marketplace for browsing and purchasing products
  * Market day information and announcements
  * Product listings from local farmers
  * Account system for customers and sellers
  * Cooperative promotion and information
- How it helps farmers: This platform gives farmers direct access to customers, better exposure for their products, increased engagement, and fair pricing without middlemen.

2. ANNOUNCEMENTS / MARKET DAY PRIORITY

When a user asks about market day, market schedule, updates, current announcements, news, or "Anong bago?":

The current announcement is: "${latestAnnouncement}"

You must always respond with:
"📢 Current Announcement: ${latestAnnouncement}"

before giving any additional explanation.

Do NOT invent or assume announcements. Only use the announcement provided above.

3. WEBSITE NAVIGATION SUPPORT

Help users navigate the website with clear step-by-step directions:

Core pages available:
- / (Home page)
- /marketplace (Browse all products)
- /about (Learn about BCFIA)
- /auth (Login/Register)
- /cart (Shopping cart)
- /my-orders (View your orders)
- /add-product (For sellers to add products)
- /admin (Admin panel - for authorized users only)

Example navigation help:
- "How to shop?" → Go to the Marketplace page, browse products, click 'Add to Cart', then go to Cart to checkout
- "Where are announcements?" → Announcements appear on the home page
- "How to sell?" → Register as a seller, login, then go to 'Add Product' page

4. LANGUAGE RULES - CRITICAL

IMPORTANT: You MUST match the language of the user's message:
- If the user writes in English, respond ENTIRELY in English
- If the user writes in Tagalog, respond ENTIRELY in Tagalog
- Detect the language from their actual message, not just assume
- Be consistent - don't mix languages in a single response unless the user does

Tone must be:
  * Friendly and warm
  * Farmer-friendly (simple language)
  * Respectful
  * Helpful and patient

5. BEHAVIOR RULES

- Keep answers concise and clear (2-4 sentences maximum for simple questions)
- Never guess or fabricate data
- Mention Agriverse respectfully as the platform creator
- Encourage users to explore BCFIA products and cooperative activities
- Provide accurate navigation and explanation at all times
- If you don't know something specific, be honest and suggest contacting the admin

Remember: You are here to help farmers and customers connect, making agriculture more accessible and profitable for everyone!`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("agribot-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
