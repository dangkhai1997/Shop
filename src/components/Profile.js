import React from "react";
import { Grid, Image, Header } from "semantic-ui-react";
export const Profile = (props) => {
  return (
    <Grid columns={2}>
      <Grid.Column width={5}>
        <Image
          src={
            props.shopInformation?.image
              ? `data:image/png;base64,${props.shopInformation?.image}`
              : "/images/default.png"
          }
          fluid
        />
      </Grid.Column>
      <Grid.Column width={11}>
        <div className="admin-profile">
          <Header as="h6" color="brown" className="profile-type">
            Shop Name
          </Header>
          <Header as="h3" className="profile-text">
            {props.shopInformation?.name}
          </Header>
          <Header as="h6" color="brown" className="profile-type">
            Phone Number
          </Header>
          <Header as="h3" className="profile-text">
            {props.shopInformation?.phoneNumber}
          </Header>
        </div>
      </Grid.Column>
    </Grid>
  );
};
