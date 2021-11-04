import React, { useState, useEffect } from "react";
import { Grid, Image, Table } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const Shop = (props) => {
  const history = useHistory();

  const goShop = () => {
    history.push(`/shop/${props.shop?.shopId}`);
  };

  return (
    <>
      <Table.Row>
        <Table.Cell>{props.shop?.shopId}</Table.Cell>

        <Table.Cell>{props.shop?.name}</Table.Cell>
        <Table.Cell>
          <a onClick={goShop}>
            <Image
              src={
                props.shop?.image
                  ? `data:image/png;base64,${props.shop?.image}`
                  : "/images/noproduct.png"
              }
              size="tiny"
            />
          </a>
        </Table.Cell>
        <Table.Cell>{props.shop?.phoneNumber}</Table.Cell>
      </Table.Row>
    </>
  );
};
