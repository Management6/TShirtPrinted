import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  // Optional Shopify URLs
  // Example:
  // productUrl: "https://yourstore.myshopify.com/products/brisvegas?variant=50958434042134"
  // buyNowUrl: "https://yourstore.myshopify.com/cart/50958434042134:1"
  productUrl?: string;
  buyNowUrl?: string;
  // Optional per-colour images (e.g. for BrisVegas)
  colorImages?: Record<string, string>;      // front
  colorBackImages?: Record<string, string>;  // back
}

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
      <div onClick={() => onProductClick(product)} className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">{product.sizes.length} sizes</span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onProductClick(product);
          }}
        >
          View Product
        </Button>
      </CardContent>
    </Card>
  );
}
