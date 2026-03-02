'use client'

export default function RegisterPage(){
  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-4'>
      <div className='w-full max-w-md card-gradient rounded-2xl shadow-2xl p-8 animate-fadeInUp'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-orange-500 mb-2'>CareerSpyke</h1>
          <p className='text-slate-600 text-sm font-medium'>Create your account</p>
          <p className='text-slate-500 text-xs mt-1'>Welcome! Please fill in the details to get started.</p>
        </div>

        {/* Signup Form */}
        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>User Type</label>
            <div className='flex gap-3'>
              <label className='flex-1 flex items-center justify-center px-3 py-2 border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors'>
                <input type='radio' name='userType' value='student' className='mr-2' required />
                <span className='text-sm font-medium text-slate-700'>Student</span>
              </label>
              <label className='flex-1 flex items-center justify-center px-3 py-2 border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors'>
                <input type='radio' name='userType' value='expert' className='mr-2' required />
                <span className='text-sm font-medium text-slate-700'>Expert</span>
              </label>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Full name</label>
            <input 
              className='w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 placeholder-slate-400'
              placeholder='Enter your full name'
              type='text'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Email address</label>
            <input 
              className='w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 placeholder-slate-400'
              placeholder='Enter your email address'
              type='email'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Password</label>
            <input 
              className='w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 placeholder-slate-400'
              placeholder='Enter your password'
              type='password'
              required
            />
          </div>

          <label className='flex items-center gap-2 text-slate-700'>
            <input type='checkbox' className='w-4 h-4 rounded border-slate-300' required />
            <span className='text-sm'>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <button 
            type='submit'
            className='w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-300'
          >
            Create Account
          </button>
        </form>

        {/* Footer Links */}
        <div className='text-center mt-6'>
          <p className='text-slate-600 text-sm'>
            Already have an account? <a href='/login' className='text-orange-500 font-semibold hover:text-orange-600 transition-colors'>Sign in</a>
          </p>
        </div>

        {/* Security Info */}
        <div className='mt-6 pt-6 border-t border-slate-200 text-center text-xs text-slate-500'>
          <p>By signing up you agree to CareerSpyke's Terms of Service and Privacy Policy. Your privacy is our top priority. Learn more about the steps we take to protect it.</p>
        </div>
      </div>
    </div>
  )
}
