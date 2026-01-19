import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Product } from "./ProductCard";

interface ProductDetailDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export function ProductDetailDialog({ product, isOpen, onClose, onAddToCart }: ProductDetailDialogProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!product) return null;

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, selectedSize);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <Badge>{product.category}</Badge>
            </div>
            
            <div>
              <span className="text-3xl">${product.price.toFixed(2)}</span>
            </div>
            
            <div>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div>
              <h4 className="mb-3">Select Size</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="w-16"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="mb-3">Available Colors</h4>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            
            {!selectedSize && (
              <p className="text-sm text-gray-500 text-center">Please select a size</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
