export const BRAND_STRATEGY_REPORT_PROMPT = `
You are a world-class Brand Strategist. Generate a comprehensive Brand Strategy Report in JSON format based on the client's 57 answers.

TONE: Professional, warm, faith-based, action-oriented, confident.

OUTPUT JSON STRUCTURE:
{
  "brandEssence": { "summary": "...", "coreIdentity": "..." },
  "coreBrandThemes": { "mission": "...", "deeperWhy": "...", "themes": [...] },
  "uniqueVoice": { "threeWords": [...], "description": "..." },
  "monetizableStrengths": [{ "icon": "emoji", "title": "...", "description": "..." }],
  "signatureFramework": {
    "frameworkName": "THE [ACRONYM] FRAMEWORK",
    "tagline": "...",
    "steps": [{ "letter": "X", "word": "...", "description": "..." }]
  },
  "positioningStatement": "...",
  "targetAudience": {
    "whoTheyAre": "...",
    "struggles": [...],
    "solutions": [...]
  },
  "competitiveEdge": [{ "title": "...", "description": "..." }],
  "contentPillars": [{ "name": "...", "percentage": 25, "topics": [...] }],
  "monetizationRoadmap": [
    { "tier": 1, "name": "Entry Point", "priceRange": "$47-$297", "offers": [...] },
    { "tier": 2, "name": "Signature Program", "priceRange": "$997-$2,997", "offers": [...] },
    { "tier": 3, "name": "Premium Services", "priceRange": "$3,000-$10,000+", "offers": [...] },
    { "tier": 4, "name": "Enterprise", "priceRange": "$10,000+", "offers": [...] }
  ],
  "nextSteps": [{ "icon": "emoji", "title": "...", "description": "..." }],
  "strategicPriority": { "priority": "...", "quickWin": "..." },
  "brandAssets": {
    "bios": { "short": "50 words", "medium": "100 words", "long": "200 words" },
    "socialProfiles": { "instagram": "160 chars", "linkedin": "...", "twitter": "..." }
  }
}

INSTRUCTIONS:
1. Create a custom signature framework using an acronym from their key concepts
2. Make monetization roadmap specific to their offer type
3. Generate specific, actionable content pillars
4. Write in their brand voice based on Q44 answer

Generate the complete report now.
`

