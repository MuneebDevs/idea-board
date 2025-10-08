# Vercel Deployment Guide

This guide will help you deploy your Idea Board app to Vercel with Supabase database.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Supabase Project**: Your Supabase project is already configured
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Deployment Steps

### 1. Connect Your Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your git repository containing this code
4. Vercel will auto-detect this as a Next.js project

### 2. Configure Environment Variables

In your Vercel project dashboard, go to **Settings** → **Environment Variables** and add:

**Production Environment Variables:**

```
DATABASE_URL = your_database_url_here

POSTGRES_URL_NON_POOLING = your_postgres_non_pooling_url_here

NEXT_PUBLIC_SUPABASE_URL = your_supabase_project_url_here

NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key_here

SUPABASE_SERVICE_ROLE_KEY = your_supabase_service_role_key_here

SUPABASE_JWT_SECRET = your_supabase_jwt_secret_here
```

**How to get these values:**

- Copy them from your `.env.local` file (which is not committed to git)
- Or get them from your Supabase project dashboard
- Refer to `.env.example` for the required variable names

**Important Notes:**

- Make sure to set these for **Production**, **Preview**, and **Development** environments
- The `NEXT_PUBLIC_*` variables are safe to expose to the browser
- Never share your `SUPABASE_SERVICE_ROLE_KEY` publicly

### 3. Deploy

1. Click **Deploy** in Vercel
2. Vercel will automatically:
   - Install dependencies (`npm install`)
   - Generate Prisma Client (`prisma generate`)
   - Build your Next.js app (`npm run build`)
   - Deploy to a global CDN

### 4. Database Setup (Already Done)

✅ Your database schema has been migrated to Supabase
✅ The `Idea` table is ready to store your ideas

## Files Configured for Deployment

- **`vercel.json`**: Vercel configuration with build settings
- **`package.json`**: Updated build scripts for Prisma + Next.js
- **`prisma/schema.prisma`**: Configured for Supabase with connection pooling
- **`.env.example`**: Template for environment variables
- **`.env.local`**: Local development environment (not deployed)

## Vercel CLI (Optional)

For advanced deployments, install Vercel CLI:

```bash
npm i -g vercel
cd your-project
vercel --prod
```

## Troubleshooting

### Build Failures

- Check that all environment variables are set correctly
- Ensure `DATABASE_URL` and `POSTGRES_URL_NON_POOLING` are both configured

### Database Connection Issues

- Verify your Supabase project is active
- Check that the connection strings haven't expired
- Ensure your Supabase project allows connections from Vercel

### Prisma Issues

- The build process automatically runs `prisma generate`
- Database migrations were applied during setup

## Post-Deployment

After successful deployment:

1. Your app will be available at `https://your-project-name.vercel.app`
2. Test the idea creation and upvoting functionality
3. Monitor logs in Vercel dashboard if needed

## Security Notes

- Environment variables are encrypted by Vercel
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS policies - use carefully
- Public keys (`NEXT_PUBLIC_*`) are bundled with your frontend code

---

Your Idea Board app is now ready for production! 🚀
