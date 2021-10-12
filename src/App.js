import { useSelector } from "react-redux";
import "./App.css";
import { Routes } from "./routes";
import 'semantic-ui-css/semantic.min.css'

export const  App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Routes />
    </div>
  );
};
