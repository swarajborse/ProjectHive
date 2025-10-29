# 🚀 OpenMentor AI - Your Open Source Contribution Companion


[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7)](https://netlify.com/)

> **An AI-powered platform designed to help developers navigate the open source ecosystem with personalized guidance, advanced repository analysis, and intelligent mentorship.**

## ✨ Key Features

### 🔍 **Advanced Repository Analysis (RepoHelper)**
- **Smart Repository Analysis**: Deep dive into any GitHub repository with AI-powered insights
- **Intelligent Issue Discovery**: Find good first issues with difficulty and priority assessment
- **Advanced Filtering System**: Multi-parameter search with labels, states, and difficulty levels
- **Real-time Search**: Instant filtering without API calls for better performance
- **Visual Label Management**: GitHub-integrated label picker with colors and descriptions
- **Contribution Guidance**: Step-by-step guides tailored to each repository

### 🤖 **AI-Powered Chatbot**
- **Instant Help**: Get real-time assistance with Git commands and workflows
- **PR Review Guidance**: Learn best practices for code reviews
- **Smart Recommendations**: Personalized suggestions based on your skill level
- **Interactive Learning**: Conversational interface for better understanding

### 📚 **Comprehensive Learning Hub**
- **AI-Powered Learning**: Get real-time assistance with Git and GitHub workflows
- **Open Source Workflows**: Learn contribution patterns and community guidelines
- **Platform Discovery**: Explore various development platforms and tools
- **Step-by-Step Guides**: From beginner to advanced open source contribution

### 🌐 **Modern Tech Stack**
- **Next.js 15.5.4**: Latest React framework with App Router
- **React 19**: Cutting-edge React features and optimizations
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS 4.1.9**: Modern styling with custom design system
- **Radix UI**: Accessible, unstyled UI components
- **GitHub API Integration**: Seamless repository data fetching

## 🎯 What Makes OpenMentor AI Special?

### **🧠 Intelligent Analysis**
- **AI-Powered Categorization**: Automatic difficulty assessment (Easy ⚡, Medium 🎯, Hard 📈)
- **Priority Classification**: Smart priority ranking (High/Medium/Low)
- **Technical Stack Detection**: Automatic framework and dependency identification
- **File Structure Analysis**: Project organization insights

### **🎨 Beautiful User Experience**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Adaptive theming for comfortable coding sessions
- **Glass Morphism UI**: Modern, elegant interface design
- **Smooth Animations**: Delightful micro-interactions throughout the app

### **⚡ Performance Optimized**
- **Client-Side Filtering**: Reduce API calls with intelligent local processing
- **Efficient Caching**: Smart data caching strategies
- **Progressive Loading**: Optimized loading states and error handling
- **SEO Friendly**: Proper meta tags and structured data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaibhavbaviskar21/OSS-Mentor-AI.git
   cd OSS-Mentor-AI/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables (Optional)**
   ```bash
   cp .env.example .env.local
   # Add your GitHub token for higher API rate limits
   GITHUB_TOKEN=your_github_token_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Pages & Features

### 🏠 **Homepage** (`/`)
- **Feature Overview**: Interactive cards showcasing all platform capabilities
- **Modern Landing**: Beautiful hero section with call-to-action
- **Navigation Hub**: Easy access to all platform features

### 🔧 **RepoHelper** (`/repo-help`)
- **Repository Analysis**: Enter any GitHub repo URL for instant analysis
- **Advanced Search**: Multi-parameter filtering system
- **Issue Discovery**: Find perfect issues for your skill level
- **Contribution Guidance**: Step-by-step contribution instructions

### 🤖 **AI Chatbot** (`/chatbot`)
- **Interactive Assistant**: Real-time help with open source questions
- **Command Help**: Git and GitHub command assistance
- **Learning Support**: Personalized learning recommendations

### 📚 **Git & GitHub Guide** (`/git-github`)
- **AI Chatbot Integration**: Access to intelligent assistant for Git commands
- **Real-time Help**: Get instant answers about Git workflows and GitHub features
- **Best Practices Guidance**: Learn industry-standard practices through AI assistance

### 🌟 **Open Source Guide** (`/open-source`)
- **Getting Started**: Complete beginner's guide to open source
- **Community Guidelines**: Learn open source etiquette and culture
- **Project Discovery**: Find projects that match your interests

### 🌐 **Platform Explorer** (`/platforms`)
- **Platform Discovery**: Explore various development platforms
- **Tool Recommendations**: Find the right tools for your projects
- **Integration Guides**: Learn how to connect different platforms

## 🛠️ Technical Architecture

### **Frontend Stack**
```
Next.js 15.5.4 (App Router)
├── React 19 (Latest features)
├── TypeScript 5 (Type safety)
├── Tailwind CSS 4.1.9 (Styling)
├── Radix UI Components (Accessible)
├── Lucide React (Icons)
└── Next Themes (Dark/Light mode)
```

### **Key Dependencies**
```json
{
  "@octokit/rest": "^22.0.0",        // GitHub API integration
  "@radix-ui/react-*": "latest",     // UI component library
  "next-themes": "^0.4.6",           // Theme management
  "tailwindcss": "^4.1.9",           // Utility-first CSS
  "lucide-react": "^0.454.0",        // Beautiful icons
  "recharts": "2.15.4",              // Data visualization
  "zod": "3.25.67"                   // Schema validation
}
```

### **Project Structure**
```
Frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── chatbot/           # AI chatbot page
│   ├── git-github/        # Git tutorials
│   ├── open-source/       # Open source guide
│   ├── platforms/         # Platform explorer
│   ├── repo-help/         # Repository analysis
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # UI component library
│   └── *.tsx             # Feature components
├── lib/                  # Utility functions & APIs
├── public/               # Static assets
├── docs/                 # Documentation
└── styles/               # Additional styles
```

## 🌟 Core Features Deep Dive

### **RepoHelper Advanced Analysis**

**Multi-Parameter Filtering:**
- Text search across issue titles and descriptions
- Label-based filtering with visual picker
- State management (Open/Closed/All)
- Difficulty assessment (AI-powered)
- Priority classification (Smart ranking)

**Rich Issue Information:**
- Comprehensive issue cards with metadata
- Visual difficulty indicators with icons
- Availability status for unassigned issues
- Direct GitHub links for full access
- Comment counts and update timestamps

**Smart Repository Insights:**
- Technical stack detection
- File structure analysis
- Contribution guidelines discovery
- License and documentation assessment

## 🚀 Deployment

### **Netlify Deployment** (Recommended)

The project is optimized for Netlify deployment with automatic Next.js handling:

1. **Connect to Netlify**
   - Connect your GitHub repository to Netlify
   - Select the `Frontend` directory as the base directory

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: (leave empty - handled by plugin)
   Node version: 18
   ```

3. **Environment Variables** (Optional)
   ```
   GITHUB_TOKEN=your_github_token_here
   ```

4. **Deploy**
   - Netlify will automatically deploy using `@netlify/plugin-nextjs`
   - All pages and API routes will work seamlessly

### **Other Deployment Options**

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Areas for Contribution**
- 🎨 **UI/UX Improvements**: Enhance visual design and user experience
- ⚡ **Performance**: Optimize for large repositories and better speed
- 🔧 **Features**: Add new analysis capabilities and tools
- 📚 **Documentation**: Improve guides, examples, and tutorials
- 🧪 **Testing**: Add comprehensive tests and edge case handling

### **Getting Started**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### **Code Style**
- Use TypeScript for type safety
- Follow the existing code structure
- Add comments for complex logic
- Ensure components are responsive
- Test on multiple devices and browsers

## 📊 Performance & Analytics

### **Performance Metrics**
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Excellent ratings across all metrics
- **Bundle Size**: Optimized with code splitting and tree shaking
- **API Efficiency**: Smart caching and rate limit management

### **Monitoring**
- Vercel Analytics integration
- Error tracking and performance monitoring
- User experience analytics
- API usage and rate limit tracking

## 🔐 Security & Privacy

### **Security Features**
- **Environment Variables**: Secure API key management
- **Rate Limiting**: GitHub API rate limit handling
- **Input Validation**: Comprehensive input sanitization
- **HTTPS Only**: Secure communication protocols
- **Security Headers**: Proper security headers implementation

### **Privacy**
- **No Personal Data Storage**: We don't store user personal information
- **GitHub API**: Only public repository data is accessed
- **Local Processing**: Most filtering happens client-side
- **Transparent**: Open source and auditable codebase

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub API**: For providing comprehensive repository data
- **Radix UI**: For accessible and beautiful UI components
- **Vercel Team**: For Next.js and excellent developer experience
- **Tailwind CSS**: for the utility-first CSS framework
- **Open Source Community**: For inspiration and continuous learning

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/vaibhavbaviskar21/OSS-Mentor-AI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/vaibhavbaviskar21/OSS-Mentor-AI/discussions)
- **Email**: Support requests and questions

---

<div align="center">

**Made with ❤️ for the Open Source Community**

[⭐ Star this project](https://github.com/vaibhavbaviskar21/OSS-Mentor-AI) | [🐛 Report Bug](https://github.com/vaibhavbaviskar21/OSS-Mentor-AI/issues) | [✨ Request Feature](https://github.com/vaibhavbaviskar21/OSS-Mentor-AI/issues)

</div>

**Contributor:** vaibhavbaviskar21
