import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ConfirmDeleteBotModal = ({ onConfirm, isOpen, onOpen, onClose }) => {
  return (
    <Modal
      closeIcon
      dimmer="inverted"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      style={{ paddingBottom: '20px' }}
    >
      <Header icon="delete" content="Удаление бота" />
      <Modal.Content>
        <p>Вы, действительно хотите удалить бота?</p>
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

export { ConfirmDeleteBotModal };
