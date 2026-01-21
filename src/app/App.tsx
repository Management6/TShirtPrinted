import { useState } from "react";
import { ProductCard, Product } from "@/app/components/ProductCard";
import { ShoppingCartSheet, CartItem } from "@/app/components/ShoppingCartSheet";
import { ProductDetailDialog } from "@/app/components/ProductDetailDialog";
import { ShippingReturnsPage } from "@/app/components/ShippingReturnsPage";
import { SizeGuidePage } from "@/app/components/SizeGuidePage";
import { FaqPage } from "@/app/components/FaqPage";
import { ContactPage } from "@/app/components/ContactPage";
import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";
import { toast, Toaster } from "sonner";
import BrisVegasWhiteFront from "@/app/components/images/BrisVegas/new_flatlay_front_white.png";
import BrisVegasSandFront from "@/app/components/images/BrisVegas/new_flatlay_front_sand.png";
import BrisVegasAshFront from "@/app/components/images/BrisVegas/new_flatlay_front_ash.png";
import BrisVegasRoyalFront from "@/app/components/images/BrisVegas/new_flatlay_front_royal.png";
import BrisVegasRedFront from "@/app/components/images/BrisVegas/new_flatlay_front_red.png";
import BrisVegasBlackFront from "@/app/components/images/BrisVegas/new_flatlay_front_black.png";
import BrisVegasPurpleFront from "@/app/components/images/BrisVegas/new_flatlay_front_purple.png";
import BrisVegasWhiteBack from "@/app/components/images/BrisVegas/editor_back_white.png";
import BrisVegasSandBack from "@/app/components/images/BrisVegas/editor_back_sand.png";
import BrisVegasAshBack from "@/app/components/images/BrisVegas/editor_back_ash.png";
import BrisVegasRoyalBack from "@/app/components/images/BrisVegas/editor_back_royal.png";
import BrisVegasRedBack from "@/app/components/images/BrisVegas/editor_back_red.png";
import BrisVegasBlackBack from "@/app/components/images/BrisVegas/editor_back_black.png";
import BrisVegasPurpleBack from "@/app/components/images/BrisVegas/editor_back_purple.png";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "BrisVegas",
    price: 42.46,
    image: BrisVegasWhiteFront,
    category: "Graphic",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    colors: ["White", "Sand", "Ash", "Royal", "Red", "Black", "Purple"],
    description: "Celebrate BrisVegas in style with this premium printed tee.",
    productUrl: "https://nxwpuc-xs.myshopify.com/products/brisvegas?variant=50958434042134",
    buyNowUrl: "https://nxwpuc-xs.myshopify.com/cart/50958434042134:1",
    colorImages: {
      White: BrisVegasWhiteFront,
      Sand: BrisVegasSandFront,
      Ash: BrisVegasAshFront,
      Royal: BrisVegasRoyalFront,
      Red: BrisVegasRedFront,
      Black: BrisVegasBlackFront,
      Purple: BrisVegasPurpleFront,
    },
    colorBackImages: {
      White: BrisVegasWhiteBack,
      Sand: BrisVegasSandBack,
      Ash: BrisVegasAshBack,
      Royal: BrisVegasRoyalBack,
      Red: BrisVegasRedBack,
      Black: BrisVegasBlackBack,
      Purple: BrisVegasPurpleBack,
    },
  },
];

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

type InfoPage = "shipping-returns" | "size-guide" | "faq" | "contact" | null;

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeInfoPage, setActiveInfoPage] = useState<InfoPage>(null);

  const handleAddToCart = (product: Product, size: string = "M", color: string = "") => {
    // Calculate variant-specific price where we have data (currently BrisVegas)
    let price = product.price;
    if (product.id === 1 && color && size) {
      const key = `${color}-${size}`;
      const variantPrice = BRISVEGAS_PRICES[key];
      if (variantPrice) {
        price = variantPrice;
      }
    }

    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.size === size && item.color === color
    );

      if (existingItem) {
        setCartItems(
          cartItems.map((item) =>
            item.id === existingItem.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
        )
      );
    } else {
        setCartItems([
          ...cartItems,
          {
            id: product.id,
            name: product.name,
            price,
            image:
              color && product.colorImages && product.colorImages[color]
                ? product.colorImages[color]
                : product.image,
            quantity: 1,
            size,
            color,
            buyNowUrl: product.buyNowUrl,
          },
        ]);
    }
    
    toast.success(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailDialogOpen(true);
  };

  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="bottom-center" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl">ThreadPrint</h1>
            <div className="flex items-center gap-4">
              <ShoppingCartSheet
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>
          </div>
        </div>
      </header>

      {activeInfoPage === null && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 px-4">
            <div className="container mx-auto text-center">
              <h2 className="text-5xl mb-4">Premium Printed T-Shirts</h2>
              <p className="text-xl text-gray-600 mb-8">
                Express yourself with our exclusive collection
              </p>
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </section>

          {/* Product Grid */}
          <section className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-end mb-6">
              <span className="text-gray-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl">No products found</p>
                <p className="mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </section>
        </>
      )}

      {activeInfoPage !== null && (
        <section className="container mx-auto px-4 py-12">
          <button
            className="mb-6 text-sm text-gray-500 hover:text-gray-700"
            onClick={() => setActiveInfoPage(null)}
          >
            ← Back to shopping
          </button>

          {activeInfoPage === "shipping-returns" && <ShippingReturnsPage />}
          {activeInfoPage === "size-guide" && <SizeGuidePage />}
          {activeInfoPage === "faq" && <FaqPage />}
          {activeInfoPage === "contact" && <ContactPage />}
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="mb-4">About ThreadPrint</h3>
              <p className="text-gray-600">
                We create premium quality printed t-shirts with unique designs for every style.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button
                    className="hover:text-gray-800 underline-offset-2 hover:underline"
                    onClick={() => setActiveInfoPage("shipping-returns")}
                  >
                    Shipping
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-gray-800 underline-offset-2 hover:underline"
                    onClick={() => setActiveInfoPage("size-guide")}
                  >
                    Size Guide
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-gray-800 underline-offset-2 hover:underline"
                    onClick={() => setActiveInfoPage("faq")}
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-gray-800 underline-offset-2 hover:underline"
                    onClick={() => setActiveInfoPage("contact")}
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Follow Us</h3>
              <p className="text-gray-600">
                Stay connected for the latest designs and exclusive offers.
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-500">
            © 2026 ThreadPrint. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Product Detail Dialog */}
      <ProductDetailDialog
        product={selectedProduct}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
