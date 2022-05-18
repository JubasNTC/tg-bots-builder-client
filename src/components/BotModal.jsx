import React from 'react';
import { Header, Modal } from 'semantic-ui-react';
import { BotForm } from './BotForm';

const BotModal = ({
  headerText,
  headerIcon,
  initialValues,
  onSubmitBotForm,
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
      <Header icon={headerIcon} content={headerText} />
      <Modal.Content>
        <BotForm initialValues={initialValues} onSubmit={onSubmitBotForm} />
      </Modal.Content>
    </Modal>
  );
};

export { BotModal };
