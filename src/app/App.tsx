import { useState } from "react";
import { ProductCard, Product } from "@/app/components/ProductCard";
import { ShoppingCartSheet, CartItem } from "@/app/components/ShoppingCartSheet";
import { ProductDetailDialog } from "@/app/components/ProductDetailDialog";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Search } from "lucide-react";
import { toast, Toaster } from "sonner";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Artistic Expression Tee",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1655141559787-25ac8cfca72f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGVkJTIwZ3JhcGhpYyUyMHRzaGlydHxlbnwxfHx8fDE3Njg1MjkwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Graphic",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy"],
    description: "Express yourself with this unique artistic design. Premium cotton blend for maximum comfort.",
  },
  {
    id: 2,
    name: "Classic Black Premium",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1578237421804-9674940e8b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRzaGlydCUyMGRlc2lnbnxlbnwxfHx8fDE3Njg1MTkxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Essential",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal"],
    description: "A timeless classic. This premium black tee is a wardrobe essential that never goes out of style.",
  },
  {
    id: 3,
    name: "Minimalist White",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1vY2t1cHxlbnwxfHx8fDE3Njg1MjkwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Minimal",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Cream", "Beige"],
    description: "Clean lines and minimal design. Perfect for everyday wear with a touch of elegance.",
  },
  {
    id: 4,
    name: "Vibrant Colors Collection",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1594303471920-b66b769a6b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHRzaGlydHxlbnwxfHx8fDE3Njg0Mjc4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Colorful",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Red", "Green", "Yellow"],
    description: "Make a statement with bold colors. High-quality dye that won't fade after washing.",
  },
  {
    id: 5,
    name: "Vintage Retro Print",
    price: 36.99,
    image: "https://images.unsplash.com/photo-1549369130-1f99f678dc12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHNoaXJ0fGVufDF8fHx8MTc2ODQ5NDYzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Vintage",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Tan", "Olive", "Burgundy"],
    description: "Inspired by vintage designs from the golden era. Soft-washed fabric for that worn-in feel.",
  },
  {
    id: 6,
    name: "Modern Minimal Design",
    price: 31.99,
    image: "https://images.unsplash.com/photo-1542219550-b1b13a6a29eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwdHNoaXJ0fGVufDF8fHx8MTc2ODUyOTA0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Minimal",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    description: "Contemporary design meets comfort. Perfect for the modern minimalist lifestyle.",
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleAddToCart = (product: Product, size: string = "M") => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.size === size
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
          price: product.price,
          image: product.image,
          quantity: 1,
          size,
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

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" />
      
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

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Category:</span>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(product) => handleAddToCart(product)}
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
                <li>Shipping & Returns</li>
                <li>Size Guide</li>
                <li>FAQ</li>
                <li>Contact Us</li>
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
