# FAPEX Frontend - Decentralized Freelance Marketplace

**FAPEX** is a blockchain-powered decentralized freelance marketplace built with Next.js, React, wagmi, and Tailwind CSS. It provides a secure, transparent platform for clients and freelancers to collaborate with smart contract-backed payments and dispute resolution.

## 🚀 Features

### Core Functionality
- **Landing Page** - Hero section, platform statistics, featured jobs, how it works, footer
- **Job Marketplace** - Browse jobs with advanced filters, search, sorting, and pagination
- **Job Detail Page** - View job specifications, milestones, client info, submit proposals
- **Wallet Connection** - MetaMask and WalletConnect integration with network detection
- **User Profiles** - Display user role, skills, reputation, wallet address, job history
- **Reputation System** - Leaderboard with top freelancers and clients, SBT badges

### Client Dashboard
- Create jobs (2-step process: details → blockchain confirmation)
- Manage posted jobs with status tracking
- Review freelancer bids and select winner
- Review deliverables and approve/reject
- Raise disputes if needed

### Freelancer Dashboard
- Browse available jobs
- Submit competitive proposals with milestone breakdown
- Track active work and earnings
- Submit deliverables with IPFS storage
- View reputation and job history

### Admin Dashboard
- Platform statistics and analytics
- Dispute management and resolution
- User management and monitoring
- Event logs with CSV export
- Charts for platform activity and earnings trends

### Leaderboard
- Top freelancers ranked by reputation and earnings
- Top clients ranked by spending and rating
- Time-based filtering (all-time, monthly, weekly)
- Badges and achievement system

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Next.js
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Web3**: wagmi + ethers.js + viem
- **State Management**: React Query (tRPC)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Storage**: IPFS (ipfs-http-client)
- **Database**: MySQL/TiDB with Drizzle ORM
- **Testing**: Vitest

## 📦 Project Structure

```
client/
  src/
    pages/          # Page components (Landing, Jobs, JobDetail, etc.)
    components/     # Reusable UI components
    hooks/          # Custom hooks (useWeb3, useIPFS, useSmartContract)
    contexts/       # React contexts (Web3Provider, ThemeContext)
    lib/            # Utilities and helpers
    index.css       # Global styles with dark luxury theme
server/
  routers.ts        # tRPC procedures
  db.ts             # Database queries
drizzle/
  schema.ts         # Database schema
  migrations/       # SQL migrations
```

## 🎨 Design System

**Dark Luxury Theme** - Inspired by hyve.works
- Deep navy background (#0F0F1E)
- Light gray foreground (#E0E0E0)
- Indigo primary (#4B46FF)
- Cyan secondary (#00D4FF)
- Hot pink accent (#FF10AE)

## 🔗 Smart Contract Integration

The frontend integrates with smart contracts for:
- **USDC Approval** - Approve token spending for escrow
- **Escrow Management** - Deposit, release, and refund payments
- **Dispute Resolution** - Vote on disputes with weighted voting
- **Reputation System** - Update SBT scores based on performance
- **Deliverable Commitment** - Store IPFS hashes on-chain

## 📱 Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/jobs` | Job marketplace |
| `/jobs/:id` | Job detail & proposal submission |
| `/disputes/:id` | Dispute detail & resolution |
| `/profile` | User profile |
| `/dashboard` | Client dashboard |
| `/dashboard/freelancer` | Freelancer dashboard |
| `/dashboard/arbitrator` | Arbitrator dashboard |
| `/admin` | Admin dashboard |
| `/leaderboard` | Leaderboard & rankings |

## 🚀 Getting Started

### Installation

```bash
cd fapex_final
pnpm install
```

### Development

```bash
pnpm run dev
```

The dev server runs on `http://localhost:3000`

### Build

```bash
pnpm run build
pnpm run start
```

### Testing

```bash
pnpm test
```

## 🔐 Environment Variables

```env
# Web3
VITE_FRONTEND_FORGE_API_KEY=your_key
VITE_FRONTEND_FORGE_API_URL=your_url

# Database
DATABASE_URL=mysql://user:pass@host/db

# Auth
JWT_SECRET=your_secret
OAUTH_SERVER_URL=your_oauth_url
```

## 📊 Key Components

### WalletConnectButton
Displays wallet connection status, balance, network, and disconnect option.

```tsx
<WalletConnectButton />
```

### StatusBadge
Shows job status with color coding (OPEN, ASSIGNED, IN_PROGRESS, SUBMITTED, COMPLETED, DISPUTED).

```tsx
<StatusBadge status="OPEN" />
```

### JobCard
Displays job summary with title, budget, skills, and status.

```tsx
<JobCard job={jobData} />
```

### BidSubmitForm
2-step form for submitting proposals with milestone breakdown.

```tsx
<BidSubmitForm jobId={1} jobTitle="..." budget="5000" />
```

### TxStatusModal
Shows transaction status (pending, success, failed).

```tsx
<TxStatusModal status="pending" txHash="0x..." />
```

## 🎯 Features Implementation Status

- [x] Landing page with hero and statistics
- [x] Job marketplace with filters and search
- [x] Job detail page with proposal form
- [x] Wallet connection (MetaMask/WalletConnect)
- [x] User profiles with reputation
- [x] Client dashboard (create, manage jobs)
- [x] Freelancer dashboard (browse, bid, submit)
- [x] Admin dashboard (stats, disputes, users)
- [x] Leaderboard (rankings, badges)
- [x] Dispute detail page with resolution interface
- [x] Charts and analytics (Recharts)
- [x] Dark luxury UI theme
- [x] Responsive design (mobile, tablet, desktop)
- [ ] IPFS integration (file upload)
- [ ] Smart contract integration (USDC, Escrow)
- [ ] SIWE authentication
- [ ] Unit tests (Vitest)
- [ ] Performance optimization

## 🤝 Contributing

This is a professional blockchain project. All code should follow:
- TypeScript strict mode
- Tailwind CSS utility-first approach
- React hooks best practices
- Accessibility standards (WCAG 2.1)

## 📄 License

MIT

---

**Built with ❤️ for the Web3 community**
