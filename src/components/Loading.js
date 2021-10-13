import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading = (props) => (
  <div>
    <Loader size="big" active={props.active}>
      Loading
    </Loader>
  </div>
);

export default Loading;
