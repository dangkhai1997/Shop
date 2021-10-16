import { useSelector } from "react-redux";
import "./App.css";
import { Routes } from "./routes";
import "semantic-ui-css/semantic.min.css";
import Loading from "./components/Loading";

export const App = () => {
  const auth = useSelector((state) => state.auth);
  const load = useSelector((state) => state.load);

  return (
    <div className="App">
      <Loading active={load?.loading} />
      <Routes />
    </div>
  );
};
