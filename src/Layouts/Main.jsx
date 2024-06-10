//helper function
import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../utils/helper";

//assests
import wave from "../assets/wave.svg";

//components
import Navbar from "../components/Navbar";

//loader
export const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

//component
const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Navbar userName={userName} />
      <Outlet />
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
