import React, { useState, useEffect } from "react";
import { Grid, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const Shop = (props) => {
  const history = useHistory();

  const goShop = () => {
    history.push(`/shop/${props.shop?.shopId}`);
  };

  return (
    <>
      <Grid.Column>
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
        {props.shop?.name}
      </Grid.Column>
    </>
  );
};
