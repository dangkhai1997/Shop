import React, { useState, useEffect } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
export const Profile = (props) => {
  return (
    <Grid columns={2} divided>
      <Grid.Row stretched>
        <Grid.Column>
          <Segment>
            <Image style={{ margin: '0 auto' }}
              src={
                props.shopInformation?.image
                  ? `data:image/png;base64,${props.shopInformation?.image}`
                  : "/images/default.png"
              }
              size="small"
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <div style={{ fontSize: "xx-large" }}>{props.shopInformation?.name}</div>
          </Segment>
          <Segment>
            <div style={{ fontSize: "xx-large" }}>
              <i className="phone volume icon"></i>
              {props.shopInformation?.phoneNumber}
            </div>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
