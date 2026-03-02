import { useState } from 'react'

const AMENITIES = [
  { id: 'private-pool', label: 'Private Pool' },
  { id: 'garden-terrace', label: 'Garden / Terrace' },
  { id: 'private-parking', label: 'Private Parking' },
  { id: 'fitness-room', label: 'Fitness Room' },
  { id: 'spa-sauna', label: 'Spa & Sauna' },
  { id: 'high-speed-wifi', label: 'High-Speed WiFi' },
  { id: 'air-conditioning', label: 'Air Conditioning' },
  { id: 'fireplace', label: 'Fireplace' },
  { id: 'sea-view', label: 'Sea View' },
  { id: 'mountain-view', label: 'Mountain View' },
  { id: 'concierge', label: 'Concierge Service' },
  { id: 'wine-cellar', label: 'Wine Cellar' },
]

export default function PropertyForm({ onGenerate, isLoading }) {
  const [formData, setFormData] = useState({
    location: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAmenityToggle = (label) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(label)
        ? prev.amenities.filter((a) => a !== label)
        : [...prev.amenities, label],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(formData)
  }

  const isValid =
    formData.location.trim() &&
    formData.size &&
    formData.bedrooms &&
    formData.bathrooms

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone-100 rounded-2xl p-8 md:p-10 shadow-sm"
    >
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-xs font-medium tracking-[0.25em] uppercase text-stone-400 mb-3">
          Property Details
        </h2>
        <div className="h-px bg-stone-100" />
      </div>

      {/* Location */}
      <div className="mb-8">
        <label className="label-luxury">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Côte d'Azur, France"
          className="input-luxury"
          required
        />
      </div>

      {/* Size / Bedrooms / Bathrooms */}
      <div className="grid grid-cols-3 gap-6 md:gap-8 mb-10">
        <div>
          <label className="label-luxury">Size (sqm)</label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="250"
            min="20"
            className="input-luxury"
            required
          />
        </div>
        <div>
          <label className="label-luxury">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="4"
            min="1"
            max="20"
            className="input-luxury"
            required
          />
        </div>
        <div>
          <label className="label-luxury">Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="3"
            min="1"
            max="20"
            className="input-luxury"
            required
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-10">
        <div className="mb-5">
          <h3 className="text-xs font-medium tracking-[0.25em] uppercase text-stone-400 mb-3">
            Amenities
          </h3>
          <div className="h-px bg-stone-100" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {AMENITIES.map(({ id, label }) => {
            const checked = formData.amenities.includes(label)
            return (
              <label
                key={id}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                  border transition-all duration-150 select-none
                  ${
                    checked
                      ? 'border-amber-200 bg-amber-50 text-amber-900'
                      : 'border-stone-100 bg-white text-stone-500 hover:border-stone-200 hover:bg-stone-50'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleAmenityToggle(label)}
                  className="sr-only"
                />
                {/* Custom checkbox */}
                <span
                  className={`
                    flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center
                    transition-all duration-150
                    ${checked ? 'border-amber-600 bg-amber-600' : 'border-stone-300'}
                  `}
                >
                  {checked && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-sm font-medium leading-tight">{label}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={`
          w-full py-4 px-8 rounded-xl text-sm font-medium tracking-[0.2em] uppercase
          transition-all duration-200
          ${
            isValid && !isLoading
              ? 'bg-amber-700 text-white hover:bg-amber-800 shadow-sm hover:shadow-md active:scale-[0.99]'
              : 'bg-stone-100 text-stone-300 cursor-not-allowed'
          }
        `}
      >
        {isLoading ? 'Generating\u2026' : 'Generate Luxury Listing'}
      </button>
    </form>
  )
}
