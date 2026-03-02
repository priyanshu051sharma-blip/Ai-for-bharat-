'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Nav() {
  const { isAuthenticated, logout, user } = useAuth()
  const router = useRouter()

  // Hide nav on landing page for unauthenticated users
  if (!isAuthenticated) {
    return null
  }

  return (
    <header className='card-gradient shadow-lg sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        <Link href="/" className='flex items-center gap-3 group'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold'>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="24" height="24" rx="6" fill="white" fillOpacity="0" />
              <path d="M4 12h16M12 4v16" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className='font-bold text-lg text-orange-500 group-hover:opacity-80 transition-opacity'>CareerSpyke</div>
        </Link>
        
        <nav className='hidden md:flex gap-8'>
          {[
            { href: '/', label: 'Home' },
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/profile', label: 'Profile' },
            { href: '/community', label: 'Community' },
            { href: '/interview', label: 'Interview' },
            { href: '/party', label: 'Party' },
          ].map((item, idx) => (
            <Link 
              key={idx}
              href={item.href}
              className='text-slate-700 font-medium hover:text-orange-600 transition-colors duration-300 relative group'
            >
              {item.label}
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300'></span>
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-4'>
          <span className='text-slate-700 font-medium text-sm'>{user?.name || 'User'}</span>
          <button 
            onClick={logout}
            className='px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors'
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}