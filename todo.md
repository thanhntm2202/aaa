# FAPEX Frontend - Todo List

## Phase 1: Setup & Configuration
- [x] Install Web3 dependencies (wagmi, ethers.js, viem, @rainbow-me/rainbowkit)
- [x] Setup wagmi configuration with MetaMask and WalletConnect
- [x] Create Web3 context and hooks (useWeb3, useAccount, useContract)
- [x] Implement SIWE authentication flow
- [x] Setup database schema (users, jobs, bids, deliverables, disputes)
- [x] Create tRPC procedures for Web3 and job management

## Phase 2: Landing Page
- [x] Design and implement hero section with CTA buttons
- [x] Add platform statistics section
- [x] Create featured jobs carousel
- [x] Build category browsing section
- [x] Implement "How it works" section (4-5 steps)
- [x] Design and build footer with social links
- [x] Responsive design for mobile/tablet/desktop

## Phase 3: Marketplace & Job Listing
- [x] Create JobCard component with StatusBadge
- [x] Build job listing page with grid layout
- [x] Implement advanced filters (skill, budget, deadline, status)
- [x] Add full-text search functionality
- [x] Implement pagination
- [x] Add sorting options (newest, most paid, deadline)
- [ ] Create job detail page

## Phase 4: Authentication & User Profile
- [ ] Implement wallet connection UI (Connect Wallet button)
- [ ] Add wallet status indicator
- [ ] Create SIWE authentication flow
- [x] Build user profile page
- [ ] Display user role (Client/Freelancer/Arbitrator)
- [x] Show wallet address and balance
- [x] Implement profile editing

## Phase 5: Reputation & User System
- [ ] Create ReputationScore component
- [ ] Build user leaderboard page
- [ ] Implement reputation calculation
- [ ] Add user activity feed
- [ ] Create user search functionality
- [ ] Build user card component

## Phase 6: Client Dashboard
- [x] Create dashboard layout for clients
- [x] Build job creation form (Step 1: Job details)
- [x] Implement job creation Step 2 (Blockchain confirmation)
- [x] Create list of posted jobs
- [x] Add job status tracking
- [x] Build job management interface
- [x] Implement freelancer selection from bids
- [x] Create deliverable review interface
- [x] Add approve/reject functionality
- [ ] Build dispute raising form

## Phase 7: Freelancer Dashboard
- [x] Create dashboard layout for freelancers
- [x] Build available jobs browsing interface
- [x] Implement bid submission form
- [x] Create active jobs list
- [ ] Build deliverable upload interface
- [x] Add earnings tracking
- [ ] Create job history view
- [x] Implement reputation display

## Phase 8: Arbitrator Dashboard
- [ ] Create dashboard layout for arbitrators
- [ ] Build open disputes list
- [ ] Create dispute detail view
- [ ] Implement evidence viewing from IPFS
- [ ] Build voting interface
- [ ] Add vote submission form
- [ ] Create dispute resolution tracking

## Phase 9: Shared Components
- [x] Create TxStatusModal (pending/success/failed states)
- [x] Build StatusBadge component (OPEN/ASSIGNED/IN_PROGRESS/SUBMITTED/COMPLETED/DISPUTED)
- [ ] Create MilestoneProgress component
- [ ] Build NotificationBell component
- [x] Create LoadingSpinner component
- [x] Build ErrorBoundary component
- [ ] Create ConfirmDialog component

## Phase 10: Smart Contract Integration
- [ ] Setup contract ABIs (JobRegistry, EscrowVault, DisputeArbitration, ReputationStore)
- [ ] Implement USDC approval function
- [ ] Build EscrowVault deposit function
- [ ] Create deliverable hash commit function
- [ ] Implement dispute voting function
- [ ] Add payment release function
- [ ] Create refund request function
- [ ] Setup transaction status tracking

## Phase 11: IPFS Integration
- [ ] Setup Pinata API integration
- [ ] Create file upload function
- [ ] Implement hash calculation
- [ ] Build file download from IPFS
- [ ] Add metadata upload
- [ ] Create evidence upload for disputes

## Phase 12: Navigation & Routing
- [ ] Setup main navigation/header
- [ ] Create navigation menu for authenticated users
- [ ] Implement role-based navigation
- [ ] Add breadcrumb navigation
- [ ] Create 404 page
- [ ] Setup error handling pages
- [ ] Implement loading states

## Phase 13: Styling & Design
- [ ] Apply dark luxury theme (hyve.works style)
- [ ] Setup color palette (indigo, hot pink, cyan, dark navy)
- [ ] Implement glassmorphism effects
- [ ] Add smooth animations and transitions
- [ ] Ensure responsive design across all pages
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Optimize performance (lazy loading, code splitting)

