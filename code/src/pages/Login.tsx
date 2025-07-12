import { Link, useNavigate } from "react-router-dom";
import { checkLoginFormData } from "../utils/checkLoginFormData";
import { supabase } from '../supabaseClient';
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import emailjs from 'emailjs-com';

const Login = () => {
  const navigate = useNavigate();

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    if (!checkLoginFormData(formValues)) return;

    // Static user array for demo
    const staticUsers: any[] = getStaticUsers();
    const foundUser = staticUsers.find((u: any) => u.email === formValues.email && u.password === formValues.password);
    if (foundUser) {
      // Send email notification on login (EmailJS integration placeholder)
      // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { to_email: foundUser.email }, 'YOUR_PUBLIC_KEY');
      toast.success('Demo user logged in!');
      localStorage.setItem('user', JSON.stringify(foundUser));
      store.dispatch(setLoginStatus(true));
      navigate('/user-profile');
      return;
    }

    // Supabase sign in (fallback)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formValues.email as string,
      password: formValues.password as string,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    // Fetch user profile from 'profiles' table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user?.id)
      .single();
    if (profileError) {
      toast.error('Failed to fetch user profile');
      return;
    }
    toast.success('You logged in successfully');
    localStorage.setItem('user', JSON.stringify(profileData));
    store.dispatch(setLoginStatus(true));
    navigate('/user-profile');
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      toast.success("You are already logged in");
      navigate("/user-profile");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 w-full max-w-md">
        {/* Logo/Avatar */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-xl font-medium">RW</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
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
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
