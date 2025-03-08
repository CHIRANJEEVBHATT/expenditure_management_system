// Get elements
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalBalance = parseFloat(localStorage.getItem("balance")) || 0;

document.getElementById("set-balance").addEventListener("click", function () {
    let balanceInput = parseFloat(document.getElementById("initial-balance").value);
    if (!balanceInput || balanceInput < 0) {
        alert("Please enter a valid balance!");
        return;
    }
    totalBalance = balanceInput;
    localStorage.setItem("balance", totalBalance);
    updateBalance();
});

document.getElementById("save").addEventListener("click", function () {
    let amount = parseFloat(document.getElementById("amount").value);
    let description = document.getElementById("description").value;

    if (!amount || !description || amount > totalBalance) {
        alert("Invalid input or insufficient balance!");
        return;
    }

    let expense = { amount, description };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    totalBalance -= amount;
    localStorage.setItem("balance", totalBalance);
    
    updateExpenseList();
    updateBalance();
});

function updateExpenseList() {
    let list = document.getElementById("expense-list");
    list.innerHTML = "";

    expenses.forEach((expense, index) => {
        let li = document.createElement("li");
        li.textContent = `💰 ₹${expense.amount} - ${expense.description} `;
        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = function () {
            deleteExpense(index);
        };

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function deleteExpense(index) {
    totalBalance += expenses[index].amount;
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("balance", totalBalance);
    updateExpenseList();
    updateBalance();
}

function updateBalance() {
    document.getElementById("balance").textContent = `💵 Money Left: ₹${totalBalance}`;
}

// Initialize UI on page load
updateExpenseList();
updateBalance();
