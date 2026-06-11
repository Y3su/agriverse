import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/Footer";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ProductDetailModal } from "@/components/marketplace/ProductDetailModal";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Plus, Settings, ShoppingBag, Loader2, ShoppingCart, Eye, EyeOff } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight?: number;
  stock_quantity: number;
  image_url?: string;
  categories: {
    name: string;
  };
  profiles: {
    full_name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

const Marketplace = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        // Sort categories so "Others" is always last
        const sorted = (data || []).sort((a, b) => {
          if (a.name.toLowerCase() === 'others') return 1;
          if (b.name.toLowerCase() === 'others') return -1;
          return a.name.localeCompare(b.name);
        });
        setCategories(sorted);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          price,
          weight,
          stock_quantity,
          image_url,
          categories!category_id(name),
          profiles!seller_id(full_name)
        `)
        .eq('status', 'approved')
        .eq('is_available', true);

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'name_asc':
          query = query.order('name', { ascending: true });
          break;
        case 'name_desc':
          query = query.order('name', { ascending: false });
          break;
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products.",
          variant: "destructive",
        });
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock_quantity: product.stock_quantity,
      seller_name: product.profiles.full_name,
      seller_id: "", // We'll need to add seller_id to the Product interface
    });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const isAdmin = userRole === 'admin' || userRole === 'superadmin';
  const isSeller = userRole === 'seller' || isAdmin;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation>
        {user && (
          <Link to="/cart" className="relative">
            <Button variant="outline" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </Link>
        )}
      </Navigation>
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-agricultural-light bg-clip-text text-transparent">
                AgriVerse Marketplace
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover fresh products from local farmers and cooperatives
              </p>
            </div>
            
            {/* Action Buttons - Modern Card Grid */}
            {user && (
              <div className={`flex gap-3 mx-auto justify-center ${
                userRole === 'customer' 
                  ? 'max-w-xs' 
                  : 'max-w-fit'
              }`}>
                {isSeller && (
                  <Link to="/add-product" className="group w-36">
                    <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Plus className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-semibold text-sm">Add Product</span>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/admin" className="group w-36">
                    <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Settings className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-semibold text-sm">Admin Panel</span>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                <Link to="/my-orders" className="group w-36">
                  <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <ShoppingBag className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-semibold text-sm">My Orders</span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            )}
          </div>

          {/* User Role Info */}
          {user && (
            <Card className="mb-6 bg-gradient-to-r from-primary/10 via-agricultural-light/5 to-primary/10 border-primary/20">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {userRole?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Logged in as</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          <span className="text-primary capitalize">{userRole}</span>
                          <span className="normal-case"> - {showEmail ? user.email : '••••••••••••'}</span>
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setShowEmail(!showEmail)}
                        >
                          {showEmail ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {userRole === 'customer' && (
                    <div className="text-center md:text-right">
                      <p className="text-sm text-muted-foreground mb-1">Want to become a seller?</p>
                      <Link to="/contact-admin">
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-primary hover:text-primary/80"
                        >
                          Contact Admin →
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {!user && (
            <Card className="mb-6 bg-gradient-to-br from-primary/5 via-agricultural-light/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Welcome to AgriVerse Marketplace</h3>
                  <p className="text-muted-foreground mb-6">
                    Sign up to access all marketplace features, manage your profile, and connect with the agricultural community.
                  </p>
                  <Link to="/auth">
                    <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                      Sign Up / Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <MarketplaceFilters
            categories={categories}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            sortBy={sortBy}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchTerm}
            onSortChange={setSortBy}
          />

          {/* Products Grid */}
          <div className="mt-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video bg-muted animate-pulse" />
                    <CardContent className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">🌾</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedCategory
                    ? "Try adjusting your search filters to find more products."
                    : "Be the first to add products to the marketplace!"}
                </p>
                {isSeller && (
                  <Link to="/add-product">
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Product
                    </Button>
                  </Link>
                )}
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />
      
      <Footer />
    </div>
  );
};

export default Marketplace;