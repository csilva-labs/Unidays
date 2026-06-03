import { useState } from 'react'

const categories = ['All', 'Tech', 'Fashion', 'Food & drink', 'Entertainment', 'Travel', 'Health', 'Subscriptions']

export default function CategoryFilters() {
  const [active, setActive] = useState('All')

  return (
    <div className="flex items-center gap-2 px-6 py-4 overflow-x-auto">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-inter font-medium transition-all ${
            active === cat
              ? 'bg-ud-teal text-ud-navy'
              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
