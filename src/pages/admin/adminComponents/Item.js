import React from "react";
import { Button, Table, Image } from "semantic-ui-react";
import { UpdateItemModal } from "./adminModals/UpdateItemModal";
export const Item = (props) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  <UpdateItemModal />

  return (
    <Table.Row>
      <Table.Cell>
        <Image
          style={{ margin: "0 auto" }}
          src={
            props.item?.image
              ? `data:image/png;base64,${props.item?.image}`
              : "/images/noproduct.png"
          }
          size="tiny"
        />
      </Table.Cell>
      <Table.Cell>{props.item?.name}</Table.Cell>
      <Table.Cell>{formatter.format(props.item?.price)}</Table.Cell>
      <Table.Cell>
        <div>
          <Button color="pink">Edit</Button>
          <Button color="red">Delete</Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};
