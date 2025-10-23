// Chart instance
let salaryChart = null;

// Form submission handler
document.getElementById('salaryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateSalary();
});

function calculateSalary() {
    // Get input values
    const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
    const allowances = parseFloat(document.getElementById('allowances').value) || 0;
    const bonus = parseFloat(document.getElementById('bonus').value) || 0;
    const additionalBonus = parseFloat(document.getElementById('additionalBonus').value) || 0;
    
    const employerPFPercent = parseFloat(document.getElementById('employerPF').value) || 12;
    const gratuityPercent = parseFloat(document.getElementById('gratuity').value) || 4.81;
    const employeePFPercent = parseFloat(document.getElementById('employeePF').value) || 12;
    
    const professionalTax = parseFloat(document.getElementById('professionalTax').value) || 0;
    const taxRegime = document.getElementById('taxRegime').value;

    // Step 1: Calculate Monthly Gross
    const monthlyGross = basicSalary + allowances + bonus + additionalBonus;

    // Step 2: Calculate Annual Gross
    const annualGross = monthlyGross * 12;

    // Step 3: Calculate Employee Deductions
    const employeePFMonthly = (basicSalary * employeePFPercent) / 100;
    const employeePFAnnual = employeePFMonthly * 12;

    // Step 4: Calculate Taxable Income
    const standardDeduction = 75000; // FY 2025-26
    const taxableIncome = annualGross - standardDeduction - employeePFAnnual;

    // Step 5: Calculate Tax
    const { totalTax, taxBreakdown } = calculateIncomeTax(taxableIncome, taxRegime);
    const monthlyTDS = totalTax / 12;

    // Step 6: Calculate In-Hand
    const totalMonthlyDeductions = employeePFMonthly + professionalTax + monthlyTDS;
    const monthlyInHand = monthlyGross - totalMonthlyDeductions;
    const annualInHand = monthlyInHand * 12;

    // Display Results
    displayResults({
        monthlyGross,
        annualGross,
        employeePFMonthly,
        professionalTax,
        monthlyTDS,
        totalMonthlyDeductions,
        monthlyInHand,
        annualInHand,
        taxBreakdown
    });
}

function calculateIncomeTax(taxableIncome, regime) {
    let totalTax = 0;
    let breakdown = [];

    if (regime === 'new') {
        // New Tax Regime Slabs (FY 2025-26)
        const slabs = [
            { limit: 300000, rate: 0, name: '0 - 3L' },
            { limit: 600000, rate: 5, name: '3L - 6L' },
            { limit: 900000, rate: 10, name: '6L - 9L' },
            { limit: 1200000, rate: 15, name: '9L - 12L' },
            { limit: 1500000, rate: 20, name: '12L - 15L' },
            { limit: Infinity, rate: 30, name: '15L+' }
        ];

        let remainingIncome = taxableIncome;
        let previousLimit = 0;

        for (let slab of slabs) {
            if (remainingIncome <= 0) break;

            const taxableAtThisSlab = Math.min(remainingIncome, slab.limit - previousLimit);
            const taxAtThisSlab = (taxableAtThisSlab * slab.rate) / 100;

            if (taxableAtThisSlab > 0) {
                totalTax += taxAtThisSlab;
                breakdown.push({
                    slab: slab.name,
                    income: taxableAtThisSlab,
                    rate: slab.rate,
                    tax: taxAtThisSlab
                });
            }

            remainingIncome -= taxableAtThisSlab;
            previousLimit = slab.limit;
        }
    } else {
        // Old Tax Regime (with standard deduction)
        const slabs = [
            { limit: 250000, rate: 0, name: '0 - 2.5L' },
            { limit: 500000, rate: 5, name: '2.5L - 5L' },
            { limit: 1000000, rate: 20, name: '5L - 10L' },
            { limit: Infinity, rate: 30, name: '10L+' }
        ];

        let remainingIncome = taxableIncome;
        let previousLimit = 0;

        for (let slab of slabs) {
            if (remainingIncome <= 0) break;

            const taxableAtThisSlab = Math.min(remainingIncome, slab.limit - previousLimit);
            const taxAtThisSlab = (taxableAtThisSlab * slab.rate) / 100;

            if (taxableAtThisSlab > 0) {
                totalTax += taxAtThisSlab;
                breakdown.push({
                    slab: slab.name,
                    income: taxableAtThisSlab,
                    rate: slab.rate,
                    tax: taxAtThisSlab
                });
            }

            remainingIncome -= taxableAtThisSlab;
            previousLimit = slab.limit;
        }
    }

    // Add 4% cess
    const cess = totalTax * 0.04;
    totalTax += cess;

    breakdown.push({
        slab: 'Health & Education Cess (4%)',
        income: 0,
        rate: 4,
        tax: cess
    });

    return { totalTax: Math.max(0, totalTax), taxBreakdown: breakdown };
}

function displayResults(results) {
    // Show result section
    document.getElementById('resultSection').style.display = 'block';
    
    // Scroll to results
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });

    // Update values
    document.getElementById('monthlyGross').textContent = formatCurrency(results.monthlyGross);
    document.getElementById('annualGross').textContent = formatCurrency(results.annualGross);
    document.getElementById('employeePFAmount').textContent = formatCurrency(results.employeePFMonthly);
    document.getElementById('professionalTaxAmount').textContent = formatCurrency(results.professionalTax);
    document.getElementById('monthlyTDS').textContent = formatCurrency(results.monthlyTDS);
    document.getElementById('totalDeductions').textContent = formatCurrency(results.totalMonthlyDeductions);
    document.getElementById('monthlyInHand').textContent = formatCurrency(results.monthlyInHand);
    document.getElementById('annualInHand').textContent = formatCurrency(results.annualInHand);

    // Display tax breakdown
    displayTaxBreakdown(results.taxBreakdown);

    // Update chart
    updateChart(results);
}

function displayTaxBreakdown(breakdown) {
    const container = document.getElementById('taxBreakdown');
    container.innerHTML = '';

    breakdown.forEach(item => {
        const p = document.createElement('p');
        if (item.slab.includes('Cess')) {
            p.textContent = `${item.slab}: ₹${formatNumber(item.tax)}`;
        } else {
            p.textContent = `${item.slab} @ ${item.rate}%: ₹${formatNumber(item.income)} → Tax: ₹${formatNumber(item.tax)}`;
        }
        container.appendChild(p);
    });
}

function updateChart(results) {
    const ctx = document.getElementById('salaryChart').getContext('2d');

    // Destroy existing chart if it exists
    if (salaryChart) {
        salaryChart.destroy();
    }

    const data = {
        labels: ['In-Hand', 'Employee PF', 'Professional Tax', 'TDS'],
        datasets: [{
            data: [
                results.monthlyInHand,
                results.employeePFMonthly,
                results.professionalTax,
                results.monthlyTDS
            ],
            backgroundColor: [
                '#38ef7d',
                '#667eea',
                '#764ba2',
                '#e74c3c'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };

    salaryChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += '₹' + formatNumber(context.parsed);
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function formatCurrency(amount) {
    return '₹' + formatNumber(amount);
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(Math.round(num));
}

// Auto-calculate on input change (optional)
const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
    input.addEventListener('change', function() {
        if (document.getElementById('resultSection').style.display === 'block') {
            calculateSalary();
        }
    });
});