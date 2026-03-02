'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LearningPath() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState('')
  const [currentSkills, setCurrentSkills] = useState([])
  const [learningPath, setLearningPath] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Machine Learning Engineer',
    'DevOps Engineer',
    'Mobile Developer',
    'UI/UX Designer'
  ]

  const skillOptions = [
    'HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java', 
    'SQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'TypeScript'
  ]

  const toggleSkill = (skill) => {
    setCurrentSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const generatePath = async () => {
    if (!selectedRole) return
    
    setIsGenerating(true)
    
    try {
      const prompt = `Create a detailed learning path for someone who wants to become a ${selectedRole}.

Current skills: ${currentSkills.length > 0 ? currentSkills.join(', ') : 'None'}

Provide a comprehensive roadmap in JSON format with:
- Estimated duration
- 3 phases (Foundation, Intermediate, Advanced) with topics and resources
- 4 milestone projects

Format:
{
  "role": "${selectedRole}",
  "duration": "time estimate",
  "phases": [
    {"name": "Foundation", "duration": "weeks", "topics": ["topic1", "topic2"], "resources": ["resource1", "resource2"]},
    {"name": "Intermediate", "duration": "weeks", "topics": ["topic1", "topic2"], "resources": ["resource1", "resource2"]},
    {"name": "Advanced", "duration": "weeks", "topics": ["topic1", "topic2"], "resources": ["resource1", "resource2"]}
  ],
  "projects": ["project1", "project2", "project3", "project4"]
}`;

      const response = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: prompt
        })
      })
      
      const data = await response.json()
      
      if (data.success && data.answer) {
        try {
          const cleanText = data.answer.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          const parsed = JSON.parse(cleanText);
          setLearningPath({
            ...parsed,
            success: true
          });
        } catch (parseError) {
          // Fallback structure
          setLearningPath({
            role: selectedRole,
            duration: '3-6 months',
            phases: [
              {
                name: 'Foundation',
                duration: '4-6 weeks',
                topics: ['Core concepts', 'Basic syntax', 'Development environment'],
                resources: ['Official documentation', 'Interactive tutorials', 'Practice projects']
              },
              {
                name: 'Intermediate',
                duration: '8-10 weeks',
                topics: ['Advanced patterns', 'Best practices', 'Real-world projects'],
                resources: ['Online courses', 'Code challenges', 'Open source contribution']
              },
              {
                name: 'Advanced',
                duration: '6-8 weeks',
                topics: ['System design', 'Performance optimization', 'Production deployment'],
                resources: ['Advanced courses', 'Technical blogs', 'Portfolio projects']
              }
            ],
            projects: [
              'Build a personal portfolio website',
              'Create a full-stack application',
              'Contribute to open source',
              'Deploy a production app'
            ]
          });
        }
      }
    } catch (error) {
      console.error('Error:', error)
      // Use fallback
      setLearningPath({
        role: selectedRole,
        duration: '3-6 months',
        phases: [
          {
            name: 'Foundation',
            duration: '4-6 weeks',
            topics: ['Core concepts', 'Basic syntax', 'Development environment'],
            resources: ['Official documentation', 'Interactive tutorials', 'Practice projects']
          },
          {
            name: 'Intermediate',
            duration: '8-10 weeks',
            topics: ['Advanced patterns', 'Best practices', 'Real-world projects'],
            resources: ['Online courses', 'Code challenges', 'Open source contribution']
          },
          {
            name: 'Advanced',
            duration: '6-8 weeks',
            topics: ['System design', 'Performance optimization', 'Production deployment'],
            resources: ['Advanced courses', 'Technical blogs', 'Portfolio projects']
          }
        ],
        projects: [
          'Build a personal portfolio website',
          'Create a full-stack application',
          'Contribute to open source',
          'Deploy a production app'
        ]
      })
    }
    
    setIsGenerating(false)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <button 
            onClick={() => router.back()}
            className='text-slate-600 hover:text-slate-800 mb-4 flex items-center gap-2'
          >
            ← Back
          </button>
          <h1 className='text-4xl font-bold gradient-text mb-2'>Personalized Learning Path</h1>
          <p className='text-slate-600'>Get a customized roadmap based on your goals and current skills</p>
        </div>

        {!learningPath ? (
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            {/* Role Selection */}
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-slate-800 mb-4'>What role are you targeting?</h2>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                {roles.map(role => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                      selectedRole === role
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-slate-200 text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Skills */}
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-slate-800 mb-4'>What skills do you already have?</h2>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                {skillOptions.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                      currentSkills.includes(skill)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-slate-200 text-slate-700 hover:border-green-300'
                    }`}
                  >
                    {currentSkills.includes(skill) ? '✓ ' : ''}{skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePath}
              disabled={!selectedRole || isGenerating}
              className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-300 disabled:to-slate-300 text-white font-bold py-4 rounded-lg transition-all text-lg'
            >
              {isGenerating ? '🔄 Generating Your Path...' : '🚀 Generate Learning Path'}
            </button>
          </div>
        ) : (
          <div className='space-y-6'>
            {/* Path Overview */}
            <div className='bg-white rounded-2xl shadow-lg p-8'>
              <div className='flex justify-between items-start mb-6'>
                <div>
                  <h2 className='text-3xl font-bold text-slate-800 mb-2'>{learningPath.role}</h2>
                  <p className='text-slate-600'>Estimated Duration: <span className='font-semibold text-purple-600'>{learningPath.duration}</span></p>
                </div>
                <button
                  onClick={() => setLearningPath(null)}
                  className='px-4 py-2 border-2 border-slate-300 rounded-lg hover:bg-slate-50 font-semibold'
                >
                  Start Over
                </button>
              </div>

              {/* Phases */}
              <div className='space-y-6'>
                {learningPath.phases.map((phase, idx) => (
                  <div key={idx} className='border-2 border-purple-200 rounded-xl p-6 bg-purple-50'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold'>
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className='text-xl font-bold text-slate-800'>{phase.name}</h3>
                        <p className='text-sm text-slate-600'>{phase.duration}</p>
                      </div>
                    </div>

                    <div className='grid md:grid-cols-2 gap-4'>
                      <div>
                        <h4 className='font-semibold text-slate-700 mb-2'>📚 Topics to Learn</h4>
                        <ul className='space-y-1'>
                          {phase.topics.map((topic, i) => (
                            <li key={i} className='text-sm text-slate-600'>• {topic}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className='font-semibold text-slate-700 mb-2'>🔗 Resources</h4>
                        <ul className='space-y-1'>
                          {phase.resources.map((resource, i) => (
                            <li key={i} className='text-sm text-slate-600'>• {resource}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className='bg-white rounded-2xl shadow-lg p-8'>
              <h3 className='text-2xl font-bold text-slate-800 mb-4'>🎯 Milestone Projects</h3>
              <div className='grid md:grid-cols-2 gap-4'>
                {learningPath.projects.map((project, idx) => (
                  <div key={idx} className='p-4 border-2 border-green-200 rounded-lg bg-green-50'>
                    <div className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0'>
                        {idx + 1}
                      </div>
                      <p className='text-slate-700 font-semibold'>{project}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
