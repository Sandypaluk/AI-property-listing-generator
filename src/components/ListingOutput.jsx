import { useEffect, useRef, useState } from 'react'

function CopyButton({ textToCopy, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
    } catch {
      // Fallback for environments without clipboard API
      const ta = document.createElement('textarea')
      ta.value = textToCopy
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium
        tracking-wider uppercase transition-all duration-200 border
        ${
          copied
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
            : 'border-stone-200 bg-white text-stone-500 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-800'
        }
      `}
    >
      {copied ? (
        <>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          {label}
        </>
      )}
    </button>
  )
}

function ListingCard({ data, lang }) {
  const isEnglish = lang === 'english'
  const fullText = `${data.headline}\n\n${data.tagline}\n\n${data.description}`

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Card Header */}
      <div className="flex items-center justify-between px-7 py-5 bg-stone-50 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <span
            className={`
              inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold tracking-wider
              ${isEnglish ? 'bg-stone-900 text-white' : 'bg-amber-700 text-white'}
            `}
          >
            {isEnglish ? 'EN' : 'DE'}
          </span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400">
            {isEnglish ? 'English' : 'Deutsch'}
          </span>
        </div>

        <CopyButton
          textToCopy={fullText}
          label={isEnglish ? 'Copy to Clipboard' : 'In Zwischenablage'}
        />
      </div>

      {/* Card Body */}
      <div className="p-7 flex flex-col flex-1">
        {/* Headline */}
        <h3 className="font-cormorant font-medium text-2xl md:text-3xl text-stone-900 leading-tight mb-2">
          {data.headline}
        </h3>

        {/* Tagline */}
        <p className="font-cormorant italic text-lg text-amber-700 leading-snug mb-6">
          {data.tagline}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-px flex-1 bg-stone-100" />
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-stone-200" />
            <div className="w-1 h-1 rounded-full bg-amber-300 opacity-60" />
            <div className="w-1 h-1 rounded-full bg-stone-200" />
          </div>
          <div className="h-px flex-1 bg-stone-100" />
        </div>

        {/* Description paragraphs */}
        <div className="space-y-4 flex-1">
          {data.description.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-stone-500 text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ListingOutput({ listing }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [listing])

  return (
    <div ref={ref} className="mt-14 scroll-mt-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-amber-600 opacity-30" />
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-amber-600 opacity-50" />
            <div className="w-1 h-1 rounded-full bg-amber-700 opacity-70" />
            <div className="w-1 h-1 rounded-full bg-amber-600 opacity-50" />
          </div>
          <div className="h-px w-10 bg-amber-600 opacity-30" />
        </div>
        <h2 className="text-xs font-medium tracking-[0.3em] uppercase text-stone-400">
          Your Luxury Listing
        </h2>
      </div>

      {/* Two-column cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ListingCard data={listing.english} lang="english" />
        <ListingCard data={listing.german} lang="german" />
      </div>

      <p className="text-center text-xs text-stone-300 mt-6 tracking-wide">
        Adjust the details above and generate again to create a new version
      </p>
    </div>
  )
}
