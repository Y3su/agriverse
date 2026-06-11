import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Users, Package, MessageSquare, ArrowLeft, Loader2, AlertCircle, CheckCircle, XCircle, ScrollText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AnnouncementsTab } from "@/components/admin/AnnouncementsTab";
import { ProductManagementTab } from "@/components/admin/ProductManagementTab";
import { ActivityLogsTab } from "@/components/admin/ActivityLogsTab";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Admin() {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "users";
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    pendingProducts: 0,
    totalOrders: 0,
  });
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [pendingProducts, setPendingProducts] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!loading && (!user || (userRole !== "admin" && userRole !== "superadmin"))) {
      navigate("/");
      toast.error("Access denied. Admin only.");
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user && (userRole === "admin" || userRole === "superadmin")) {
      fetchStats();
      fetchUsers();
      fetchProducts();
      fetchCategories();
    }
  }, [user, userRole]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");
    
    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchStats = async () => {
    const [usersData, productsData, pendingData, ordersData] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact" }),
      supabase.from("products").select("id", { count: "exact" }),
      supabase.from("products").select("id", { count: "exact" }).eq("status", "pending"),
      supabase.from("orders").select("id", { count: "exact" }),
    ]);

    setStats({
      totalUsers: usersData.count || 0,
      totalProducts: productsData.count || 0,
      pendingProducts: pendingData.count || 0,
      totalOrders: ordersData.count || 0,
    });
  };

  const fetchUsers = async () => {
    const { data: usersData, error } = await supabase
      .from("profiles")
      .select("*, user_roles!user_roles_user_id_fkey(role)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } else {
      setUsers(usersData || []);
    }
    setLoadingData(false);
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      // Fetch all products for the full list
      const { data: allProducts, error: allError } = await supabase
        .from("products")
        .select("*, profiles!products_seller_id_fkey(full_name, email), categories(name)")
        .order("created_at", { ascending: false });

      if (allError) {
        console.error("Error fetching products:", allError);
        toast.error("Failed to load products");
      } else {
        setProducts(allProducts || []);
        // Filter pending products for the approval tab
        setPendingProducts((allProducts || []).filter(p => p.status === "pending"));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleApproveProduct = async (productId: string) => {
    const { error } = await supabase
      .from("products")
      .update({ status: "approved", approved_at: new Date().toISOString(), approved_by: user?.id })
      .eq("id", productId);

    if (error) {
      toast.error("Failed to approve product");
    } else {
      toast.success("Product approved successfully");
      fetchProducts();
      fetchStats();
    }
  };

  const handleRejectProduct = async (productId: string) => {
    const { error } = await supabase
      .from("products")
      .update({ status: "rejected" })
      .eq("id", productId);

    if (error) {
      toast.error("Failed to reject product");
    } else {
      toast.success("Product rejected");
      fetchProducts();
      fetchStats();
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      toast.error("Failed to delete product");
    } else {
      toast.success("Product deleted successfully");
      fetchProducts();
      fetchStats();
    }
  };

  const handleChangeRole = async (userId: string, newRole: "customer" | "seller" | "admin" | "superadmin") => {
    const { error } = await supabase
      .from("user_roles")
      .update({ role: newRole, approved_by: user?.id, approved_at: new Date().toISOString() })
      .eq("user_id", userId);

    if (error) {
      toast.error("Failed to update role");
    } else {
      toast.success("User role updated successfully");
      fetchUsers();
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading admin dashboard...</p>
      </div>
    );
  }

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back Button and Title */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/marketplace')}
            className="hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">AgriVerse Admin</h1>
            <p className="text-muted-foreground mt-1">Manage your platform efficiently</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-agricultural">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              <div className="h-10 w-10 rounded-full bg-agricultural/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-agricultural" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">Listed in marketplace</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-harvest">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Products</CardTitle>
              <div className="h-10 w-10 rounded-full bg-harvest/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-harvest" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stats.pendingProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-earth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <div className="h-10 w-10 rounded-full bg-earth/10 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-earth" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">Completed transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className={`grid w-full max-w-4xl mb-6 ${userRole === "superadmin" ? "grid-cols-5" : "grid-cols-4"}`}>
            <TabsTrigger value="users" className="font-medium">
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Manage</span> Users
            </TabsTrigger>
            <TabsTrigger value="products" className="font-medium">
              <Package className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Product</span> Approval
            </TabsTrigger>
            <TabsTrigger value="manage-products" className="font-medium">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Manage</span> Products
            </TabsTrigger>
            <TabsTrigger value="announcements" className="font-medium">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Announce</span>
            </TabsTrigger>
            {userRole === "superadmin" && (
              <TabsTrigger value="activity-logs" className="font-medium">
                <ScrollText className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Activity</span> Logs
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="users" className="mt-0">
            <Card className="border-t-4 border-t-primary">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">User Management</CardTitle>
                <CardDescription className="text-base">View and manage user roles across the platform</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Full Name</TableHead>
                      <TableHead className="font-semibold">Current Role</TableHead>
                      <TableHead className="font-semibold">Change Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{user.email}</TableCell>
                          <TableCell>{user.full_name || <span className="text-muted-foreground">N/A</span>}</TableCell>
                          <TableCell>
                            <Badge variant={user.user_roles?.[0]?.role === "admin" || user.user_roles?.[0]?.role === "superadmin" ? "default" : "secondary"} className="capitalize">
                              {user.user_roles?.[0]?.role || "customer"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={user.user_roles?.[0]?.role || "customer"}
                              onValueChange={(value) => handleChangeRole(user.id, value as "customer" | "seller" | "admin" | "superadmin")}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="customer">Customer</SelectItem>
                                <SelectItem value="seller">Seller</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                {userRole === "superadmin" && <SelectItem value="superadmin">Superadmin</SelectItem>}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-0">
            <Card className="border-t-4 border-t-agricultural">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Product Approval</CardTitle>
                    <CardDescription className="text-base">Review and manage pending product submissions</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {pendingProducts.length} pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                {loadingProducts ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading products...</p>
                  </div>
                ) : pendingProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">All caught up!</p>
                      <p className="text-muted-foreground">No pending products to review</p>
                    </div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold">Product Name</TableHead>
                        <TableHead className="font-semibold">Seller</TableHead>
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold">Price</TableHead>
                        <TableHead className="font-semibold">Stock</TableHead>
                        <TableHead className="font-semibold w-[220px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {product.image_url ? (
                                <img 
                                  src={product.image_url} 
                                  alt={product.name}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                  <Package className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.profiles?.full_name || product.profiles?.email || "Unknown"}</TableCell>
                          <TableCell>{product.categories?.name || <span className="text-muted-foreground">N/A</span>}</TableCell>
                          <TableCell className="font-semibold">₱{parseFloat(product.price).toLocaleString()}</TableCell>
                          <TableCell>{product.stock_quantity}</TableCell>
                          <TableCell>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveProduct(product.id)}
                                className="gap-1"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Approve
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="gap-1">
                                    <XCircle className="h-4 w-4" />
                                    Reject
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Reject Product</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to reject "{product.name}"? The seller will be notified.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleRejectProduct(product.id)}>
                                      Reject
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="mt-0">
            <AnnouncementsTab />
          </TabsContent>

          <TabsContent value="manage-products" className="mt-0">
            <ProductManagementTab 
              products={products}
              categories={categories}
              onRefresh={() => { fetchProducts(); fetchStats(); }}
              loading={loadingProducts}
            />
          </TabsContent>

          {userRole === "superadmin" && (
            <TabsContent value="activity-logs" className="mt-0">
              <ActivityLogsTab />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
