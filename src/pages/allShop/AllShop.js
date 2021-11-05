import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { Shops } from "./Shops";

export const AllShop = (props) => {
  return (
    <Grid columns="equal">
      <Grid.Column></Grid.Column>
      <Grid.Column width={12}>
        <Segment color="brown" style={{ marginTop: "4%" }}>
          <Header as="h2">All Shops</Header>
          <Shops></Shops>
        </Segment>
      </Grid.Column>
      <Grid.Column></Grid.Column>
    </Grid>
  );
};