## Phase 14: Testing & Quality Assurance
- [ ] Write unit tests for Web3 hooks
- [ ] Write tests for tRPC procedures
- [ ] Test wallet connection flow
- [ ] Test SIWE authentication
- [ ] Test job creation flow
- [ ] Test bid submission
- [ ] Test deliverable upload
- [ ] Test dispute resolution
- [ ] Test transaction status tracking
- [ ] Performance testing and optimization

## Phase 15: Final Deployment
- [ ] Create checkpoint
- [ ] Verify all features working
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Final code review
- [ ] Deploy to production
- [ ] Monitor for errors

## Known Issues & Fixes
- [ ] Fix wallet connection state display (must show accurate status)
- [ ] Ensure all buttons and components are clickable
- [ ] Fix routing for all pages
- [ ] Verify all navigation links work correctly


## CRITICAL FEATURES FROM REQUIREMENTS

### Wallet & Authentication
- [ ] MetaMask + WalletConnect connection with network detection (Sepolia testnet)
- [ ] Display shortened wallet address (0x1234...5678) and ETH balance
- [ ] SIWE (Sign-In With Ethereum) authentication flow
- [ ] User profile creation (name, avatar, bio) - save to IPFS
- [ ] Role detection (Client/Freelancer/Admin) based on profile

### Job Management
- [ ] Job creation with milestones (drag-drop, add/remove, % allocation)
- [ ] File upload for job specifications (PDF, DOC, ZIP) → IPFS
- [ ] Job listing with advanced filters (budget, skills, deadline, status)
- [ ] Full-text search on job title/description
- [ ] Pagination for job lists
- [ ] Job detail page with IPFS file viewing

### Client Dashboard
- [ ] Milestone management with status tracking (pending, submitted, approved, rejected)
- [ ] Approve/reject deliverables with reason input
- [ ] Auto-release after 7 days without approval (with warning)
- [ ] Revision history for submissions
- [ ] Freelancer selection from bidders with comparison view (2-3 profiles side-by-side)
- [ ] Dispute opening with evidence upload

### Freelancer Dashboard
- [ ] Browse open jobs with filters
- [ ] Submit proposal with introduction, timeline, quote
- [ ] Track proposal status (pending, selected, rejected)
- [ ] Withdraw proposal if not selected
- [ ] Milestone submission with IPFS file upload
- [ ] Payment tracking (received vs pending)
- [ ] Income chart by month
- [ ] Public profile with SBT score, completed jobs, reviews, portfolio, level badges

### Admin Dashboard
- [ ] Overview stats (jobs running, completed, disputes, total ETH locked)
- [ ] User activity chart (new users in 7/30 days)
- [ ] Transaction volume chart
- [ ] Event log from smart contract (real-time)
- [ ] Dispute list with priority sorting
- [ ] Evidence viewing from IPFS
- [ ] Dispute resolution with split ratio (client%/freelancer%)
- [ ] User management (search, lock/unlock, manual SBT adjustment)
- [ ] Job management (flag, hide, view on-chain history)
- [ ] System config (contract addresses, platform fee %, auto-release time, dispute evidence deadline)
- [ ] Whitelist/blacklist wallet addresses
- [ ] Export transaction history as CSV

### Smart Contract Integration
- [ ] USDC/ETH approval flow
- [ ] Escrow deposit function
- [ ] Deliverable hash commit on-chain
- [ ] Dispute voting function
- [ ] Payment release function
- [ ] Refund request function
- [ ] Transaction status tracking (pending/success/failed)
- [ ] Gas fee estimation display
- [ ] Confirmation modal before each transaction

### IPFS Integration
- [ ] File upload to Pinata/web3.storage
- [ ] Metadata (JSON) storage
- [ ] Profile storage on IPFS
- [ ] Evidence upload for disputes
- [ ] File download from IPFS
- [ ] Hash calculation and verification

### Reputation & SBT System
- [ ] SBT (Soulbound Token) score display
- [ ] Reputation calculation based on completed jobs, reviews, SBT
- [ ] User leaderboard
- [ ] Level badges (New/Rising/Trusted/Expert)
- [ ] Review system (stars + comments)

### UI/UX Requirements
- [ ] Dark mode by default (dark luxury style like hyve.works)
- [ ] Light mode support
- [ ] Status badges with colors (green=success, yellow=pending, red=error)
- [ ] Sidebar/navbar with role-based menu
- [ ] Toast notifications for actions
- [ ] Modal confirmations before transactions
- [ ] Loading states and spinners
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Vietnamese & English language support

### Testing & Performance
- [ ] Unit tests for Web3 hooks
- [ ] Integration tests with mock contracts
- [ ] Test all critical flows (job creation → proposal → selection → delivery → payment)
- [ ] Test dispute resolution flow
- [ ] Test auto-release after 7 days
- [ ] Lazy loading optimization
- [ ] React-query caching for contract data
- [ ] Performance testing

### Documentation
- [ ] README with setup instructions
- [ ] Environment variables documentation
- [ ] Smart contract ABI and addresses
- [ ] Pinata API key setup guide
- [ ] RPC URL configuration
