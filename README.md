# Okto DeFi Dashboard

A cutting-edge decentralized finance dashboard powered by Okto SDK, offering seamless integration with multiple blockchain networks and a suite of DeFi tools.

## Features

- **Multi-Chain Support**: Interact with BASE, POLYGON, SOLANA, and more.
- **Portfolio Management**: View and manage your crypto assets across different networks.
- **Token Swapping**: Effortlessly swap tokens using Jupiter API integration.
- **Transaction History**: Keep track of all your DeFi activities.
- **Wallet Integration**: Securely connect and manage multiple wallets.
- **Dark Mode**: Toggle between light and dark themes for optimal viewing comfort.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Okto SDK
- NextAuth.js for authentication
- React Query for efficient data fetching

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn or pnpm
- Okto SDK API keys

### Installation

1. Clone the repository:
```
git clone https://github.com/shreyas0924/defi-dex-okto
```

2. Navigate to the project directory:
```
cd defi-dex-okto
```

3. Install dependencies:
```
pnpm install
```

4. Set up environment variables:
Create a `.env` and copy the contents of `.env.example` file in the root directory and add the following:
```
NEXT_PUBLIC_OKTO_CLIENT_API=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_OKTO_SERVER_API=
AUTH_SECRET=
NEXTAUTH_URL=
DATABASE_URL=
NEXT_PUBLIC_HELIUS_API_KEY=
```
5. Run the development server:
```
pnpm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Acknowledgments

- Okto SDK for providing robust blockchain integration
- Jupiter API for powering our token swapping feature
- Helius for Solana RPC


