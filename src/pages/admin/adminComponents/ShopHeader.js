import React, { useState, useEffect } from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import { Profile } from "./Profile";
export const ShopHeader = (props) => {
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
            <Button positive>Copy</Button>
            <Button.Or />
            <Button primary>Share</Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
