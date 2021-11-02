import React, { useState, useEffect } from "react";
import { shopApi } from "../../api/shop.api";
import { Grid, Image } from "semantic-ui-react";
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
      <Grid columns={3} divided>
        <Grid.Row>{listShop}</Grid.Row>
      </Grid>
    </>
  );
};
