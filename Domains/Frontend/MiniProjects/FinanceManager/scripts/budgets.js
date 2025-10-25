// scripts/budgets.js
import { STORAGE_KEYS, loadData, saveData, calculateTotal, getSpendingByCategory } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const budgetGrid = document.querySelector('.budget-cards-grid');
    const addBudgetBtn = document.querySelector('.add-budget-btn');
    const modal = document.getElementById('budget-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const budgetForm = modal.querySelector('form');

    // Load initial data
    let budgets = loadData(STORAGE_KEYS.BUDGETS);
    const transactions = loadData(STORAGE_KEYS.EXPENSES);
    const spendingByCategory = getSpendingByCategory(transactions);

    // --- Core UI Rendering Function ---
    function renderBudgets(budgetData) {
        if (!budgetGrid) return;
        budgetGrid.innerHTML = '';

        const totalBudget = budgetData.reduce((sum, b) => sum + b.limit, 0);
        const totalSpent = budgetData.reduce((sum, b) => sum + b.spent, 0);
        
        // 1. Update Overall Summary
        updateOverallSummary(totalBudget, totalSpent);

        // 2. Render Cards
        budgetData.forEach(budget => {
            // Ensure spent is calculated correctly, matching mock data
            const spent = spendingByCategory[budget.category] || budget.spent; // Use real data if available, else mock data
            const limit = budget.limit;
            const percentage = Math.round((spent / limit) * 100);
            const remaining = limit - spent;
            
            let fillClass = 'primary-fill';
            let textClass = 'primary-text';
            let remainingText = `Remaining: $${Math.max(0, remaining).toFixed(2)}`;

            if (percentage >= 100) {
                fillClass = 'danger-fill';
                textClass = 'danger-text';
                remainingText = `OVERSPENT: $${Math.abs(remaining).toFixed(2)}`;
            } else if (percentage >= 75) {
                fillClass = 'warning-fill';
                textClass = 'warning-text';
            }

            const card = document.createElement('div');
            card.classList.add('card', 'budget-card', `${textClass.split('-')[0]}-accent`); // e.g., 'danger-accent'
            card.innerHTML = `
                <div class="card-header">
                    <i class="fa-solid fa-dollar-sign budget-icon"></i>
                    <h3>${budget.category}</h3>
                </div>
                <div class="budget-amounts">
                    <p class="spent-limit">$${spent.toFixed(2)} spent of $${limit.toFixed(2)} limit</p>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${fillClass}" style="width: ${Math.min(100, percentage)}%;"></div>
                </div>
                <p class="percentage ${textClass}">${percentage}% Used</p>
                <p class="remaining-value ${remaining >= 0 ? 'success-text' : 'danger-text'}">${remainingText}</p>

                <div class="card-actions">
                    <i class="fa-solid fa-pencil action-icon" data-id="${budget.id}" title="Edit"></i>
                    <i class="fa-solid fa-trash action-icon delete-icon" data-id="${budget.id}" title="Delete"></i>
                </div>
            `;
            budgetGrid.appendChild(card);
        });
    }

    // --- Overall Summary Update ---
    function updateOverallSummary(totalBudget, totalSpent) {
        const utilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
        const remaining = totalBudget - totalSpent;

        document.querySelector('.summary-details .value').innerHTML = 
            `$${totalBudget.toFixed(2)} / <span class="spent-value">$${totalSpent.toFixed(2)}</span>`;
        
        const remainingEl = document.querySelector('.remaining-value');
        remainingEl.textContent = `Remaining: $${remaining.toFixed(2)}`;
        remainingEl.classList.toggle('danger-text', remaining < 0);
        remainingEl.classList.toggle('success-text', remaining >= 0);

        document.querySelector('.progress-fill').style.width = `${Math.min(100, utilization).toFixed(2)}%`;
        document.querySelector('.progress-label').textContent = `${utilization.toFixed(2)}% Utilized`;
    }

    // --- Modal/Form Handling ---
    addBudgetBtn.addEventListener('click', () => {
        budgetForm.reset();
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });

    budgetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Simplified form data extraction and ID assignment
        const newId = Date.now();
        const newBudget = {
            id: newId,
            category: budgetForm.elements['budget-category'].value,
            limit: parseFloat(budgetForm.elements['budget-limit'].value),
            spent: 0.00, // Starts at 0
            startDate: new Date().toISOString().slice(0, 10),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        };

        budgets.push(newBudget);
        saveData(STORAGE_KEYS.BUDGETS, budgets);
        renderBudgets(budgets);
        modal.classList.add('hidden');
    });


    // Initial render
    renderBudgets(budgets);
});