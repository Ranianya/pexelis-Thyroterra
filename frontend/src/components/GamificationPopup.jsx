'use client'

import { useState, useEffect } from 'react'

export function GamificationPopup({ completedCount, totalCount, isVisible }) {
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowPulse(true)
      const timer = setTimeout(() => setShowPulse(false), 600)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!isVisible) return null

  const messages = [
    'Great start! You are blooming!',
    'Your forest is growing! Keep it up!',
    'The trees are proud of you! Your forest is blooming today!',
    'Amazing progress! You are unstoppable!',
    'Fantastic! Keep shining bright!',
  ]

  const messageIndex = Math.min(Math.floor(completedCount / 2), messages.length - 1)
  const message = messages[messageIndex]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-card border-4 border-primary rounded-xl p-8 max-w-md text-center transform transition-all duration-300 ${
          showPulse ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Star decorations */}
        <div className="absolute top-4 left-4 text-2xl">✨</div>
        <div className="absolute top-4 right-4 text-2xl">✨</div>

        <h2 className="text-3xl font-bold text-foreground mb-4 uppercase">LEVEL UP!</h2>

        <p className="text-lg text-foreground mb-6 leading-relaxed">{message}</p>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="text-4xl">🌳</div>
          <div className="text-4xl">🌲</div>
          <div className="text-4xl">🌴</div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-bold text-sm uppercase hover:bg-primary transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
