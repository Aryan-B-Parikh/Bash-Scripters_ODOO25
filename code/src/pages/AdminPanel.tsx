import { useState } from "react";
import { HiOutlineUsers, HiOutlineShoppingBag, HiOutlineCog, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineEye } from "react-icons/hi2";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  
  const [users] = useState([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      email: "sarah@example.com", 
      points: 150, 
      itemsListed: 5, 
      swapsCompleted: 8,
      status: "Active",
      joinDate: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Mike Chen", 
      email: "mike@example.com", 
      points: 89, 
      itemsListed: 3, 
      swapsCompleted: 4,
      status: "Active",
      joinDate: "2024-02-20"
    },
    { 
      id: 3, 
      name: "Emma Wilson", 
      email: "emma@example.com", 
      points: 234, 
      itemsListed: 8, 
      swapsCompleted: 12,
      status: "Suspended",
      joinDate: "2024-01-08"
    },
    { 
      id: 4, 
      name: "Alex Rodriguez", 
      email: "alex@example.com", 
      points: 67, 
      itemsListed: 2, 
      swapsCompleted: 3,
      status: "Active",
      joinDate: "2024-03-10"
    }
  ]);

  const [pendingItems] = useState([
    {
      id: 1,
      title: "Vintage Denim Jacket",
      uploader: "Sarah Johnson",
      category: "Outerwear",
      condition: "Excellent",
      pointValue: 75,
      uploadDate: "2024-07-10",
      status: "Pending"
    },
    {
      id: 2,
      title: "Designer Handbag",
      uploader: "Emma Wilson",
      category: "Accessories",
      condition: "Like New",
      pointValue: 120,
      uploadDate: "2024-07-09",
      status: "Pending"
    },
    {
      id: 3,
      title: "Summer Floral Dress",
      uploader: "Mike Chen",
      category: "Dresses",
      condition: "Good",
      pointValue: 45,
      uploadDate: "2024-07-08",
      status: "Pending"
    }
  ]);

  const [swapOrders] = useState([
    {
      id: 1,
      requester: "Sarah Johnson",
      owner: "Mike Chen",
      item: "Vintage Leather Boots",
      requestDate: "2024-07-10",
      status: "In Progress",
      type: "Direct Swap"
    },
    {
      id: 2,
      requester: "Emma Wilson",
      owner: "Alex Rodriguez",
      item: "Cotton T-Shirt",
      requestDate: "2024-07-09",
      status: "Completed",
      type: "Points Redemption"
    }
  ]);

  const approveItem = (itemId: number) => {
    console.log(`Approved item ${itemId}`);
    // Implementation would update item status
  };

  const rejectItem = (itemId: number) => {
    console.log(`Rejected item ${itemId}`);
    // Implementation would update item status
  };

  const suspendUser = (userId: number) => {
    console.log(`Suspended user ${userId}`);
    // Implementation would update user status
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">System Online</span>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-2 rounded-lg border ${
              activeTab === "users" 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-lg border ${
              activeTab === "orders" 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Manage Orders
          </button>
          <button
            onClick={() => setActiveTab("listings")}
            className={`px-6 py-2 rounded-lg border ${
              activeTab === "listings" 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Manage Listings
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === "users" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <HiOutlineUsers className="text-2xl" />
              Manage Users
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-600">Points: {user.points}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Items Listed: {user.itemsListed}</p>
                            <p className="text-sm text-gray-600">Swaps: {user.swapsCompleted}</p>
                            <p className="text-sm text-gray-600">Joined: {user.joinDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                      <button 
                        onClick={() => suspendUser(user.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Action 1
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Action 2
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <HiOutlineShoppingBag className="text-2xl" />
              Manage Orders
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {swapOrders.map((order) => (
                <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.requester} → {order.owner}
                      </p>
                      <p className="text-sm text-gray-600">Item: {order.item}</p>
                      <p className="text-sm text-gray-600">Type: {order.type}</p>
                      <p className="text-sm text-gray-600">Date: {order.requestDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <HiOutlineEye className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "listings" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <HiOutlineCog className="text-2xl" />
              Pending Item Approvals
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">By: {item.uploader}</p>
                      <p className="text-sm text-gray-600">Category: {item.category}</p>
                      <p className="text-sm text-gray-600">Condition: {item.condition}</p>
                      <p className="text-sm text-gray-600">Points: {item.pointValue}</p>
                      <p className="text-sm text-gray-600">Uploaded: {item.uploadDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => approveItem(item.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <HiOutlineCheckCircle />
                        Approve
                      </button>
                      <button 
                        onClick={() => rejectItem(item.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <HiOutlineXCircle />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
