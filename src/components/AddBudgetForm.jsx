import { useEffect, useRef } from "react";

//rrd imports
import { Form, useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
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
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g. Groceries "
            ref={focusRef}
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $500"
            inputMode="decimal"
            required
          />
          <input type="hidden" name="_action" value="addNewBudget" />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmittig}
          >
            <span>Create Budget</span>
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
