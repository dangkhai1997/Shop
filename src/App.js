import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes } from "./routes";
import "semantic-ui-css/semantic.min.css";
import Loading from "./components/Loading";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import * as actions from "./redux";

if (typeof window !== "undefined") {
  injectStyle();
}

export const App = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const load = useSelector((state) => state.load);
  const toastStore = useSelector((state) => state.toast);

  useEffect(() => {
    toastStore.isToast && notify(toastStore.message);
    dispatch(actions.stopToast());
  }, [toastStore.isToast]);

  const notify = (message) => {
    toast.dark(`👋${message}!`);
  };

  return (
    <div className="App">
      <Loading active={load?.loading} />
      <Routes />
      <ToastContainer />
      {/* <button className="btn" onClick={notify}>
        click me
      </button> */}
    </div>
  );
};
