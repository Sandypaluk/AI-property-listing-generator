# 🏡 AI Property Listing Generator

An AI-powered marketing copy generator that produces polished, 
professional vacation home listings in both English and German 
instantly — from a simple property details form.

Built with Claude API to eliminate manual copywriting for 
luxury vacation property listings.

## 🚀 Live Demo
[Live App]([ai-property-listing-generator.vercel.app]) 
[Video Walkthrough]([https://youtu.be/Blk4pKRkiKw])

## 💡 The Problem It Solves
Writing high-quality property listings is time-consuming and 
inconsistent — especially for companies operating across multiple 
European markets that require bilingual copy.

This tool eliminates that bottleneck entirely:
- Marketing teams no longer need to write listings manually
- Produces consistent, premium-quality copy every time
- Supports DACH market operations with native German output
- Frees up marketing bandwidth for higher-value strategic work

## ✨ Features
- **Bilingual output** — generates polished listings in both 
  English and German simultaneously
- **Smart property inputs** — location, size, bedrooms, bathrooms, 
  and 12 amenity options including pool, garden, and parking
- **Luxury tone** — copy is crafted for premium vacation home 
  audiences, not generic real estate
- **One-click copy** — copy English or German output to clipboard 
  instantly
- **Loading state** — elegant "Crafting your luxury listing…" 
  indicator while Claude generates

## 📊 Business Impact
| Metric | Before | After |
|---|---|---|
| Time to write one listing | 30-45 mins (copywriter) | Under 15 seconds |
| Languages covered | One at a time | English + German simultaneously |
| Consistency | Varies by writer | 100% consistent tone |
| Cost per listing | High (staff/agency time) | Near zero |
| Scale | Limited by headcount | Unlimited |

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Deployment:** Vercel

## ⚙️ Run Locally
```bash
git clone https://github.com/Sandypaluk/ai-property-listing-generator
cd ai-property-listing-generator
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm run dev
```

## 🧠 How It Works
1. User fills in property details — location, size, bedrooms, 
   bathrooms, and amenities
2. Details are sent to Claude API via a secure Express backend
3. Claude generates a headline, tagline, and 3 paragraphs of 
   luxury marketing copy in both English and German
4. Output renders side by side with one-click copy buttons

## 🌍 Why Bilingual?
Germany, Austria, and Switzerland (DACH) represent one of the 
largest markets for premium vacation home ownership in Europe. 
Native German copy — not translated copy — is essential for 
building trust with DACH buyers.

## 👩‍💻 Built By
Sandra Paluku — AI & Automation Builder
[GitHub](https://github.com/Sandypaluk) | [www.linkedin.com/in/sk-paluku)
