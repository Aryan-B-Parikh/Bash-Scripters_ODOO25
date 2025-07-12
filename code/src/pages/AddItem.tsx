import { useState } from "react";
import { HiOutlinePhoto, HiOutlineCheckCircle } from "react-icons/hi2";

const AddItem = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const handleImageUrlAdd = () => {
    if (imageUrl && images.length < 5) {
      setImages(prev => [...prev, imageUrl]);
      setImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (images, description)
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-screen-xl mx-auto px-5 py-16 text-center">
        <HiOutlineCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Item Submitted Successfully!</h1>
        <p className="text-gray-600 mb-6">Your item is now under review and will be available for swapping once approved.</p>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

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
        {/* Left Side - Product Image */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            {images.length > 0 ? (
              <img src={images[0]} alt="Preview" className="max-h-60 max-w-full object-contain" />
            ) : (
              <span className="text-gray-500">Product Image Preview</span>
            )}
          </div>
          {/* Image Upload Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Upload ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <label className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <HiOutlinePhoto className="text-xl text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Add</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {/* Image URL input */}
          {images.length < 5 && (
            <div className="flex gap-2 mt-2">
              <input
                type="url"
                placeholder="Paste image URL..."
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={handleImageUrlAdd}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add URL
              </button>
            </div>
          )}
        </div>

        {/* Right Side - Product Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter product description..."
                rows={5}
                required
              />
            </div>
            {/* Preview Description */}
            {description && (
              <div className="bg-gray-100 rounded p-3 text-gray-700 mb-2">
                <strong>Description Preview:</strong>
                <div>{description}</div>
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Submit Listing
            </button>
          </form>
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

export default AddItem;
