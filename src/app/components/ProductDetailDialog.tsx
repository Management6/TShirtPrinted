import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Product } from "./ProductCard";

const COLOR_MAP: Record<string, string> = {
  White: "#ffffff",
  Black: "#000000",
  Red: "#dc2626",
  Royal: "#4169e1",
  Sand: "#f5e0c3",
  Ash: "#d4d4d4",
  Purple: "#7c3aed",
};

// BrisVegas variant prices (AUD) keyed by "Color-Size"
const BRISVEGAS_PRICES: Record<string, number> = {
  "White-S": 42.46,
  "White-M": 42.46,
  "White-L": 42.46,
  "White-XL": 42.46,
  "White-2XL": 46.64,
  "White-3XL": 50.49,
  "White-4XL": 61.9,
  "White-5XL": 66.31,

  "Sand-S": 49.18,
  "Sand-M": 49.18,
  "Sand-L": 49.18,
  "Sand-XL": 49.18,
  "Sand-2XL": 53.96,
  "Sand-3XL": 58.39,
  "Sand-4XL": 62.68,
  "Sand-5XL": 67.09,

  "Ash-S": 49.05,
  "Ash-M": 49.05,
  "Ash-L": 49.05,
  "Ash-XL": 49.05,
  "Ash-2XL": 53.84,
  "Ash-3XL": 58.26,
  "Ash-4XL": 62.68,
  "Ash-5XL": 67.09,

  "Royal-S": 43.15,
  "Royal-M": 43.15,
  "Royal-L": 43.15,
  "Royal-XL": 43.15,
  "Royal-2XL": 47.31,
  "Royal-3XL": 51.16,
  "Royal-4XL": 62.68,
  "Royal-5XL": 67.09,

  "Red-S": 43.15,
  "Red-M": 43.15,
  "Red-L": 43.15,
  "Red-XL": 43.15,
  "Red-2XL": 47.31,
  "Red-3XL": 51.16,
  "Red-4XL": 62.68,
  "Red-5XL": 67.09,

  "Black-S": 42.46,
  "Black-M": 42.46,
  "Black-L": 42.46,
  "Black-XL": 42.46,
  "Black-2XL": 46.64,
  "Black-3XL": 50.49,
  "Black-4XL": 61.9,
  "Black-5XL": 66.31,

  "Purple-S": 43.15,
  "Purple-M": 43.15,
  "Purple-L": 43.15,
  "Purple-XL": 43.15,
  "Purple-2XL": 47.31,
  "Purple-3XL": 51.16,
  "Purple-4XL": 62.68,
  "Purple-5XL": 67.09,
};

interface ProductDetailDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export function ProductDetailDialog({ product, isOpen, onClose, onAddToCart }: ProductDetailDialogProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<0 | 1>(0);

  useEffect(() => {
    if (!isOpen) {
      setIsLightboxOpen(false);
      setLightboxIndex(0);
      setSelectedSize("");
      setSelectedColor("");
    }
  }, [isOpen]);

  if (!product) return null;

  const getDisplayPrice = () => {
    if (product.id === 1 && selectedColor && selectedSize) {
      const key = `${selectedColor}-${selectedSize}`;
      const variantPrice = BRISVEGAS_PRICES[key];
      if (variantPrice) {
        return variantPrice;
      }
    }
    return product.price;
  };

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      onAddToCart(product, selectedSize, selectedColor);
      onClose();
    }
  };

  const getFrontImage = () => {
    if (product.colorImages && selectedColor && product.colorImages[selectedColor]) {
      return product.colorImages[selectedColor];
    }
    // Default to white front if available, else product.image
    if (product.colorImages && product.colorImages["White"]) {
      return product.colorImages["White"];
    }
    return product.image;
  };

  const getBackImage = () => {
    if (product.colorBackImages && selectedColor && product.colorBackImages[selectedColor]) {
      return product.colorBackImages[selectedColor];
    }
    if (product.colorBackImages && product.colorBackImages["White"]) {
      return product.colorBackImages["White"];
    }
    // Fallback: reuse front image if no back available
    return getFrontImage();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={getFrontImage()}
                alt={`${product.name} front`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => {
                  setLightboxIndex(0);
                  setIsLightboxOpen(true);
                }}
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={getBackImage()}
                alt={`${product.name} back`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => {
                  setLightboxIndex(1);
                  setIsLightboxOpen(true);
                }}
              />
            </div>
          </div>
          
          <div className="space-y-6 md:sticky md:top-6">
            <div>
              <Badge>{product.category}</Badge>
            </div>
            
            <div>
              <span className="text-3xl">${getDisplayPrice().toFixed(2)}</span>
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
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className="flex flex-col items-center gap-1 text-xs text-gray-600 focus:outline-none"
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? "border-black" : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: COLOR_MAP[color] ?? color.toLowerCase(),
                      }}
                      title={color}
                    />
                    <span>{color}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            {(!selectedSize || !selectedColor) && (
              <p className="text-sm text-gray-500 text-center">
                Please select a size and colour
              </p>
            )}
          </div>
        </div>

        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              type="button"
              className="absolute top-4 right-6 text-white text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
            >
              ×
            </button>
            <button
              type="button"
              className="absolute left-4 md:left-8 text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex === 0 ? 1 : 0);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-4 md:right-8 text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex === 0 ? 1 : 0);
              }}
            >
              ›
            </button>
            <img
              src={lightboxIndex === 0 ? getFrontImage() : getBackImage()}
              alt={product.name}
              className="max-h-[70vh] max-w-[80vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
