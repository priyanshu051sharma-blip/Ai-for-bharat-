'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DocumentTextIcon, MicrophoneIcon, UsersIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Home(){
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const { isAuthenticated, logout, user } = useAuth()
  const router = useRouter()

  const openModal = (type) => {
    setModalType(type)
    setShowModal(true)
  }

  const handleFeatureClick = (href) => {
    if (!isAuthenticated) {
      router.push('/login')
    } else {
      router.push(href)
    }
  }

  const features = [
    {
      icon: DocumentTextIcon,
      title: 'Resume Optimization',
      description: 'AI-powered feedback, ATS optimization, and professional formatting',
      link: '/upload-resume',
      type: 'resume'
    },
    {
      icon: MicrophoneIcon,
      title: 'Mock Interviews',
      description: 'Practice HR, technical, and case study interviews with AI',
      link: '/mock-interview',
      type: 'interview'
    },
    {
      icon: UsersIcon,
      title: 'Alumni Network',
      description: 'Connect with 50+ verified alumni from top companies',
      link: '/alumni-dashboard',
      type: 'alumni'
    }
  ]

  const learningFeatures = [
    {
      icon: '💡',
      title: 'Code Explainer',
      description: 'Get AI-powered explanations for any code snippet',
      link: '/code-explainer'
    },
    {
      icon: '🎓',
      title: 'Concept Simplifier',
      description: 'Break down complex topics into simple explanations',
      link: '/concept-explainer'
    },
    {
      icon: '🗺️',
      title: 'Learning Paths',
      description: 'Personalized roadmaps for your career goals',
      link: '/learning-path'
    }
  ]

  const stats = [
    { num: '4,027', label: 'Interviews Happening Now' },
    { num: '51,055', label: 'Interviews Done Today' },
    { num: '1,200+', label: 'Students Placed' }
  ]

  const benefits = [
    'Build your resume with AI-powered feedback',
    'Practice real interview scenarios',
    'Get real-time support with AI assistant',
    'Connect with experienced mentors',
    'Schedule meetings with ForeverNUtons',
    'Track your career progress'
  ]

  return (
    <div className='min-h-screen bg-white relative overflow-hidden'>

      {/* Hero Section */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24'>
        {/* Stats Bar */}
        <div className='flex justify-center gap-8 mb-16 flex-wrap'>
          <div className='text-center'>
            <p className='text-3xl font-bold text-orange-500'>{stats[0].num}</p>
            <p className='text-sm text-slate-600'>{stats[0].label}</p>
          </div>
          <div className='text-center'>
            <p className='text-3xl font-bold text-orange-500'>{stats[1].num}</p>
            <p className='text-sm text-slate-600'>{stats[1].label}</p>
          </div>
        </div>

        {/* Hero Content */}
        <div className='text-center max-w-3xl mx-auto mb-16 animate-fadeInUp'>
          <h1 className='mb-3 font-serif text-3xl leading-tight font-bold text-[#1c1d20] md:text-4xl lg:text-5xl'>
            Get Interview Ready With <span className='text-orange-500'>CareerSpyke</span>
          </h1>
          <p className='text-xl text-slate-600 mb-8'>
            Build your resume, practice smarter, and get real-time support with AI Interview Assistant.
          </p>
          
          <div className='flex gap-4 justify-center flex-wrap'>
            {!isAuthenticated ? (
              <Link href='/register' className='px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold hover:shadow-xl hover:-translate-y-1 transition-all'>
                Start Interview Prep
              </Link>
            ) : (
              <Link href='/dashboard' className='px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold hover:shadow-xl hover:-translate-y-1 transition-all'>
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          {features.map((feature, idx) => {
            const Icon = feature.icon
            const bgColors = ['bg-pink-100', 'bg-green-100', 'bg-blue-100']
            const borderColors = ['border-pink-300', 'border-green-300', 'border-blue-300']
            return (
              <div key={idx} className='group relative animate-slideInLeft' style={{animationDelay: `${idx * 0.1}s`}}>
                <div 
                  className={`${bgColors[idx]} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 ${borderColors[idx]}`} 
                  onClick={() => handleFeatureClick(feature.link)}
                >
                  <div className='mb-4 w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center'>
                    <Icon className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='font-bold text-lg text-slate-800 mb-2'>{feature.title}</h3>
                  <p className='text-sm text-slate-600 mb-4'>{feature.description}</p>
                  <button className='inline-flex items-center gap-2 text-orange-500 font-semibold text-sm hover:gap-3 transition-all'>
                    {isAuthenticated ? 'Get Started →' : 'Login to Start →'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Learning Tools Section */}
        <div className='mb-20'>
          <h2 className='mb-3 font-serif text-3xl leading-tight font-normal text-[#1c1d20] md:text-4xl lg:text-5xl mb-8 text-center'>
            🎓 Learning & Productivity Tools
          </h2>
          <p className='text-center text-slate-600 mb-8 max-w-2xl mx-auto'>
            Master technical concepts, understand code better, and accelerate your learning journey with AI-powered tools
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {learningFeatures.map((feature, idx) => {
              const bgColors = ['bg-purple-100', 'bg-teal-100', 'bg-indigo-100']
              const borderColors = ['border-purple-300', 'border-teal-300', 'border-indigo-300']
              return (
                <div key={idx} className='group relative animate-slideInLeft' style={{animationDelay: `${idx * 0.1}s`}}>
                  <div 
                    className={`${bgColors[idx]} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 ${borderColors[idx]}`} 
                    onClick={() => handleFeatureClick(feature.link)}
                  >
                    <div className='text-4xl mb-4'>{feature.icon}</div>
                    <h3 className='font-bold text-lg text-slate-800 mb-2'>{feature.title}</h3>
                    <p className='text-sm text-slate-600 mb-4'>{feature.description}</p>
                    <button className='inline-flex items-center gap-2 text-orange-500 font-semibold text-sm hover:gap-3 transition-all'>
                      {isAuthenticated ? 'Try Now →' : 'Login to Try →'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className='bg-orange-400 rounded-2xl p-12 shadow-lg mb-20 border-2 border-orange-500'>
          <h2 className='mb-3 font-serif text-3xl leading-tight font-normal text-white md:text-4xl lg:text-5xl mb-8 text-center'>Why Choose CareerSpyke?</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {benefits.map((benefit, idx) => {
              return (
                <div key={idx} className='flex gap-4 items-start p-4 bg-orange-300 rounded-lg border-2 border-orange-400'>
                  <div className='w-6 h-6 rounded-full bg-gradient-to-br from-white to-orange-100 flex items-center justify-center flex-shrink-0 mt-1'>
                    <CheckCircleIcon className='w-4 h-4 text-orange-600' />
                  </div>
                  <p className='text-white font-semibold'>{benefit}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className='mb-20'>
          <h2 className='mb-3 font-serif text-3xl leading-tight font-normal text-[#1c1d20] md:text-4xl lg:text-5xl mb-12 text-center'>How It Works</h2>
          <div className='grid md:grid-cols-4 gap-6 relative'>
            {[
              { num: '1', title: 'Upload Resume', desc: 'Get instant AI feedback', bg: 'bg-red-200', border: 'border-red-400' },
              { num: '2', title: 'Practice Interviews', desc: 'Real scenario simulations', bg: 'bg-green-200', border: 'border-green-400' },
            { num: '3', title: 'Get Feedback', desc: 'Detailed performance analysis', bg: 'bg-blue-200', border: 'border-blue-400' },
            { num: '4', title: 'Land A Job', desc: 'Apply with confidence', bg: 'bg-yellow-200', border: 'border-yellow-400' }
            ].map((step, idx) => (
              <div key={idx} className='text-center animate-fadeInUp' style={{animationDelay: `${idx * 0.1}s`}}>
                <div className={`mx-auto w-12 h-12 rounded-full ${step.bg} flex items-center justify-center text-[#1c1d20] font-bold text-lg mb-4 border-2 ${step.border}`}>
                  {step.num}
                </div>
                <h3 className='font-semibold text-slate-800 mb-2'>{step.title}</h3>
                <p className='text-sm text-slate-600'>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-orange-500 rounded-2xl p-12 text-white text-center'>
          <h2 className='mb-3 font-serif text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl mb-4'>Ready to ace your interviews?</h2>
          <p className='text-lg text-orange-100 mb-8 max-w-2xl mx-auto'>
            Join thousands of students who've improved their interview skills with CareerSpyke.
          </p>
          {!isAuthenticated ? (
            <Link href='/register' className='inline-block px-8 py-3 bg-white text-orange-500 rounded-lg font-semibold hover:shadow-xl transition-all'>
              Get Started Free
            </Link>
          ) : (
            <button onClick={() => openModal('features')} className='inline-block px-8 py-3 bg-white text-orange-500 rounded-lg font-semibold hover:shadow-xl transition-all'>
              Explore Features
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-white border-t border-gray-200 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h3 className='font-semibold text-slate-900 mb-4'>About Us</h3>
              <p className='text-slate-600 text-sm'>CareerSpyke is dedicated to helping students prepare for their dream interviews with AI-powered tools and expert mentorship.</p>
            </div>
            <div>
              <h3 className='font-semibold text-slate-900 mb-4'>Contact</h3>
              <p className='text-slate-600 text-sm'>Email: support@careerspyke.com</p>
              <p className='text-slate-600 text-sm'>Phone: +91 XXXXXXXXXX</p>
              <p className='text-slate-600 text-sm'>Address: NIIT University, Neemrana</p>
            </div>
            <div>
              <h3 className='font-semibold text-slate-900 mb-4'>Legal</h3>
              <ul className='space-y-2'>
                <li><a href='#' className='text-slate-600 text-sm hover:text-orange-500 transition'>Terms and Conditions</a></li>
                <li><a href='#' className='text-slate-600 text-sm hover:text-orange-500 transition'>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-200 pt-8 text-center'>
            <p className='text-slate-600 text-sm'>
              © 2025 CareerSpyke. Created at NIIT UNIVERSITY. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Features Modal */}
      {showModal && modalType === 'features' && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fadeInUp'>
            {/* Cancel Button */}
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-3xl font-bold text-slate-900'>Platform Features</h2>
              <button 
                onClick={() => setShowModal(false)}
                className='text-slate-500 hover:text-slate-700 transition text-2xl'
              >
                ✕
              </button>
            </div>

            {/* Features List */}
            <div className='space-y-4 mb-6'>
              <div className='flex gap-3'>
                <CheckCircleIcon className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-slate-800'>Resume Optimization</h3>
                  <p className='text-sm text-slate-600'>AI-powered feedback, ATS optimization, and professional formatting</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-slate-800'>Mock Interviews</h3>
                  <p className='text-sm text-slate-600'>Practice HR, technical, and case study interviews with AI</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-slate-800'>Alumni Network</h3>
                  <p className='text-sm text-slate-600'>Connect with 50+ verified alumni from top companies</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-slate-800'>Code Explainer</h3>
                  <p className='text-sm text-slate-600'>Get AI-powered explanations for any code snippet with line-by-line breakdown</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-slate-800'>Concept Simplifier</h3>
                  <p className='text-sm text-slate-600'>Break down complex technical concepts into simple, digestible explanations</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-slate-800'>Personalized Learning Paths</h3>
                  <p className='text-sm text-slate-600'>Get customized roadmaps based on your career goals and current skills</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-slate-800'>AI Assistant Support</h3>
                  <p className='text-sm text-slate-600'>Get real-time guidance and personalized feedback 24/7</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-slate-800'>Progress Tracking</h3>
                  <p className='text-sm text-slate-600'>Monitor your improvement with detailed analytics and insights</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='w-6 h-6 text-green-500 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-slate-800'>Community Access</h3>
                  <p className='text-sm text-slate-600'>Join thousands of students preparing for their dream jobs</p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className='w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
