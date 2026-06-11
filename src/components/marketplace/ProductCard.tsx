import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer group transform-gpu">
      <CardHeader className="p-0">
        <div className="aspect-video bg-muted/20 flex items-center justify-center relative overflow-hidden">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className={`${product.image_url ? 'hidden' : 'flex'} absolute inset-0 items-center justify-center text-muted-foreground text-4xl font-bold bg-muted/10`}
            style={{ display: product.image_url ? 'none' : 'flex' }}
          >
            {product.name.charAt(0)}
          </div>
          <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm shadow-lg transition-all duration-300 group-hover:scale-105">
            {product.categories.name}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ₱{product.price.toFixed(2)}
            </span>
            {product.weight && (
              <span className="text-sm text-muted-foreground">
                {product.weight}kg
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {t("product.by")} {product.profiles.full_name}
            </span>
            <span className={`${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock_quantity > 0 ? `${product.stock_quantity} ${t("product.inStock")}` : t("product.outOfStock")}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails?.(product)}
          className="flex-1"
        >
          <Eye className="mr-2 h-4 w-4" />
          {t("product.view")}
        </Button>
        <Button 
          size="sm"
          onClick={() => onAddToCart?.(product)}
          disabled={product.stock_quantity === 0}
          className="flex-1"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t("product.addToCart")}
        </Button>
      </CardFooter>
    </Card>
  );
}