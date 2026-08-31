import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { location, size, bedrooms, bathrooms, amenities } = req.body

    if (!location || !size || !bedrooms || !bathrooms) {
      return res.status(400).json({ error: 'Missing required property details' })
    }

    const amenitiesText =
      amenities?.length > 0 ? amenities.join(', ') : 'standard amenities'

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 2048,
      system:
        'You are an elite luxury real estate copywriter specializing in vacation home co-ownership properties. You craft evocative, aspirational marketing copy for discerning high-net-worth buyers seeking exclusive lifestyle experiences. Respond with valid JSON only — no markdown, no preamble, no code blocks.',
      messages: [
        {
          role: 'user',
          content: `Write premium marketing copy for this vacation property:

Location: ${location}
Size: ${size} sqm
Bedrooms: ${bedrooms}
Bathrooms: ${bathrooms}
Amenities: ${amenitiesText}

Return a JSON object with exactly this structure:
{
  "english": {
    "headline": "A compelling property headline, max 10 words",
    "tagline": "A short aspirational lifestyle tagline, max 12 words",
    "description": "paragraph 1\\n\\nparagraph 2\\n\\nparagraph 3"
  },
  "german": {
    "headline": "Eine überzeugende Überschrift, max 10 Wörter",
    "tagline": "Ein inspirierender Lifestyle-Slogan, max 12 Wörter",
    "description": "Absatz 1\\n\\nAbsatz 2\\n\\nAbsatz 3"
  }
}

Each description must have exactly 3 paragraphs (2–4 sentences each). Write in a premium, aspirational tone suited for vacation home co-ownership. Be specific about the location and property features. Evoke lifestyle, exclusivity, and the privilege of owning a share of paradise.`,
        },
      ],
    })

    const rawContent = message?.content?.[0]?.text?.trim() || message?.content?.[0]?.text || ''
if (!rawContent) throw new Error('Empty response from AI: ' + JSON.stringify(message.content))

    let result
    try {
      result = JSON.parse(rawContent)
    } catch {
      const match = rawContent.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Could not parse AI response as JSON')
      result = JSON.parse(match[0])
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Generation error:', error.message)
    res.status(error.status || 500).json({
      error: error.message || 'An unexpected error occurred',
    })
  }
}
