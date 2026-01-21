import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";

// Variant mapping for BrisVegas (product id: 1)
const BRISVEGAS_VARIANTS: Record<string, string> = {
  "White-S": "50958434042134",
  "White-M": "50958434074902",
  "White-L": "50958434107670",
  "White-XL": "50958434140438",
  "White-2XL": "50958434173206",
  "White-3XL": "50958434205974",
  "White-4XL": "50958434238742",
  "White-5XL": "50958434271510",

  "Sand-S": "50958434304278",
  "Sand-M": "50958434337046",
  "Sand-L": "50958434369814",
  "Sand-XL": "50958434402582",
  "Sand-2XL": "50958434435350",
  "Sand-3XL": "50958434468118",
  "Sand-4XL": "50958434500886",
  "Sand-5XL": "50958434533654",

  "Ash-S": "50958434566422",
  "Ash-M": "50958434599190",
  "Ash-L": "50958434631958",
  "Ash-XL": "50958434664726",
  "Ash-2XL": "50958434697494",
  "Ash-3XL": "50958434730262",
  "Ash-4XL": "50958434763030",
  "Ash-5XL": "50958434795798",

  "Royal-S": "50958434828566",
  "Royal-M": "50958434861334",
  "Royal-L": "50958434894102",
  "Royal-XL": "50958434926870",
  "Royal-2XL": "50958434959638",
  "Royal-3XL": "50958434992406",
  "Royal-4XL": "50958435025174",
  "Royal-5XL": "50958435057942",

  "Red-S": "50958435090710",
  "Red-M": "50958435123478",
  "Red-L": "50958435156246",
  "Red-XL": "50958435189014",
  "Red-2XL": "50958435221782",
  "Red-3XL": "50958435254550",
  "Red-4XL": "50958435287318",
  "Red-5XL": "50958435320086",

  "Black-S": "50958435352854",
  "Black-M": "50958435385622",
  "Black-L": "50958435418390",
  "Black-XL": "50958435451158",
  "Black-2XL": "50958435483926",
  "Black-3XL": "50958435516694",
  "Black-4XL": "50958435549462",
  "Black-5XL": "50958435582230",

  "Purple-S": "50958435614998",
  "Purple-M": "50958435647766",
  "Purple-L": "50958435680534",
  "Purple-XL": "50958435713302",
  "Purple-2XL": "50958435746070",
  "Purple-3XL": "50958435778838",
  "Purple-4XL": "50958435811606",
  "Purple-5XL": "50958435844374",
};

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color?: string;
  buyNowUrl?: string;
}

interface ShoppingCartSheetProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function ShoppingCartSheet({ cartItems, onUpdateQuantity, onRemoveItem }: ShoppingCartSheetProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const buildShopifyCartUrl = () => {
    const quantitiesByVariant: Record<string, number> = {};

    cartItems.forEach((item) => {
      // Currently only BrisVegas (id: 1) is mapped
      if (item.id === 1 && item.color && item.size) {
        const key = `${item.color}-${item.size}`;
        const variantId = BRISVEGAS_VARIANTS[key];
        if (variantId) {
          quantitiesByVariant[variantId] =
            (quantitiesByVariant[variantId] ?? 0) + item.quantity;
        }
      }
    });

    const segments = Object.entries(quantitiesByVariant).map(
      ([variantId, qty]) => `${variantId}:${qty}`
    );

    if (segments.length === 0) {
      return "https://nxwpuc-xs.myshopify.com/cart";
    }

    return `https://nxwpuc-xs.myshopify.com/cart/${segments.join(",")}`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="line-clamp-1">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveItem(item.id)}
                          className="h-6 w-6"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Size: {item.size}
                        {item.color ? ` • Colour: ${item.color}` : ""}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="h-7 w-7"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  const url = buildShopifyCartUrl();
                  window.open(url, "_blank");
                }}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
