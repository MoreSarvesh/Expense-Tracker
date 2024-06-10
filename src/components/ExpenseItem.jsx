import { Link, useFetcher } from "react-router-dom";
import { formatDateToLocalString, getAllMatchingItems } from "../utils/helper";

const ExpenseItem = ({ expense, showBudget = true }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  return (
    <>
      <td>{expense.name}</td>
      <td>{expense.amount}</td>
      <td>{formatDateToLocalString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{ "--accent": budget.color }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            className="btn btn--warning"
            aria-label={`delete ${expense.name}`}
            type="submit"
          >
            Delete
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
