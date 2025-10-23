# 💰 Salary Calculator - CTC to In-Hand Salary

**Contributor:** ProjectHive  
**Domain:** Frontend  
**Difficulty:** Intermediate  
**Tech Stack:** HTML, CSS, JavaScript

---

## 📝 Description

A comprehensive salary calculator that converts CTC (Cost to Company) or salary breakdown into accurate in-hand salary calculations. Features both new and old tax regimes, detailed deductions breakdown, and real-time calculations. Perfect for employees to understand their actual take-home pay!

---

## 🎯 Features

- ✅ **Dual Input Methods** - CTC method and detailed salary breakdown
- ✅ **Tax Regime Support** - Both new (2023-24) and old tax regimes
- ✅ **Accurate Calculations** - PF, ESI, Professional Tax, Income Tax
- ✅ **Real-time Updates** - Instant calculations as you type
- ✅ **Detailed Breakdown** - Complete salary component analysis
- ✅ **Tax Savings Display** - Compare old vs new regime benefits
- ✅ **Responsive Design** - Works on all devices
- ✅ **Professional UI** - Modern gradients and smooth animations
- ✅ **Input Validation** - Error handling and user feedback
- ✅ **Clear All Function** - Reset all fields with one click

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Grid/Flexbox, gradients, animations
- **JavaScript (ES6+)** - Classes, real-time calculations, tax logic
- **Responsive Design** - Mobile-first approach

---

## 🚀 How to Run

### Method 1: Direct Browser

1. Download or clone this folder
2. Open `index.html` in your browser
3. Start calculating your salary!

### Method 2: Live Server

1. Install VS Code Live Server extension
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. App opens at `http://localhost:5500`

---

## 📁 Project Structure

```
SalaryCalculator/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

---

## 💻 Code Highlights

### Tax Calculation Logic
```javascript
calculateIncomeTax(taxableIncome) {
    const regime = this.taxRegimeSelect.value;
    const brackets = regime === 'new' ? this.newTaxBrackets : this.oldTaxBrackets;
    
    let tax = 0;
    for (const bracket of brackets) {
        if (taxableIncome > bracket.min) {
            const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
            tax += taxableInBracket * bracket.rate;
        }
    }
    return tax;
}
```

### CTC to Salary Breakdown
```javascript
calculateFromCTC() {
    const ctc = parseFloat(this.ctcInput.value) || 0;
    
    // Calculate monthly components
    const annualBasic = ctc * 0.5; // 50% of CTC as basic
    const annualHRA = ctc * 0.2;  // 20% of CTC as HRA
    const annualOtherAllowances = ctc * 0.3; // 30% as other allowances
    
    return this.calculateDeductions({
        basic: annualBasic / 12,
        hra: annualHRA / 12,
        otherAllowances: annualOtherAllowances / 12
    });
}
```

### Real-time Calculation
```javascript
inputs.forEach(input => {
    input.addEventListener('input', () => this.calculateSalary());
});
```

---

## 📚 Learning Outcomes

### Skills Practiced
- ✅ **Complex Calculations** - Tax brackets and deductions
- ✅ **Form Handling** - Multiple input methods
- ✅ **Real-time Updates** - Dynamic calculations
- ✅ **Data Validation** - Input error handling
- ✅ **UI/UX Design** - Professional interface
- ✅ **Responsive Layout** - Mobile-first design
- ✅ **JavaScript Classes** - Object-oriented programming
- ✅ **Financial Logic** - Salary and tax calculations

### Concepts Learned
- Indian tax system and brackets
- Salary component breakdown
- PF, ESI, and professional tax calculations
- CTC vs in-hand salary differences
- Tax regime comparisons
- Financial planning tools

---

## 🧮 Calculation Methods

### CTC Method
1. **Enter Annual CTC** - Total cost to company
2. **Add Bonuses** - Annual bonus and gratuity
3. **Auto-breakdown** - 50% basic, 20% HRA, 30% allowances
4. **Calculate Deductions** - PF, ESI, taxes

### Salary Breakdown Method
1. **Enter Components** - Basic, HRA, DA, allowances
2. **Set Deductions** - PF%, ESI%, professional tax
3. **Choose Tax Regime** - New or old tax regime
4. **Get Results** - Detailed breakdown and in-hand salary

---

## 📊 Tax Regimes Supported

### New Tax Regime (2023-24)
| Income Range | Tax Rate |
|--------------|----------|
| ₹0 - ₹3,00,000 | 0% |
| ₹3,00,001 - ₹6,00,000 | 5% |
| ₹6,00,001 - ₹9,00,000 | 10% |
| ₹9,00,001 - ₹12,00,000 | 15% |
| ₹12,00,001 - ₹15,00,000 | 20% |
| Above ₹15,00,000 | 30% |

### Old Tax Regime
| Income Range | Tax Rate |
|--------------|----------|
| ₹0 - ₹2,50,000 | 0% |
| ₹2,50,001 - ₹5,00,000 | 5% |
| ₹5,00,001 - ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

---

## 💡 Usage Examples

### Example 1: CTC Method
- **CTC**: ₹6,00,000
- **Bonus**: ₹50,000
- **Result**: In-hand salary with detailed breakdown

### Example 2: Salary Breakdown
- **Basic**: ₹30,000
- **HRA**: ₹15,000
- **Other Allowances**: ₹15,000
- **Result**: Complete deduction analysis

---

## 🎨 Customization Ideas

Want to enhance this project? Try adding:

1. **Multiple Countries** - Support for different tax systems
2. **Investment Planning** - 80C, 80D deductions
3. **Salary History** - Track salary changes over time
4. **Export Results** - Save calculations as PDF
5. **Comparison Tool** - Compare different job offers
6. **Retirement Planning** - PF and pension calculations
7. **Bonus Calculator** - Variable pay calculations
8. **Tax Optimization** - Suggest tax-saving investments

---

## 🔧 Advanced Features

### Deduction Calculations
- **Provident Fund**: 12% of basic salary (max ₹1,800/month)
- **ESI**: 0.75% of gross salary (if gross < ₹21,000)
- **Professional Tax**: ₹200/month (varies by state)
- **Income Tax**: Based on tax regime and brackets

### Tax Savings Analysis
- Compare old vs new tax regime
- Display potential tax savings
- Help choose optimal tax regime

---

## 📱 Responsive Design

- **Desktop**: Full feature layout with side-by-side inputs
- **Tablet**: Optimized grid layout
- **Mobile**: Single-column layout with touch-friendly inputs

---

## 🚀 Future Enhancements

- [ ] **Investment Calculator** - Tax-saving investments
- [ ] **Salary Comparison** - Multiple job offers
- [ ] **Historical Data** - Salary progression tracking
- [ ] **Export Features** - PDF/Excel export
- [ ] **Advanced Tax** - HRA exemption, LTA calculations
- [ ] **Multi-language** - Regional language support
- [ ] **Dark Mode** - Theme toggle
- [ ] **Offline Support** - PWA functionality

---

## ⚠️ Important Notes

- **Tax Accuracy**: Calculations based on 2023-24 tax slabs
- **State Variations**: Professional tax varies by state
- **PF Limits**: Maximum PF contribution is ₹1,800/month
- **ESI Threshold**: ESI applicable if gross salary < ₹21,000
- **Regular Updates**: Tax slabs change annually

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
- Add new features

---

**Happy Calculating! 💰✨**
