import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles, HiArrowPath, HiPlus, HiCheckCircle, HiUsers, HiGlobeAlt } from "react-icons/hi2";

const Landing = () => {
  const [featuredItems, setFeaturedItems] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate on mount
    setIsVisible(true);
    
    // Fetch featured items for carousel
    const fetchFeaturedItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setFeaturedItems(data.slice(0, 8)); // Get first 8 items for carousel
      } catch (error) {
        console.error('Error fetching featured items:', error);
      }
    };
    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    // Auto-slide carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredItems.length / 4));
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredItems.length]);

  const categories = [
    { name: "Tops & Shirts", count: 45 },
    { name: "Dresses", count: 32 },
    { name: "Outerwear", count: 28 },
    { name: "Pants & Jeans", count: 38 },
    { name: "Footwear", count: 25 },
    { name: "Accessories", count: 67 }
  ];

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-white/5 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(255,255,255,0.1)_20%)]" style={{
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Hero Content */}
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 animate-bounce-gentle">
                🌱 Sustainable Fashion Revolution
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Swap, Share,
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-100 to-white bg-clip-text text-transparent">
                Sustain Fashion
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join ReWear's community clothing exchange platform. Give your unused clothes a new life 
              while discovering amazing pre-loved items from fellow fashion enthusiasts.
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Link 
                to="/shop" 
                className="group flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Start Swapping
                <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link 
                to="/shop" 
                className="group flex items-center justify-center gap-2 border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                Browse Items
                <HiSparkles className="group-hover:rotate-12 transition-transform duration-200" />
              </Link>
              <Link 
                to="/add-item" 
                className="group flex items-center justify-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                List an Item
                <HiPlus className="group-hover:rotate-90 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className={`text-center transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <HiCheckCircle className="w-8 h-8 text-emerald-200 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">2,547</div>
                <div className="text-emerald-200">Items Exchanged</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <HiUsers className="w-8 h-8 text-emerald-200 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1,203</div>
                <div className="text-emerald-200">Active Members</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <HiGlobeAlt className="w-8 h-8 text-emerald-200 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">89%</div>
                <div className="text-emerald-200">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Featured Items Carousel */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Items
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing pre-loved fashion finds from our community
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(featuredItems.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                      {featuredItems
                        .slice(slideIndex * 4, (slideIndex + 1) * 4)
                        .map((item, index) => (
                        <div 
                          key={item.id} 
                          className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="relative overflow-hidden">
                            <img 
                              src={`/src/assets/${item.image}`} 
                              alt={item.title}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{item.category}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-emerald-600 font-bold">{item.price} pts</span>
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                                Available
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="flex justify-center mt-8 gap-3">
              {Array.from({ length: Math.ceil(featuredItems.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-emerald-600 w-8' 
                      : 'bg-gray-300 hover:bg-emerald-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/shop?category=${category.name}`}
                className={`group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <HiArrowPath className="text-2xl text-white group-hover:rotate-180 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{category.name}</h3>
                <p className="text-gray-600">{category.count} items available</p>
                <div className="mt-4 text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recent Listings
            </h2>
            <p className="text-xl text-gray-600">
              Fresh additions to our community marketplace
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.slice(0, 4).map((item, index) => (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={`/src/assets/${item.image}`} 
                    alt={item.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-600 rounded-full text-xs font-medium">
                      New
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 font-bold text-lg">{item.price} pts</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      Available
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/shop"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              View All Items
              <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
