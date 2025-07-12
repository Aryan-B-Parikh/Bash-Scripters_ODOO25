import toast from "react-hot-toast";

const ItemDetail = () => {
  const handleSwapRequest = () => {
    toast.success("Swap request sent! We'll notify the owner.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">SJ</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Image and Description */}
        <div className="space-y-6">
          {/* Add Images Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Images</h3>
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Product Description</h3>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Product Details and Actions */}
        <div className="space-y-6">
          {/* Product Name and Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Product name description
              </h1>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Available/Swap Button */}
            <div className="mt-6">
              <button
                onClick={handleSwapRequest}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Available/Swap
              </button>
            </div>
          </div>

          {/* Previous Listings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Listings!</h3>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Item</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Product Range */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Range</h3>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Product Image</span>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-gray-900 text-sm">Product Name</h4>
                <p className="text-xs text-gray-600">Category</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-green-600 font-medium">50 pts</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
