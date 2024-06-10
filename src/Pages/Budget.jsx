//rrd imports
import { redirect, useLoaderData } from "react-router-dom";

//helpers
import {
  createExpense,
  deleteItem,
  getAllMatchingItems,
} from "../utils/helper";

//components
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

//library
import { toast } from "react-toastify";

//loder
export const budgetLoader = async ({ params }) => {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget)
    throw new Error("The Budget you are trying to find does not exists!");

  return { budget, expenses };
};

//action
export const budgetAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //creating expenses
  if (_action === "createNewExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success("Expense added!");
    } catch (error) {
      throw new Error("there was problem adding new expense!");
    }
  }

  //delete expenses
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (error) {
      throw new Error("there was problem deleting expense!");
    }
  }
};

//action - delete budget
export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }
  return redirect("/");
}

const Budget = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">Budget Overview</span>
      </h1>
      <div className="flex-lg">
        <BudgetItem budgetItem={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
        {expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name}</span> Expenses
            </h2>
            <Table expenses={expenses} showBudget={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
