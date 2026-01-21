export function SizeGuidePage() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl mb-4">Size Guide</h2>
      <p className="text-gray-600 mb-6">
        Use this guide to find the best fit. Measurements are approximate and can vary slightly
        between garments.
      </p>

      <div className="mb-8 space-y-4">
        <h3 className="text-xl font-medium">How to measure</h3>
        <p className="text-gray-600">
          <span className="font-semibold">A) Length</span> – Place the end of the tape beside the
          collar at the top of the shirt (highest point of the shoulder). Pull the tape straight
          down to the bottom of the shirt.
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">B) Half Chest</span> – Lay the garment flat and measure
          straight across the chest from left to right, about 2 cm below the arms. Double this
          value to get the full chest measurement.
        </p>
        <p className="text-gray-500 text-sm">
          Measurements are provided as a guide only and garments may run slightly smaller or larger
          with a difference of around ±2.5 cm.
        </p>
      </div>

      <h3 className="text-xl font-medium mb-3">Metric (cm)</h3>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Measurement</th>
              <th className="px-4 py-3 font-medium text-gray-700">S</th>
              <th className="px-4 py-3 font-medium text-gray-700">M</th>
              <th className="px-4 py-3 font-medium text-gray-700">L</th>
              <th className="px-4 py-3 font-medium text-gray-700">XL</th>
              <th className="px-4 py-3 font-medium text-gray-700">2XL</th>
              <th className="px-4 py-3 font-medium text-gray-700">3XL</th>
              <th className="px-4 py-3 font-medium text-gray-700">4XL</th>
              <th className="px-4 py-3 font-medium text-gray-700">5XL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">A) Length</td>
              <td className="px-4 py-3">71.1 cm</td>
              <td className="px-4 py-3">73.7 cm</td>
              <td className="px-4 py-3">76.2 cm</td>
              <td className="px-4 py-3">78.7 cm</td>
              <td className="px-4 py-3">81.3 cm</td>
              <td className="px-4 py-3">83.8 cm</td>
              <td className="px-4 py-3">86 cm</td>
              <td className="px-4 py-3">89 cm</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">B) Half Chest</td>
              <td className="px-4 py-3">45.7 cm</td>
              <td className="px-4 py-3">50.8 cm</td>
              <td className="px-4 py-3">55.9 cm</td>
              <td className="px-4 py-3">61 cm</td>
              <td className="px-4 py-3">66 cm</td>
              <td className="px-4 py-3">71.1 cm</td>
              <td className="px-4 py-3">76 cm</td>
              <td className="px-4 py-3">81 cm</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
