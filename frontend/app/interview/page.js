"use client"
import Link from 'next/link'
import { useState } from 'react'
import ChatBox from '@/components/ChatBox'

export default function Interview() {
  const [openChat, setOpenChat] = useState(false)
  const [expandedChat, setExpandedChat] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [scheduleStep, setScheduleStep] = useState(1) // 1: Choose type, 2: Select time
  const [selectedInterviewType, setSelectedInterviewType] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [upcomingInterviews, setUpcomingInterviews] = useState([
    { id: 1, company: 'Tech Startup ABC', date: 'Nov 20, 2024', time: '10:00 AM', interviewer: 'John Smith', type: 'AI Interview' },
    { id: 2, company: 'Fortune 500 Corp', date: 'Nov 25, 2024', time: '2:00 PM', interviewer: 'Jane Doe', type: 'Connection Interview' }
  ])

  const interviewTypes = [
    {
      title: 'Mock AI Interview',
      description: 'Practice with AI personas in chat or Q&A mode',
      icon: '🤖',
      href: '/mock-interview',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Technical Round',
      description: 'Solve assignments and coding challenges in a party setup',
      icon: '💻',
      href: '/technical-round',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'HR Round',
      description: 'Behavioral questions and soft skills assessment',
      icon: '👔',
      href: '/hr-round',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Schedule Interview',
      description: 'Book a real interview with alumni mentors',
      icon: '📅',
      href: '#',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const handleScheduleClick = () => {
    setShowScheduleModal(true)
    setScheduleStep(1)
    setSelectedInterviewType(null)
    setSelectedDate('')
    setSelectedTime('')
  }

  const handleInterviewTypeSelect = (type) => {
    setSelectedInterviewType(type)
    setScheduleStep(2)
  }

  const handleSaveSchedule = () => {
    if (selectedDate && selectedTime) {
      const newInterview = {
        id: Date.now(),
        company: selectedInterviewType === 'connection' ? 'Alumni Connection Interview' : 'AI Interview Session',
        date: selectedDate,
        time: selectedTime,
        interviewer: selectedInterviewType === 'connection' ? 'John Smith' : 'AI Assistant',
        type: selectedInterviewType === 'connection' ? 'Connection Interview' : 'AI Interview'
      }
      setUpcomingInterviews([...upcomingInterviews, newInterview])
      setShowScheduleModal(false)
    }
  }

  const handleDeleteInterview = (id) => {
    setUpcomingInterviews(upcomingInterviews.filter(interview => interview.id !== id))
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-[#fff7f7] to-[#fff5f5] py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-12 animate-fadeInUp'>
          <h1 className='text-4xl font-bold mb-2 text-slate-800'>
            <span className='gradient-text'>Interview Preparation</span>
          </h1>
          <p className='text-slate-600'>Master interviews with AI practice and real mentoring sessions</p>
        </div>

        {/* Interview Types */}
        <h2 className='text-2xl font-bold text-slate-800 mb-6'> Practice Options</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
          {interviewTypes.map((item, idx) => (
            item.title === 'Schedule Interview' ? (
              <button
                key={idx}
                onClick={handleScheduleClick}
                className='group card-gradient rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-red-100 hover:border-red-300 animate-slideInLeft text-left'
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className='text-xl font-bold text-slate-800 mb-2 group-hover:text-red-600 transition-colors'>{item.title}</h3>
                <p className='text-slate-600 mb-4'>{item.description}</p>
                <div className='flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all'>
                  <span>Start Now</span>
                  <span className='group-hover:translate-x-1 transition-transform'>→</span>
                </div>
              </button>
            ) : (
              <Link
                key={idx}
                href={item.href}
                className='group card-gradient rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-red-100 hover:border-red-300 animate-slideInLeft'
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className='text-xl font-bold text-slate-800 mb-2 group-hover:text-red-600 transition-colors'>{item.title}</h3>
                <p className='text-slate-600 mb-4'>{item.description}</p>
                <div className='flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all'>
                  <span>Start Now</span>
                  <span className='group-hover:translate-x-1 transition-transform'>→</span>
                </div>
              </Link>
            )
          ))}
        </div>

        {/* Upcoming Interviews */}
        <div className='card-gradient rounded-2xl p-8 shadow-lg animate-slideInRight'>
          <h2 className='text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2'>
            <span>📅</span> Your Upcoming Interviews
          </h2>

          {upcomingInterviews.length > 0 ? (
            <div className='space-y-4'>
              {upcomingInterviews.map((interview, idx) => (
                <div key={interview.id} className='p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500 hover:shadow-md transition-all duration-300 relative'>
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h3 className='font-bold text-slate-800 text-lg'>{interview.company}</h3>
                      <p className='text-sm text-slate-600 mt-1'>Interviewer: <span className='font-semibold'>{interview.interviewer}</span></p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <span className='px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold animate-bounce-subtle'>Scheduled</span>
                      <button
                        onClick={() => handleDeleteInterview(interview.id)}
                        className='px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold hover:bg-red-200 transition-all duration-300'
                      >
                        ✕ Delete
                      </button>
                    </div>
                  </div>
                  <div className='flex items-center gap-6 text-sm text-slate-700'>
                    <div className='flex items-center gap-2'>
                      <span>📅</span>
                      <span>{interview.date}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span>🕐</span>
                      <span>{interview.time}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span>📝</span>
                      <span className='text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded'>{interview.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-300'>
              <div className='text-5xl mb-3'>📭</div>
              <p className='text-slate-600 font-semibold'>No upcoming interviews scheduled</p>
              <p className='text-sm text-slate-500 mt-2'>Click "Schedule Interview" to book your first interview</p>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            { title: 'Before Interview', tips: ['Research company', 'Prepare answers', 'Test equipment'], icon: '' },
            { title: 'During Interview', tips: ['Eye contact', 'Clear speech', 'Listen carefully'], icon: '' },
            { title: 'After Interview', tips: ['Send thank you', 'Follow up', 'Learn from feedback'], icon: '' }
          ].map((section, idx) => (
            <div
              key={idx}
              className='card-gradient rounded-2xl p-6 border border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 animate-fadeInUp'
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className='text-3xl mb-3'>{section.icon}</div>
              <h3 className='font-bold text-slate-800 mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.tips.map((tip, tIdx) => (
                  <li key={tIdx} className='flex items-center gap-2 text-sm text-slate-700'>
                    <span className='w-2 h-2 bg-red-500 rounded-full animate-bounce'></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Chat widget for quick interviewer Q&A */}
        <div className='fixed bottom-56 right-6 flex flex-col items-end gap-2 z-40'>
          <button 
            onClick={() => setOpenChat(v => !v)}
            className='text-sm font-semibold text-red-600 hover:text-red-700 transition-colors'
          >
            SAKHA?
          </button>
          <button 
            onClick={() => setOpenChat(v => !v)}
            className='w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 z-50'
          >
            💬
          </button>
        </div>
        {openChat && (
          <div className='fixed bottom-80 right-6 w-full max-w-md animate-slideInRight z-50'>
            <ChatBox 
              isExpanded={expandedChat}
              onExpand={() => setExpandedChat(true)}
              onClose={() => { setExpandedChat(false); setOpenChat(false); }}
            />
          </div>
        )}

        {/* Schedule Interview Modal */}
        {showScheduleModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fadeInUp'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-slate-800'>
                  {scheduleStep === 1 ? 'Choose Interview Type' : 'Select Date & Time'}
                </h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className='text-slate-500 hover:text-slate-700 text-2xl'
                >
                  ✕
                </button>
              </div>

              {scheduleStep === 1 ? (
                <div className='space-y-3'>
                  <button
                    onClick={() => handleInterviewTypeSelect('connection')}
                    className='w-full p-4 border-2 border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all duration-300 text-left'
                  >
                    <div className='font-bold text-slate-800'>👥 Interview with Connections</div>
                    <div className='text-sm text-slate-600 mt-1'>Schedule with alumni mentors</div>
                  </button>
                  <button
                    onClick={() => handleInterviewTypeSelect('ai')}
                    className='w-full p-4 border-2 border-purple-300 rounded-lg hover:bg-purple-50 transition-all duration-300 text-left'
                  >
                    <div className='font-bold text-slate-800'>🤖 AI Interview</div>
                    <div className='text-sm text-slate-600 mt-1'>Practice with AI interviewer</div>
                  </button>
                </div>
              ) : (
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>Select Date</label>
                    <input
                      type='date'
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className='w-full p-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>Select Time</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className='w-full p-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none'
                    >
                      <option value=''>Choose a time</option>
                      <option value='09:00 AM'>09:00 AM</option>
                      <option value='10:00 AM'>10:00 AM</option>
                      <option value='11:00 AM'>11:00 AM</option>
                      <option value='02:00 PM'>02:00 PM</option>
                      <option value='03:00 PM'>03:00 PM</option>
                      <option value='04:00 PM'>04:00 PM</option>
                    </select>
                  </div>
                  <div className='flex gap-3 pt-4'>
                    <button
                      onClick={() => setScheduleStep(1)}
                      className='flex-1 px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all'
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSaveSchedule}
                      disabled={!selectedDate || !selectedTime}
                      className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50'
                    >
                      Save Schedule
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
