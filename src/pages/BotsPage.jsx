import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LayoutWithSidebar } from '../components/LayoutWithSidebar';
import { CreationHeader } from '../components/CreationHeader';
import { BotsList } from '../components/BotsList';
import { BotModal } from '../components/BotModal';

const BotsPage = () => {
  const [isOpenEditBotModal, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const openEditBotModal = () => setOpen(true);

  const closeEditBotModal = () => setOpen(false);

  const handleSubmitBotForm = (values) => {
    console.dir(values);
  };

  const handleClickAnalytics = () => navigate('/analytics');

  const botsList = useSelector(({ botsReducer: { bots } }) => bots);

  return (
    <LayoutWithSidebar>
      <CreationHeader headerText="Боты" onClickCreate={() => {}} />
      <BotsList
        botsList={botsList}
        onClickEditBot={openEditBotModal}
        onClickAnalytics={handleClickAnalytics}
      />
      <BotModal
        headerText="Редактирование бота"
        headerIcon="edit"
        onSubmitBotForm={handleSubmitBotForm}
        isOpen={isOpenEditBotModal}
        onOpen={openEditBotModal}
        onClose={closeEditBotModal}
      />
    </LayoutWithSidebar>
  );
};

export { BotsPage };
