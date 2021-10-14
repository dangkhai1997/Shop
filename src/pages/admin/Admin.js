import React, { useState, useEffect } from "react";
import { ShopHeader } from "./adminComponents/ShopHeader";
import {Items} from './adminComponents/Items'
import { shopApi } from "../../api/shop.api";
export const Admin = (props) => {
  const shopId = props.location.pathname.split('/')[2] || '';

  const [state, setState] = useState({
    shopInformation: null,
  });

  const fetchInformation = async (shopId) => {
    const shopInformation = await shopApi.getShop({id:shopId});
    setState({
      ...state,
      shopInformation: shopInformation,
    });
  };

  useEffect(() => {
    fetchInformation(shopId);
  }, []);

  return (
    <div>
      <ShopHeader shopInformation={state.shopInformation}/>
      <Items items={state.shopInformation?.items}/>
    </div>
  );
};
