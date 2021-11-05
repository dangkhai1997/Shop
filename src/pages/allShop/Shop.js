import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const Shop = (props) => {
  const history = useHistory();

  const goShop = () => {
    history.push(`/shop/${props.shop?.shopId}`);
  };

  return (
    <Card
      color="brown"
      onClick={goShop}
      image={
        props.shop?.image
          ? `data:image/png;base64,${props.shop?.image}`
          : "/images/noproduct.png"
      }
      header={props.shop?.name}
      extra={
        <a href={`tel:${props.shop?.phoneNumber}`}>
          <Icon name="phone" /> {props.shop?.phoneNumber}
        </a>
      }
    />
  );
};