export const generateMockReportData = (firstName: string) => ({
  brandEssence: {
    summary: `${firstName}, you are a bridge-builder — someone who helps ambitious professionals transform their expertise into a thriving personal brand. Your unique blend of strategic thinking and authentic connection makes you the guide people need when they're ready to step into their calling.`,
    coreIdentity: 'The Clarity Catalyst - Helping experts package their gifts into profitable offers',
  },
  coreBrandThemes: {
    mission: 'To help skilled professionals stop hiding their gifts and start building businesses that reflect their true calling.',
    deeperWhy: 'Because too many talented people remain invisible, stuck in jobs that don\'t fulfill them, when the world needs what they have to offer.',
    themes: [
      'Authentic Leadership',
      'Purpose-Driven Business',
      'Strategic Clarity',
      'Transformational Impact',
      'Faith-Based Entrepreneurship',
    ],
  },
  uniqueVoice: {
    threeWords: ['Bold', 'Warm', 'Strategic'],
    description: 'Your voice combines directness with deep empathy. You speak truth with love, challenge with support, and inspire action with understanding. Your communication style makes complex ideas accessible and motivates people to take bold steps.',
  },
  monetizableStrengths: [
    {
      icon: '🎯',
      title: 'Strategic Clarity Sessions',
      description: 'One-on-one deep dives helping clients uncover their brand positioning and messaging',
    },
    {
      icon: '📚',
      title: 'Brand Strategy Courses',
      description: 'Self-paced programs teaching your framework to a wider audience',
    },
    {
      icon: '🎤',
      title: 'Speaking & Workshops',
      description: 'Keynotes and interactive sessions for conferences and organizations',
    },
    {
      icon: '✍️',
      title: 'Done-For-You Brand Strategy',
      description: 'Complete brand strategy development for premium clients',
    },
    {
      icon: '👥',
      title: 'Group Coaching Programs',
      description: 'Community-based learning with accountability and peer support',
    },
    {
      icon: '📖',
      title: 'Books & Resources',
      description: 'Published works establishing thought leadership in your space',
    },
  ],
  signatureFramework: {
    frameworkName: 'THE C.L.A.R.I.T.Y. FRAMEWORK',
    tagline: 'From Confused to Clear in 7 Steps',
    steps: [
      { letter: 'C', word: 'Calling', description: 'Uncover your unique purpose and what drives you' },
      { letter: 'L', word: 'Landscape', description: 'Map your competitive environment and positioning' },
      { letter: 'A', word: 'Audience', description: 'Define exactly who you serve and their pain points' },
      { letter: 'R', word: 'Resonance', description: 'Craft messaging that connects deeply with your people' },
      { letter: 'I', word: 'Identity', description: 'Build your visual and verbal brand identity' },
      { letter: 'T', word: 'Transformation', description: 'Design offers that deliver real results' },
      { letter: 'Y', word: 'Yield', description: 'Create systems for sustainable income and impact' },
    ],
  },
  positioningStatement: `I help ambitious professionals who are stuck in the gap between their expertise and their impact, transform their knowledge into a clear, compelling brand — so they can finally build the business only they can build.`,
  targetAudience: {
    whoTheyAre: 'Mid-career professionals (35-50) with 10+ years of expertise who feel called to more. They\'ve achieved success by traditional measures but feel unfulfilled. They want to leverage their experience to help others but don\'t know how to package it.',
    struggles: [
      'Feeling invisible despite their expertise',
      'Struggling to articulate what makes them different',
      'Overwhelmed by all the "shoulds" in building a business',
      'Fear of judgment from peers if they put themselves out there',
      'Analysis paralysis preventing them from launching',
    ],
    solutions: [
      'Clear positioning that makes them memorable',
      'A messaging framework that makes content easy',
      'Step-by-step roadmap removing overwhelm',
      'Community of like-minded professionals for support',
      'Accountability to move from planning to action',
    ],
  },
  competitiveEdge: [
    {
      title: 'Faith-Integrated Approach',
      description: 'Unlike secular brand strategists, you honor the spiritual dimension of calling and purpose',
    },
    {
      title: 'Done-Thinking, Not Just Done-Learning',
      description: 'Your process produces actual outputs, not just insights',
    },
    {
      title: 'Deep Strategic Framework',
      description: 'The CLARITY Framework goes deeper than surface-level branding',
    },
    {
      title: 'Practitioner, Not Just Preacher',
      description: 'You\'ve built your own brand from scratch and know the journey',
    },
    {
      title: 'Warm + Direct Communication',
      description: 'You challenge with love, creating breakthroughs without shame',
    },
  ],
  contentPillars: [
    {
      name: 'Purpose & Calling',
      percentage: 25,
      topics: ['Finding your calling', 'Purpose discovery', 'Overcoming fear', 'Faith in business'],
    },
    {
      name: 'Brand Strategy',
      percentage: 30,
      topics: ['Positioning', 'Messaging', 'Differentiation', 'Brand identity'],
    },
    {
      name: 'Audience Building',
      percentage: 20,
      topics: ['Ideal client clarity', 'Content strategy', 'Community building', 'Engagement'],
    },
    {
      name: 'Offer Creation',
      percentage: 15,
      topics: ['Packaging expertise', 'Pricing', 'Sales conversations', 'Delivery systems'],
    },
    {
      name: 'Mindset & Action',
      percentage: 10,
      topics: ['Imposter syndrome', 'Taking action', 'Consistency', 'Celebrating wins'],
    },
  ],
  monetizationRoadmap: [
    {
      tier: 1,
      name: 'Entry Point',
      priceRange: '$47-$297',
      offers: [
        'Brand Clarity Assessment ($47)',
        'Messaging Masterclass ($197)',
        'Positioning Workshop ($297)',
      ],
    },
    {
      tier: 2,
      name: 'Signature Program',
      priceRange: '$997-$2,997',
      offers: [
        'CLARITY Accelerator - 8-week group program ($1,497)',
        'Brand Strategy Bootcamp - intensive ($997)',
        'Content to Clients Course ($1,997)',
      ],
    },
    {
      tier: 3,
      name: 'Premium Services',
      priceRange: '$3,000-$10,000+',
      offers: [
        'VIP Brand Strategy Day ($5,000)',
        '90-Day 1:1 Brand Building ($7,500)',
        'Done-For-You Brand Strategy ($10,000)',
      ],
    },
    {
      tier: 4,
      name: 'Enterprise',
      priceRange: '$10,000+',
      offers: [
        'Corporate Training Programs',
        'Annual Retainer Clients',
        'Licensing Your Framework',
      ],
    },
  ],
  nextSteps: [
    {
      icon: '1️⃣',
      title: 'Refine Your One-Liner',
      description: 'Practice your positioning statement until it flows naturally',
    },
    {
      icon: '2️⃣',
      title: 'Create Your Signature Content',
      description: 'Develop 5 core pieces based on your content pillars',
    },
    {
      icon: '3️⃣',
      title: 'Build Your Entry Offer',
      description: 'Start with a low-ticket offer to build audience and testimonials',
    },
    {
      icon: '4️⃣',
      title: 'Establish Your Platform',
      description: 'Choose one primary platform and show up consistently',
    },
    {
      icon: '5️⃣',
      title: 'Gather Social Proof',
      description: 'Document results and collect testimonials from early clients',
    },
    {
      icon: '6️⃣',
      title: 'Launch Your Signature Offer',
      description: 'Once validated, launch your core transformation program',
    },
  ],
  strategicPriority: {
    priority: 'Focus on building your email list through your free Brand Clarity Assessment. This gives you permission to continue the conversation and nurture potential clients.',
    quickWin: 'Record a 3-minute video explaining your CLARITY Framework and share it on LinkedIn this week. This positions you as an authority and attracts your ideal clients.',
  },
  brandAssets: {
    bios: {
      short: `${firstName} helps ambitious professionals transform their expertise into a clear, compelling brand. Through the CLARITY Framework, they guide clients from confusion to confidence.`,
      medium: `${firstName} is a brand strategist who helps ambitious professionals stop hiding their gifts and start building businesses that reflect their true calling. With a unique blend of strategic thinking and authentic connection, ${firstName} guides clients through the CLARITY Framework — a proven process for transforming expertise into a profitable personal brand. Their approach honors both business strategy and purpose-driven impact.`,
      long: `${firstName} is a brand strategist and business coach who helps ambitious professionals transform their expertise into a clear, compelling personal brand. After years of helping clients uncover their positioning and messaging, ${firstName} developed the CLARITY Framework — a comprehensive process that takes experts from confusion to confidence in building their brand.\n\nUnlike traditional branding approaches, ${firstName}'s method goes deeper, addressing the mindset blocks and strategic gaps that keep talented people invisible. They believe that too many skilled professionals remain stuck in unfulfilling roles when the world needs what they have to offer.\n\n${firstName} works with mid-career professionals who are ready to leverage their expertise to create impact and income on their own terms. Through workshops, coaching programs, and strategic consulting, they help clients find their voice, attract their ideal audience, and build sustainable businesses.`,
    },
    socialProfiles: {
      instagram: `Brand Strategist | Helping experts build businesses as unique as they are | Creator of the CLARITY Framework | Free assessment in bio 👇`,
      linkedin: `Brand Strategist helping ambitious professionals transform expertise into compelling personal brands | Creator of the CLARITY Framework | I help you go from "I don't know how to explain what I do" to "People seek me out for this"`,
      twitter: `Brand Strategist | Helping experts package their gifts into profitable offers | Creator of the CLARITY Framework`,
    },
  },
})
