#!/bin/bash

# OSS Mentor AI - Netlify Deployment Script
echo "🚀 Preparing OSS Mentor AI for Netlify deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the Frontend directory."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clean

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Type check
echo "🔍 Running type check..."
npm run type-check

# Lint the code
echo "🧽 Linting code..."
npm run lint

# Build the project
echo "🏗️ Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for Netlify deployment."
    echo ""
    echo "📋 Next Steps:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your GitHub repo to Netlify"
    echo "3. Set build command: npm run build"
    echo "4. Set publish directory: .next"
    echo "5. Add environment variables if needed:"
    echo "   - GITHUB_TOKEN (optional, for higher rate limits)"
    echo "   - NEXT_PUBLIC_APP_URL (your Netlify domain)"
    echo ""
    echo "🌐 Your app will be available at: https://[your-site-name].netlify.app"
else
    echo "❌ Build failed! Please fix the errors above before deploying."
    exit 1
fi