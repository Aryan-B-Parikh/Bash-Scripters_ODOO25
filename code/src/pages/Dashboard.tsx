import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [uploadedItems] = useState([
    { id: 1, title: "Vintage Denim Jacket", category: "Outerwear", status: "Available", image: "/src/assets/product image 1.jpg" },
    { id: 2, title: "Summer Floral Dress", category: "Dresses", status: "Swapped", image: "/src/assets/product image 2.jpg" },
    { id: 3, title: "Casual White Sneakers", category: "Footwear", status: "Available", image: "/src/assets/product image 3.jpg" },
    { id: 4, title: "Designer Handbag", category: "Accessories", status: "Available", image: "/src/assets/product image 4.jpg" }
  ]);
  const [myPurchases] = useState([
    { id: 1, title: "Winter Coat", category: "Outerwear", points: 120, date: "2024-07-08", image: "/src/assets/product image 5.jpg" },
    { id: 2, title: "Running Shoes", category: "Footwear", points: 85, date: "2024-07-05", image: "/src/assets/product image 6.jpg" },
    { id: 3, title: "Cotton T-Shirt", category: "Tops", points: 45, date: "2024-07-02", image: "/src/assets/product image 7.jpg" },
    { id: 4, title: "Jeans", category: "Pants", points: 65, date: "2024-06-28", image: "/src/assets/product image 8.jpg" }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
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
        
        {/* Profile Section */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-xl font-medium">
              {user.name ? user.name[0] : ''}{user.lastname ? user.lastname[0] : ''}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8 flex-1">
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <p className="text-gray-900">{user.name} {user.lastname}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-500">Points Balance</label>
                <p className="text-2xl font-bold text-green-600">{user.points || 0}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Member Since</label>
                <p className="text-gray-900">{user.memberSince || '2024'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Large Profile Section */}
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-center">
            Welcome to your ReWear dashboard! Here you can manage your listings, track your swaps, 
            and view your purchase history. Your current points balance allows you to redeem items 
            or continue growing your sustainable fashion collection.
          </p>
        </div>
      </div>

      {/* My Listings Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Listings</h2>
        <div className="grid grid-cols-4 gap-4">
          {uploadedItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Item Image</span>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm truncate">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.category}</p>
                <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                  item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Purchases Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Purchases</h2>
        <div className="grid grid-cols-4 gap-4">
          {myPurchases.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Item Image</span>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm truncate">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.category}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-green-600 font-medium">{item.points} pts</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
