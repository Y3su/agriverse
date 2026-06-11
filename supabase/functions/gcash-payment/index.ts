import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT token - authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error("Missing authorization header");
      return new Response(
        JSON.stringify({ error: 'Missing authorization' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's auth token
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { orderId, amount, customerName, customerEmail, customerPhone, baseUrl } = await req.json();

    console.log("GCash payment request from user:", user.id, { orderId, amount, customerName, customerEmail });

    // Validate orderId is provided
    if (!orderId) {
      return new Response(
        JSON.stringify({ error: 'Order ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the order belongs to the authenticated user
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('id, user_id, total_amount, status')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      console.error("Order not found or unauthorized:", orderError?.message);
      return new Response(
        JSON.stringify({ error: 'Order not found or unauthorized' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify amount matches order total (allow small rounding differences)
    if (Math.abs(Number(order.total_amount) - amount) > 0.01) {
      console.error("Amount mismatch:", { orderAmount: order.total_amount, requestedAmount: amount });
      return new Response(
        JSON.stringify({ error: 'Amount mismatch' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify order is in pending status
    if (order.status !== 'pending') {
      console.error("Invalid order status:", order.status);
      return new Response(
        JSON.stringify({ error: 'Order is not in pending status' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get PayMongo secret key from environment
    const paymongoSecretKey = Deno.env.get('PAYMONGO_SECRET_KEY');
    
    if (!paymongoSecretKey) {
      throw new Error('PayMongo secret key is not configured');
    }

    // Convert amount to centavos (PayMongo requires amount in centavos)
    const amountInCentavos = Math.round(amount * 100);

    // Create checkout session payload
    const checkoutSessionData: any = {
      data: {
        attributes: {
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          line_items: [{
            currency: 'PHP',
            amount: amountInCentavos,
            name: `Order #${orderId}`,
            quantity: 1,
            description: 'Agricultural Products Order'
          }],
          payment_method_types: ['gcash'],
          reference_number: orderId,
          description: `Payment for Order #${orderId}`,
          success_url: `${baseUrl}/my-orders?payment=success&orderId=${orderId}`,
          cancel_url: `${baseUrl}/checkout?payment=cancelled`,
          billing: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone
          }
        }
      }
    };

    console.log("Creating PayMongo checkout session with amount:", amountInCentavos, "centavos");

    // Call PayMongo API to create checkout session
    const paymongoResponse = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(paymongoSecretKey + ':')}`,
      },
      body: JSON.stringify(checkoutSessionData),
    });

    if (!paymongoResponse.ok) {
      const errorData = await paymongoResponse.json();
      console.error("PayMongo API error:", errorData);
      throw new Error(errorData.errors?.[0]?.detail || 'Failed to create checkout session');
    }

    const paymongoData = await paymongoResponse.json();
    const checkoutUrl = paymongoData.data.attributes.checkout_url;

    console.log("PayMongo checkout session created successfully:", paymongoData.data.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        checkoutUrl: checkoutUrl,
        sessionId: paymongoData.data.id,
        message: "GCash payment link generated successfully"
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing GCash payment:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to process payment',
        details: 'Please check your payment configuration and try again'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
