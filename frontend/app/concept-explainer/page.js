'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ConceptExplainer() {
  const router = useRouter()
  const [concept, setConcept] = useState('')
  const [category, setCategory] = useState('programming')
  const [explanation, setExplanation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { id: 'programming', name: 'Programming', icon: '💻' },
    { id: 'algorithms', name: 'Algorithms', icon: '🧮' },
    { id: 'system-design', name: 'System Design', icon: '🏗️' },
    { id: 'databases', name: 'Databases', icon: '🗄️' },
    { id: 'web-dev', name: 'Web Development', icon: '🌐' },
    { id: 'ml-ai', name: 'ML/AI', icon: '🤖' }
  ]

  const popularConcepts = {
    programming: ['Closures', 'Promises', 'Async/Await', 'Recursion'],
    algorithms: ['Binary Search', 'Dynamic Programming', 'Graph Traversal', 'Sorting'],
    'system-design': ['Load Balancing', 'Caching', 'Microservices', 'API Design'],
    databases: ['Indexing', 'Normalization', 'Transactions', 'Sharding'],
    'web-dev': ['REST APIs', 'Authentication', 'State Management', 'Responsive Design'],
    'ml-ai': ['Neural Networks', 'Gradient Descent', 'Overfitting', 'Feature Engineering']
  }

  const handleExplain = async () => {
    if (!concept.trim()) return
    
    setIsLoading(true)
    
    try {
      const prompt = `Explain the technical concept "${concept}" in the ${category} category.

Provide a comprehensive explanation in JSON format:
{
  "title": "${concept}",
  "simple": "Simple one-sentence explanation for beginners",
  "detailed": "Detailed technical explanation",
  "analogy": "Real-world analogy",
  "useCases": ["use case 1", "use case 2", "use case 3", "use case 4"],
  "examples": [{"language": "JavaScript", "code": "working code example"}],
  "relatedConcepts": ["concept 1", "concept 2", "concept 3"]
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
          setExplanation({
            ...parsed,
            success: true
          });
        } catch (parseError) {
          // Fallback structure
          setExplanation({
            title: concept,
            simple: `${concept} is a fundamental concept in ${category}.`,
            detailed: data.answer,
            analogy: `Understanding ${concept} is like learning a new skill.`,
            useCases: [
              'Building scalable applications',
              'Optimizing performance',
              'Solving complex problems',
              'Improving code maintainability'
            ],
            examples: [
              {
                language: 'JavaScript',
                code: `// Example of ${concept}\nfunction example() {\n  // Implementation\n  return result;\n}`
              }
            ],
            relatedConcepts: ['Related Concept 1', 'Related Concept 2', 'Related Concept 3']
          });
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setExplanation({
        title: concept,
        simple: `${concept} is a fundamental concept.`,
        detailed: 'Error loading explanation. Please try again.',
        analogy: 'Please try again.',
        useCases: [],
        examples: [],
        relatedConcepts: []
      })
    }
    
    setIsLoading(false)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-green-50 to-teal-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <button 
            onClick={() => router.back()}
            className='text-slate-600 hover:text-slate-800 mb-4 flex items-center gap-2'
          >
            ← Back
          </button>
          <h1 className='text-4xl font-bold gradient-text mb-2'>Concept Explainer</h1>
          <p className='text-slate-600'>Break down complex technical concepts into simple explanations</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Input Section */}
          <div className='lg:col-span-1 space-y-6'>
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <h2 className='text-xl font-bold text-slate-800 mb-4'>Select Category</h2>
              <div className='space-y-2'>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`w-full p-3 rounded-lg border-2 font-semibold transition-all flex items-center gap-3 ${
                      category === cat.id
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-slate-200 text-slate-700 hover:border-green-300'
                    }`}
                  >
                    <span className='text-2xl'>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <h2 className='text-xl font-bold text-slate-800 mb-4'>Popular Topics</h2>
              <div className='space-y-2'>
                {popularConcepts[category].map(topic => (
                  <button
                    key={topic}
                    onClick={() => setConcept(topic)}
                    className='w-full p-2 text-left text-sm text-slate-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors'
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Search */}
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <h2 className='text-xl font-bold text-slate-800 mb-4'>What do you want to learn?</h2>
              <input
                type='text'
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder='e.g., Closures, Binary Search, Load Balancing...'
                className='w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4'
              />
              <button
                onClick={handleExplain}
                disabled={!concept.trim() || isLoading}
                className='w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition-colors'
              >
                {isLoading ? '🔍 Explaining...' : '✨ Explain Concept'}
              </button>
            </div>

            {/* Explanation */}
            {!explanation && !isLoading && (
              <div className='bg-white rounded-2xl shadow-lg p-12 text-center'>
                <div className='text-6xl mb-4'>🎓</div>
                <p className='text-slate-600'>Enter a concept or select from popular topics to get started</p>
              </div>
            )}

            {isLoading && (
              <div className='bg-white rounded-2xl shadow-lg p-12 text-center'>
                <div className='animate-spin text-6xl mb-4'>🔄</div>
                <p className='text-slate-600'>Generating explanation...</p>
              </div>
            )}

            {explanation && (
              <div className='space-y-6'>
                {/* Simple Explanation */}
                <div className='bg-white rounded-2xl shadow-lg p-6'>
                  <h3 className='text-2xl font-bold text-slate-800 mb-4'>{explanation.title}</h3>
                  <div className='p-4 bg-blue-50 border-2 border-blue-200 rounded-lg mb-4'>
                    <h4 className='font-bold text-blue-900 mb-2'>🎯 Simple Explanation</h4>
                    <p className='text-blue-800'>{explanation.simple}</p>
                  </div>
                  <div className='p-4 bg-purple-50 border-2 border-purple-200 rounded-lg'>
                    <h4 className='font-bold text-purple-900 mb-2'>📖 Detailed Explanation</h4>
                    <p className='text-purple-800'>{explanation.detailed}</p>
                  </div>
                </div>

                {/* Analogy */}
                <div className='bg-white rounded-2xl shadow-lg p-6'>
                  <h4 className='font-bold text-slate-800 mb-3 flex items-center gap-2'>
                    <span className='text-2xl'>💡</span>
                    Real-World Analogy
                  </h4>
                  <p className='text-slate-700 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200'>
                    {explanation.analogy}
                  </p>
                </div>

                {/* Use Cases */}
                <div className='bg-white rounded-2xl shadow-lg p-6'>
                  <h4 className='font-bold text-slate-800 mb-3'>🎯 Common Use Cases</h4>
                  <div className='grid md:grid-cols-2 gap-3'>
                    {explanation.useCases.map((useCase, idx) => (
                      <div key={idx} className='p-3 bg-green-50 border border-green-200 rounded-lg'>
                        <p className='text-sm text-green-800'>• {useCase}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <div className='bg-white rounded-2xl shadow-lg p-6'>
                  <h4 className='font-bold text-slate-800 mb-3'>💻 Code Example</h4>
                  <pre className='bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto'>
                    <code>{explanation.examples[0].code}</code>
                  </pre>
                </div>

                {/* Related Concepts */}
                <div className='bg-white rounded-2xl shadow-lg p-6'>
                  <h4 className='font-bold text-slate-800 mb-3'>🔗 Related Concepts</h4>
                  <div className='flex flex-wrap gap-2'>
                    {explanation.relatedConcepts.map((related, idx) => (
                      <button
                        key={idx}
                        onClick={() => setConcept(related)}
                        className='px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors'
                      >
                        {related}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
