import { useRef, useEffect } from "react";

//rrd imports
import { useFetcher } from "react-router-dom";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmittig = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmittig) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmittig]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add new{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>
      </h2>
      <fetcher.Form method="post" ref={formRef} className="grid-sm">
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name:</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 50"
              required
            />
          </div>
          <div className="grid-xs" hidden={budgets.length === 1}>
            <label htmlFor="newExpenseBudget">Budget Category</label>
            <select name="newExpenseBudget" id="newExpenseBudget" required>
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <input type="hidden" value="createNewExpense" name="_action" />
        <button type="submit" className="btn btn--dark" disabled={isSubmittig}>
          <span>Create Expense</span>
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
