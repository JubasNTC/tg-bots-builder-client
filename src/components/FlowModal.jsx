import React from 'react';
import { Header, Modal } from 'semantic-ui-react';

import { FlowForm } from './FlowForm';

const FlowModal = ({
  headerText,
  headerIcon,
  initialValues,
  botsForAttachment,
  onSubmitFlowForm,
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
        <FlowForm
          initialValues={initialValues}
          botsForAttachment={botsForAttachment}
          onSubmit={onSubmitFlowForm}
        />
      </Modal.Content>
    </Modal>
  );
};

export { FlowModal };
