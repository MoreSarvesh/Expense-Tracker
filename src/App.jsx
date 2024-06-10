import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./Pages/Dashboard";
import Error from "./Pages/Error";

//lib
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//layouts
import Main, { mainLoader } from "./Layouts/Main";

//actions
import { logoutAction } from "./components/Navbar";
import Expenses, { expensesAction, expensesLoader } from "./Pages/Expenses";
import Budget, {
  budgetAction,
  budgetLoader,
  deleteBudget,
} from "./Pages/Budget";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction,
          errorElement: <Error />,
        },
        {
          path: "logout",
          //when i hit this route do this⬇️ thing
          action: logoutAction,
        },
        {
          path: "expenses",
          element: <Expenses />,
          loader: expensesLoader,
          action: expensesAction,
          errorElement: <Error />,
        },
        {
          path: "budget/:id",
          element: <Budget />,
          loader: budgetLoader,
          action: budgetAction,
          errorElement: <Error />,
          children: [{ path: "delete", action: deleteBudget }],
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
