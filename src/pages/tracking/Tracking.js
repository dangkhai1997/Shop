import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderApi } from "../../api/order.api";
import { Grid, Segment, Icon, Label, Menu, Table } from "semantic-ui-react";
import { TrackingItems } from "./TrackingItems";
import { TrackingHeader } from "./TrackingHeader";

export const Tracking = (props) => {
  const orderId = props.location.pathname.split("/")[2] || "";

  const [state, setState] = useState({
    information: null,
  });

  const fetchInformation = async () => {
    const information = await orderApi.getOrder({ orderId });
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
     <TrackingHeader information= {state.information}></TrackingHeader>
      <TrackingItems items={state.information?.itemsInCart}></TrackingItems>
    </>
  );
};
