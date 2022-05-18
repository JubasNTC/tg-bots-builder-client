import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ConfirmDeleteModal = ({
  headerText,
  contentText,
  onConfirm,
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <Modal
      closeIcon
      dimmer="inverted"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      style={{ paddingBottom: '20px' }}
    >
      <Header icon="delete" content={headerText} />
      <Modal.Content>
        <p>{contentText}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onClose}>
          <Icon name="remove" /> Нет
        </Button>
        <Button color="green" onClick={onConfirm}>
          <Icon name="checkmark" /> Да
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export { ConfirmDeleteModal };
