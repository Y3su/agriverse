import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft, CreditCard, Banknote, Loader2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Valid Philippine mobile prefixes (Globe, Smart, Sun, TNT, DITO, etc.)
const VALID_PH_PREFIXES = [
  // Globe/TM
  "0905", "0906", "0915", "0916", "0917", "0926", "0927", "0935", "0936", "0937",
  "0945", "0953", "0954", "0955", "0956", "0965", "0966", "0967", "0975", "0976",
  "0977", "0978", "0979", "0994", "0995", "0996", "0997",
  // Smart/TNT/Sun
  "0908", "0909", "0910", "0911", "0912", "0913", "0914", "0918", "0919", "0920",
  "0921", "0922", "0923", "0924", "0925", "0928", "0929", "0930", "0931", "0932",
  "0933", "0934", "0938", "0939", "0940", "0941", "0942", "0943", "0944", "0946",
  "0947", "0948", "0949", "0950", "0951", "0961", "0963", "0968", "0969", "0970",
  "0971", "0973", "0974", "0981", "0989", "0992", "0998", "0999",
  // DITO
  "0991", "0992", "0993", "0895", "0896", "0897", "0898"
];

const isValidPhilippineNumber = (phone: string): boolean => {
  if (phone.length !== 11) return false;
  if (!phone.startsWith("09") && !phone.startsWith("08")) return false;
  const prefix = phone.substring(0, 4);
  return VALID_PH_PREFIXES.includes(prefix);
};

export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"gcash" | "cod" | "pickup">("gcash");
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    notes: "",
  });

  // Check for payment cancellation
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'cancelled') {
      toast.error("Payment was cancelled. You can try again.");
      // Remove the payment parameter from URL
      searchParams.delete('payment');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validation based on input type
    if (name === "phone") {
      // Only allow numbers and must start with 09
      if (value && !/^\d*$/.test(value)) return;
      // Enforce starting with 09
      if (value.length === 1 && value !== "0") return;
      if (value.length === 2 && value !== "09") return;
    } else if (name === "zipCode") {
      // Only allow numbers
      if (value && !/^\d*$/.test(value)) return;
    } else if (name === "fullName" || name === "city" || name === "province") {
      // Only allow letters and spaces
      if (value && !/^[a-zA-Z\s]*$/.test(value)) return;
    } else if (name === "address") {
      // Allow letters, numbers, spaces, and common punctuation
      if (value && !/^[a-zA-Z0-9\s,.\-#/]*$/.test(value)) return;
    }
    
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      navigate("/auth");
      return;
    }

    // Validation
    if (paymentMethod !== "pickup") {
      if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city || !shippingInfo.province || !shippingInfo.zipCode) {
        toast.error("Please fill in all required shipping information");
        return;
      }

      if (!isValidPhilippineNumber(shippingInfo.phone)) {
        toast.error("Please enter a valid Philippine mobile number");
        return;
      }
    } else {
      // For pickup, only require name and phone
      if (!shippingInfo.fullName || !shippingInfo.phone) {
        toast.error("Please provide your name and phone number");
        return;
      }

      if (!isValidPhilippineNumber(shippingInfo.phone)) {
        toast.error("Please enter a valid Philippine mobile number");
        return;
      }
    }

    setLoading(true);

    try {
      const fullAddress = paymentMethod === "pickup" 
        ? `PICKUP: ${shippingInfo.fullName} - ${shippingInfo.phone}${shippingInfo.notes ? ` (${shippingInfo.notes})` : ''}`
        : `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.province} ${shippingInfo.zipCode}`;
      const totalAmount = getTotalPrice();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          shipping_address: fullAddress,
          status: paymentMethod === "gcash" ? "pending_payment" : "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Reduce stock for each product
      for (const item of cart) {
        // Get current stock
        const { data: productData } = await supabase
          .from("products")
          .select("stock_quantity")
          .eq("id", item.productId)
          .single();
        
        if (productData) {
          const newStock = Math.max(0, productData.stock_quantity - item.quantity);
          await supabase
            .from("products")
            .update({ stock_quantity: newStock })
            .eq("id", item.productId);
        }
      }

      if (paymentMethod === "gcash") {
        // Get the base URL for redirect URLs
        const baseUrl = window.location.origin;
        
        // Call GCash payment edge function
        const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
          "gcash-payment",
          {
            body: {
              orderId: order.id,
              amount: totalAmount,
              customerName: shippingInfo.fullName,
              customerEmail: user.email,
              customerPhone: shippingInfo.phone,
              baseUrl: baseUrl,
            },
          }
        );

        if (paymentError) {
          console.error("Payment error:", paymentError);
          toast.error("Payment processing failed. Order created but payment pending.");
        } else if (paymentData?.success && paymentData?.checkoutUrl) {
          // Clear cart before redirect
          clearCart();
          toast.success("Redirecting to GCash payment...");
          // Redirect to GCash payment page
          window.location.href = paymentData.checkoutUrl;
          return;
        }
      }

      // Clear cart and redirect
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/my-orders");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <Link to="/cart">
              <Button variant="ghost" className="mb-4 hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{paymentMethod === "pickup" ? "Contact Information" : "Shipping Information"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        placeholder="John Dela Cruz"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="09123456789"
                        required
                        maxLength={11}
                      />
                    </div>
                  </div>

                  {paymentMethod !== "pickup" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleInputChange}
                          placeholder="123 Main Street, Barangay"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleInputChange}
                            placeholder="Malolos"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="province">Province *</Label>
                          <Input
                            id="province"
                            name="province"
                            value={shippingInfo.province}
                            onChange={handleInputChange}
                            placeholder="Bulacan"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code *</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={handleInputChange}
                            placeholder="3000"
                            required
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">{paymentMethod === "pickup" ? "Pick-up Notes (Optional)" : "Delivery Notes (Optional)"}</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={shippingInfo.notes}
                      onChange={handleInputChange}
                      placeholder={paymentMethod === "pickup" ? "Preferred pick-up time or any special requests..." : "Any special instructions for delivery..."}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "gcash" | "cod" | "pickup")}>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent" onClick={() => setPaymentMethod("gcash")}>
                      <RadioGroupItem value="gcash" id="gcash" />
                      <Label htmlFor="gcash" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold">GCash Payment</p>
                          <p className="text-sm text-muted-foreground">Pay securely using GCash</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent" onClick={() => setPaymentMethod("cod")}>
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Banknote className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent" onClick={() => setPaymentMethod("pickup")}>
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex items-center gap-3 cursor-pointer flex-1">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold">Pick-up at Seller Location</p>
                          <p className="text-sm text-muted-foreground">Arrange pick-up directly with seller - No delivery fee</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">₱{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₱{getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping Fee</span>
                      <span className="text-green-600">To be calculated</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₱{getTotalPrice().toFixed(2)}</span>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Place Order - ₱${getTotalPrice().toFixed(2)}`
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing this order, you agree to our Terms & Conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
