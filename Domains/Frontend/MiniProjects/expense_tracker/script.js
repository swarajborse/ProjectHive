document.addEventListener("DOMContentLoaded", () => {
    let localTransactions = [];

    const userInfo = document.getElementById("user-info");
    const form = document.getElementById("transaction-form");
    const list = document.getElementById("transactions-list");
    const errorMessage = document.getElementById("error-message");

    const balanceEl = document.getElementById("balance");
    const incomeEl = document.getElementById("income");
    const expenseEl = document.getElementById("expense");

    userInfo.textContent = "Local Mode (Data will not save)";
    console.log("Running in Local Mode. Data is temporary.");

    const renderTransactions = () => {
        list.innerHTML = "";

        if (localTransactions.length === 0) {
            list.innerHTML = `<p id="loading-message" class="text-gray-400 text-center py-4">No transactions yet. Data is temporary.</p>`;
            return;
        }

        localTransactions.forEach((t) => {
            const isExpense = t.amount < 0;
            const sign = isExpense ? "-" : "+";
            const colorClass = isExpense ? "text-rose-400" : "text-emerald-400";
            const formattedAmount = `$${Math.abs(t.amount).toFixed(2)}`;

            const item = document.createElement("div");
            item.id = `transaction-${t.id}`;
            item.className =
                "flex justify-between items-center p-4 rounded-xl main-card transition-all duration-300 hover:bg-gray-700/50 group";
            item.innerHTML = `
                <div class="flex-1 min-w-0 mr-4">
                    <p class="font-semibold text-gray-200 truncate">${t.description}</p>
                    <p class="text-xs text-gray-500 mt-0.5">${new Date(t.timestamp).toLocaleDateString()}</p>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="font-bold text-lg ${colorClass}">
                        ${sign}${formattedAmount}
                    </span>
                    <button onclick="deleteTransaction('${t.id}')"
                        class="animated-btn p-2 rounded-full bg-red-600 hover:bg-red-500 text-white opacity-80 group-hover:opacity-100 transition duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            `;
            list.appendChild(item);
        });
    };

    const updateSummary = () => {
        const income = localTransactions
            .filter((t) => t.amount > 0)
            .reduce((acc, t) => acc + t.amount, 0);
        const expense = localTransactions
            .filter((t) => t.amount < 0)
            .reduce((acc, t) => acc + t.amount, 0);

        const totalExpense = Math.abs(expense);
        const balance = income + expense;

        incomeEl.textContent = `$${income.toFixed(2)}`;
        expenseEl.textContent = `$${totalExpense.toFixed(2)}`;
        balanceEl.textContent = `$${balance.toFixed(2)}`;
        balanceEl.className = `text-3xl font-bold mt-1 ${
            balance >= 0 ? "text-blue-400" : "text-rose-500"
        }`;
    };

    const addTransaction = (e) => {
        e.preventDefault();
        const description = document.getElementById("description").value.trim();
        const amountInput = document.getElementById("amount");
        const type = document.getElementById("type").value;

        let amount = parseFloat(amountInput.value);
        if (!description || isNaN(amount) || amount <= 0) {
            errorMessage.textContent =
                "Please enter a valid description and amount.";
            errorMessage.classList.remove("hidden");
            return;
        }

        errorMessage.classList.add("hidden");
        const sign = type === "expense" ? -1 : 1;
        amount = amount * sign;

        const transaction = {
            id: crypto.randomUUID(),
            description,
            amount,
            type,
            timestamp: new Date().toISOString(),
        };

        localTransactions.unshift(transaction);
        renderTransactions();
        updateSummary();

        form.reset();
        errorMessage.textContent =
            "Added successfully! (Temporary data - local mode)";
        errorMessage.classList.remove("hidden");
        setTimeout(() => errorMessage.classList.add("hidden"), 3000);
    };

    window.deleteTransaction = (id) => {
        localTransactions = localTransactions.filter((t) => t.id !== id);
        renderTransactions();
        updateSummary();
    };

    form.addEventListener("submit", addTransaction);

    // Initial render
    renderTransactions();
    updateSummary();
});
