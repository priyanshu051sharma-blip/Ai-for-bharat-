'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CodeExplainer() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [explanation, setExplanation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [difficulty, setDifficulty] = useState('beginner')

  const handleExplain = async () => {
    if (!code.trim()) return
    
    setIsLoading(true)
    try {
      // Use the existing gemini-chat API that works
      const prompt = `You are a code explanation expert. Analyze this ${language} code at ${difficulty} level.

Code:
\`\`\`${language}
${code}
\`\`\`

Provide:
1. Brief overview of what the code does
2. Line-by-line breakdown (at least 3-5 key lines)
3. 2-3 suggestions for improvement

Format as JSON:
{
  "overview": "description",
  "breakdown": [{"line": "code", "explanation": "what it does"}],
  "suggestions": ["suggestion 1", "suggestion 2"]
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
          // Try to parse JSON from the answer
          const cleanText = data.answer.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          const parsed = JSON.parse(cleanText);
          setExplanation({
            ...parsed,
            success: true
          });
        } catch (parseError) {
          // If not JSON, structure the text response
          setExplanation({
            overview: data.answer.split('\n')[0] || "Code analysis completed",
            breakdown: [
              { line: "Analysis", explanation: data.answer }
            ],
            suggestions: ["Review the explanation above"],
            success: true
          });
        }
      } else {
        setExplanation({
          overview: 'Error analyzing code. Please try again.',
          breakdown: [],
          suggestions: []
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setExplanation({
        overview: 'Error analyzing code. Please try again.',
        breakdown: [],
        suggestions: []
      })
    }
    setIsLoading(false)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <button 
            onClick={() => router.back()}
            className='text-slate-600 hover:text-slate-800 mb-4 flex items-center gap-2'
          >
            ← Back
          </button>
          <h1 className='text-4xl font-bold gradient-text mb-2'>Code Explainer</h1>
          <p className='text-slate-600'>Paste any code and get AI-powered explanations</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Input Section */}
          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <h2 className='text-xl font-bold text-slate-800 mb-4'>Your Code</h2>
            
            {/* Controls */}
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 block mb-2'>Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='javascript'>JavaScript</option>
                  <option value='python'>Python</option>
                  <option value='java'>Java</option>
                  <option value='cpp'>C++</option>
                  <option value='go'>Go</option>
                  <option value='rust'>Rust</option>
                </select>
              </div>
              <div>
                <label className='text-sm font-semibold text-slate-700 block mb-2'>Explanation Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='beginner'>Beginner</option>
                  <option value='intermediate'>Intermediate</option>
                  <option value='advanced'>Advanced</option>
                </select>
              </div>
            </div>

            {/* Code Input */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='Paste your code here...'
              className='w-full h-96 p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50'
            />

            <button
              onClick={handleExplain}
              disabled={!code.trim() || isLoading}
              className='w-full mt-4 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition-colors'
            >
              {isLoading ? '🔍 Analyzing...' : '✨ Explain Code'}
            </button>
          </div>

          {/* Output Section */}
          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <h2 className='text-xl font-bold text-slate-800 mb-4'>Explanation</h2>
            
            {!explanation && !isLoading && (
              <div className='text-center py-20 text-slate-500'>
                <div className='text-6xl mb-4'>💡</div>
                <p>Paste code and click "Explain Code" to get started</p>
              </div>
            )}

            {isLoading && (
              <div className='text-center py-20'>
                <div className='animate-spin text-6xl mb-4'>🔄</div>
                <p className='text-slate-600'>Analyzing your code...</p>
              </div>
            )}

            {explanation && (
              <div className='space-y-6 overflow-y-auto max-h-[500px]'>
                {/* Overview */}
                <div className='p-4 bg-blue-50 border-2 border-blue-200 rounded-lg'>
                  <h3 className='font-bold text-blue-900 mb-2'>📋 Overview</h3>
                  <p className='text-blue-800 text-sm'>{explanation.overview || 'This code performs various operations.'}</p>
                </div>

                {/* Line by Line */}
                {explanation.breakdown && explanation.breakdown.length > 0 && (
                  <div>
                    <h3 className='font-bold text-slate-800 mb-3'>🔍 Line by Line</h3>
                    <div className='space-y-2'>
                      {explanation.breakdown.map((item, idx) => (
                        <div key={idx} className='p-3 bg-slate-50 border border-slate-200 rounded-lg'>
                          <p className='font-mono text-xs text-slate-600 mb-1'>{item.line}</p>
                          <p className='text-sm text-slate-700'>{item.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {explanation.suggestions && explanation.suggestions.length > 0 && (
                  <div className='p-4 bg-green-50 border-2 border-green-200 rounded-lg'>
                    <h3 className='font-bold text-green-900 mb-2'>💡 Suggestions</h3>
                    <ul className='space-y-1'>
                      {explanation.suggestions.map((suggestion, idx) => (
                        <li key={idx} className='text-sm text-green-800'>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
