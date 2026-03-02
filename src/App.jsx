import { useState } from 'react'
import PropertyForm from './components/PropertyForm'
import ListingOutput from './components/ListingOutput'

export default function App() {
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async (formData) => {
    setIsLoading(true)
    setError(null)
    setListing(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      setListing(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="pt-16 pb-14 px-6 text-center border-b border-stone-100">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-amber-600 opacity-40" />
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600 opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-700 opacity-80" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600 opacity-60" />
          </div>
          <div className="h-px w-16 bg-amber-600 opacity-40" />
        </div>

        <p className="text-xs tracking-[0.3em] uppercase text-amber-700 font-medium mb-4">
          Vacation Home Co-Ownership
        </p>

        <h1 className="font-cormorant font-light text-5xl md:text-6xl text-stone-900 leading-tight mb-2">
          AI Property Listing
        </h1>
        <h1 className="font-cormorant font-medium italic text-5xl md:text-6xl text-amber-700 leading-tight">
          Generator
        </h1>

        <p className="mt-6 text-sm text-stone-400 font-light tracking-wide max-w-md mx-auto">
          Enter your property details and receive polished marketing copy
          in English and German — instantly.
        </p>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-14">
        <PropertyForm onGenerate={handleGenerate} isLoading={isLoading} />

        {/* Loading */}
        {isLoading && (
          <div className="mt-14 flex flex-col items-center justify-center py-20">
            <div className="relative w-10 h-10 mb-6">
              <div className="absolute inset-0 rounded-full border border-stone-100" />
              <div className="absolute inset-0 rounded-full border border-transparent border-t-amber-600 animate-spin" />
            </div>
            <p className="text-xs tracking-[0.25em] uppercase text-stone-400">
              Crafting your luxury listing&hellip;
            </p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-2xl">
            <p className="text-sm text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Output */}
        {listing && !isLoading && <ListingOutput listing={listing} />}
      </main>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-stone-50">
        <p className="text-xs text-stone-300 tracking-[0.2em] uppercase">
          Powered by Claude AI &mdash; Anthropic
        </p>
      </footer>
    </div>
  )
}
