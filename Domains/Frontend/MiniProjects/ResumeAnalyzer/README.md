# 🤖 AI Resume Analyzer

**Contributor:** shr128  
**Domain:** Frontend  
**Difficulty:** Intermediate  
**Tech Stack:** HTML5, CSS3, JavaScript (ES6+), Drag & Drop API

---

<img width="1000" height="500" alt="AI Resume Analyzer Screenshot" src="https://via.placeholder.com/1000x500/667eea/ffffff?text=AI+Resume+Analyzer" />

---

## 📝 Description

A modern and interactive **AI Resume Analyzer** that provides instant feedback on resume quality across multiple dimensions.
The application simulates AI-powered analysis by evaluating resumes on content quality, formatting, experience, education, skills, and ATS optimization.
It features a **drag-and-drop upload interface**, animated rating bars, and detailed feedback for each section!

Perfect for job seekers looking to improve their resumes, learning JavaScript file handling, DOM manipulation, and building engaging user experiences with animations.

---

## 🎯 Features

* 📤 **Drag & Drop Upload** - Intuitive file upload with visual feedback
* 📁 **File Browser Support** - Click to browse and select resume files
* ⚡ **Loading Animation** - Professional analyzing state with spinner
* 📊 **Animated Rating Bars** - Smooth progressive bar animations
* 💯 **Overall Score Calculation** - Aggregated score from all categories
* 🎯 **6 Rating Categories:**
  * 📝 Content Quality
  * 🎨 Formatting
  * 💼 Experience
  * 🎓 Education
  * 🔧 Skills
  * 🔍 Keywords & ATS Optimization
* 💬 **Personalized Feedback** - Specific suggestions for each section
* 🔄 **Reset Functionality** - Easily upload multiple resumes
* 🎨 **Modern Gradient UI** - Beautiful purple gradient theme
* ✨ **Smooth Animations** - Fade-in effects and transitions
* 📱 **Fully Responsive** - Works on all device sizes

---

## 🛠️ Tech Stack

* **HTML5** - Semantic structure and file input
* **CSS3** - Modern UI with gradients, animations, and flexbox/grid
* **JavaScript (ES6+)** - File handling, animations, DOM manipulation
* **Drag & Drop API** - Native browser drag-and-drop functionality

---

## 🚀 How to Run

### Method 1: Direct Browser

1. Download or clone the repository
2. Ensure all three files are in the same directory:
   * `index.html`
   * `style.css`
   * `script.js`
3. Open `index.html` in your browser
4. Upload a resume and see the analysis!

### Method 2: Live Server (Recommended)

1. Install VS Code and Live Server extension
2. Right-click `index.html` → **Open with Live Server**
3. The app will open at `http://localhost:5500`

---

## 📁 Project Structure

```
AI-Resume-Analyzer/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # File handling and analysis logic
└── README.md           # Project documentation
```

---

## 💻 Code Highlights

### File Upload Handler

```javascript
function handleFile(file) {
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatFileSize(file.size);
    
    uploadSection.style.display = 'none';
    analyzingSection.style.display = 'block';

    setTimeout(() => {
        analyzeResume();
    }, 2000);
}
```

### Animated Score Counter

```javascript
function animateScore(elementId, target) {
    const element = document.getElementById(elementId);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 20);
}
```

### Rating Bar Animation

```javascript
function animateRating(name, data) {
    document.getElementById(`${name}Score`).textContent = data.score;
    document.getElementById(`${name}Bar`).style.width = data.score + '%';
    document.getElementById(`${name}Feedback`).textContent = data.feedback;
}
```

### Drag and Drop Implementation

```javascript
uploadSection.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadSection.classList.add('dragover');
});

uploadSection.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadSection.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
});
```

---

## 📚 Learning Outcomes

### Skills Practiced

* ✅ File API and FileReader usage
* ✅ Drag and Drop API implementation
* ✅ DOM Manipulation and dynamic content rendering
* ✅ CSS animations and transitions
* ✅ Progressive bar animations
* ✅ Event handling and delegation
* ✅ Responsive design with CSS Grid and Flexbox
* ✅ Modern UI/UX design patterns

### Concepts Learned

* Building file upload interfaces
* Creating smooth animations with JavaScript
* Implementing drag-and-drop functionality
* Designing feedback systems
* Creating loading states and transitions
* Building card-based layouts
* Implementing gradient backgrounds
* Managing application state

---

## 🎨 Customization Ideas

1. **Real AI Integration** - Connect to OpenAI or similar API for actual resume analysis
2. **PDF Parsing** - Extract and analyze actual resume content
3. **Export Report** - Generate PDF report with analysis results
4. **Multiple File Upload** - Compare multiple resumes side-by-side
5. **Custom Scoring Weights** - Allow users to adjust importance of each category
6. **Dark Mode Toggle** - Add theme switching functionality
7. **Industry-Specific Analysis** - Tailor feedback based on job industry
8. **Historical Tracking** - Save and compare previous analyses
9. **Downloadable Templates** - Provide resume templates based on analysis
10. **Email Report** - Send detailed analysis via email

---

## 🐛 Known Issues

* Currently uses simulated analysis data (not real AI)
* File content is not parsed - analysis is random/demo data
* Accepts all file types despite filter (browser limitation)

---

## 🚀 Future Enhancements

* [ ] Integrate real AI/ML resume parsing
* [ ] Add PDF text extraction
* [ ] Implement keyword density analysis
* [ ] Create comparison feature for multiple resumes
* [ ] Add data export (PDF/JSON)
* [ ] Include resume optimization suggestions
* [ ] Add authentication and save history
* [ ] Implement ATS simulation scoring
* [ ] Create resume builder integration
* [ ] Add LinkedIn profile import

---

## 🎓 Use Cases

* **Job Seekers** - Get instant feedback on resume quality
* **Career Counselors** - Tool for advising clients
* **Students** - Learn what makes a strong resume
* **Recruiters** - Quick resume quality assessment
* **Learning Project** - Master file handling and animations

---

## 📄 License

MIT License — Free to use, modify, and share!

---

## 🤝 Contributing

This project is open for contributions!  
Feel free to:

* Fork and improve
* Report issues
* Add new features
* Submit pull requests
* Integrate real AI services
* Enhance UI/UX design

---

## 🔧 Technical Details

### Supported File Types
* PDF (.pdf)
* Word Document (.doc, .docx)

### Browser Compatibility
* Chrome/Edge (Recommended)
* Firefox
* Safari
* Opera

### Performance
* Lightweight - No external dependencies
* Fast animations using CSS transitions
* Efficient DOM updates

---

## 📖 How It Works

1. **Upload Phase** - User uploads resume via drag-drop or file browser
2. **Analysis Phase** - Simulated 2-second AI processing with loading spinner
3. **Results Phase** - Animated reveal of scores and feedback
4. **Staggered Animation** - Each rating bar animates with 200ms delay
5. **Reset Option** - Users can upload multiple resumes for comparison

---

**Level Up Your Resume! 🚀📄**
