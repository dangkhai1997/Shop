import React from "react";
import { Button, Table, Image, Icon } from "semantic-ui-react";
import { formatter } from "../../../helper/helper";

export const ShopItem = (props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Image
          id={`shop_img_${props.item?.itemId}`}
          src={
            props.item?.image
              ? `data:image/png;base64,${props.item?.image}`
              : "/images/noproduct.png"
          }
          centered
          size="small"
        />
      </Table.Cell>
      <Table.Cell className="table-cell">
        <span>{props.item?.name}</span>
      </Table.Cell>
      <Table.Cell className="table-cell">
        <span>{formatter.format(props.item?.price)}</span>
      </Table.Cell>
      <Table.Cell className="table-cell" centered>
        <Button
          icon
          labelPosition="left"
          color="green"
          onClick={props.addToCart}
        >
          <Icon name="cart plus" />
          Add To Cart
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};
