import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { itemApi } from "../../../../api/item.api";

export const DeleteModal = (props) => {
  const auth = useSelector((state) => state.auth);

  const [state, setState] = useState({
    itemId: "",
    name: "",
    image: null,
  });

  useEffect(() => {
    props.isShowDeleteModal &&
      setState({
        itemId: props.item?.itemId || "",
        name: props.item?.name || "",
        image: props.item?.image || null,
      });
  }, [props.isShowDeleteModal]);

  const deleteItem = async () => {
    const payLoad = {
      shopId: auth.user.shopId,
      itemId: state.itemId,
    };

    const item = await itemApi.deleteItem(payLoad);
    props.deleteItemSucessfully(state.itemId);
  };

  return (
    <Modal
      open={props.isShowDeleteModal}
      onClose={() => props.showDeleteModal(false)}
    >
      <Header icon="question" content={`Delete Item - ${state.name} !`} />
      <Modal.Content>
        <p>
          Are you sure to want to delete <strong> {state.name}</strong> ?
        </p>

        {state.image && (
          <Image
            src={`data:image/png;base64,${state.image}`}
            size="small"
            style={{ margin: "0 auto" }}
          />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => props.showDeleteModal(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={() => deleteItem()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
