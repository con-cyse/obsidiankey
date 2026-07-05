# Personalized Course Matcher

A smart course recommendation engine that matches learners to the perfect courses based on their strengths, interests, and work preferences.

## Overview

The Personalized Course Matcher helps users discover courses tailored to their unique profile. Through an interactive quiz, the platform assesses:
- **Strengths** - Core competencies and talents (analytical, creative, communication, leadership, empathy, etc.)
- **Hobbies** - Personal interests and passions
- **Work Preferences** - Career aspirations and working styles

Based on these inputs, the system recommends the most relevant courses from its curated database.

## Features

- 📝 **Interactive Quiz** - Guided questionnaire to understand user profile
- 🎯 **Smart Matching** - Algorithm-based course recommendations
- 🔐 **User Authentication** - Secure login system
- 🌐 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚖️ **Legal Compliance** - Full terms of service and privacy policy

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16.2.6
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Deployment**: Ready for Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── policy/            # Privacy policy
│   ├── terms/             # Terms of service
│   ├── support/           # Support page
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── Quiz.tsx          # Main quiz component
│   ├── Matcher.tsx       # Course matching engine
│   ├── NavBar.tsx        # Navigation
│   └── ...
└── data/
    └── courses.ts        # Course database
```

## How It Works

1. **User Registration** - Sign up or log in
2. **Take Quiz** - Answer questions about strengths, hobbies, and preferences
3. **Get Matched** - Receive personalized course recommendations
4. **Explore** - Browse and learn more about recommended courses

## Deployment

Deploy on [Vercel](https://vercel.com) (recommended):

```bash
npm run build
npm run start
```

Or use the Vercel CLI for one-click deployment.

## License

See [Terms of Service](docs/terms-of-service.txt) and [Privacy Policy](docs/privacy-policy.txt) for details.
