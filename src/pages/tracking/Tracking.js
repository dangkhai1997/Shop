import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderApi } from "../../api/order.api";
import { Grid, Segment, Icon, Label, Menu, Table } from "semantic-ui-react";
import { TrackingItems } from "./TrackingItems";
import { TrackingHeader } from "./TrackingHeader";
import * as actions from "../../redux";

export const Tracking = (props) => {
  const orderId = props.location.pathname.split("/")[2] || "";
  const dispatch = useDispatch();

  const [state, setState] = useState({
    information: null,
  });

  const fetchInformation = async () => {
    dispatch(actions.startLoading());
    const information = await orderApi.getOrder({ orderId });
    dispatch(actions.stopLoading());
    setState({
      ...state,
      information: information,
    });
  };
  useEffect(() => {
    fetchInformation();
  }, []);

  return (
    <>
      <TrackingHeader information={state.information}></TrackingHeader>
      <TrackingItems items={state.information?.itemsInCart}></TrackingItems>
    </>
  );
};
