import React, { useState } from "react";
import { Button, Table, Icon } from "semantic-ui-react";
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
        <Table.Cell className="table-cell">
          <span>{props.index + 1}</span>
        </Table.Cell>
        <Table.Cell className="table-cell">
          <span>{props.item?.orderId}</span>
        </Table.Cell>
        <Table.Cell className="table-cell">
          <span>{props.item?.customerName}</span>
        </Table.Cell>
        <Table.Cell className="table-cell">
          <span>{props.item?.customerPhoneNumber}</span>
        </Table.Cell>
        <Table.Cell className="table-cell">
          <span>{formatter.format(props.item?.totalPrice)}</span>
        </Table.Cell>
        <Table.Cell className="table-cell">
          <span>{props.item?.status}</span>
        </Table.Cell>
        <Table.Cell className="table-cell">
          <span>{getTime()}</span>
        </Table.Cell>
        <Table.Cell className="table-cell" centered>
          <Button
            animated="vertical"
            color="blue"
            size={"mini"}
            onClick={showModal}
          >
            <Button.Content hidden>View</Button.Content>
            <Button.Content visible>
              <Icon name="eye" />
            </Button.Content>
          </Button>
        </Table.Cell>
      </Table.Row>
    </>
  );
};
