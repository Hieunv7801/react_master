import React, { useState } from "react";
import Expenses from "./components/Expense/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
function App() {
  const [expenses, setExpenses] = useState([
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 450.23,
      date: new Date(2021, 5, 12),
    },
  ]);
  const [filteredExpenses, setFilterExpenses] = useState(expenses);
  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, expense]
    });
  }

  const filterByYearHandler = (year) => {
    setFilterExpenses(expenses.filter(expense => expense.date.getFullYear().toString() === year));
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={filteredExpenses} onYearChange={filterByYearHandler} />
    </div>
  );
}

export default App;
