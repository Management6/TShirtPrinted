export function FaqPage() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl mb-4">FAQ</h2>
      <p className="text-gray-600 mb-8">
        Find answers to common questions about orders, shipping, returns, and sizing.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-2">How long does shipping take?</h3>
          <p className="text-gray-600">
            Orders are typically processed within 1–2 business days. Standard shipping usually takes
            3–7 business days depending on your location. You&apos;ll receive a tracking number as
            soon as your order ships.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">How do I choose the right size?</h3>
          <p className="text-gray-600">
            We recommend checking our Size Guide before placing your order. It includes body
            measurements and tips to help you find the best fit based on how you like your t‑shirts
            to feel.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Can I change or cancel my order?</h3>
          <p className="text-gray-600">
            We start processing orders quickly, but if you need to make a change or cancel, please
            contact us as soon as possible. If your order hasn&apos;t shipped yet, we&apos;ll do our
            best to update it for you.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Do you ship internationally?</h3>
          <p className="text-gray-600">
            At the moment we primarily ship within our main region, but we&apos;re working on
            expanding international shipping options. Check back soon or reach out via our Contact
            Us page for the latest information.
          </p>
        </div>
      </div>
    </div>
  );
}
