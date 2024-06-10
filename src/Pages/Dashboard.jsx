//rrd functions
import { Link, useLoaderData } from "react-router-dom";

//helper function
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
} from "../utils/helper";

//libraries
import { toast } from "react-toastify";

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//loader
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budget = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budget, expenses };
};

//action
export const dashboardAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}!`);
    } catch (error) {
      throw new Error("There was a problem creating your account!");
    }
  }

  // new budget submission
  if (_action === "addNewBudget") {
    try {
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      return toast.success("Budget Created!");
    } catch (error) {
      throw new Error("there was problem creating new budget!");
    }
  }

  // new expense submission
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

  //delet item submission
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

//component
const Dashboard = () => {
  const { userName, budget, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          {budget && budget.length > 0 ? (
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
                <AddExpenseForm budgets={budget} />
              </div>
              <h2>Existing Budgets</h2>
              <div className="budgets">
                {budget.map((item) => {
                  return <BudgetItem key={item.id} budgetItem={item} />;
                })}
              </div>
              {expenses && expenses.length > 0 && (
                <div className="grid-md">
                  <h2>Recent expenses</h2>
                  <Table
                    expenses={expenses
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 8)}
                  />
                  {expenses.length > 8 && (
                    <Link className="btn btn--dark" to="expenses">
                      View all
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="grid-sm">
              <p>Create a Budget to get started!</p>
              <AddBudgetForm />
            </div>
          )}
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
