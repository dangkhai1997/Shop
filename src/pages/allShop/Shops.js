import React, { useState, useEffect } from "react";
import { shopApi } from "../../api/shop.api";
import { Grid, Image, Table } from "semantic-ui-react";
import { Shop } from "./Shop";
export const Shops = (props) => {
  const [state, setState] = useState({
    shops: [],
  });

  const fetchShops = async (shopId) => {
    const shops = await shopApi.getAllShop();

    setState({
      ...state,
      shops: shops,
    });
  };

  useEffect(() => {
    fetchShops();
  }, []);
  const listShop = state.shops?.map((shop, index) => (
    <Shop key={shop.shopId} shop={shop} />
  ));
  return (
    <>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Shop Id</Table.HeaderCell>
            <Table.HeaderCell>Shop Name</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {listShop}
        </Table.Body>
      </Table>
    </>
  );
};
