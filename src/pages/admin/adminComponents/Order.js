import React, { useState, useEffect } from "react";
import { Button, Table, Image } from "semantic-ui-react";
import { OrderDetailModal } from "./adminModals/OrderDetailModal";
export const Order = (props) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [state, setState] = useState({
    isShowModal: false,
  });

  const closeModal = () => {
    setState({
      ...state,
      isShowModal: false,
    });
  };

  const showModal = () => {
    setState({
      ...state,
      isShowModal: true,
    });
  };

  const getTime = () => {
    return new Date(props.item?.orderTime).toLocaleDateString("en-US", options);
  };

  return (
    <>
      {state.isShowModal && (
        <OrderDetailModal
          isShowModal={state.isShowModal}
          closeModal={closeModal}
          item={props.item}
          time={getTime()}
        ></OrderDetailModal>
      )}
      <Table.Row>
        <Table.Cell>{props.index + 1}</Table.Cell>
        <Table.Cell>{props.item?.orderId}</Table.Cell>
        <Table.Cell>{props.item?.customerName}</Table.Cell>
        <Table.Cell>{props.item?.customerPhoneNumber}</Table.Cell>
        <Table.Cell>{formatter.format(props.item?.totalPrice)}</Table.Cell>
        <Table.Cell>{props.item?.status}</Table.Cell>
        <Table.Cell>{getTime()}</Table.Cell>
        <Table.Cell>
          <a onClick={showModal}>View</a>
        </Table.Cell>
      </Table.Row>
    </>
  );
};
