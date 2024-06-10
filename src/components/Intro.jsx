//rrd imports
import { Form } from "react-router-dom";

//assests
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take Charge of Your <span className="accent">Money</span>
        </h1>
        <p>
          rack your expenses, create budgets, and achieve your financial goals
          with confidence. Your path to financial freedom starts here.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            aria-label="Your Name"
            placeholder="What is your name?"
            autoComplete="given-name"
            required
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with money" />
    </div>
  );
};

export default Intro;
