import React, { useState, useEffect } from "react";
import { ShopHeader } from "./adminComponents/ShopHeader";
import {Items} from './adminComponents/Items'
import { shopApi } from "../../api/shop.api";
import { Orders } from "./adminComponents/Orders";
export const Admin = (props) => {
  const shopId = props.location.pathname.split('/')[2] || '';

  const [state, setState] = useState({
    shopInformation: null,
    isMenu: true
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

  const changeView = () => {
    setState({
      ...state,
      isMenu: !state.isMenu,
    });
  };

  return (
    <div>
      <ShopHeader shopInformation={state.shopInformation} changeView={changeView} isMenu={ state.isMenu}/>
      {state.isMenu ? 
      <Items items={state.shopInformation?.items} />
      :<Orders/>
    }
          
    </div>
  );
};
