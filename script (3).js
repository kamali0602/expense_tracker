let expenses = [];

function addExpense() {
    const expenseName = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (!expenseName || !amount || !category || !date) {
        alert("Please fill in all fields.");
        return;
    }

    const expense = {
        name: expenseName,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);
    displayExpenses();
    calculateTotal();
    document.getElementById('expense-name').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = 'Food';
    document.getElementById('date').value = '';
}

function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;

        expenseList.appendChild(row);
    });
}

function calculateTotal() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
    calculateTotal();
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('category').value = expense.category;
    document.getElementById('date').value = expense.date;
    deleteExpense(index);
}

function filterExpenses() {
    const filterCategory = document.getElementById('filter-category').value;
    const filteredExpenses = filterCategory === 'All' ? expenses : expenses.filter(expense => expense.category === filterCategory);

    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    filteredExpenses.forEach((expense, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;

        expenseList.appendChild(row);
    });

    const totalAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}
