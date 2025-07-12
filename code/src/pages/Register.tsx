import { Link, useNavigate } from "react-router-dom";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import { supabase } from '../supabaseClient';
import toast from "react-hot-toast";

// Persistent static user array for demo
function getStaticUsers() {
  let users = [];
  try {
    users = JSON.parse(localStorage.getItem('staticUsers') || '[]');
  } catch {}
  // Always include default users if not present
  const defaultUsers = [
    {
      id: 'static-1',
      name: 'Urval',
      lastname: 'Kheni',
      email: 'kheniurval777@gmail.com',
      password: '12345678',
    },
    {
      id: 'static-2',
      name: 'Heet',
      lastname: 'Mehta',
      email: 'heetmehta18125@gmail.com',
      password: '12345678',
    },
    {
      id: 'static-3',
      name: 'Om',
      lastname: 'Mistry',
      email: 'ommistry5559@gmail.com',
      password: '12345678',
    },
    {
      id: 'static-4',
      name: 'Aryan',
      lastname: 'Shah',
      email: 'aryan81006@gmail.com',
      password: '12345678',
    },
  ];
  defaultUsers.forEach(defUser => {
    if (!users.some((u: any) => u.email === defUser.email)) {
      users.unshift(defUser);
    }
  });
  localStorage.setItem('staticUsers', JSON.stringify(users));
  return users;
}
function setStaticUsers(users: any[]) {
  localStorage.setItem('staticUsers', JSON.stringify(users));
}

const staticUsers: any[] = getStaticUsers();

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    if (!checkRegisterFormData(formValues)) return;

    // Static registration for demo
    if (staticUsers.length >= 50) {
      toast.error('Max 50 demo users reached!');
      return;
    }
    if (staticUsers.some((u: any) => u.email === formValues.email)) {
      toast.error('User with this email already exists (demo)');
      return;
    }
    staticUsers.push({
      id: `static-${staticUsers.length + 1}`,
      name: formValues.name,
      lastname: formValues.lastname,
      email: formValues.email,
      password: formValues.password,
    });
    setStaticUsers(staticUsers);
    toast.success('Demo user registered!');
    navigate('/login');
    return;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 w-full max-w-md">
          {/* Logo/Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-xl font-medium">RW</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field 1</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field 2</label>
              <input
                type="text"
                name="lastname"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your lastname"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field 3</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field 4</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-6"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Info Panel */}
      <div className="flex-1 bg-green-600 text-white flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Join ReWear Community!</h2>
          <p className="text-green-100 mb-6">
            Form-based login/signup. Option for social login.
            Redirects to dashboard upon success.
          </p>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🌱 Sustainable Fashion</h3>
              <p className="text-sm text-green-100">Help reduce textile waste by giving clothes a second life</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔄 Easy Swapping</h3>
              <p className="text-sm text-green-100">Exchange items directly or use our points system</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">👥 Community Driven</h3>
              <p className="text-sm text-green-100">Connect with fashion-conscious people in your area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
