import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Make sure this path points to your axios.js file

const SignUp = () => {
  const navigate = useNavigate();
  
  // State for all three fields required by your Prisma model
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Sending data to http://localhost:5000/api/auth/register
      const response = await api.post('/auth/register', { 
        username, 
        email, 
        password 
      });

      // Save token and user info to localStorage on success
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Redirect to the checklist page
      navigate('/checklist'); 
    } catch (err) {
      // Capture the specific error from the backend (like "Email already in use")
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <section className='bg-[#64805d] font-pixel min-h-screen flex items-center justify-center p-4'>
      <div className='flex w-full max-w-6xl h-[650px] overflow-hidden rounded-3xl shadow-2xl bg-[#5a7254]'>
        
        {/* Left Column: Branding */}
        <div className='hidden md:block w-1/2 relative'>
          <img 
            src="/signin.png" 
            alt="Thyroterra World" 
            className='w-full h-full object-cover' 
          />
          <div className='absolute bottom-20 left-10 text-white'>
            <h2 className='text-3xl uppercase text-black pb-3'>Thyroterra</h2>
            <p className='text-sm opacity-80 pl-4'>Start your journey today</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#64805d] text-white'>
          
          <h1 className='text-5xl mb-4 uppercase tracking-widest'>Sign Up</h1>
          
          <p className='text-xs mb-6 opacity-70'>Create your account</p>

          {/* Error Message Display */}
          {error && (
            <div className='bg-red-500/20 border border-red-500 text-red-200 text-[10px] p-3 rounded-lg mb-4'>
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className='space-y-4'>
            {/* Username Field */}
            <div className='relative'>
              <input 
                type="text" 
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full bg-[#4a6145] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#89b17d] outline-none transition-all'
              />
            </div>

            {/* Email Field */}
            <div className='relative'>
              <input 
                type="email" 
                placeholder="Yourname@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-[#4a6145] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#89b17d] outline-none transition-all'
              />
            </div>

            {/* Password Field */}
            <div className='relative mb-6'>
              <input 
                type="password" 
                placeholder="Create a password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-[#4a6145] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#89b17d] outline-none transition-all'
              />
            </div>

            {/* Submit Button */}
            <Link 
                      to="/signin" 
                      className='w-full text-center border border-[#4a6b32] text-[#5CE96D] py-3 rounded-xl text-sm hover:bg-[#4a6b32]/20 transition-all active:scale-95 mb-8'
                    >
          <button className='w-full bg-gradient-to-b from-[#4a6b32] to-[#2d411e] hover:from-[#5a823d] py-4 rounded-xl text-lg shadow-lg transition-all active:scale-95 mb-6'>
            Create Account
          </button>
          </Link>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-[10px] opacity-60'>
              Already have an account?{' '}
              <Link to="/signin" className='text-[#5CE96D] underline cursor-pointer'>
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SignUp;