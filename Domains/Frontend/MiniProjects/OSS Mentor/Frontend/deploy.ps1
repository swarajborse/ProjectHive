# OSS Mentor AI - Netlify Deployment Script (PowerShell)
Write-Host "🚀 Preparing OSS Mentor AI for Netlify deployment..." -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the Frontend directory." -ForegroundColor Red
    exit 1
}

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
npm run clean

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci --production=false

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

# Type check
Write-Host "🔍 Running type check..." -ForegroundColor Yellow
npm run type-check

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Type check failed!" -ForegroundColor Red
    exit 1
}

# Lint the code
Write-Host "🧽 Linting code..." -ForegroundColor Yellow
npm run lint

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Linting issues found, but continuing..." -ForegroundColor Yellow
}

# Build the project
Write-Host "🏗️ Building the project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful! Ready for Netlify deployment." -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Push your code to GitHub" -ForegroundColor White
    Write-Host "2. Go to https://app.netlify.com and click 'New site from Git'" -ForegroundColor White
    Write-Host "3. Connect your GitHub repository" -ForegroundColor White
    Write-Host "4. Configure build settings:" -ForegroundColor White
    Write-Host "   - Base directory: Frontend" -ForegroundColor Gray
    Write-Host "   - Build command: npm run build" -ForegroundColor Gray
    Write-Host "   - Publish directory: .next" -ForegroundColor Gray
    Write-Host "5. Add environment variables (optional):" -ForegroundColor White
    Write-Host "   - GITHUB_TOKEN (for higher GitHub API rate limits)" -ForegroundColor Gray
    Write-Host "   - NEXT_PUBLIC_APP_URL (your Netlify domain)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🌐 Your app will be available at: https://[your-site-name].netlify.app" -ForegroundColor Magenta
} else {
    Write-Host "❌ Build failed! Please fix the errors above before deploying." -ForegroundColor Red
    exit 1
}