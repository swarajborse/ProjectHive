# 🎓 CGPA Calculator

**Contributor:** SOHAM-GADEKAR  
**Domain:** Frontend  
**Difficulty:** Beginner  
**Tech Stack:** HTML, CSS, JavaScript

---

## 📝 Description

A modern, responsive web application to calculate Cumulative Grade Point Average (CGPA) for up to 8 semesters (SPPU-style). Enter your SGPAs; the app averages the filled semesters. Perfect for students to track their academic performance!

---

## 🎯 Features

- ✅ **8 Semester Inputs** - Enter SGPA for each semester (Sem 1-8)
- ✅ **Live Validation** - Real-time validation (0-10 range)
- ✅ **Auto-calculation** - Updates CGPA as you type
- ✅ **Professional UI** - Modern gradients and smooth animations
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Clear Summary** - Shows filled semesters count and sum of SGPAs
- ✅ **Toast Notifications** - User feedback for actions
- ✅ **Performance Comments** - Grade assessment based on CGPA
- ✅ **Input Validation** - Prevents invalid entries
- ✅ **Clear All Function** - Reset all inputs with one click

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Grid/Flexbox, gradients, animations
- **JavaScript (ES6+)** - Classes, DOM manipulation, real-time calculations
- **Responsive Design** - Mobile-first approach

---

## 🚀 How to Run

### Method 1: Direct Browser

1. Download or clone this folder
2. Open `index.html` in your browser
3. Start calculating your CGPA!

### Method 2: Live Server

1. Install VS Code Live Server extension
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. App opens at `http://localhost:5500`

---

## 📁 Project Structure

```
CGPACalculator/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

---

## 💻 Code Highlights

### CGPA Calculation Logic
```javascript
calculateCGPA() {
    const values = this.semInputs
        .map(i => parseFloat(i.value))
        .filter(v => !Number.isNaN(v));

    const sum = values.reduce((a, b) => a + b, 0);
    const cgpa = sum / values.length;
    
    this.cgpaValue.textContent = cgpa.toFixed(2);
}
```

### Real-time Input Validation
```javascript
// Recalculate on input change for instant feedback
this.semInputs.forEach(input => {
    input.addEventListener('input', () => this.calculateCGPA());
});
```

### Performance Assessment
```javascript
getCGPAComment(cgpa) {
    if (cgpa >= 9.0) return 'Excellent!';
    if (cgpa >= 8.0) return 'Very Good!';
    if (cgpa >= 7.0) return 'Good!';
    if (cgpa >= 6.0) return 'Satisfactory';
    if (cgpa >= 5.0) return 'Pass';
    return 'Needs Improvement';
}
```

---

## 📚 Learning Outcomes

### Skills Practiced
- ✅ DOM Manipulation
- ✅ Event Handling
- ✅ Array Methods (filter, map, reduce)
- ✅ Real-time Calculations
- ✅ Input Validation
- ✅ CSS Grid/Flexbox
- ✅ Responsive Design
- ✅ JavaScript ES6 Classes

### Concepts Learned
- Object-oriented programming in JavaScript
- Real-time form validation
- Mathematical calculations in web apps
- Modern CSS gradients and animations
- Responsive design principles

---

## 🧮 Calculation Formula

```
CGPA = (SGPA₁ + SGPA₂ + ... + SGPAₙ) / n
```
Where `n` = number of filled semesters

### Example
- Sem 1: 8.5, Sem 2: 7.8, Sem 3: 9.2
- CGPA = (8.5 + 7.8 + 9.2) / 3 = 8.5

---

## 📊 Performance Comments

- **9.0+**: Excellent! 🌟
- **8.0+**: Very Good! 🎉
- **7.0+**: Good! 👍
- **6.0+**: Satisfactory ✅
- **5.0+**: Pass 📚
- **Below 5.0**: Needs Improvement 📈

---

## 🎨 Customization Ideas

Want to enhance this project? Try adding:

1. **Weighted CGPA** - Add credits per semester
2. **Grade Scale Options** - Different university systems
3. **Export Results** - Save CGPA as PDF/Image
4. **Semester History** - Track progress over time
5. **Dark Mode** - Toggle theme
6. **GPA to Percentage** - Conversion feature
7. **Multiple Students** - Profile management
8. **Charts/Graphs** - Visual progress tracking

---

## 🐛 Known Issues

None currently. Feel free to report any bugs!

---

## 🚀 Future Enhancements

- [ ] Add weighted CGPA calculation
- [ ] Implement different grade scales
- [ ] Add export functionality
- [ ] Include semester history tracking
- [ ] Add GPA to percentage conversion
- [ ] Implement dark mode toggle

---

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

## 📄 License

MIT License - Free to use and modify!

---

## 🤝 Contributing

This is a sample project for ProjectHive. Feel free to:
- Fork and enhance
- Report issues
- Suggest improvements
- Use as learning material

---

**Happy Calculating! 🎓✨**
