// scripts/utils.js

// --- 1. Constants and Data Keys ---
const STORAGE_KEYS = {
    EXPENSES: 'moneyfy_expenses',
    BUDGETS: 'moneyfy_budgets'
};

// --- 2. Mock Data Definitions ---
// In a real application, this data would come from a secure API.
let mockData = {
    expenses: [
        { id: 1, date: '2025-10-20', description: 'Salary Deposit', category: 'Income', amount: 4250.00, type: 'income' },
        { id: 2, date: '2025-10-21', description: 'Electricity Bill', category: 'Bills', amount: 98.50, type: 'expense' },
        { id: 3, date: '2025-10-21', description: 'Grocery Shopping', category: 'Food & Dining', amount: 125.75, type: 'expense' },
        { id: 4, date: '2025-10-22', description: 'Netflix Subscription', category: 'Subscriptions', amount: 15.99, type: 'expense' },
        { id: 5, date: '2025-10-22', description: 'Dinner Out', category: 'Food & Dining', amount: 75.00, type: 'expense' },
    ],
    budgets: [
        { id: 101, category: 'Bills', limit: 1000.00, spent: 950.00, startDate: '2025-10-01', endDate: '2025-10-31' },
        { id: 102, category: 'Food & Dining', limit: 800.00, spent: 580.00, startDate: '2025-10-01', endDate: '2025-10-31' },
        { id: 103, category: 'Leisure & Fun', limit: 400.00, spent: 462.55, startDate: '2025-10-01', endDate: '2025-10-31' },
    ]
};

// --- 3. Local Storage Handling (Simulating Database) ---

/**
 * Loads data from localStorage, falling back to mockData if empty.
 * @param {string} key - The key for the storage item (e.g., STORAGE_KEYS.EXPENSES)
 * @returns {Array} The loaded data array.
 */
function loadData(key) {
    const dataJSON = localStorage.getItem(key);
    if (dataJSON) {
        return JSON.parse(dataJSON);
    }
    
    // Initialize with mock data if storage is empty
    if (key === STORAGE_KEYS.EXPENSES) return mockData.expenses;
    if (key === STORAGE_KEYS.BUDGETS) return mockData.budgets;
    return [];
}

/**
 * Saves data to localStorage.
 * @param {string} key - The key for the storage item.
 * @param {Array} data - The data array to save.
 */
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Initial check to populate localStorage with mock data if it's the first run
if (!localStorage.getItem(STORAGE_KEYS.EXPENSES)) {
    saveData(STORAGE_KEYS.EXPENSES, mockData.expenses);
}
if (!localStorage.getItem(STORAGE_KEYS.BUDGETS)) {
    saveData(STORAGE_KEYS.BUDGETS, mockData.budgets);
}


// --- 4. Core Calculation Utilities ---

/**
 * Calculates the total amount for a given data set and type.
 * @param {Array} transactions - Array of transaction objects.
 * @param {string} type - 'income' or 'expense'.
 * @returns {number} The total amount.
 */
function calculateTotal(transactions, type) {
    return transactions
        .filter(t => t.type === type)
        .reduce((total, t) => total + t.amount, 0);
}

/**
 * Groups and sums transactions by category.
 * @param {Array} transactions - Array of transaction objects.
 * @returns {object} An object with category names as keys and total spent as values.
 */
function getSpendingByCategory(transactions) {
    const expenses = transactions.filter(t => t.type === 'expense');
    return expenses.reduce((totals, t) => {
        const cat = t.category || 'Uncategorized';
        totals[cat] = (totals[cat] || 0) + t.amount;
        return totals;
    }, {});
}


// --- 5. Export Public Functions ---
export { 
    STORAGE_KEYS, 
    loadData, 
    saveData, 
    calculateTotal, 
    getSpendingByCategory 
};