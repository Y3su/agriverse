import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, MessageCircle, Package, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/Footer";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  created_at: string;
  order_items: {
    id: string;
    quantity: number;
    price_at_purchase: number;
    products: {
      name: string;
      image_url: string;
      seller_id: string;
      profiles: {
        full_name: string;
      };
    };
  }[];
}

export default function MyOrders() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{ type: "seller" | "admin"; name: string; orderId: string } | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      toast.error("Please login to view your orders");
    }
  }, [user, loading, navigate]);

  // Handle payment success
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const orderId = searchParams.get('orderId');
    
    if (paymentStatus === 'success' && orderId && user) {
      // Update order status from pending_payment to pending
      const updateOrderStatus = async () => {
        const { error } = await supabase
          .from('orders')
          .update({ status: 'pending' })
          .eq('id', orderId)
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error updating order status:', error);
          toast.error('Payment successful, but failed to update order status');
        } else {
          toast.success('Payment successful! Your order is being processed.');
          // Refresh orders
          fetchOrders();
        }
      };
      
      updateOrderStatus();
      
      // Remove the payment parameters from URL
      searchParams.delete('payment');
      searchParams.delete('orderId');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, user]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          *,
          products (
            name,
            image_url,
            seller_id,
            profiles!seller_id (
              full_name
            )
          )
        )
      `)
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch orders");
    } else {
      setOrders(data || []);
    }
    setLoadingOrders(false);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    // Here you would implement the actual messaging functionality
    toast.success(`Message sent to ${selectedRecipient?.name}!`);
    setMessage("");
    setMessageDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "default";
      case "pending":
        return "secondary";
      case "pending_payment":
        return "outline";
      case "processing":
        return "default";
      case "shipped":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading || loadingOrders) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/marketplace">
              <Button variant="ghost" className="mb-4 hover:bg-primary/10 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-agricultural-light bg-clip-text text-transparent">
                My Orders
              </h1>
            </div>
            <p className="text-muted-foreground">Track and manage your orders</p>
          </div>

          {orders.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Start shopping to see your orders here
                </p>
                <Link to="/marketplace">
                  <Button size="lg">
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                // Get unique sellers for this order
                const sellersMap = new Map<string, string>();
                order.order_items.forEach((item) => {
                  sellersMap.set(item.products.seller_id, item.products.profiles.full_name);
                });
                const sellers = Array.from(sellersMap.entries()).map(([id, name]) => ({ id, name }));

                return (
                  <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-muted/30">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">Order #{order.id.slice(0, 8).toUpperCase()}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <span>Placed on {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                          </CardDescription>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={getStatusColor(order.status)} className="text-sm px-3 py-1">
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Shipping Address */}
                      <div className="bg-muted/20 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Shipping Address
                        </h4>
                        <p className="text-sm">{order.shipping_address}</p>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors">
                              <div className="relative w-16 h-16 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                {item.products.image_url ? (
                                  <img
                                    src={item.products.image_url}
                                    alt={item.products.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xl font-bold text-muted-foreground">
                                    {item.products.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium truncate">{item.products.name}</h5>
                                <p className="text-sm text-muted-foreground">
                                  Sold by {item.products.profiles.full_name}
                                </p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                                  <span className="text-sm font-medium">₱{Number(item.price_at_purchase).toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-lg text-primary">
                                  ₱{(Number(item.price_at_purchase) * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Order Total & Actions */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-wrap gap-2">
                          {sellers.map((seller, index) => (
                            <Dialog key={index} open={messageDialogOpen && selectedRecipient?.name === seller.name} onOpenChange={setMessageDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedRecipient({ type: "seller", name: seller.name, orderId: order.id })}
                                >
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Message {seller.name}
                                </Button>
                              </DialogTrigger>
                            </Dialog>
                          ))}
                          <Dialog open={messageDialogOpen && selectedRecipient?.type === "admin"} onOpenChange={setMessageDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedRecipient({ type: "admin", name: "Admin", orderId: order.id })}
                              >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Contact Admin
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                          <p className="text-3xl font-bold text-primary">₱{Number(order.total_amount).toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Message Dialog */}
          <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Message to {selectedRecipient?.name}</DialogTitle>
                <DialogDescription>
                  Order #{selectedRecipient?.orderId.slice(0, 8).toUpperCase()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={5}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  );
}
