import React, { useState, useEffect } from "react";
import { ShopHeader } from "./adminComponents/ShopHeader";
import {Items} from './adminComponents/Items'
import { shopApi } from "../../api/shop.api";
import { Button } from 'semantic-ui-react'
export const Admin = (props) => {
  const shopId = props.location.pathname.split('/')[2] || '';

  const [state, setState] = useState({
    shopInformation: null,
  });

  const fetchInformation = async (shopId) => {
    const shopInformation = await shopApi.getShop({id:shopId});
    shopInformation.items = shopInformation.items?.filter(i=>i.isActive);

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
       <Button primary>Primary</Button>
      <Items items={state.shopInformation?.items}/>
    </div>
  );
};
