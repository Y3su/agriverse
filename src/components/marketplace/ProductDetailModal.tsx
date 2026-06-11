import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ZoomIn, ZoomOut, Star, Package, Weight, PhilippinePeso } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) return null;

  // Use only the uploaded product image, or a placeholder if none exists
  const productImage = product.image_url || "/placeholder.svg";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative group">
              <div 
                className={cn(
                  "aspect-square bg-muted rounded-lg overflow-hidden transition-all duration-300",
                  isZoomed && "fixed inset-4 z-50 aspect-auto"
                )}
              >
                <img
                  src={productImage}
                  alt={product.name}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-300",
                    isZoomed ? "object-contain cursor-zoom-out" : "group-hover:scale-105"
                  )}
                  onClick={() => isZoomed && setIsZoomed(false)}
                />
                
                {/* Zoom button */}
                {!isZoomed && (
                  <button
                    onClick={() => setIsZoomed(true)}
                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>
                )}
                
                {/* Close zoom button */}
                {isZoomed && (
                  <button
                    onClick={() => setIsZoomed(false)}
                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-50"
                  >
                    <ZoomOut className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.categories.name}
              </Badge>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <PhilippinePeso className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">₱{product.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Price</p>
                </CardContent>
              </Card>

              {product.weight && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Weight className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{product.weight}kg</p>
                    <p className="text-sm text-muted-foreground">Weight</p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-4 text-center">
                  <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className={cn(
                    "text-2xl font-bold",
                    product.stock_quantity > 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {product.stock_quantity}
                  </p>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Seller Info */}
            <div className="space-y-2">
              <h4 className="font-semibold">Seller Information</h4>
              <p className="text-muted-foreground">
                Sold by <span className="font-medium text-foreground">{product.profiles.full_name}</span>
              </p>
            </div>

            {/* Action Button */}
            <Button
              size="lg"
              className="w-full"
              onClick={() => onAddToCart?.(product)}
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>

        {/* Zoom overlay background */}
        {isZoomed && (
          <div 
            className="fixed inset-0 bg-black/80 z-40"
            onClick={() => setIsZoomed(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}