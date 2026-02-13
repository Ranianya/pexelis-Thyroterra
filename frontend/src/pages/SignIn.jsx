import React from 'react'
import { Link } from 'react-router-dom' // 1. Import Link

const SignIn = () => {
  return (
    <section className='bg-[#64805d] font-pixel min-h-screen flex items-center justify-center p-4'>
      <div className='flex w-full max-w-6xl h-[600px] overflow-hidden rounded-3xl shadow-2xl bg-[#5a7254]'>
        
        {/* Left Column */}
        <div className='hidden md:block w-1/2 relative'>
          <img 
            src="/signin.png" 
            alt="Thyroterra World" 
            className='w-full h-full object-cover' 
          />
          <div className='absolute bottom-60 left-10 text-white '>
            <h2 className='text-3xl uppercase text-black pb-3'>Thyroterra</h2>
            <p className='text-sm opacity-80 pl-25'>Grow your health</p>
          </div>
        </div>

        {/* Right Column */}
        <div className='w-full md:w-1/2 p-12 flex flex-col justify-center bg-[#64805d] text-white'>
          
          <h1 className='text-5xl mb-8 uppercase tracking-widest pb-10'>Sign In</h1>
          
          <p className='text-xs mb-4 opacity-70'>Sign in with email address</p>

          {/* Email Field */}
          <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <img src="/email.png" alt="email icon" className='h-5 w-5 opacity-50'/>
            </div>
            <input 
              type="email" 
              placeholder="Yourname@gmail.com"
              className='w-full bg-[#4a6145] border-none rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#89b17d] outline-none transition-all'
            />
          </div>

          {/* Sign In Button (Submit) */}
          <Link 
            to="/years" 
            className='w-full text-center border border-[#4a6b32] text-[#5CE96D] py-3 rounded-xl text-sm hover:bg-[#4a6b32]/20 transition-all active:scale-95 mb-8'
          >
          <button className='w-full bg-gradient-to-b from-[#4a6b32] to-[#2d411e] hover:from-[#5a823d] py-4 rounded-xl text-lg shadow-lg transition-all active:scale-95 mb-4'>
            Sign IN
          </button>
          </Link>

          {/* Sign Up Link (Route to /signup) */}
          <Link 
            to="/signup" 
            className='w-full text-center border border-[#4a6b32] text-[#5CE96D] py-3 rounded-xl text-sm hover:bg-[#4a6b32]/20 transition-all active:scale-95 mb-8'
          >
            Don't have an account? Sign up
          </Link>

          <div className='flex items-center gap-4 mb-8'>
            <div className='h-[1px] bg-white/20 w-full'></div>
            <span className='text-[10px] opacity-50 whitespace-nowrap'>Or continue with</span>
            <div className='h-[1px] bg-white/20 w-full'></div>
          </div>

          {/* Social Buttons */}
          <div className='flex flex-col gap-4'>
            <button className='flex items-center justify-center gap-3 bg-[#2d8e00] hover:bg-[#36a800] py-3 rounded-lg transition-all'>
               <img src="/google.png" className='w-5 h-5' alt="google"/>
               <span className='text-sm'>Google</span>
            </button>
            <button className='flex items-center justify-center gap-3 bg-[#1877f2] hover:bg-[#2d85f3] py-3 rounded-lg transition-all'>
               <img src="/facebook.png" className='w-5 h-5' alt="facebook"/>
               <span className='text-sm'>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn