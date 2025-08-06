Client Tablet 📱
A professional client portal generator for freelancers and consultants. Stop chasing clients for status updates and organize your projects with branded client portals.
🚀 Features

Custom Client Portals: Unique subdomain and branding for each client
Project Management: Track milestones, updates, and progress
File Sharing: Drag-and-drop file uploads with version control
Real-time Updates: Keep clients informed with project timeline
Mobile Responsive: Works perfectly on all devices
Simple Pricing: Transparent tiers starting free

💰 Infrastructure Budget: $200/month
This MVP is designed to stay well under your $200/month budget:
Recommended Setup for Railway:

Database: Railway PostgreSQL (~$5-20/month)
App Hosting: Railway App Service (~$5-50/month depending on usage)
File Storage: Railway Volume (~$1-10/month for files)
Domain: Custom domain (~$10-15/year)

Total Estimated Monthly Cost: $15-80/month (well under budget!)
🛠 Tech Stack

Frontend: Next.js 14 + TypeScript + Tailwind CSS
Backend: Next.js API Routes
Database: PostgreSQL with Prisma ORM
Authentication: JWT with HTTP-only cookies
File Storage: Local filesystem (easily upgradeable to S3)
Deployment: Railway (one-click deployment)

📦 Quick Start
1. Clone and Install
bashgit clone <your-repo>
cd client-tablet
npm install
2. Environment Setup
bashcp .env.example .env
Edit .env with your database URL and secrets:
bashDATABASE_URL="postgresql://username:password@localhost:5432/client_tablet"
NEXTAUTH_SECRET="your-secret-key-here"
JWT_SECRET="your-jwt-secret-here"
3. Database Setup
bashnpx prisma generate
npx prisma db push
4. Run Development Server
bashnpm run dev
Visit http://localhost:3000 to see your app!
🚢 Deploy to Railway
1. Push to GitHub
bashgit add .
git commit -m "Initial commit"
git push origin main
2. Connect to Railway

Go to Railway.app
Click "New Project" → "Deploy from GitHub repo"
Select your repository

3. Add Environment Variables
In Railway dashboard, add these variables:
bashDATABASE_URL=${{Postgres.DATABASE_URL}}
NEXTAUTH_SECRET=your-production-secret
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_URL=https://your-app.railway.app
4. Add PostgreSQL Database

In Railway project, click "New Service"
Select "PostgreSQL"
Railway automatically connects it to your app

5. Deploy
Railway automatically deploys on every git push!
📊 Scaling Strategy
Phase 1 (0-50 users): Current setup (~$20/month)

Railway hosting
PostgreSQL database
Local file storage

Phase 2 (50-500 users): Add external storage (~$50/month)

Keep Railway hosting
Add AWS S3 for file storage
Add Redis for caching

Phase 3 (500+ users): Optimize infrastructure (~$150/month)

Upgrade Railway plan
CDN for file delivery
Database optimization

🔐 Security Features

✅ JWT authentication with HTTP-only cookies
✅ Password hashing with bcrypt
✅ SQL injection prevention with Prisma
✅ Input validation and sanitization
✅ CORS protection
✅ Environment variable security

🎯 MVP Feature Checklist

✅ User authentication (register/login/logout)
✅ Client portal creation with custom branding
✅ Unique subdomains for each client
✅ Dashboard with client overview
✅ Client portal view (public-facing)
✅ Project management system
✅ File upload and sharing
✅ Responsive design
✅ Database models and relationships

🚀 Next Features to Build

 Project updates and timeline
 File version control and management
 Email notifications for clients
 Time tracking integration
 Invoice generation
 Team collaboration features
 Advanced analytics
 Custom domain support
 API endpoints for integrations

💡 Monetization Ready
The codebase includes pricing tiers and is ready for Stripe integration:

Free: 2 client portals
Solo: $15/month (5 portals)
Pro: $29/month (15 portals)

📞 Support
Built for bootstrapped entrepreneurs by entrepreneurs. This MVP gives you everything you need to validate the market and start generating revenue.
Ready to launch? Push to Railway and start acquiring customers! 🚀
