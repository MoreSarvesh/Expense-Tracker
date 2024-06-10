import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget } from "../utils/helper";

const BudgetItem = ({ budgetItem, showDelete = false }) => {
  const { id, name, amount, color } = budgetItem;
  const spent = calculateSpentByBudget(id);
  const remaining = amount - spent;

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{amount} Budgeted</p>
      </div>
      <progress max={amount} value={spent}></progress>
      <div className="progress-text">
        <small>{spent} spent</small>
        <small>{remaining} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button
              className="btn btn--warning"
              aria-label="Delete item"
              type="submit"
            >
              Delete
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
