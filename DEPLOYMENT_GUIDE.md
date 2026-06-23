# FAPEX Frontend - Deployment Guide

## Pre-Deployment Checklist

### Environment Setup
- [ ] All environment variables configured in `.env`
- [ ] Database migrations applied (`pnpm drizzle-kit migrate`)
- [ ] Smart contract ABIs added to `server/contracts/`
- [ ] IPFS configuration set up
- [ ] Web3 network (Sepolia/Mainnet) configured

### Code Quality
- [ ] TypeScript build passes (`pnpm check`)
- [ ] All tests pass (`pnpm test`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] No console errors in dev server
- [ ] All routes tested manually

### Performance
- [ ] Bundle size analyzed
- [ ] Images optimized
- [ ] Code splitting configured
- [ ] Lazy loading implemented for heavy components
- [ ] Caching headers configured

### Security
- [ ] No hardcoded secrets in code
- [ ] CORS headers configured
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Drizzle ORM)

## Deployment Steps

### 1. Build Production Bundle

```bash
pnpm run build
```

This creates:
- `dist/` - Compiled server code
- `client/dist/` - Compiled frontend code

### 2. Environment Variables

Set production environment variables:

```env
NODE_ENV=production
DATABASE_URL=mysql://user:pass@prod-host/fapex
JWT_SECRET=your-production-secret
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://manus.im
```

### 3. Database Migrations

```bash
pnpm drizzle-kit migrate
```

Verify migrations applied successfully:

```bash
SELECT * FROM __drizzle_migrations__;
```

### 4. Start Production Server

```bash
pnpm run start
```

Server runs on port 3000 (or `PORT` env variable).

### 5. Verify Deployment

- [ ] Landing page loads
- [ ] Wallet connection works
- [ ] Job marketplace displays jobs
- [ ] Admin dashboard accessible
- [ ] Charts render correctly
- [ ] No console errors

## Deployment Platforms

### Manus Hosting (Recommended)

FAPEX is optimized for Manus Autoscale hosting:

1. Create checkpoint via Management UI
2. Click "Publish" button
3. Configure custom domain (optional)
4. Monitor analytics in Dashboard

**Features:**
- Auto-scaling (0 to N instances)
- Built-in SSL/TLS
- CDN integration
- Analytics dashboard
- Automatic backups

### Docker Deployment

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]
```

Build and run:

```bash
docker build -t fapex-frontend .
docker run -p 3000:3000 -e DATABASE_URL=... fapex-frontend
```

### Railway / Render / Vercel

These platforms may have compatibility issues with the Node-only runtime. Recommended to use Manus hosting instead.

## Monitoring & Maintenance

### Logs

Check application logs:

```bash
tail -f .manus-logs/devserver.log
tail -f .manus-logs/browserConsole.log
tail -f .manus-logs/networkRequests.log
```

### Database Backups

Automated backups are handled by Manus. For manual backup:

```bash
mysqldump -u user -p database > backup.sql
```

### Performance Monitoring

Monitor key metrics:
- Page load time (< 3s)
- API response time (< 500ms)
- Error rate (< 0.1%)
- Database query time (< 100ms)

### Updates & Patches

To deploy updates:

1. Make code changes
2. Run tests: `pnpm test`
3. Build: `pnpm run build`
4. Create checkpoint
5. Publish via Management UI

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
mysql -h host -u user -p database

# Check migrations
SELECT * FROM __drizzle_migrations__;
```

### Build Errors

```bash
# Clear cache
rm -rf dist node_modules
pnpm install
pnpm run build
```

### Memory Issues

Increase Node memory:

```bash
NODE_OPTIONS=--max-old-space-size=2048 pnpm run start
```

### SSL/TLS Issues

Manus handles SSL automatically. For custom domains:

1. Add domain in Settings → Domains
2. Update DNS records
3. Wait for verification (5-10 min)

## Rollback Procedure

If deployment fails:

1. Go to Management UI → Version History
2. Find previous stable version
3. Click "Rollback"
4. Verify application works

## Support

For deployment issues:
- Check `.manus-logs/` for error details
- Review database migrations
- Verify environment variables
- Test locally with `pnpm run dev`

---

**Happy deploying! 🚀**
