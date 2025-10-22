// scripts/dashboard.js
import { loadData, calculateTotal, getSpendingByCategory } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Data
    const transactions = loadData('moneyfy_expenses');

    // 2. Perform Calculations
    const totalIncome = calculateTotal(transactions, 'income');
    const totalExpense = calculateTotal(transactions, 'expense');
    const totalBalance = totalIncome - totalExpense;
    const spendingByCategory = getSpendingByCategory(transactions);
    
    // Example: Calculate Savings Rate
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
    
    // 3. Update DOM Elements (Dashboard)
    
    // Update Total Balance Card
    const balanceElement = document.querySelector('.summary-card.primary-accent h2.value');
    if (balanceElement) {
        balanceElement.innerHTML = `$${totalBalance.toFixed(2)}`;
    }

    // Update Income Card
    const incomeElement = document.querySelector('.summary-card.success-accent h2.value');
    if (incomeElement) {
        incomeElement.innerHTML = `$${totalIncome.toFixed(2)}`;
    }
    
    // Update Expense Card
    const expenseElement = document.querySelector('.summary-card.danger-accent h2.value');
    if (expenseElement) {
        expenseElement.innerHTML = `$${totalExpense.toFixed(2)}`;
    }

    // Update Savings Rate Card
    const rateElement = document.querySelector('.progress-circle');
    if (rateElement) {
        const rate = Math.max(0, savingsRate.toFixed(0)); // Cannot be negative for display
        rateElement.textContent = `${rate}%`;
        rateElement.style.setProperty('--percent', rate); 
    }

    // 4. Populate Recent Transactions (Simplified Example)
    const recentList = document.querySelector('.transaction-list');
    if (recentList) {
        recentList.innerHTML = ''; // Clear existing placeholders
        const recentTxs = transactions.slice(-5).reverse(); // Get last 5
        recentTxs.forEach(tx => {
            const amountClass = tx.type === 'income' ? 'success' : 'danger';
            const sign = tx.type === 'income' ? '+' : '-';
            
            const row = document.createElement('div');
            row.classList.add('transaction-row', `${amountClass}-row`);
            row.innerHTML = `
                <span class="desc">${tx.description}</span>
                <span class="cat">${tx.category}</span>
                <span class="amount" style="color: var(--color-${amountClass});">${sign}$${tx.amount.toFixed(2)}</span>
            `;
            recentList.appendChild(row);
        });
    }

    // Note: Chart rendering logic (using Chart.js) would go here, utilizing spendingByCategory
});