import React, { useState, useEffect } from "react";
import { Grid, Segment, Button, Popup } from "semantic-ui-react";
import { Profile } from "./Profile";
export const ShopHeader = (props) => {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    const button = document.getElementById("btn-copy");
    button.innerText = "Copied";
    setTimeout(() => {
      button.innerText = "Copy";
    }, 5000);
  };

  return (
    <Grid columns={3} divided>
      <Grid.Row stretched>
        <Grid.Column>
          <Segment>
            <Profile shopInformation={props.shopInformation} />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>Shop Link</Segment>
          <Segment>
            <a>View order</a>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Button.Group size="small" style={{ maxHeight: "50%" }}>
            <Button positive onClick={copyLink} id="btn-copy">
              Copy
            </Button>
            <Button.Or />
            <Button primary>Share</Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
