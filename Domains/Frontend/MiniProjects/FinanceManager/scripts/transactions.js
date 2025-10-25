// scripts/transactions.js
import { STORAGE_KEYS, loadData, saveData } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const transactionTableBody = document.querySelector('.transaction-table-container tbody');
    const addTransactionBtn = document.getElementById('add-transaction-btn');
    const modal = document.getElementById('transaction-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const transactionForm = modal.querySelector('form');

    // Load initial data
    let transactions = loadData(STORAGE_KEYS.EXPENSES);

    // --- Core UI Rendering Function ---
    function renderTransactions(data) {
        if (!transactionTableBody) return;
        transactionTableBody.innerHTML = ''; // Clear current rows

        data.forEach(tx => {
            const isIncome = tx.type === 'income';
            const amountClass = isIncome ? 'income' : 'expense';
            const sign = isIncome ? '+' : '-';
            const categoryIcon = isIncome ? 'fa-briefcase' : 'fa-house-crack'; // Simplified Icon Logic

            const row = document.createElement('tr');
            row.classList.add('transaction-row-data');
            row.innerHTML = `
                <td>${tx.date}</td>
                <td>${tx.description}</td>
                <td><span class="category-tag ${amountClass}-tag"><i class="fa-solid ${categoryIcon}"></i> ${tx.category}</span></td>
                <td class="amount ${amountClass}-amount">${sign}$${tx.amount.toFixed(2)}</td>
                <td>
                    <i class="fa-solid fa-pencil action-icon edit-icon" data-id="${tx.id}" title="Edit"></i>
                    <i class="fa-solid fa-trash action-icon delete-icon" data-id="${tx.id}" title="Delete"></i>
                </td>
            `;
            transactionTableBody.appendChild(row);
        });
    }

    // --- Modal/Form Handling ---
    
    addTransactionBtn.addEventListener('click', () => {
        // Reset form for adding new transaction
        transactionForm.reset();
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
    
    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Simplified form data extraction and ID assignment
        const newId = Date.now();
        const newTx = {
            id: newId,
            date: new Date().toISOString().slice(0, 10), // Mock today's date
            description: 'New User Entry', // Replace with real form value
            category: 'Uncategorized',     // Replace with real form value
            amount: 50.00,                 // Replace with real form value
            type: transactionForm.elements.type.value,
        };

        transactions.unshift(newTx); // Add to the start of the array
        saveData(STORAGE_KEYS.EXPENSES, transactions);
        renderTransactions(transactions); // Re-render the list
        modal.classList.add('hidden');
    });

    // --- Action Listeners (Edit/Delete) ---
    transactionTableBody.addEventListener('click', (event) => {
        const target = event.target;
        const id = parseInt(target.dataset.id);

        if (target.classList.contains('delete-icon')) {
            // Mock deletion
            if (confirm('Are you sure you want to delete this transaction?')) {
                transactions = transactions.filter(tx => tx.id !== id);
                saveData(STORAGE_KEYS.EXPENSES, transactions);
                renderTransactions(transactions);
            }
        } else if (target.classList.contains('edit-icon')) {
            // Mock edit - in a real app, this would populate the modal
            alert(`Editing transaction ID: ${id}. Modal population logic needed here.`);
            modal.classList.remove('hidden');
        }
    });

    // Initial render
    renderTransactions(transactions);
});