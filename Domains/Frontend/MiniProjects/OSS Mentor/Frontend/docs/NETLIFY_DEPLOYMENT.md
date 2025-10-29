# 🚀 Netlify Deployment Guide - OSS Mentor AI

## 📋 Pre-Deployment Checklist

Before deploying to Netlify, ensure your project is ready:

### ✅ **Project Configuration**
- [x] `netlify.toml` configuration file created
- [x] `next.config.mjs` optimized for Netlify
- [x] Build scripts configured in `package.json`
- [x] Environment variables documented in `.env.example`

### ✅ **Code Quality**
- [x] All TypeScript errors resolved
- [x] Linting issues addressed
- [x] Build process tested locally
- [x] All components and pages working

---

## 🌐 Deployment Methods

### **Method 1: GitHub Integration (Recommended)**

#### **Step 1: Prepare Repository**
```bash
# Navigate to Frontend directory
cd E:\Engineering\Hackathons\Coditas\OpenMentor_AI\Frontend

# Run deployment preparation script
.\deploy.ps1
```

#### **Step 2: Push to GitHub**
```bash
# Add all changes
git add .

# Commit changes
git commit -m "feat: prepare project for Netlify deployment"

# Push to GitHub
git push origin main
```

#### **Step 3: Deploy on Netlify**
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"New site from Git"**
3. Choose **GitHub** and authenticate
4. Select your repository: `OSS-Mentor-AI`
5. Configure build settings:
   - **Base directory**: `Frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`

#### **Step 4: Environment Variables (Optional)**
Add these in Netlify Dashboard → Site Settings → Environment Variables:
```
GITHUB_TOKEN=your_github_personal_access_token
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
NODE_ENV=production
```

### **Method 2: Manual Deploy (Drag & Drop)**

#### **Step 1: Build Locally**
```bash
# Install dependencies
npm ci

# Build the project
npm run build
```

#### **Step 2: Deploy**
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Drag and drop the `.next` folder to the deploy area
3. Your site will be deployed instantly

---

## ⚙️ Build Configuration

### **Netlify Configuration** (`netlify.toml`)
```toml
[build]
  publish = ".next"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--production=false"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **Next.js Configuration** (`next.config.mjs`)
```javascript
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
  },
  // ... other optimizations
}
```

---

## 🔧 Environment Variables

### **Required Variables**
```bash
# Production URL
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app

# Node Environment
NODE_ENV=production
```

### **Optional Variables**
```bash
# GitHub API Token (increases rate limits from 60 to 5000 requests/hour)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Analytics (if using Vercel Analytics)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

### **How to Get GitHub Token**
1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Select scopes: `public_repo`, `read:user`
4. Copy the generated token
5. Add it to Netlify environment variables

---

## 📊 Build Process

### **Build Steps**
1. **Clean**: Remove previous build artifacts
2. **Install**: Install all dependencies
3. **Type Check**: Verify TypeScript types
4. **Lint**: Check code quality
5. **Build**: Generate production build
6. **Deploy**: Upload to Netlify CDN

### **Build Commands**
```bash
# Clean build
npm run clean

# Full build process
npm run build:clean

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🎯 Performance Optimizations

### **Netlify Optimizations**
- ✅ **CDN**: Global content delivery network
- ✅ **Compression**: Automatic Gzip/Brotli compression
- ✅ **Caching**: Static asset caching
- ✅ **Image Optimization**: WebP/AVIF support
- ✅ **Tree Shaking**: Unused code elimination

### **Next.js Optimizations**
- ✅ **Bundle Splitting**: Automatic code splitting
- ✅ **Static Generation**: Pre-built HTML pages
- ✅ **Server Components**: Reduced client bundle
- ✅ **Minification**: JavaScript/CSS minification

---

## 🔍 Troubleshooting

### **Common Issues**

#### **Build Fails**
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint

# Clean and rebuild
npm run build:clean
```

#### **Environment Variables Not Working**
1. Check variable names (must start with `NEXT_PUBLIC_` for client-side)
2. Restart Netlify build after adding variables
3. Verify variables in Netlify dashboard

#### **API Routes Not Working**
- Netlify Functions are automatically created for API routes
- Check function logs in Netlify dashboard
- Verify GitHub API token is set correctly

#### **Images Not Loading**
- `unoptimized: true` is set for Netlify compatibility
- Use absolute URLs for external images
- Check image domains in `next.config.mjs`

### **Debug Commands**
```bash
# Check build locally
npm run build

# Serve production build locally
npm run start

# Check for unused dependencies
npm run lint

# Type checking
npm run type-check
```

---

## 📈 Post-Deployment

### **Verify Deployment**
1. ✅ Homepage loads correctly
2. ✅ All navigation links work
3. ✅ RepoHelp analyzes repositories
4. ✅ API routes respond correctly
5. ✅ GitHub integration works
6. ✅ Responsive design on mobile

### **Custom Domain (Optional)**
1. Go to Netlify Dashboard → Domain settings
2. Add your custom domain
3. Configure DNS settings
4. Enable HTTPS (automatic with Netlify)

### **Analytics Setup**
```bash
# Add to environment variables
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_id
```

### **Performance Monitoring**
- Monitor Core Web Vitals
- Check Lighthouse scores
- Monitor API response times
- Track user engagement

---

## 🎉 Success!

Your OSS Mentor AI is now live on Netlify! 

### **What's Deployed:**
- 🏠 **Homepage**: Beautiful landing page with features
- 🔧 **RepoHelp**: Advanced GitHub repository analysis
- 📚 **Git & GitHub Guide**: Interactive tutorials
- 🤖 **AI Chatbot**: Helpful assistant for open source
- 🌐 **Platform Explorer**: Discover open source platforms
- 📱 **Responsive Design**: Works on all devices

### **Next Steps:**
1. Share your deployed URL
2. Gather user feedback
3. Monitor performance
4. Add custom domain
5. Set up analytics
6. Plan future features

---

**🌐 Live URL**: `https://your-site-name.netlify.app`

**📊 Netlify Dashboard**: [app.netlify.com](https://app.netlify.com)

**🔧 GitHub Repository**: [OSS-Mentor-AI](https://github.com/vaibhavbaviskar21/OSS-Mentor-AI)

---

*Deployment completed successfully! 🚀*